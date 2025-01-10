"use client";

import { combineClassName } from "@/utils/combineClassName";
import { extendClassByProp } from "@/utils/extendClassByProp";
import {
  Ref,
  forwardRef,
  memo,
  PropsWithChildren,
  ButtonHTMLAttributes,
  createElement,
} from "react";

const buttonVariantClasses = {
  filled: combineClassName(
    "rounded-md",
    "bg-primary",
    "dark:bg-secondary",
    "dark:text-primary",
    "border",
    "border-transparent",
    "text-secondary",
    "transition-all",
    "shadow-md",
    "hover:shadow-lg",
    "focus:shadow-none",
    "active:bg-primary-range-400",
    "dark:active:bg-secondary-400",
    "hover:bg-primary-range-300",
    "dark:hover:bg-secondary-300",
    "active:shadow-none",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "disabled:shadow-none"
  ),
  outlined: combineClassName(
    "rounded-md",
    "border",
    "border-primary-range-200",
    "dark:border-secondary-range-200",
    "shadow-sm",
    "hover:shadow-lg",
    "text-primary",
    "dark:text-secondary",
    "hover:text-secondary",
    "dark:hover:text-primary",
    "hover:bg-primary",
    "dark:hover:bg-secondary",
    "hover:border-primary",
    "dark:hover:border-secondary",
    "active:border-primary-range-400",
    "dark:active:border-secondary-range-400",
    "active:text-secondary",
    "active:bg-primary-range-400",
    "dark:active:bg-secondary-range-400",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "disabled:shadow-none"
  ),
  icon: combineClassName(
    "rounded-lg",
    "bg-icon",
    "border",
    "border-transparent",
    "shadow-md",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "disabled:shadow-none",
    "hover:scale-110",
    "active:scale-100",
    "duration-300"
  ),
  transparent: combineClassName(
    "bg-transparent",
    "text-primary",
    "dark:text-secondary",
    "active:text-secondary",
    "font-semibold"
  ),
};

export type ButtonProps = PropsWithChildren<
  {
    variant?: keyof typeof buttonVariantClasses;
    href?: string;
    target?: string;
  } & ButtonHTMLAttributes<HTMLButtonElement>
>;
const Button = forwardRef(
  (
    { variant = "filled", children, href, ...rest }: ButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    return createElement(
      !!href ? "a" : "button",
      {
        ...extendClassByProp(
          rest,
          buttonVariantClasses[variant],
          "font-montserrat",
          "uppercase",
          "transition-all",
          "py-2",
          "px-4",
          "text-center",
          "text-sm",
          "duration-300",
          href ? "inline-block" : ""
        ),
        ref,
        href,
      },
      children
    );
  }
);

export default memo(Button);
