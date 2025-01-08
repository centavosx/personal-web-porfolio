import EmblaCarousel from "@/components/Carousel";
import Image from "next/image";
import Section from "@/components/Section";
import { Content } from "@/types/supabase";
import { getImageUrlFromExternal } from "@/utils/getImageFromExternal";
import { InViewContainer } from "@/components/InViewContainer";

const OPTIONS = { loop: true };

export type ProjectsProps = {
  data: Content[];
};
const Projects = ({ data }: ProjectsProps) => {
  const filteredImages = data.filter((project) => !!project.featured_image_url);

  return (
    <Section
      id="projects"
      className="xsm:px-10 py-20"
      title="Projects"
      titleContainerProps={{
        className: "px-6 xsm:px0 mb-6",
      }}
      isTransparentBg
      withPadding={false}
      isDark
      containerProps={{}}
    >
      <InViewContainer animate="bottom">
        <EmblaCarousel
          slides={filteredImages.map((value, index) => ({
            name: value.name,
            component: (
              <Image
                key={`${value.name}${index}`}
                className="h-full w-full object-cover object-top"
                src={getImageUrlFromExternal(value.featured_image_url || "")}
                width={1920}
                height={544}
                alt={`${value.name} featured image`}
              />
            ),
            href: `/project/${value.id}`,
          }))}
          options={OPTIONS}
        />
      </InViewContainer>
    </Section>
  );
};

export default Projects;
