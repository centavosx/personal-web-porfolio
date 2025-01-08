"use client";

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
  filled:
    "rounded-md bg-primary dark:bg-secondary py-2 px-4 border border-transparent text-center text-sm text-secondary transition-all shadow-md hover:shadow-lg focus:shadow-none active:bg-primary-range-400 dark:active:bg-secondary-400 hover:bg-primary-range-300 dark:hover:bg-secondary-300 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
  outlined:
    "rounded-md border border-primary-range-200 dark:border-secondary-range-200 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-primary dark:text-secondary hover:text-secondary dark:hover:text-primary hover:bg-primary-range-400 dark:hover:bg-secondary-range-400 hover:border-primary-range-400 dark:hover:border-secondary-range-400 active:border-primary dark:active:border-secondary active:text-secondary active:bg-primary dark:active:bg-secondary disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
  icon: "rounded-lg bg-icon py-2 px-4 border border-transparent text-center transition-all shadow-md disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:scale-110 active:scale-100 duration-300",
  transparent:
    "bg-transparent py-2 px-4 text-center text-sm transition-all text-primary dark:text-secondary active:text-secondary font-semibold",
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
