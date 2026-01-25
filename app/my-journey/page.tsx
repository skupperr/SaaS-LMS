import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getUserCompanions,
  getUserSessions,
  getBookmarkedCompanions,
} from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionList from "@/components/companionLists";

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);
  const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

  return (
    <main className="min-lg:w-3/4">
      <section
        className="
      flex
      justify-between
      gap-6
      max-sm:flex-col
      items-center
      bg-card
      border
      border-border
      rounded-4xl
      p-6
      shadow-sm
    "
      >
        <div className="flex gap-4 items-center">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={110}
            height={110}
            className="rounded-2xl shadow-sm"
          />

          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-xl tracking-tight">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="stat-card">
            <div className="flex gap-2 items-center">
              <Image src="/icons/check.svg" alt="checkmark" width={22} height={22} />
              <p className="text-2xl font-semibold">
                {sessionHistory.length}
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Lessons completed
            </div>
          </div>

          <div className="stat-card">
            <div className="flex gap-2 items-center">
              <Image src="/icons/cap.svg" alt="cap" width={22} height={22} />
              <p className="text-2xl font-semibold">
                {companions.length}
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Companions created
            </div>
          </div>
        </div>
      </section>

      <Accordion type="multiple" className="mt-8 space-y-4">
        <AccordionItem value="bookmarks">
          <AccordionTrigger className="accordion-trigger">
            Bookmarked Companions ({bookmarkedCompanions.length})
          </AccordionTrigger>
          <AccordionContent>
            <CompanionList
              companions={bookmarkedCompanions}
              title="Bookmarked Companions"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="recent">
          <AccordionTrigger className="accordion-trigger">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
            <CompanionList
              title="Recent Sessions"
              companions={sessionHistory}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="companions">
          <AccordionTrigger className="accordion-trigger">
            My Companions ({companions.length})
          </AccordionTrigger>
          <AccordionContent>
            <CompanionList
              title="My Companions"
              companions={companions}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>

  );
};
export default Profile;