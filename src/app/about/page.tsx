import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import Text from "@/components/Text";
import Footer from "../_sections/Footer";
import Supabase from "@/utils/supabase";
import { Content } from "@/types/supabase";

const links = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Early Life",
    href: "#early-life",
    hidden: true,
  },
  {
    text: "Goals",
    href: "#goals",
    hidden: true,
  },
];

const About = async () => {
  const data = await Supabase.getAbout();

  return (
    <>
      <Navigation pageUrl="/about" links={links} />
      <Section
        containerProps={{
          className: "dark overflow-hidden pt-56 md",
        }}
        className="overflow-hidden self-center justify-end transition-all"
        isDark
        isTransparentBg
      >
        <Text as="h1" className="font-raleway font-bold" size="xxl">
          About me
        </Text>
      </Section>
      <Section
        description={data.short_description}
        moreButton={{
          hidden: true,
        }}
        className="pt-20 pb-10 px-10"
        withPadding={false}
      />
      <Section
        id="early-life"
        title="Early Life"
        className="p-10"
        withPadding={false}
      >
        {data.early_life.split("\n\n").map((value, index) => (
          <Text key={`earlyLife_${index}`} className="font-light">
            {value}
          </Text>
        ))}
      </Section>
      <Section
        id="goals"
        title="Goals"
        className="pt-10 pb-20 px-10"
        withPadding={false}
      >
        {data.goals.split("\n\n").map((value, index) => (
          <Text key={`missionAndVision_${index}`} className="font-light">
            {value}
          </Text>
        ))}
      </Section>
      <Footer isDark />
    </>
  );
};

export default About;
