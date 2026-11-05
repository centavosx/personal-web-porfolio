import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { createSiteUrl } from "@/utils/createSiteUrl";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const url = createSiteUrl(undefined, true);

const title = "Vincent Llanto | Software Developer";
const description =
  "I’m a software developer from the Philippines, specializing in web, mobile, and backend development. I create applications focused on solving real-world problems";

export const metadata: Metadata = {
  metadataBase: url,
  title,
  description,
  openGraph: {
    url,
    title,
    description,
    images: ["/metadata-pic.jpg"],
    siteName: "Vincent Llanto - Developer's Portfolio",
  },

  icons: {
    icon: [
      {
        rel: "icon",
        url: "/icon-16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/icon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/icon-48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/icon-64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/icon-96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/icon-128.png",
        sizes: "128x128",
        type: "image/png",
      },
    ],
    apple: [
      {
        rel: "apple-touch-icon",
        url: "/icon-180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: [
      {
        rel: "shortcut icon",
        url: "/favicon.ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
