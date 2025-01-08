"use client";

import Section from "@/components/Section";
import { Link } from "@/types/supabase";
import CodewarsIcon from "../../../public/svg/codewars.svg";
import EmailIcon from "../../../public/svg/email.svg";
import GithubIcon from "../../../public/svg/github.svg";
import LinkedInIcon from "../../../public/svg/linkedin.svg";
import InView from "@/components/InView";

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
      <InView.Text
        as="h1"
        className="font-raleway font-bold"
        size="xl"
        animate="top"
      >
        Hi! I am,
      </InView.Text>
      <InView.Text
        as="h1"
        className="font-raleway font-bold"
        size="xxl"
        delay={500}
      >
        Vincent Lennuel Llanto
      </InView.Text>
      <InView.Text
        as="h1"
        className="font-raleway font-bold"
        size="lg"
        color="tertiary"
        delay={800}
        animate="bottom"
      >
        Software Developer
      </InView.Text>
      <div className="flex gap-4 flex-wrap">
        {links
          .filter((value) => !!icons[value.type as keyof typeof icons])
          .map((value, index) => {
            const type = value.type;
            const icon = icons[type as keyof typeof icons];

            const delay = index > 0 ? 800 : 1000;

            return (
              <InView.Button
                key={`${value.id}_${index}`}
                variant="icon"
                href={value.link}
                className="py-1 px-1"
                aria-label={`Check my ${value.type}`}
                target="__blank"
                delay={(index + 1) * delay}
                animate="scaleUp"
              >
                {icon}
              </InView.Button>
            );
          })}
      </div>
    </Section>
  );
};

export default Hero;
