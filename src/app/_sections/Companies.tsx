"use client";

import Section from "@/components/Section";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const MOCK_COMPANY_DATA = [
  {
    title: "Trend Micro",
    description:
      "Trend Micro, a global cybersecurity leader, helps make the world safe for exchanging digital information. Fueled by decades of security expertise, global threat research, and continuous innovation, our cybersecurity platform protects 500,000+ organizations and 250+ million individuals across clouds, networks, devices, and endpoints.",
    iconSrc: "/svg/company/trend-micro.svg",
  },
  {
    title: "ISBX",
    description:
      "ISBX work with clients to strategize and build world-class applications for web and mobile. Their design and development teams function in unison to deliver world class results that customers love.",
    iconSrc: "/svg/company/isbx.svg",
  },
];

const Companies = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentData = MOCK_COMPANY_DATA[currentIndex];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const intervalId = setInterval(() => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);

      sectionRef.current?.classList.add("animate-pulse-full");

      timeoutId = setTimeout(() => {
        setCurrentIndex((currentIndex) =>
          currentIndex < MOCK_COMPANY_DATA.length - 1 ? currentIndex + 1 : 0
        );
        timeoutId = setTimeout(() => {
          sectionRef.current?.classList.remove("animate-pulse-full");
        }, 600);
      }, 400);
    }, 8000);
    return () => {
      clearInterval(intervalId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Section
      ref={sectionRef}
      withPadding={false}
      isDark
      className={`px-10 relative overflow-hidden animate-once animate-ease-in-out`}
      title={currentData.title}
      titleContainerProps={{
        className: "pt-10",
      }}
      description={currentData.description}
      descriptionContainerProps={{
        className: "pb-10 md:pr-[24rem]",
      }}
    >
      <Image
        className="scale-[4.5] absolute md:right-[8rem] top-[35%] opacity-20 -z-10 self-center"
        src={currentData.iconSrc}
        width={65}
        height={51}
        alt="company-logo"
      />
    </Section>
  );
};

export default Companies;
