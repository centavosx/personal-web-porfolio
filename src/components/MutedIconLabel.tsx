import { HTMLAttributes, ReactNode } from "react";
import Text, { TextProps, TextVariantsElements } from "./Text";
import { extendClassByProp } from "@/utils/extendClassByProp";

const animationClass = {
  spin: "group-hover:animate-spin",
  "wiggle-more": "group-hover:animate-wiggle-more",
};

export type MutedIconLabelProps<K extends keyof TextVariantsElements = "h1"> =
  Omit<TextProps<K>, "children"> & {
    label: string;
    mutedIcon: ReactNode;
    description?: string;
    containerProps?: HTMLAttributes<HTMLElement>;
    hoverAnimation?: keyof typeof animationClass;
  };
const MutedIconLabel = <K extends keyof TextVariantsElements = "h1">({
  as,
  mutedIcon,
  description,
  containerProps,
  label,
  hoverAnimation = "spin",
  ...rest
}: MutedIconLabelProps<K>) => {
  return (
    <div
      {...extendClassByProp(
        containerProps || {},
        "relative flex flex-col gap-4 group"
      )}
    >
      <div className="flex">
        <div
          className={`-z-10 opacity-10 animate-duration-[1.5s] animate-none ${animationClass[hoverAnimation]} animate-infinite`}
        >
          {mutedIcon}
        </div>
        <div className="px-4 absolute self-center">
          <Text<keyof TextVariantsElements>
            {...extendClassByProp(
              rest,
              "font-montserrat font-bold items-center tracking-widest"
            )}
            as={as ?? "h2"}
            size="md"
          >
            {label}
          </Text>
        </div>
      </div>
      {!!description && (
        <div className="px-4">
          <Text className="font-light">{description}</Text>
        </div>
      )}
    </div>
  );
};

export default MutedIconLabel;
