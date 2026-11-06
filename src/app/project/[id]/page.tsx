import { ProjectDetailsScreen } from "@/screens/ProjectDetailsScreen";
import { createContentMetadata } from "@/utils/createContentMetadata";
import Supabase from "@/utils/supabase";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 28800;

export const dynamicParams = true;

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = (await params).id;
  return createContentMetadata(id, "Project", "project", true);
}

export async function generateStaticParams() {
  try {
    const contentIds = await Supabase.getContentIdsByType("project");
    return contentIds;
  } catch {
    notFound();
  }
}

const Index = async ({ params }: PageProps) => {
  const id = (await params).id;
  return <ProjectDetailsScreen id={id} />;
};

export default Index;
