"use client";

import { HTMLAttributes, useRef } from "react";
import { useInView } from "framer-motion";
import { extendClassByProp } from "@/utils/extendClassByProp";

const animationClass = {
  left: "translate-x-[-100px]",
  right: "translate-x-[100px]",
  top: "translate-y-[-100px]",
  bottom: "translate-y-[100px]",
  scale: "scale-0",
};

export type InViewContainerProps = {
  animate?: keyof typeof animationClass;
} & HTMLAttributes<HTMLDivElement>;
export const InViewContainer = ({
  animate = "left",
  ...rest
}: InViewContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      {...extendClassByProp(
        (rest || {}) as any,
        isInView
          ? "translate-x-0 translate-y-0 scale-100"
          : animationClass[animate],
        isInView ? "opacity-100" : "opacity-0",
        "transition-all",
        "duration-700"
      )}
    />
  );
};
