import SocialLinks from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Content, Link as SiteLink } from "@/types/supabase";
import { getContentImageUrl } from "@/utils/getImageFromExternal";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const cardPositions = [
  "left-0 top-0 z-30 -rotate-3",
  "left-[22%] top-[24%] z-20 rotate-2",
  "left-[8%] top-[52%] z-10 -rotate-1",
];

export type HeroProps = {
  intro: string;
  links: SiteLink[];
  projects: Content[];
};

const Hero = ({ intro, links, projects }: HeroProps) => {
  const previews = projects.filter((project) => !!project.featured_image_url).slice(0, 3);

  return (
    <section className="relative overflow-hidden border-b">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col items-start gap-6">
          <p className="font-medium text-muted-foreground">Software Developer</p>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Vincent Llanto
          </h1>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">{intro}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="lg" asChild>
              <Link href="/#projects">
                See my work
                <ArrowRight />
              </Link>
            </Button>
            <SocialLinks links={links} />
          </div>
        </div>
        <div className="relative hidden aspect-[5/4] lg:block">
          {previews.map((project, index) => (
            <Link
              key={project.id}
              href={`/project/${project.id}`}
              aria-label={project.name}
              className={cn(
                "absolute w-[72%] overflow-hidden rounded-xl border bg-card shadow-xl transition-transform hover:z-40 hover:scale-105",
                cardPositions[index]
              )}
            >
              <div className="relative aspect-video">
                <Image
                  src={getContentImageUrl(project.featured_image_url!)}
                  alt=""
                  fill
                  sizes="420px"
                  className="object-cover object-top"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
