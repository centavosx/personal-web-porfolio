"use client";

import { signOut } from "@/actions/auth";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { ExternalLink, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const links = [
  { text: "Projects", href: "/admin/projects" },
  { text: "Experience", href: "/admin/experience" },
  { text: "Services", href: "/admin/services" },
  { text: "Technologies", href: "/admin/technologies" },
  { text: "Profile", href: "/admin/profile" },
];

const AdminShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-2 px-4 sm:px-6">
          <Link href="/admin" className="font-semibold">
            Site admin
          </Link>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <a href="/" target="_blank" rel="noreferrer">
                <ExternalLink />
                View site
              </a>
            </Button>
            <ThemeToggle />
            <form action={signOut}>
              <Button type="submit" variant="ghost" size="icon" aria-label="Sign out" title="Sign out">
                <LogOut />
              </Button>
            </form>
          </div>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 pb-2 sm:px-6">
          {links.map((link) => (
            <Button
              key={link.href}
              variant={pathname.startsWith(link.href) ? "secondary" : "ghost"}
              size="sm"
              asChild
            >
              <Link href={link.href}>{link.text}</Link>
            </Button>
          ))}
        </nav>
      </header>
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6">{children}</main>
    </>
  );
};

export default AdminShell;
