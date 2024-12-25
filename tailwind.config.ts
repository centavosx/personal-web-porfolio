import type { Config } from "tailwindcss";

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
    {
      pattern: /m(x|y|b|t|l|r)-\d+/,
      variants: ["hover"],
    },
    {
      pattern: /translate-(x|y)-\d+/,
      variants: ["hover"],
    },
    {
      pattern: /gap-\d+/,
    },
    ...Array.from(
      { length: 100 },
      (_, i) =>
        `translate-x-[${i * 20}px]
         -translate-x-[${i * 20}px]
         translate-y-[${i * 20}px] 
         -translate-y-[${i * 20}px]
        
         hover:translate-x-[${i * 40}px]
         hover:-translate-x-[${i * 40}px]
         hover:translate-y-[${i * 40}px] 
         hover:-translate-y-[${i * 40}px]
         
         z-[${i}]
         -z-[${i}]

         ml-[${i}rem]
         -ml-[${i}rem]
         `
    ),
  ],
  theme: {
    extend: {
      screens: {
        xsm: "480px",
      },
      keyframes: {
        "pulse-full": {
          "0%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        beat: {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(0.5)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "pulse-full": "pulse-full 1s ease-in-out infinite",
        beat: "beat 1s ease-in-out infinite",
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
      backgroundColor: {
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
  plugins: [require("tailwindcss-animated")],
} satisfies Config;
