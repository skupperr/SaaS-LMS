import { headers } from "next/headers";
import { Webhook } from "svix";
// import { createSupabaseClient } from "../../../../lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";



export async function POST(req: Request) {
    console.log("🔥 Clerk webhook hit");

    const rawBody = await req.text();
    const headersList = await headers();

    const svix_id = headersList.get("svix-id");
    const svix_timestamp = headersList.get("svix-timestamp");
    const svix_signature = headersList.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Missing Svix headers", { status: 400 });
    }

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

    let evt;
    try {
        evt = wh.verify(rawBody, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
    } catch (err) {
        console.error("❌ Signature verification failed", err);
        return new Response("Invalid signature", { status: 400 });
    }

    console.log("✅ Webhook verified:", evt.type);

    /* =========================
       USER CREATED
       ========================= */
    if (evt.type === "user.created") {
        const userId = evt.data.id;

        const { error } = await supabaseAdmin.from("profiles").insert({
            id: userId,
            plan: "basic",
        });

        if (error) {
            console.error("❌ Profile insert failed", error);
        }

        return new Response("OK");
    }

    /* =========================
       SUBSCRIPTION EVENTS
       ========================= */
    if (
        evt.type === "subscription.created" ||
        evt.type === "subscription.updated"
    ) {
        const data = evt.data;
        const userId = data.user_id;

        console.log("📨 SUBSCRIPTION EVENT RAW", JSON.stringify(data, null, 2));

        let plan: "basic" | "core" | "pro" = "basic";

        if (data.status === "active") {
            if (data.plan?.slug === "pro") plan = "pro";
            else if (data.plan?.slug === "core") plan = "core";
        }

        console.log("🔁 Updating plan", {
            userId,
            status: data.status,
            slug: data.plan?.slug,
            resolvedPlan: plan,
        });

        const { error } = await supabaseAdmin
            .from("profiles")
            .update({ plan })
            .eq("id", userId);

        if (error) {
            console.error("❌ Plan update failed", error);
        }

        return new Response("OK");
    }

    return new Response("Unhandled event", { status: 200 });
}
