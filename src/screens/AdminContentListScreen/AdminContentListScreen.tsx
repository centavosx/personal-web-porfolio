import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Content } from "@/types/supabase";
import { getAboutId } from "@/utils/admin-rows";
import { requireAdmin } from "@/utils/supabase-server";
import { Plus } from "lucide-react";
import Link from "next/link";
import ContentTable from "./components/ContentTable";

const pages = {
  project: {
    title: "Projects",
    description: "Featured projects with a preview image appear on the home page.",
    addLabel: "Add project",
    adminPath: "/admin/projects",
    publicPath: "/project",
  },
  "work-experience": {
    title: "Experience",
    description: "Featured experience appears on the home page.",
    addLabel: "Add experience",
    adminPath: "/admin/experience",
    publicPath: "/work-experience",
  },
};

export type AdminContentListScreenProps = {
  type: NonNullable<Content["type"]>;
};

export const AdminContentListScreen = async ({ type }: AdminContentListScreenProps) => {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("content")
    .select("*")
    .eq("about_id", getAboutId())
    .eq("type", type)
    .order("sort_order", { ascending: true });
  if (error) throw error;

  const { title, description, addLabel, adminPath, publicPath } = pages[type];

  return (
    <>
      <AdminPageHeader
        title={title}
        description={description}
        action={
          <Button asChild>
            <Link href={`${adminPath}/new`}>
              <Plus />
              {addLabel}
            </Link>
          </Button>
        }
      />
      <ContentTable data={data} adminPath={adminPath} publicPath={publicPath} />
    </>
  );
};
