import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "../lib/utils";
import Link from "next/link";
import Image from "next/image";
import { getSubjectColor } from "../lib/utils";

interface CompanionsListProps{
    title: string;
    companions?: Companion[];
    classNames?: string;
}

const CompanionList = ({ companions, classNames} : CompanionsListProps) => {
    return (
        <article className={cn('companion-list', classNames)}>
  <h2 className="font-semibold text-2xl tracking-tight mb-6">
    Recent Sessions
  </h2>

  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="text-sm font-medium text-muted-foreground w-2/3">
          Lessons
        </TableHead>
        <TableHead className="text-sm font-medium text-muted-foreground">
          Subject
        </TableHead>
        <TableHead className="text-sm font-medium text-muted-foreground text-right">
          Duration
        </TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {companions?.map(({ id, subject, name, topic, duration }) => (
        <TableRow key={id} className="group">
          <TableCell>
            <Link href={`/companions/${id}`}>
              <div className="flex items-center gap-5">
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
                  style={{ backgroundColor: getSubjectColor(subject) }}
                >
                  <Image
                    src={`/icons/${subject}.svg`}
                    alt={subject}
                    width={35}
                    height={35}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-lg leading-tight">
                    {name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {topic}
                  </p>
                </div>
              </div>
            </Link>
          </TableCell>

          <TableCell>
            <div className="subject-badge w-fit max-md:hidden">
              {subject}
            </div>

            <div
              className="md:hidden flex items-center justify-center rounded-lg w-fit p-2"
              style={{ backgroundColor: getSubjectColor(subject) }}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={18}
                height={18}
              />
            </div>
          </TableCell>

          <TableCell>
            <div className="flex items-center justify-end w-full gap-2 text-muted-foreground">
              <p className="text-base font-medium text-foreground">
                {duration}
                <span className="max-md:hidden"> mins</span>
              </p>
              <Image
                src="/icons/clock.svg"
                alt="minutes"
                width={14}
                height={14}
                className="md:hidden"
              />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</article>

    )
}

export default CompanionList