import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { getAboutId } from "@/utils/admin-rows";
import { requireAdmin } from "@/utils/supabase-server";
import LinkDialog from "./components/LinkDialog";
import LinksTable from "./components/LinksTable";
import ProfileForm from "./components/ProfileForm";

export const AdminProfileScreen = async () => {
  const { supabase } = await requireAdmin();
  const [about, links] = await Promise.all([
    supabase.from("about").select("short_description").eq("id", getAboutId()).single(),
    supabase.from("link").select("*").eq("about_id", getAboutId()).order("sort_order", { ascending: true }),
  ]);
  if (about.error) throw about.error;
  if (links.error) throw links.error;

  return (
    <>
      <AdminPageHeader title="Profile" description="The short intro at the top of your home page." />
      <ProfileForm shortDescription={about.data.short_description} />
      <AdminPageHeader
        title="Links"
        description="Icons shown in the hero and footer."
        action={<LinkDialog />}
      />
      <LinksTable data={links.data} />
    </>
  );
};
