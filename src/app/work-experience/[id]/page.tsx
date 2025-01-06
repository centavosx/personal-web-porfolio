import Footer from "@/app/_sections/Footer";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import Text from "@/components/Text";
import { withContent } from "@/hoc/withContent";
import { createContentMetadata } from "@/utils/createContentMetadata";
import { getImageUrlFromExternal } from "@/utils/getImageFromExternal";
import Supabase from "@/utils/supabase";
import { Metadata, ResolvingMetadata } from "next";

import Image from "next/image";

export type WorkExperienceProps = {
  params: Promise<{ id: string }>;
};

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
      await Supabase.getContentById(id);

    return (
      <>
        <Navigation pageUrl={`/work-experience/${id}`} links={sectionLinks} />
        <Section
          containerProps={{
            className: "dark overflow-hidden md",
          }}
          className="overflow-hidden self-center justify-end transition-all h-full pt-56"
          isDark
          isTransparentBg
        >
          {!!icon_url && (
            <Image
              className="scale-[4.5] absolute md:right-[8rem] top-[35%] opacity-20 -z-10 self-center bottom-10"
              src={getImageUrlFromExternal(icon_url)}
              width={65}
              height={51}
              alt="company-logo"
            />
          )}
          <Text as="h1" className="font-raleway font-bold" size="xxl">
            {name}
          </Text>
          <Text
            as="h2"
            className="font-raleway font-bold"
            size="lg"
            color="tertiary"
          >
            {role}
          </Text>
          {!!date && (
            <Text
              as="h3"
              className="font-raleway font-bold"
              size="md"
              color="tertiary"
            >
              {date}
            </Text>
          )}
        </Section>
        <Section className="pt-20 pb-10 px-10" withPadding={false}>
          {description?.map((value, index) => (
            <Text className="font-light" key={`description_${index}`}>
              {value}
            </Text>
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
