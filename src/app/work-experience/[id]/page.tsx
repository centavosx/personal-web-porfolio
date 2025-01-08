import Footer from "@/app/_sections/Footer";
import InView from "@/components/InView";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import { withContent } from "@/hoc/withContent";
import { createContentMetadata } from "@/utils/createContentMetadata";
import { getImageUrlFromExternal } from "@/utils/getImageFromExternal";
import Supabase from "@/utils/supabase";
import { Metadata, ResolvingMetadata } from "next";

import Image from "next/image";
import { notFound } from "next/navigation";

export type WorkExperienceProps = {
  params: Promise<{ id: string }>;
};

export const revalidate = 28800;

export const dynamicParams = true;

export async function generateMetadata(
  { params }: WorkExperienceProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id;
  const previousImages = ((await parent).openGraph?.images || []) as string[];

  return createContentMetadata(id, "Work Experience", previousImages);
}

const WorkExperience = withContent<{ params: Promise<{ id: string }> }>(
  async ({ params, renderContent, sectionLinks }) => {
    const id = (await params).id;
    const { icon_url, name, description, content, role, date } =
      await Supabase.getContentById(id).catch(() => notFound());

    return (
      <>
        <Navigation pageUrl={`/work-experience/${id}`} links={sectionLinks} />
        <Section
          containerProps={{
            className: "dark md",
          }}
          className="self-center justify-end transition-all h-full pt-56"
          isDark
          isTransparentBg
        >
          {!!icon_url && (
            <InView.Image
              className="scale-[4.5] absolute md:right-[8rem] top-[35%]  -z-10 self-center bottom-10"
              src={getImageUrlFromExternal(icon_url)}
              width={65}
              height={51}
              alt="company-logo"
              animate="right"
              inViewClassName="opacity-20"
            />
          )}
          <InView.Text
            as="h1"
            className="font-raleway font-bold"
            size="xxl"
            animate="top"
          >
            {name}
          </InView.Text>
          <InView.Text
            as="h2"
            className="font-raleway font-bold"
            size="lg"
            color="tertiary"
            animate="left"
            delay={400}
          >
            {role}
          </InView.Text>
          {!!date && (
            <InView.Text
              as="h3"
              className="font-raleway font-bold"
              size="md"
              color="tertiary"
              animate="bottom"
              delay={800}
            >
              {date}
            </InView.Text>
          )}
        </Section>
        <Section className="pt-20 pb-10 px-10" withPadding={false}>
          {description?.map((value, index) => (
            <InView.Text className="font-light" key={`description_${index}`}>
              {value}
            </InView.Text>
          ))}
        </Section>
        {content && renderContent("content", content)}
        <Footer isDark />
      </>
    );
  }
);

export default WorkExperience;

export async function generateStaticParams() {
  const contentIds = await Supabase.getContentIdsByType("work-experience");
  return contentIds;
}
