"use client";

import { extendClassByProp } from "@/utils/extendClassByProp";
import { useInView } from "framer-motion";
import { useRef } from "react";
import BaseText, { TextProps, TextVariantsElements } from "../Text";
import useDebounce from "@/hooks/useDebounce";
import { DefaultInViewComponentProps } from "./types";
import InViewAnimation from "./constants";

export type InViewTextProps<K extends keyof TextVariantsElements> =
  DefaultInViewComponentProps & TextProps<K>;
export const Text = <K extends keyof TextVariantsElements>({
  animate = "left",
  delay = 0,
  inViewClassName,
  ...rest
}: InViewTextProps<K>) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const debouncedIsInView = useDebounce(isInView, delay);

  return (
    <BaseText
      ref={ref}
      {...extendClassByProp(
        (rest || {}) as object,
        debouncedIsInView
          ? `translate-x-0 translate-y-0 scale-100 opacity-100 ${inViewClassName}`
          : `${InViewAnimation[animate]} opacity-0`,
        "transition-all",
        "duration-700"
      )}
    />
  );
};
