import EmblaCarousel from "@/components/Carousel";
import Image from "next/image";
import Section from "@/components/Section";

const OPTIONS = { loop: true };

const Projects = () => {
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
      <div>
        <EmblaCarousel
          slides={[
            <Image
              key="mecapital3"
              className="h-full w-full object-cover object-top"
              src="/project/mecapital.png"
              width={1920}
              height={1280}
              alt="mecapital"
            />,
            <Image
              key="mecapital4"
              className="h-fullw-full object-cover object-top"
              src="/project/gg.png"
              width={1920}
              height={1280}
              alt="mecapital"
            />,
            <Image
              key="mecapital5"
              className="h-full w-full object-cover object-top"
              src="/project/mecapital.png"
              width={1920}
              height={1280}
              alt="mecapital"
            />,
            <Image
              key="mecapital6"
              className="h-full w-full object-cover object-top"
              src="/project/jammin.png"
              width={1920}
              height={1280}
              alt="mecapital"
            />,
            <Image
              key="mecapital5"
              className="h-full w-full object-cover object-top"
              src="/project/iamfuture.jpg"
              width={1920}
              height={1280}
              alt="mecapital"
            />,
          ]}
          options={OPTIONS}
        />
      </div>
    </Section>
  );
};

export default Projects;
