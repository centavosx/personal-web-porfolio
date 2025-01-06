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
import { notFound } from "next/navigation";

export const revalidate = 28800;

export const dynamicParams = true;

export type ProjectProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: ProjectProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id;
  const previousImages = ((await parent).openGraph?.images || []) as string[];

  return createContentMetadata(id, "Project", previousImages);
}

const Project = withContent<ProjectProps>(
  async ({ params, renderContent, sectionLinks }) => {
    const id = (await params).id;
    const { icon_url, name, description, content, status, date } =
      await Supabase.getContentById(id).catch(() => notFound());

    sectionLinks.push({
      text: "Overview",
      href: "#overview",
      hidden: true,
    });

    return (
      <>
        <Navigation pageUrl={`/project/${id}`} links={sectionLinks} />
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
          {!!date && (
            <Text
              as="h2"
              className="font-raleway font-bold"
              size="lg"
              color="tertiary"
            >
              {date}
            </Text>
          )}
          <Text
            as="h3"
            className="font-raleway font-bold uppercase"
            size="md"
            color="tertiary"
          >
            {status}
          </Text>
        </Section>
        <Section
          className="pt-20 pb-10 px-10"
          withPadding={false}
          title="Overview"
          id="overview"
        >
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

export default Project;

export async function generateStaticParams() {
  try {
    const contentIds = await Supabase.getContentIdsByType("project");
    return contentIds;
  } catch {
    notFound();
  }
}
