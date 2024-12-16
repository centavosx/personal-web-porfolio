import Footer from "@/app/_sections/Footer";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";
import Text from "@/components/Text";
import { companies, ContentData } from "@/content/companies";
import Image from "next/image";
import { ReactNode } from "react";

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
    text: "Mission and Vision",
    href: "#mission-and-vision",
    hidden: true,
  },
];

const Company = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const {
    icon = "",
    title = "",
    description: rawDescription,
    content,
  } = companies.find((value) => value.id === id) || {};

  const description =
    typeof rawDescription === "string" ? [rawDescription] : rawDescription;

  const renderCompanyContent = (
    key: string,
    content: ContentData | ContentData[]
  ): ReactNode => {
    if (!content) return null;

    if (Array.isArray(content)) {
      return content.map((value, index) =>
        renderCompanyContent(`content_${index}`, value)
      );
    }

    const { title, data, type } = content;

    const item =
      typeof data === "string" ? (
        <Text className="font-light" key={key}>
          {data}
        </Text>
      ) : (
        renderCompanyContent("content", data)
      );

    if (type === "section") {
      return (
        <Section key={key} title={title} className="p-10" withPadding={false}>
          {item}
        </Section>
      );
    }

    if (type === "description") {
      return item;
    }

    return (
      <div key={key} className="flex flex-col gap-8">
        {item}
      </div>
    );
  };

  return (
    <>
      <Navigation pageUrl={`/companies/${id}`} links={links} />
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

      {content && renderCompanyContent("content", content)}
      <Footer isDark />
    </>
  );
};

export default Company;

export async function generateStaticParams() {
  return companies.map((value) => ({ id: value.id }));
}
