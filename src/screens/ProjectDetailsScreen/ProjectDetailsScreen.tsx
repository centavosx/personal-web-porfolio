import ContentDetails from "@/components/ContentDetails";
import Supabase from "@/utils/supabase";
import { notFound } from "next/navigation";

export type ProjectDetailsScreenProps = {
  id: string;
};

export const ProjectDetailsScreen = async ({ id }: ProjectDetailsScreenProps) => {
  const content = await Supabase.getContentById(id).catch(() => notFound());

  return <ContentDetails content={content} backHref="/#projects" backLabel="All projects" />;
};
