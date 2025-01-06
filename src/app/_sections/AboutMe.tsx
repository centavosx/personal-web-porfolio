import Section from "@/components/Section";
import MutedIconLabel from "@/components/MutedIconLabel";
import Supabase from "@/utils/supabase";

const AboutMe = async () => {
  const services = await Supabase.getServices();

  return (
    <>
      <Section
        id="about"
        title="About Me"
        description="As a software developer, I don't just build applications. I focus on identifying software and real world problems, creating effective solutions, and delivering results that have a lasting impact. I am committed to continuous learning, exploring new challenges, and constantly seeking innovative ways to improve both code and user experience."
        moreButton={{ href: "/about" }}
      />
      <Section title="What I offer?">
        <div className="flex flex-row gap-8 xl:gap-24 relative justify-around flex-wrap">
          {services.map((value, index) => (
            <MutedIconLabel
              key={`${value.name}_${index}`}
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
        </div>
      </Section>
    </>
  );
};

export default AboutMe;
