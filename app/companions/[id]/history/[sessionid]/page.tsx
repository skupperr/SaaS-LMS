// companions/[id]/history/[sessionId]/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCompanion } from "@/lib/actions/companion.actions";
import { getSessionMessages } from "@/lib/actions/session.action";
import Image from "next/image";

interface ReplayPageProps {
    params: Promise<{ id: string; sessionid: string }>;
}

const SessionReplayPage = async ({ params }: ReplayPageProps) => {
    const { id, sessionid } = await params;

    const user = await currentUser();
    if (!user) redirect("/sign-in");

    const companion = await getCompanion(id);
    if (!companion) redirect("/companions");

    const messages = await getSessionMessages(id, sessionid);

    return (
        <main className="p-6 max-w-3xl mx-auto space-y-6">
            <header className="border-b pb-4">
                <h1 className="text-xl font-bold">
                    Session with {companion.name}
                </h1>
                <p className="text-muted text-sm">
                    Conversation replay
                </p>
            </header>

            <div className="space-y-4">
                {messages.map((msg) => {
                    const isUser = msg.role === "user";

                    return (
                        <div
                            key={msg.id}
                            className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"
                                }`}
                        >
                            {!isUser && (
                                <Image
                                    src={`/icons/${companion.subject}.svg`}
                                    alt={companion.name}
                                    width={32}
                                    height={32}
                                />
                            )}

                            <div
                                className={`rounded-lg px-4 py-3 max-w-[75%] ${isUser
                                        ? "bg-primary text-white"
                                        : "bg-muted text-foreground"
                                    }`}
                            >
                                {msg.content}
                            </div>

                            {isUser && (
                                <Image
                                    src={user.imageUrl}
                                    alt={user.firstName ?? "User"}
                                    width={50}
                                    height={32}
                                    className="rounded-full object-cover"
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </main>
    );
};

export default SessionReplayPage;
