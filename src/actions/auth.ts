"use server";

import { signInSchema } from "@/schemas/admin";
import { createSupabaseServerClient } from "@/utils/supabase-server";
import { redirect } from "next/navigation";

const SIGN_IN_ERROR = "Incorrect email or password.";

export const signIn = async (_previous: { error?: string }, formData: FormData): Promise<{ error?: string }> => {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: SIGN_IN_ERROR };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: SIGN_IN_ERROR };

  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) {
    await supabase.auth.signOut();
    return { error: SIGN_IN_ERROR };
  }

  redirect("/admin");
};

export const signOut = async () => {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
};
