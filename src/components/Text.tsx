"use client";

import { extendClassByProp } from "@/utils/extendClassByProp";
import {
  createElement,
  HTMLAttributes,
  PropsWithChildren,
  Ref,
  forwardRef,
  memo,
  AnchorHTMLAttributes,
  LiHTMLAttributes,
  LabelHTMLAttributes,
} from "react";

const textColorClass = {
  primary: "text-primary dark:text-secondary",
  secondary: "text-secondary dark:text-primary",
  tertiary: "text-tertiary",
} as const;

const textSizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md md:text-xl",
  lg: "text-xl md:text-3xl",
  xl: "text-2xl md:text-4xl",
  xxl: "text-5xl md:text-7xl",
};

export type TextSize = keyof typeof textSizes;

export type TextVariantsElements = Record<
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  HTMLHeadingElement
> & {
  p: HTMLParagraphElement;
  span: HTMLSpanElement;
  caption: HTMLElement;
  a: HTMLAnchorElement;
  li: HTMLLIElement;
  label: HTMLLabelElement;
};

export type TextElementProps<
  El extends TextVariantsElements[keyof TextVariantsElements]
> = El extends HTMLAnchorElement
  ? AnchorHTMLAttributes<El>
  : El extends HTMLLIElement
  ? LiHTMLAttributes<El>
  : El extends HTMLLabelElement
  ? LabelHTMLAttributes<El>
  : HTMLAttributes<El>;

export type TextProps<K extends keyof TextVariantsElements> = PropsWithChildren<
  {
    as?: K;
    color?: keyof typeof textColorClass;
    size?: TextSize;
  } & TextElementProps<TextVariantsElements[K]>
>;
const Text = <K extends keyof TextVariantsElements = "p">(
  { as, children, color = "primary", size = "sm", ...rest }: TextProps<K>,
  ref: Ref<TextVariantsElements[K]>
) => {
  return createElement(
    as ?? "p",
    { ...extendClassByProp(rest, textColorClass[color], textSizes[size]), ref },
    children
  );
};

export default memo(forwardRef(Text)) as unknown as <
  K extends keyof TextVariantsElements = "p"
>(
  props: TextProps<K> & {
    ref?: Ref<TextVariantsElements[K]>;
  }
) => ReturnType<typeof Text>;
