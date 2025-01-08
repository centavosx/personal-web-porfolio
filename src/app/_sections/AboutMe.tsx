import Section from "@/components/Section";
import MutedIconLabel from "@/components/MutedIconLabel";
import Supabase from "@/utils/supabase";
import { InViewContainer } from "@/components/InViewContainer";

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
        <InViewContainer
          animate="bottom"
          className="flex flex-row gap-8 xl:gap-24 relative justify-around flex-wrap"
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
              hoverAnimation={value.animation || undefined}
            />
          ))}
        </InViewContainer>
      </Section>
    </>
  );
};

export default AboutMe;
