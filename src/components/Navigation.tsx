"use client";

import Image from "next/image";
import Text from "./Text";
import { useDetectActiveHash } from "@/hooks/useDetectActiveHash";
import { MouseEventHandler, useMemo, useState } from "react";
import { AnimatedHamburger } from "./AnimatedHamburger";
import Link from "next/link";

export type LinkProps = {
  text: string;
  href: string;
  hidden?: boolean;
};

export type NavigationProps = {
  pageUrl?: string;
  links: LinkProps[];
};
const Navigation = ({ pageUrl = "/", links }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const linkHashes = useMemo(() => links.map((value) => value.href), [links]);

  const activeHash = useDetectActiveHash({
    pageUrl,
    linkHashes,
  });

  const handleLinkClick =
    (href: string): MouseEventHandler<HTMLAnchorElement> =>
    (e) => {
      if (!href.match(/^#/)) {
        return;
      }
      e.preventDefault();
      const targetElement = document.querySelector(href) as HTMLElement;
      if (!targetElement) return;

      const { y = 0 } = targetElement.getBoundingClientRect();

      window.scrollTo({
        top: window.scrollY + (y - 109),
        behavior: "smooth",
      });
      setIsOpen(false);
    };

  const handleLogoLinkClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    window.location.href = "/";
  };

  return (
    <nav
      className={`flex justify-center fixed w-full z-[99]  transition-all ${
        activeHash ? "bg-[rgba(255,255,255,0.4)]" : "dark"
      }`}
    >
      <div className="2xl:container flex flex-row justify-between w-full px-8 py-6 md:py-8 md:px-10">
        <Link href="#" onClick={handleLogoLinkClick} scroll={false}>
          <Image
            className="z-[99]"
            src={activeHash ? "/svg/main-logo.svg" : "/svg/main-logo-dark.svg"}
            height={45}
            width={45}
            alt="main logo"
          />
        </Link>
        <AnimatedHamburger
          isOpen={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        />
        <div
          className={`${
            isOpen ? "translate-x-0" : "translate-x-[100vw] touch-none"
          } flex justify-between md:self-center items-center transition-all fixed h-screen w-full z-10 bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(0,0,0,0.7)] -ml-[1.99rem] -mt-[1.5rem] px-10 py-10 md:ml-0 md:px-0 md:py-0 md:w-auto md:h-auto md:relative md:mt-0 md:bg-transparent md:dark:bg-transparent md:translate-x-0`}
        >
          <ol className="flex justify-start mt-36 flex-col w-full h-full gap-8 md:flex-row md:gap-6 md:mt-0">
            {links.map((value, index) => {
              if (value.hidden) return null;
              return (
                <li
                  className="text-end md:text-start"
                  key={`${value.text}_${index}`}
                >
                  <Text
                    as="a"
                    href={value.href}
                    className={`font-montserrat font-bold ${
                      activeHash === value.href ? "opacity-100" : "opacity-50"
                    } hover:opacity-100 transition-opacity duration-300`}
                    onClick={handleLinkClick(value.href)}
                  >
                    {value.text}
                  </Text>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
