"use client";

import useDebounce from "@/hooks/useDebounce";
import { extendClassByProp } from "@/utils/extendClassByProp";
import { useInView } from "framer-motion";
import { HTMLAttributes, useRef } from "react";
import { DefaultInViewComponentProps } from "./types";
import InViewAnimation from "./constants";

export type InViewContainerProps = DefaultInViewComponentProps &
  HTMLAttributes<HTMLDivElement>;
export const Container = ({
  animate = "left",
  delay = 0,
  inViewClassName,
  ...rest
}: InViewContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const debouncedIsInView = useDebounce(isInView, delay);

  return (
    <div
      ref={ref}
      {...extendClassByProp(
        rest || {},
        debouncedIsInView
          ? `translate-x-0 translate-y-0 scale-100 opacity-100 ${inViewClassName}`
          : `${InViewAnimation[animate]} opacity-0`,
        "transition-all",
        "duration-700"
      )}
    />
  );
};
