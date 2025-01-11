import Section from "@/components/Section";
import { Content } from "@/types/supabase";
import { getImageUrlFromExternal } from "@/utils/getImageFromExternal";
import InView from "@/components/InView";
import Button from "@/components/Button";

export type ProjectsProps = {
  data: Content[];
};
const Projects = ({ data }: ProjectsProps) => {
  const filteredFeaturedProjects = data.filter(
    (project) => !!project.featured_image_url
  );

  return (
    <Section id="projects" title="Projects" isTransparentBg isDark>
      <div className="flex flex-col gap-16 mt-12">
        {filteredFeaturedProjects.map((project, index) => (
          <div
            key={`${project.name}_${index}`}
            className="flex flex-col gap-16 items-center lg:flex-row lg:gap-24"
          >
            <InView.Image
              className="h-full w-full object-cover object-center rounded-xl max-w-full max-h-full self-center md:max-w-96 md:max-f-96"
              src={getImageUrlFromExternal(project.featured_image_url || "")}
              width={384}
              height={384}
              alt={`${project.name} featured image`}
            />
            <div className="flex flex-col flex-1 gap-8">
              <InView.Text
                className="font-bold font-montserrat tracking-widest"
                size="xl"
                animate="top"
                delay={300}
              >
                {project.name}
              </InView.Text>
              <InView.Text delay={300} animate="bottom">
                {project.description}
              </InView.Text>
              <InView.Container
                className="self-end max-w-[120px]"
                delay={600}
                animate="right"
              >
                <Button
                  variant="outlined"
                  href={`/project/${project.id}`}
                  aria-label={`Read more about ${project.name}`}
                >
                  More
                </Button>
              </InView.Container>
            </div>
          </div>
        ))}
      </div>
      {/* <InView.Container animate="bottom">
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
      </InView.Container> */}
    </Section>
  );
};

export default Projects;
