import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import Footer from "../_sections/Footer";
import Supabase from "@/utils/supabase";
import InView from "@/components/InView";

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
          className: "dark pt-56 md",
        }}
        className="self-center justify-end transition-all"
        isDark
        isTransparentBg
      >
        <InView.Text as="h1" className="font-raleway font-bold" size="xxl">
          About me
        </InView.Text>
      </Section>
      <Section
        description={data.overview}
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
          <InView.Text
            key={`earlyLife_${index}`}
            className="font-light"
            delay={index * 200}
          >
            {value}
          </InView.Text>
        ))}
      </Section>
      <Section
        id="goals"
        title="Goals"
        className="pt-10 pb-20 px-10"
        withPadding={false}
      >
        {data.goals.split("\n\n").map((value, index) => (
          <InView.Text
            animate="bottom"
            key={`missionAndVision_${index}`}
            className="font-light"
          >
            {value}
          </InView.Text>
        ))}
      </Section>
      <Footer isDark />
    </>
  );
};

export default About;
