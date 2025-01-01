import ImageStack from "@/components/ImageStack";
import { LinkProps } from "@/components/Navigation";
import Section from "@/components/Section";
import Text from "@/components/Text";
import type {
  AlignValue,
  ContentBreakpoints,
  ContentData,
  ContentType,
  ResponsiveProps,
} from "@/content";
import { extendClassByProp } from "@/utils/extendClassByProp";
import Image from "next/image";
import { ComponentType, Fragment, ReactNode } from "react";

const justifyClasses: Record<AlignValue, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
};

const alignItemsClasses: Record<AlignValue, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
};

const selfAlignClasses: Record<AlignValue, string> = {
  start: "self-start",
  center: "self-center",
  end: "self-end",
};

const flexDirectionClasses: Record<
  "row" | "column" | "column-reversed" | "row-reversed",
  string
> = {
  column: "flex-col",
  "column-reversed": "flex-col-reverse",
  row: "flex-row",
  "row-reversed": "flex-row-reverse",
};

type ResponsiveClassNames = {
  gap: string;
  alignItemsClass?: string;
  justifyClass?: string;
  selfAlignClass?: string;
  flexClassName?: string;
  flexWidthClass?: string;
};

const generateResponsiveClassNames = (
  type: ContentType,
  style: ResponsiveProps,
  currentBreakpoint: string | ContentBreakpoints
): ResponsiveClassNames => {
  const { gap: currentGap, justify, alignItems, selfAlign, direction } = style;

  const alignItemsClass = !!alignItems
    ? alignItemsClasses[alignItems]
    : undefined;
  const justifyClass = !!justify ? justifyClasses[justify] : undefined;
  const selfAlignClass = !!selfAlign ? selfAlignClasses[selfAlign] : undefined;
  const flexClassName = !!direction
    ? flexDirectionClasses[direction]
    : undefined;
  const flexWidthClass =
    direction === "column" || direction === "column-reversed"
      ? "w-full"
      : "w-auto";

  let gap = `gap-${currentGap ?? 8}`;

  switch (type) {
    case "bullet":
    case "numeric":
      gap = `gap-${currentGap ?? 1}`;
      break;
  }

  let data: ResponsiveClassNames = {
    gap,
    alignItemsClass,
    justifyClass,
    selfAlignClass,
    flexClassName,
    flexWidthClass,
  };

  if (typeof currentBreakpoint === "string")
    return Object.keys(data).reduce((accumulator, key) => {
      const currentKey = key as keyof typeof data;
      const currentDataKeyValue = data[currentKey];
      accumulator[currentKey] = !!currentDataKeyValue
        ? `${currentBreakpoint}:${currentDataKeyValue}`
        : undefined!;
      return accumulator;
    }, {} as typeof data);

  for (const key of Object.keys(currentBreakpoint)) {
    const currentBreakpointData =
      currentBreakpoint[key as keyof ContentBreakpoints];

    if (!currentBreakpointData) continue;

    const breakpointClasses = generateResponsiveClassNames(
      type,
      currentBreakpointData,
      key
    );

    data = Object.keys(data).reduce((accumulator, key) => {
      const currentKey = key as keyof typeof data;
      let currentDataKeyValue = data[currentKey];
      const breakpointClassValue = breakpointClasses[currentKey];

      if (!!breakpointClassValue) {
        currentDataKeyValue = `${
          !!currentDataKeyValue ? `${currentDataKeyValue} ` : ""
        }${breakpointClassValue}`;
      }

      accumulator[currentKey] = currentDataKeyValue!;
      return accumulator;
    }, {} as typeof data);
  }

  return data;
};

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
    } = content;

    const {
      alignItemsClass,
      justifyClass,
      selfAlignClass,
      flexClassName,
      gap: gapClass,
      flexWidthClass,
    } = generateResponsiveClassNames(type, content, breakpoints);

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
                  `flex ${gapClass} ${flexClassName} flex-wrap`,
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
            height: 200,
            width: 150,
          },
          sm: {
            height: 256,
            width: 192,
          },
          md: {
            height: 320,
            width: 240,
          },
          lg: {
            height: 384,
            width: 288,
          },
          xl: {
            height: 512,
            width: 384,
          },
          xxl: {
            height: 640,
            width: 480,
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
          key={key}
          {...extendClassByProp(
            {},
            "object-contain rounded-md",
            combinedAlignClasses
          )}
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

    if (!Array.isArray(data))
      throw new Error("image-stack data should be an array");

    return (
      <div
        key={key}
        {...extendClassByProp({}, "flex-1 flex", combinedAlignClasses)}
      >
        <ImageStack
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
