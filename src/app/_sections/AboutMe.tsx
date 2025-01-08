import InView from "@/components/InView";
import MutedIconLabel from "@/components/MutedIconLabel";
import Section from "@/components/Section";
import Supabase from "@/utils/supabase";

export type AboutMeProps = {
  shortDescription: string;
};
const AboutMe = async ({ shortDescription }: AboutMeProps) => {
  const services = await Supabase.getServices();

  return (
    <>
      <Section
        id="about"
        title="About Me"
        description={shortDescription}
        moreButton={{ href: "/about" }}
      />
      <Section title="What I offer?">
        <InView.Container
          animate="bottom"
          className="flex flex-row gap-8 xl:gap-24 relative justify-around flex-wrap mt-4"
        >
          {services.map((value, index) => (
            <MutedIconLabel
              key={`${value.id}_${index}`}
              label={value.name}
              containerProps={{
                className: "w-full md:max-w-[300px]",
              }}
              mutedIconUri={value.icon_url}
              iconAlt={value.name}
              description={value.description}
            />
          ))}
        </InView.Container>
      </Section>
    </>
  );
};

export default AboutMe;
