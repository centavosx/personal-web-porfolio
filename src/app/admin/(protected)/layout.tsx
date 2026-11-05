import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/utils/supabase-server";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  await requireAdmin();

  return <AdminShell>{children}</AdminShell>;
};

export default Layout;
