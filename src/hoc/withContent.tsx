import { LinkProps } from "@/components/Navigation";
import Section from "@/components/Section";
import Text from "@/components/Text";
import type { ContentData } from "@/content";
import Image from "next/image";
import { ComponentType, Fragment, ReactNode } from "react";

export type WithContentExtendedProps = {
  renderContent: (
    key: string,
    content: ContentData | ContentData[]
  ) => ReactNode;
  sectionLinks: LinkProps[];
};
export const withContent = <P extends {}>(
  WrappedComponent: ComponentType<P & WithContentExtendedProps>
): ComponentType<P> => {
  const sectionLinks: LinkProps[] = [];

  const renderContent: WithContentExtendedProps["renderContent"] = (
    key,
    content
  ): ReactNode => {
    if (!content) return null;

    if (Array.isArray(content)) {
      return content.map((value, index) =>
        renderContent(`${key}_${index}`, value)
      );
    }

    const {
      title,
      data,
      type,
      size = "sm",
      titleTextSize = "lg",
      textClassName = "font-light",
      href,
      id,
    } = content;

    const isDataString = typeof data === "string";

    if (type === "image") {
      if (!isDataString)
        throw new Error("Data should be a string for image type");

      const imgSize = {
        xs: 28,
        sm: 36,
        md: 48,
        lg: 56,
        xl: 72,
        xxl: 108,
      };

      const childRender = (
        <Image
          className="object-contain"
          src={data}
          alt="image"
          height={imgSize[size]}
          width={imgSize[size]}
        />
      );

      if (href)
        return (
          <a key={key} href={href} target="_blank">
            {childRender}
          </a>
        );

      return <Fragment key={key}>{childRender}</Fragment>;
    }

    const item = isDataString ? (
      <Text
        className={textClassName}
        as={type === "list-item" ? "span" : "p"}
        size={size}
      >
        {data}
      </Text>
    ) : (
      renderContent(`${key}_child`, data)
    );

    const renderListTitle = () => {
      if (!title) return null;

      return (
        <Text
          as="label"
          size={titleTextSize}
          className="font-bold font-montserrat tracking-widest"
        >
          {title}
        </Text>
      );
    };

    switch (type) {
      case "section":
        if (id) {
          sectionLinks.push({
            text: title || "",
            href: `#${id}`,
            hidden: true,
          });
        }

        return (
          <Section
            id={id}
            key={key}
            title={title}
            className="p-10"
            withPadding={false}
            titleProps={{
              size: titleTextSize,
            }}
          >
            {item}
          </Section>
        );
      case "bullet":
        return (
          <ul key={key} className="list-disc list-inside">
            {renderListTitle()}
            {item}
          </ul>
        );
      case "numeric":
        return (
          <ol key={key} className="list-decimal list-inside">
            {renderListTitle()}
            {item}
          </ol>
        );
      case "list-item":
        return (
          <Text key={key} as="li" className="font-light my-2">
            {renderListTitle()}
            {item}
          </Text>
        );
      case "list-item-content":
        return (
          <div key={key} className="ml-[1rem] gap-4 flex flex-col my-1">
            {item}
          </div>
        );
      case "row":
        return (
          <div key={key} className="flex flex-col gap-8">
            {renderListTitle()}
            <div className="flex flex-row gap-8 flex-wrap">{item}</div>
          </div>
        );
      case "col":
        return (
          <div key={key} className="flex flex-col gap-8 flex-wrap">
            {renderListTitle()}
            {item}
          </div>
        );
      default:
        return <Fragment key={key}>{item}</Fragment>;
    }
  };

  return (props: P) => {
    return (
      <WrappedComponent
        {...props}
        renderContent={renderContent}
        sectionLinks={sectionLinks}
      />
    );
  };
};
