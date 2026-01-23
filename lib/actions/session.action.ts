"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";

export async function createSession(companionId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const supabase = createSupabaseClient();

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
    const supabase = createSupabaseClient();

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
