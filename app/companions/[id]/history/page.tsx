import React from 'react'
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCompanion } from "@/lib/actions/companion.actions";
import { getSessionHistory, getUserPlan} from "@/lib/actions/session.action";
import Link from "next/link";

interface HistoryPageProps {
    params: Promise<{ id: string }>;
}


const CompanionHistoryPage = async ({ params }: HistoryPageProps) => {
    const { id } = await params;

    const user = await currentUser();
    if (!user) redirect("/sign-in");

    const companion = await getCompanion(id);
    if (!companion) redirect("/companions");

    const plan = await getUserPlan();
    if (plan === "basic") redirect("/subscription");

    const sessions = await getSessionHistory(id);

    return (
        <main className="p-6 space-y-6">
            <header>
                <h1 className="text-2xl font-bold">
                    Session History — {companion.name}
                </h1>
                <p className="text-black">
                    Your past conversations with this companion
                </p>
            </header>

            {sessions.length === 0 ? (
                <p className="text-black">No sessions yet.</p>
            ) : (
                <ul className="space-y-4">
                    {sessions.map((session) => {
                        return (
                            <li
                                key={session.id}
                                className="rounded-lg border p-4 flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-medium">
                                        {new Date(session.created_at).toLocaleString()}
                                    </p>
                                </div>

                                {/* future replay page */}
                                <Link
                                    href={`/companions/${id}/history/${session.id}`}
                                    className="btn-secondary"
                                >
                                    View
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </main>
    );
};

export default CompanionHistoryPage;
