import { Content, Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

class Supabase {
  static get client() {
    return createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  static async getContentById(id: string) {
    const { data, error } = await Supabase.client
      .from("content")
      .select("*")
      .eq("id", id)
      .limit(1);

    if (error) {
      throw error;
    }

    if (!data?.length) throw new Error("Content should be available");

    return data[0];
  }

  static async getContents() {
    const { data, error } = await Supabase.client
      .from("content")
      .select("*")
      .eq("is_featured", true);

    if (error) {
      throw error;
    }

    return data || [];
  }

  static async getContentIdsByType(type: Exclude<Content["type"], null>) {
    const { data, error } = await Supabase.client
      .from("content")
      .select("id")
      .eq("type", type);

    if (error) {
      throw error;
    }

    return data || [];
  }
}

export default Supabase;
