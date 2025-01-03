import { ImageSizes } from "@/constants/sizes";
import ImageStack from "@/components/ImageStack";
import { LinkProps } from "@/components/Navigation";
import Section from "@/components/Section";
import Text from "@/components/Text";
import type { ContentData } from "@/types/content";
import DynamicContent from "@/utils/dynamic-content";
import { extendClassByProp } from "@/utils/extendClassByProp";
import { getImageUrlFromExternal } from "@/utils/getImageFromExternal";
import Image from "next/image";
import { ComponentType, Fragment, ReactNode } from "react";
import { ImageConst } from "@/constants/image";

export type WithContentExtendedProps = {
  renderContent: (
    key: string,
    content: ContentData | ContentData[]
  ) => ReactNode;
  sectionLinks: LinkProps[];
};
export const withContent = <P extends Record<string, unknown>>(
  WrappedComponent: ComponentType<P & WithContentExtendedProps>
): ComponentType<P> => {
  const sectionLinks: LinkProps[] = [
    {
      text: "Home",
      href: "/",
    },
  ];

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
      orientation,
      breakpoints = {},
      isExternal,
    } = content;

    const {
      alignItemsClass,
      justifyClass,
      selfAlignClass,
      flexClass,
      gapClass,
      flexWidthClass,
    } = DynamicContent.generateResponsiveClassNames(type, content, breakpoints);

    const combinedAlignClasses = extendClassByProp(
      {},
      justifyClass || "",
      alignItemsClass || "",
      selfAlignClass || ""
    ).className;

    const isDataString = typeof data === "string";

    if (!["image-stack", "image"].includes(type)) {
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
              {...extendClassByProp(
                {},
                "list-inside flex flex-col",
                "list-disc",
                gapClass,
                combinedAlignClasses
              )}
            >
              {renderListTitle()}
              {item}
            </ul>
          );
        case "numeric":
          return (
            <ol
              key={key}
              {...extendClassByProp(
                {},
                "list-inside flex flex-col",
                "list-decimal",
                gapClass,
                combinedAlignClasses
              )}
            >
              {renderListTitle()}
              {item}
            </ol>
          );
        case "list-item":
          return (
            <Text key={key} as="li" className="font-light my-2">
              {renderListTitle()}
              <span className={title ? "mt-4" : undefined}>{item}</span>
            </Text>
          );
        case "list-item-content":
          return (
            <div
              key={key}
              {...extendClassByProp(
                {},
                "ml-5 gap-8 flex flex-col my-1 mt-4",
                combinedAlignClasses
              )}
            >
              {item}
            </div>
          );
        case "flex":
          return (
            <div
              key={key}
              {...extendClassByProp(
                {},
                "flex flex-col flex-1",
                selfAlignClass || "",
                flexWidthClass || ""
              )}
            >
              {renderListTitle()}
              <div
                {...extendClassByProp(
                  {},
                  `flex flex-wrap`,
                  gapClass,
                  flexClass || "",
                  justifyClass || "",
                  alignItemsClass || ""
                )}
              >
                {item}
              </div>
            </div>
          );

        default:
          return <Fragment key={key}>{item}</Fragment>;
      }
    }

    const { height, width } = ImageSizes[orientation || "icon"][size];

    if (type === "image") {
      if (!isDataString)
        throw new Error("Data should be a string for image type");
      let imageSrc = data;

      if (isExternal) {
        imageSrc = getImageUrlFromExternal(imageSrc);
      }

      const childRender = (
        <Image
          key={key}
          {...extendClassByProp(
            {},
            "object-contain rounded-md",
            combinedAlignClasses
          )}
          src={imageSrc}
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

    if (!Array.isArray(data))
      throw new Error("image-stack data should be an array");

    return (
      <div
        key={key}
        {...extendClassByProp({}, "flex-1 flex", combinedAlignClasses)}
        style={{ height: height + ImageConst.maxStackSize, width }}
      >
        <ImageStack
          srcs={data.map((item) => {
            if (item.type !== "image")
              throw new Error("image-stack items should be an image type");
            const itemData = item.data;
            if (typeof itemData !== "string") {
              throw new Error("image-stack item data should be a string path!");
            }

            const isCurrentItemExternal = item.isExternal ?? isExternal;
            let imageSrc = itemData;

            if (isCurrentItemExternal) {
              imageSrc = getImageUrlFromExternal(imageSrc);
            }

            return imageSrc;
          })}
          height={height}
          width={width}
        />
      </div>
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
