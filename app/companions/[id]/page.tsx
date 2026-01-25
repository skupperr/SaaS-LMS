import { getCompanion } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import CompanionComponent from "@/components/companionComponent";
import Link from "next/link";

interface CompanionSessionPageProps {
    params: Promise<{ id: string }>
}

// params: /url/{id}
// searchParams: /url?key=value&key1=value1

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
    const { id } = await params;
    const companion = await getCompanion(id);
    const user = await currentUser();

    if (!user) redirect('/sign-in')
    if (!companion) redirect('/companions')


    return (
        <main>
  <article
    className="
      flex
      justify-between
      p-6
      max-md:flex-col
      gap-6
      bg-card
      border
      border-border
      rounded-4xl
      shadow-sm
    "
  >
    <div className="flex items-center gap-6">
      <div
        className="
          size-[72px]
          flex
          items-center
          justify-center
          rounded-xl
          shadow-sm
          max-md:hidden
        "
        style={{ backgroundColor: getSubjectColor(companion.subject) }}
      >
        <Image
          src={`/icons/${companion.subject}.svg`}
          alt={companion.subject}
          width={35}
          height={35}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-xl tracking-tight">
            {companion.name}
          </p>
          <div className="subject-badge max-sm:hidden">
            {companion.subject}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {companion.topic}
        </p>
      </div>
    </div>

    <div className="flex flex-col gap-3 items-end max-md:items-start">
      <div className="text-sm text-muted-foreground max-md:hidden">
        {companion.duration} minutes
      </div>

      <Link href={`/companions/${id}/history`} className="w-full">
        <button className="btn-primary w-full justify-center">
          Session History
        </button>
      </Link>
    </div>
  </article>

  <CompanionComponent
    {...companion}
    companionId={id}
    userName={user.firstName!}
    userImage={user.imageUrl!}
  />
</main>

    )
}

export default CompanionSession