import Footer from "@/app/_sections/Footer";
import Navigation, { LinkProps } from "@/components/Navigation";
import Section from "@/components/Section";
import Text from "@/components/Text";
import type { ContentData } from "@/content";
import { companies } from "@/content/companies";
import { withContent } from "@/hoc/withContent";
import Image from "next/image";
import { Fragment, ReactNode } from "react";

const Company = withContent<{ params: Promise<{ id: string }> }>(
  async ({ params, renderContent, sectionLinks }) => {
    const id = (await params).id;
    const {
      icon = "",
      title = "",
      description: rawDescription,
      content,
    } = companies.find((value) => value.id === id) || {};

    const description =
      typeof rawDescription === "string" ? [rawDescription] : rawDescription;

    sectionLinks.push({
      text: "Home",
      href: "/",
    });

    return (
      <>
        <Navigation pageUrl={`/company/${id}`} links={sectionLinks} />
        <Section
          containerProps={{
            className: "dark overflow-hidden md",
          }}
          className="overflow-hidden self-center justify-end transition-all h-full pt-56"
          isDark
          isTransparentBg
        >
          <Image
            className="scale-[4.5] absolute md:right-[8rem] top-[35%] opacity-20 -z-10 self-center bottom-10"
            src={icon}
            width={65}
            height={51}
            alt="company-logo"
          />
          <Text as="h1" className="font-raleway font-bold" size="xxl">
            {title}
          </Text>
        </Section>
        <Section className="pt-20 pb-10 px-10" withPadding={false}>
          {description?.map((value, index) => (
            <Text className="font-light" key={`description_${index}`}>
              {value}
            </Text>
          ))}
        </Section>
        {content && renderContent("content", content)}
        <Footer isDark />
      </>
    );
  }
);

export default Company;

export async function generateStaticParams() {
  return companies.map((value) => ({ id: value.id }));
}
