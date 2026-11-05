import { Content } from "@/types/supabase";
import { getAboutId } from "@/utils/admin-rows";
import { requireAdmin } from "@/utils/supabase-server";
import { notFound } from "next/navigation";
import ContentEditor from "./components/ContentEditor";

export type AdminContentEditorScreenProps = {
  type: NonNullable<Content["type"]>;
  id?: string;
};

export const AdminContentEditorScreen = async ({ type, id }: AdminContentEditorScreenProps) => {
  const { supabase } = await requireAdmin();

  if (!id) return <ContentEditor type={type} />;

  const { data } = await supabase
    .from("content")
    .select("*")
    .eq("id", id)
    .eq("about_id", getAboutId())
    .eq("type", type)
    .maybeSingle();

  if (!data) notFound();

  return <ContentEditor type={type} content={data} />;
};
