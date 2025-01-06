import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans, Montserrat, Raleway } from "next/font/google";
import SpaceBackground from "@/components/SpaceBackground";

const montserrat = Montserrat({
  weight: "variable",
  variable: "--montserrat",
  subsets: ["latin"],
});

const raleway = Raleway({
  weight: "variable",
  variable: "--raleway",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  weight: "variable",
  variable: "--open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vincent Llanto | Software Developer",
  description:
    "As a software developer, I don't just build applications. I focus on identifying software and real world problems, creating effective solutions, and delivering results that have a lasting impact. I am committed to continuous learning, exploring new challenges, and constantly seeking innovative ways to improve both code and user experience.",
  openGraph: {
    title: "Vincent Llanto | Software Developer",
    description:
      "As a software developer, I don't just build applications. I focus on identifying software and real world problems, creating effective solutions, and delivering results that have a lasting impact. I am committed to continuous learning, exploring new challenges, and constantly seeking innovative ways to improve both code and user experience.",
    images: ["/metadata-pic.jpg"],
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
    <html lang="en">
      <body
        className={`${montserrat.variable} ${raleway.variable} ${openSans.variable}  antialiased`}
      >
        <main className="overflow-hidden relative bg-black">
          <SpaceBackground />
          {children}
        </main>
      </body>
    </html>
  );
}
