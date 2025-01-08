"use client";

import { extendClassByProp } from "@/utils/extendClassByProp";
import { useInView } from "framer-motion";
import { useRef } from "react";
import useDebounce from "@/hooks/useDebounce";
import { DefaultInViewComponentProps } from "./types";
import InViewAnimation from "./constants";
import NextImage, { ImageProps } from "next/image";

export type InViewImageProps = DefaultInViewComponentProps & ImageProps;
export const Image = ({
  animate = "left",
  delay = 0,
  alt,
  src,
  inViewClassName,
  ...rest
}: InViewImageProps) => {
  const ref = useRef<HTMLImageElement>(null);
  const isInView = useInView(ref, { once: true });
  const debouncedIsInView = useDebounce(isInView, delay);

  return (
    <NextImage
      ref={ref}
      alt={alt}
      src={src}
      {...extendClassByProp(
        rest || {},
        debouncedIsInView
          ? `translate-x-0 translate-y-0 scale-100 ${inViewClassName}`
          : `${InViewAnimation[animate]} opacity-0`,
        "transition-all",
        "duration-700"
      )}
    />
  );
};
