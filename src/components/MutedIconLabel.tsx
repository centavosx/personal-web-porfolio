"use client";

import { HTMLAttributes } from "react";
import Text, { TextProps, TextVariantsElements } from "./Text";
import { extendClassByProp } from "@/utils/extendClassByProp";
import Image from "next/image";

export type MutedIconLabelProps<K extends keyof TextVariantsElements = "h1"> =
  Omit<TextProps<K>, "children"> & {
    label: string;
    mutedIconUri: string;
    description?: string;
    containerProps?: HTMLAttributes<HTMLElement>;
    iconAlt?: string;
    darkSrc?: string;
  };
const MutedIconLabel = <K extends keyof TextVariantsElements = "h1">({
  as,
  mutedIconUri,
  description,
  containerProps,
  label,
  iconAlt,
  darkSrc,
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
          className={`-z-10 opacity-10 animate-duration-[1.5s] animate-bounce`}
        >
          <picture>
            {!!darkSrc && (
              <source srcSet={darkSrc} media="(prefers-color-scheme: dark)" />
            )}
            <Image
              src={mutedIconUri}
              height={50}
              width={50}
              alt={`${iconAlt ? `${iconAlt} ` : ""}image`}
            />
          </picture>
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
