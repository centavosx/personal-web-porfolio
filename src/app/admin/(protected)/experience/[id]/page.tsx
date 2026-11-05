import { AdminContentEditorScreen } from "@/screens/AdminContentEditorScreen";

export const metadata = { title: "Edit experience" };

type PageProps = {
  params: Promise<{ id: string }>;
};

const Index = async ({ params }: PageProps) => {
  const id = (await params).id;
  return <AdminContentEditorScreen type="work-experience" id={id} />;
};

export default Index;
