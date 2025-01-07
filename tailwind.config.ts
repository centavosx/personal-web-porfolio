import type { Config } from "tailwindcss";
import TailwindCssAnimated from "tailwindcss-animated";

const GAP_SIZES = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 44,
  48, 52, 56, 60, 64, 72, 80, 96,
];

const ALIGNMENT = ["start", "center", "end"];

const BREAKPOINT_SIZES = ["xsm", "sm", "md", "lg", "xl", "xxl"];

const FLEX = ["flex-col", "flex-col-reverse", "flex-row", "flex-row-reverse"];

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  safelist: [
    "list-disc",
    "list-decimal",
    "list-inside",
    "max-sm",
    { pattern: /(ml|mr|mt|mb)-\d+/ },
    {
      pattern: /translate-(x|y)-\d+/,
      variants: ["hover"],
    },
    {
      pattern: /gap-\d+/,
    },
    {
      pattern: /flex-(col|row|col-reverse|row-reverse)+/,
    },
    ...Array.from(
      { length: 6 },
      (_, i) =>
        `translate-x-[${i * 10}px]
         -translate-x-[${i * 10}px]
         translate-y-[${i * 10}px] 
         -translate-y-[${i * 10}px]
        
         hover:translate-x-[${i * 25}px]
         hover:-translate-x-[${i * 25}px]
         hover:translate-y-[${i * 25}px] 
         hover:-translate-y-[${i * 25}px]
         
         z-[${i}]
         -z-[${i}]

         ml-[${i}rem]
         -ml-[${i}rem]
         `
    ),
    ...BREAKPOINT_SIZES.flatMap((breakpoint) => [
      ...GAP_SIZES.map((value) => `${breakpoint}:gap-${value}`),
      ...FLEX.map((value) => `${breakpoint}:${value}`),
      ...["justify", "items", "self"].flatMap((value) =>
        ALIGNMENT.map((alignment) => `${breakpoint}:${value}-${alignment}`)
      ),
      `${breakpoint}:w-full`,
      `${breakpoint}:w-auto`,
    ]),
  ],
  theme: {
    extend: {
      screens: {
        xsm: "480px",
      },
      colors: {
        primary: "#1A1A1A",
        "primary-range": {
          100: "#858585",
          200: "#6e6e6e",
          300: "#585858",
          400: "#404040",
          500: "#1A1A1A",
          600: "#161616",
          700: "#121212",
          800: "#0d0d0d",
          900: "#080808",
        },
        secondary: "#FFFFFF",
        "secondary-range": {
          100: "#F2F2F2",
          200: "#E5E5E5",
          300: "#D9D9D9",
          400: "#CCCCCC",
          500: "#FFFFFF",
          600: "#E0E0E0",
          700: "#B3B3B3",
          800: "#999999",
          900: "#666666",
        },
        tertiary: "#909090",
        "tertiary-range": {
          100: "#B8B8B8",
          200: "#A1A1A1",
          300: "#8A8A8A",
          400: "#737373",
          500: "#909090",
          600: "#787878",
          700: "#616161",
          800: "#4A4A4A",
          900: "#333333",
        },
        icon: "#C4C4C4",
        overlay: "rgba(0, 0, 0, 0.5)",
        background: "#d1cec7",
      },
      backgroundImage: {
        "radial-gradient":
          "radial-gradient(50% 50% at 50% 50%, rgba(26, 21, 21, 0) 0%, rgba(1, 1, 1, 0.16) 100%)",
        "dark-linear":
          "linear-gradient(90.18deg, #1D1D1D 31.74%, #1D1D1D 90.49%, #1D1D1D 90.49%)",
      },
      fontFamily: {
        montserrat: "var(--montserrat)",
        raleway: "var(--raleway)",
        "open-sans": "var(--open-sans)",
      },
    },
  },
  plugins: [TailwindCssAnimated],
} satisfies Config;
