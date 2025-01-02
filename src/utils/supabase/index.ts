import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type SupabaseClient = ReturnType<typeof createClient<Database>>;

export * from "./contents";
export default supabase;
