import ContentDetails from "@/components/ContentDetails";
import Supabase from "@/utils/supabase";
import { notFound } from "next/navigation";

export type WorkExperienceDetailsScreenProps = {
  id: string;
};

export const WorkExperienceDetailsScreen = async ({ id }: WorkExperienceDetailsScreenProps) => {
  const content = await Supabase.getContentById(id).catch(() => notFound());

  return <ContentDetails content={content} backHref="/#experience" backLabel="All experience" />;
};
