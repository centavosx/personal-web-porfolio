import { Card } from "@/components/ui/card";
import { Content } from "@/types/supabase";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "./SectionHeading";

export type ExperienceProps = {
  data: Content[];
};

const Experience = ({ data }: ExperienceProps) => (
  <section id="experience" className="scroll-mt-14 border-b">
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 sm:px-6">
      <SectionHeading title="Experience" description="Where I've worked." />
      <div className="flex flex-col gap-3">
        {data.map((item) => (
          <Link key={item.id} href={`/work-experience/${item.id}`} className="group">
            <Card className="flex-row items-center gap-4 p-4 transition-colors group-hover:bg-muted/50 sm:gap-6 sm:p-6">
              {!!item.icon_url && (
                <span className="flex size-12 shrink-0 items-center justify-center rounded-lg border bg-neutral-900 p-1.5">
                  <Image
                    src={item.icon_url}
                    width={36}
                    height={36}
                    alt=""
                    className="size-9 object-contain"
                  />
                </span>
              )}
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.role}</p>
              </div>
              <p className="hidden text-sm text-muted-foreground sm:block">{item.date}</p>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
