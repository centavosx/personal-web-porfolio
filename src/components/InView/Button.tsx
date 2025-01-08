"use client";

import { extendClassByProp } from "@/utils/extendClassByProp";
import { useInView } from "framer-motion";
import { useRef } from "react";
import useDebounce from "@/hooks/useDebounce";
import { DefaultInViewComponentProps } from "./types";
import InViewAnimation from "./constants";
import BaseButton, { ButtonProps } from "../Button";

export type InViewButtonProps = DefaultInViewComponentProps & ButtonProps;
export const Button = ({
  animate = "left",
  delay = 0,
  inViewClassName,
  ...rest
}: InViewButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const isInView = useInView(ref, { once: true });
  const debouncedIsInView = useDebounce(isInView, delay);

  return (
    <BaseButton
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
