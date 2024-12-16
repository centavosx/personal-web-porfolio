"use client";

import Button from "@/components/Button";
import Section from "@/components/Section";
import Text from "@/components/Text";
import LinkedInIcon from "../../../public/svg/linkedin.svg";
import GithubIcon from "../../../public/svg/github.svg";
import EmailIcon from "../../../public/svg/email.svg";

const Hero = () => {
  return (
    <Section
      containerProps={{
        className: "dark overflow-hidden max-h-[1080px] min-h-[600px] h-screen",
      }}
      className="p-10 md:p-36 overflow-hidden self-center justify-center transition-all"
      isDark
      isTransparentBg
    >
      <Text as="h1" className="font-raleway font-bold" size="xl">
        Hi! I am,
      </Text>
      <Text as="h1" className="font-raleway font-bold" size="xxl">
        Vincent Lennuel Llanto
      </Text>
      <Text
        as="h1"
        className="ffont-raleway font-bold"
        size="lg"
        color="tertiary"
      >
        Software Developer
      </Text>
      <div className="flex gap-4">
        <Button variant="icon" href="/daw" className="py-1 px-1">
          <EmailIcon height={37} width={37} />
        </Button>
        <Button variant="icon" href="/daw" className="py-1 px-1">
          <GithubIcon height={37} width={37} />
        </Button>
        <Button variant="icon" href="/daw" className="py-1 px-1">
          <LinkedInIcon height={37} width={37} />
        </Button>
      </div>
    </Section>
  );
};

export default Hero;
