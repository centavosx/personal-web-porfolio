import Markdown from "@/components/Markdown";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Content } from "@/types/supabase";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import ContentGallery from "./ContentGallery";
import ContentStack from "./ContentStack";

const statusLabels: Record<NonNullable<Content["status"]>, string> = {
  pending: "In progress",
  completed: "Completed",
  hold: "On hold",
  dropped: "Dropped",
};

export type ContentDetailsProps = {
  content: Content;
  backHref: string;
  backLabel: string;
};

const ContentDetails = ({ content, backHref, backLabel }: ContentDetailsProps) => {
  const { name, icon_url, role, date, status, description, featured_image_url, sections } = content;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-16">
        <Button variant="ghost" size="sm" className="-ml-2 self-start" asChild>
          <Link href={backHref}>
            <ArrowLeft />
            {backLabel}
          </Link>
        </Button>

        <header className="flex flex-col gap-4">
          {!!icon_url && !featured_image_url && (
            <span className="flex size-14 items-center justify-center rounded-xl border bg-neutral-900 p-2">
              <Image
                src={icon_url}
                width={40}
                height={40}
                alt=""
                className="size-10 object-contain"
              />
            </span>
          )}
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{name}</h1>
          <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
            {!!role && <span>{role}</span>}
            {!!role && !!date && <span aria-hidden>·</span>}
            {!!date && <span>{date}</span>}
            {!!status && <Badge variant="secondary">{statusLabels[status]}</Badge>}
          </div>
        </header>

        {!!featured_image_url && (
          <div className="relative aspect-video overflow-hidden rounded-xl border bg-muted">
            <Image
              src={featured_image_url}
              alt={`${name} preview`}
              fill
              priority
              sizes="(min-width: 896px) 848px, 100vw"
              className="object-cover object-top"
            />
          </div>
        )}

        {!!description?.length && (
          <div className="flex flex-col gap-4 text-lg leading-8">
            {description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}

        {sections?.map((section) => (
          <Fragment key={section.title}>
            <Separator />
            <section className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2>
              {!!section.body && <Markdown>{section.body}</Markdown>}
              {!!section.gallery?.length && (
                <div className="flex flex-col gap-12">
                  {section.gallery.map((item) => (
                    <ContentGallery key={item.images[0]} item={item} />
                  ))}
                </div>
              )}
              {!!section.stack?.length && <ContentStack groups={section.stack} />}
            </section>
          </Fragment>
        ))}
      </main>
      <SiteFooter />
    </>
  );
};

export default ContentDetails;
