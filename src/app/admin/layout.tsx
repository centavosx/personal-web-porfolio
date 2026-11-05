import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: { template: "%s | Admin", default: "Admin" },
  robots: { index: false, follow: false },
};

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    {children}
    <Toaster />
  </>
);

export default Layout;
