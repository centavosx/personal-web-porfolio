import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { getAboutId } from "@/utils/admin-rows";
import { requireAdmin } from "@/utils/supabase-server";
import ServiceDialog from "./components/ServiceDialog";
import ServicesTable from "./components/ServicesTable";

export const AdminServicesScreen = async () => {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("service")
    .select("*")
    .eq("about_id", getAboutId())
    .order("sort_order", { ascending: true });
  if (error) throw error;

  return (
    <>
      <AdminPageHeader
        title="Services"
        description="Shown on the home page. Cards show the first sentence of each description."
        action={<ServiceDialog />}
      />
      <ServicesTable data={data} />
    </>
  );
};
