import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { getAboutId } from "@/utils/admin-rows";
import { requireAdmin } from "@/utils/supabase-server";
import TechnologiesTable from "./components/TechnologiesTable";
import TechnologyDialog from "./components/TechnologyDialog";

export const AdminTechnologiesScreen = async () => {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("technology")
    .select("*")
    .eq("about_id", getAboutId())
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });
  if (error) throw error;

  return (
    <>
      <AdminPageHeader
        title="Technologies"
        description="Core technologies appear on the home page, grouped by category."
        action={<TechnologyDialog />}
      />
      <TechnologiesTable data={data} />
    </>
  );
};
