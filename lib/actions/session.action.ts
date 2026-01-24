"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";

export async function createSession(companionId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const supabase = await createSupabaseClient();

    const { data, error } = await supabase
        .from("companion_sessions")
        .insert({
            user_id: userId,
            companion_id: companionId,
        })
        .select("id")
        .single();

    if (error) throw error;

    return data.id;
}

/**
 * Save session + messages in **one go** at the end
 */
export async function endSession(
    sessionId: string,
    messages: SavedMessage[]
) {
    const supabase = await createSupabaseClient();

    // Insert all messages at once
    if (messages.length > 0) {
        const formatted = messages.map((m) => ({
            session_id: sessionId,
            role: m.role,
            content: m.content,
        }));

        const { error: msgError } = await supabase
            .from("companion_messages")
            .insert(formatted);

        if (msgError) throw msgError;
    }
}


export async function getUserPlan(): Promise<"basic" | "core" | "pro"> {
    // Get the currently logged-in user
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const supabase = await createSupabaseClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("plan")
        .eq("id", userId)
        .single();

    if (error) {
        console.error("Failed to fetch user plan:", error);
        return "basic"; // fallback to basic if something goes wrong
    }

    const plan = data?.plan;
    if (plan === "pro" || plan === "core") return plan;
    return "basic";
}

export async function getSessionHistory(companionId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const supabase = await createSupabaseClient();

    const { data, error } = await supabase
        .from("companion_sessions")
        .select(`
      id,
      created_at
    `)
        .eq("user_id", userId)
        .eq("companion_id", companionId)
        .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
}


export async function getSessionMessages(
    companionId: string,
    sessionId: string
) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    console.log("🔍 Fetching messages for sessionId:", sessionId);

    const supabase = await createSupabaseClient();

    // Verify session ownership + companion match
    const { data: session, error: sessionError } = await supabase
        .from("companion_sessions")
        .select("id")
        .eq("id", sessionId)
        .eq("user_id", userId)
        .eq("companion_id", companionId)
        .single();

    if (sessionError || !session) {
        throw new Error("Session not found");
    }

    const { data: messages, error } = await supabase
        .from("companion_messages")
        .select("id, role, content, created_at")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: true });

    if (error) throw error;

    return messages;
}