import { AdminContentEditorScreen } from "@/screens/AdminContentEditorScreen";

export const metadata = { title: "Edit project" };

type PageProps = {
  params: Promise<{ id: string }>;
};

const Index = async ({ params }: PageProps) => {
  const id = (await params).id;
  return <AdminContentEditorScreen type="project" id={id} />;
};

export default Index;
