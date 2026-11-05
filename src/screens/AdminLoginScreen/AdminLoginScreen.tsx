import { createSupabaseServerClient } from "@/utils/supabase-server";
import { redirect } from "next/navigation";
import LoginForm from "./components/LoginForm";

export const AdminLoginScreen = async () => {
  const supabase = await createSupabaseServerClient();
  const { data: isAdmin } = await supabase.rpc("is_admin");

  if (isAdmin) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <LoginForm />
    </main>
  );
};
