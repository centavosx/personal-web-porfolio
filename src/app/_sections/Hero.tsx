"use client";

import Button from "@/components/Button";
import Section from "@/components/Section";
import Text from "@/components/Text";
import { Link } from "@/types/supabase";
import CodewarsIcon from "../../../public/svg/codewars.svg";
import EmailIcon from "../../../public/svg/email.svg";
import GithubIcon from "../../../public/svg/github.svg";
import LinkedInIcon from "../../../public/svg/linkedin.svg";

const icons = {
  email: <EmailIcon height={37} width={37} />,
  github: <GithubIcon height={37} width={37} />,
  linkedin: <LinkedInIcon height={37} width={37} />,
  codewars: <CodewarsIcon height={37} width={37} />,
};

export type HeroProps = {
  links: Link[];
};
const Hero = ({ links }: HeroProps) => {
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
        className="font-raleway font-bold"
        size="lg"
        color="tertiary"
      >
        Software Developer
      </Text>
      <div className="flex gap-4">
        {links.map((value, index) => {
          const type = value.type;
          const icon = icons[type as keyof typeof icons];

          if (!icon) return null;

          return (
            <Button
              key={`${value.id}_${index}`}
              variant="icon"
              href={value.link}
              className="py-1 px-1"
              aria-label={`Check my ${value.type}`}
              target="__blank"
            >
              {icon}
            </Button>
          );
        })}
      </div>
    </Section>
  );
};

export default Hero;
