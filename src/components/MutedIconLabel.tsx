import { HTMLAttributes, ReactNode } from "react";
import Text, { TextProps, TextVariantsElements } from "./Text";
import { extendClassByProp } from "@/utils/extendClassByProp";
import Image from "next/image";

const animationClass = {
  spin: "group-hover:animate-spin",
  "wiggle-more": "group-hover:animate-wiggle-more",
};

export type MutedIconLabelProps<K extends keyof TextVariantsElements = "h1"> =
  Omit<TextProps<K>, "children"> & {
    label: string;
    mutedIconUri: string;
    description?: string;
    containerProps?: HTMLAttributes<HTMLElement>;
    hoverAnimation?: keyof typeof animationClass;
    iconAlt?: string;
  };
const MutedIconLabel = <K extends keyof TextVariantsElements = "h1">({
  as,
  mutedIconUri,
  description,
  containerProps,
  label,
  hoverAnimation = "spin",
  iconAlt,
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
          <Image
            src={mutedIconUri}
            height={50}
            width={50}
            alt={`${iconAlt ? `${iconAlt} ` : ""}image`}
          />
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
