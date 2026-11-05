import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Content } from "@/types/supabase";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "./SectionHeading";

const MAX_TECH_BADGES = 6;

const statusLabels: Record<NonNullable<Content["status"]>, string> = {
  pending: "In progress",
  completed: "Completed",
  hold: "On hold",
  dropped: "Dropped",
};

const getTechNames = ({ sections }: Content) =>
  (sections ?? [])
    .flatMap((section) => section.stack ?? [])
    .flatMap((group) => group.items)
    .map((item) => item.name)
    .slice(0, MAX_TECH_BADGES);

export type ProjectsProps = {
  data: Content[];
};

const Projects = ({ data }: ProjectsProps) => {
  const projects = data.filter((project) => !!project.featured_image_url);

  return (
    <section id="projects" className="scroll-mt-14 border-b">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 sm:px-6">
        <SectionHeading title="Projects" description="Products I've designed, built and shipped." />
        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <Card key={project.id} className="group overflow-hidden p-0">
              <div className="grid md:grid-cols-2">
                <Link
                  href={`/project/${project.id}`}
                  aria-label={project.name}
                  className={cn(
                    "relative aspect-video overflow-hidden bg-muted md:aspect-auto md:min-h-80",
                    index % 2 === 1 && "md:order-last"
                  )}
                >
                  <Image
                    src={project.featured_image_url!}
                    alt={`${project.name} preview`}
                    fill
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-col items-start gap-4 p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    {!!project.status && <Badge variant="secondary">{statusLabels[project.status]}</Badge>}
                    {!!project.date && <span>{project.date}</span>}
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight">{project.name}</h3>
                  {!!project.description?.[0] && (
                    <p className="line-clamp-4 leading-7 text-muted-foreground">{project.description[0]}</p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {getTechNames(project).map((name) => (
                      <Badge key={name} variant="outline">
                        {name}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-auto" asChild>
                    <Link href={`/project/${project.id}`} aria-label={`View ${project.name}`}>
                      View project
                      <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
