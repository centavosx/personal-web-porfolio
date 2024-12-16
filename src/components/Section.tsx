import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  Ref,
} from "react";
import { extendClassByProp } from "@/utils/extendClassByProp";
import Text from "./Text";
import Button, { ButtonProps } from "./Button";

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
    descriptionContainerProps?: HTMLAttributes<HTMLElement>;
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
            isTransparentBg ? "" : "bg-radial-gradient dark:bg-dark-linear"
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
              <div {...titleContainerProps}>
                <Text
                  className="font-montserrat font-bold tracking-[0.25em] uppercase mb-6"
                  as="h1"
                  size="lg"
                >
                  {title}
                </Text>
              </div>
            )}
            {!!description && (
              <div
                {...extendClassByProp(
                  descriptionContainerProps || {},
                  "flex relative flex-col gap-8"
                )}
              >
                <Text className="font-light">{description}</Text>
                {!hidden && (
                  <Button className="w-20" variant="outlined" {...buttonRest}>
                    More
                  </Button>
                )}
              </div>
            )}
            {children}
          </div>
        </div>
      </section>
    );
  }
);

export default Section;
