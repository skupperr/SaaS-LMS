"use client";
import { removeBookmark } from "@/lib/actions/companion.actions";
import { addBookmark } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  bookmarked: boolean;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  bookmarked,
}: CompanionCardProps) => {
  const pathname = usePathname();
  const handleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(id, pathname);
    } else {
      await addBookmark(id, pathname);
    }
  };
  return (
    <article
      className="
    companion-card
    border-border
    bg-card
    shadow-sm
    transition-all
    duration-200
    hover:shadow-md
    hover:-translate-y-0.5
  "
      style={{ backgroundColor: color }}
    >
      <div className="flex justify-between items-center">
        <div className="subject-badge bg-primary/90 text-primary-foreground">
          {subject}
        </div>

        <button
          className="
        companion-bookmark
        border border-border
        hover:bg-gray-700
        transition
      "
          onClick={handleBookmark}
        >
          <Image
            src={
              bookmarked
                ? "/icons/bookmark-filled.svg"
                : "/icons/bookmark.svg"
            }
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight">
          {name}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {topic}
        </p>
      </div>

      <div className="flex items-center gap-2 text-muted-foreground">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} minutes</p>
      </div>

      <Link href={`/companions/${id}`} className="w-full">
        <button
          className="
        btn-primary
        w-full
        justify-center
        transition
        hover:opacity-90
        active:scale-[0.98]
      "
        >
          Launch Lesson
        </button>
      </Link>
    </article>

  );
};

export default CompanionCard;