import { WorkExperienceDetailsScreen } from "@/screens/WorkExperienceDetailsScreen";
import { createContentMetadata } from "@/utils/createContentMetadata";
import Supabase from "@/utils/supabase";
import { Metadata } from "next";

export const revalidate = 28800;

export const dynamicParams = true;

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = (await params).id;
  return createContentMetadata(id, "Work Experience", "work-experience");
}

export async function generateStaticParams() {
  const contentIds = await Supabase.getContentIdsByType("work-experience");
  return contentIds;
}

const Index = async ({ params }: PageProps) => {
  const id = (await params).id;
  return <WorkExperienceDetailsScreen id={id} />;
};

export default Index;
