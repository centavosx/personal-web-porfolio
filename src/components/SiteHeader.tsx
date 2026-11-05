"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { text: "Projects", href: "/#projects" },
  { text: "Services", href: "/#services" },
  { text: "Experience", href: "/#experience" },
  { text: "Technologies", href: "/#technologies" },
];

const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold" aria-label="Home">
          <Image src="/svg/main-logo.svg" width={24} height={24} alt="" className="dark:hidden" />
          <Image src="/svg/main-logo-dark.svg" width={24} height={24} alt="" className="hidden dark:block" />
          <span>Vincent Llanto</span>
        </Link>
        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Button key={link.href} variant="ghost" size="sm" asChild>
                <Link href={link.href}>{link.text}</Link>
              </Button>
            ))}
          </nav>
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="px-4 pt-4">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site sections</SheetDescription>
              <nav className="flex flex-col gap-1 px-2">
                {links.map((link) => (
                  <Button
                    key={link.href}
                    variant="ghost"
                    className="justify-start"
                    asChild
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href={link.href}>{link.text}</Link>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
