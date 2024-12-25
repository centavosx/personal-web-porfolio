import ImageStack from "@/components/ImageStack";
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
      gap,
      orientation,
    } = content;

    const isDataString = typeof data === "string";

    if (type !== "image" && type !== "image-stack") {
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
            className="font-bold font-montserrat tracking-widest mb-4"
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
            <ul
              key={key}
              className={`list-disc list-inside flex flex-col gap-${gap ?? 1}`}
            >
              {renderListTitle()}
              {item}
            </ul>
          );
        case "numeric":
          return (
            <ol
              key={key}
              className={`list-decimal list-inside flex flex-col gap-${
                gap ?? 1
              }`}
            >
              {renderListTitle()}
              {item}
            </ol>
          );
        case "list-item":
          return (
            <Text key={key} as="li" className="font-light my-2">
              {renderListTitle()}
              <div className={title ? "mt-4" : undefined}>{item}</div>
            </Text>
          );
        case "list-item-content":
          return (
            <div key={key} className="ml-[1rem] gap-8 flex flex-col my-1">
              {item}
            </div>
          );
        case "row":
          return (
            <div key={key} className="flex flex-col flex-1">
              {renderListTitle()}
              <div
                className={`flex flex-row gap-${
                  gap ?? 8
                } flex-wrap items-center`}
              >
                {item}
              </div>
            </div>
          );
        case "col":
          return (
            <div key={key} className="flex flex-col flex-1">
              {renderListTitle()}
              <div
                key={key}
                className={`flex flex-col gap-${gap ?? 8} flex-wrap flex-1`}
              >
                {item}
              </div>
            </div>
          );
        default:
          return <Fragment key={key}>{item}</Fragment>;
      }
    }

    let height;
    let width;

    switch (orientation) {
      case "landscape":
        const landscapeSizes = {
          xs: {
            height: 210,
            width: 375,
          },
          sm: {
            height: 324,
            width: 576,
          },
          md: {
            height: 432,
            width: 768,
          },
          lg: {
            height: 558,
            width: 992,
          },
          xl: {
            height: 675,
            width: 1200,
          },
          xxl: {
            height: 787,
            width: 1400,
          },
        };
        const currentLandscapeSize = landscapeSizes[size];
        width = currentLandscapeSize.width;
        height = currentLandscapeSize.height;
        break;

      case "portrait":
        const portraitSizes = {
          xs: {
            height: 400,
            width: 300,
          },
          sm: {
            height: 512,
            width: 384,
          },
          md: {
            height: 640,
            width: 480,
          },
          lg: {
            height: 768,
            width: 576,
          },
          xl: {
            height: 1024,
            width: 768,
          },
          xxl: {
            height: 1280,
            width: 960,
          },
        };
        const currentPortraitSize = portraitSizes[size];
        width = currentPortraitSize.width;
        height = currentPortraitSize.height;
        break;

      default:
        const defaultImgSize = {
          xs: 28,
          sm: 36,
          md: 48,
          lg: 56,
          xl: 72,
          xxl: 108,
        };
        const defaultSize = defaultImgSize[size];
        height = defaultSize;
        width = defaultSize;
    }

    if (type === "image") {
      if (!isDataString)
        throw new Error("Data should be a string for image type");

      const childRender = (
        <Image
          className="object-contain"
          src={data}
          alt="image"
          height={height}
          width={width}
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
    console.log(type, data);

    if (!Array.isArray(data))
      throw new Error("image-stack data should be an array");

    return (
      <ImageStack
        key={key}
        srcs={data.map((item) => {
          if (item.type !== "image")
            throw new Error("image-stack items should be an image type");
          const itemData = item.data;
          if (typeof itemData !== "string") {
            throw new Error("image-stack item data should be a string path!");
          }
          return itemData;
        })}
        height={height}
        width={width}
      />
    );
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
