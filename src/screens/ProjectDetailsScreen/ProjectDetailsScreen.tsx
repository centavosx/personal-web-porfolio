import Footer from "@/components/Footer";
import InView from "@/components/InView";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import { withContent } from "@/hoc/withContent";
import { getImageUrlFromExternal } from "@/utils/getImageFromExternal";
import Supabase from "@/utils/supabase";
import { notFound } from "next/navigation";

export type ProjectDetailsScreenProps = {
  id: string;
};

export const ProjectDetailsScreen = withContent<ProjectDetailsScreenProps>(
  async ({ id, renderContent, sectionLinks }) => {
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
            className: "dark md",
          }}
          className="self-center justify-end transition-all h-full pt-56"
          isDark
          isTransparentBg
        >
          {!!icon_url && (
            <InView.Image
              className="scale-[4.5] absolute md:right-[8rem] top-[35%] opacity-20 -z-10 self-center bottom-10"
              src={getImageUrlFromExternal(icon_url)}
              width={65}
              height={51}
              alt="company-logo"
              animate="right"
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
          {!!date && (
            <InView.Text
              as="h2"
              className="font-raleway font-bold"
              size="lg"
              color="tertiary"
              animate="left"
              delay={400}
            >
              {date}
            </InView.Text>
          )}
          <InView.Text
            as="h3"
            className="font-raleway font-bold uppercase"
            size="md"
            color="tertiary"
            animate="bottom"
            delay={800}
          >
            {status}
          </InView.Text>
        </Section>
        <Section
          className="pt-20 pb-10 px-10"
          withPadding={false}
          title="Overview"
          id="overview"
        >
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
