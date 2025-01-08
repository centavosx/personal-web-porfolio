import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  Ref,
} from "react";
import { extendClassByProp } from "@/utils/extendClassByProp";
import Text, { TextProps } from "./Text";
import Button, { ButtonProps } from "./Button";
import InView from "@/components/InView";

export type SectionProps = PropsWithChildren<
  HTMLAttributes<HTMLElement> & {
    containerProps?: HTMLAttributes<HTMLElement>;
    background?: ReactNode;
    title?: string;
    description?: string;
    isTransparentBg?: boolean;
    withPadding?: boolean;
    withBgOverlay?: boolean;
    isDark?: boolean;
    titleContainerProps?: HTMLAttributes<HTMLElement>;
    titleProps?: TextProps<"h1">;
    descriptionContainerProps?: HTMLAttributes<HTMLElement>;
    descriptionProps?: TextProps<"p">;
    moreButton?: {
      hidden?: boolean;
    } & Omit<ButtonProps, "className">;
  }
>;
const Section = forwardRef(
  (
    {
      children,
      containerProps,
      background,
      title,
      description,
      isTransparentBg,
      withPadding = true,
      withBgOverlay,
      isDark,
      titleContainerProps,
      descriptionContainerProps,
      titleProps,
      descriptionProps,
      moreButton,
      id,
      ...rest
    }: SectionProps,
    ref?: Ref<HTMLDivElement>
  ) => {
    const { hidden = false, ...buttonRest } = moreButton || {};

    return (
      <section
        id={id}
        className={`h-full w-full ${
          isDark ? "dark" : "bg-background"
        } relative`}
      >
        <div
          {...extendClassByProp(
            containerProps || {},
            "flex justify-center relative h-full w-full",
            isTransparentBg ? "" : "bg-radial-gradient dark:transparent"
          )}
        >
          {background}
          {!!withBgOverlay && (
            <div className="h-full w-full absolute bg-overlay" />
          )}
          <div
            ref={ref}
            {...extendClassByProp(
              rest,
              "2xl:container flex-1 relative flex flex-col gap-4 z-10",
              withPadding ? "px-10 py-20" : ""
            )}
          >
            {!!title && (
              <InView.Container {...titleContainerProps}>
                <Text
                  className="font-montserrat font-bold tracking-[0.25em] uppercase mb-6"
                  as="h1"
                  size="lg"
                  {...titleProps}
                >
                  {title}
                </Text>
              </InView.Container>
            )}
            {!!description && (
              <InView.Container
                animate="bottom"
                {...extendClassByProp(
                  descriptionContainerProps || {},
                  "flex relative flex-col gap-8"
                )}
              >
                <Text className="font-light" {...descriptionProps}>
                  {description}
                </Text>
                {!hidden && (
                  <Button
                    className="w-20"
                    variant="outlined"
                    aria-label="Read More"
                    {...buttonRest}
                  >
                    More
                  </Button>
                )}
              </InView.Container>
            )}
            {children}
          </div>
        </div>
      </section>
    );
  }
);

export default Section;
