import { Content, Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

class Supabase {
  static get client() {
    return createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  static get content() {
    return Supabase.client.from("content");
  }

  static get service() {
    return Supabase.client.from("service");
  }

  static get technology() {
    return Supabase.client.from("technology");
  }

  static get about() {
    return Supabase.client.from("about");
  }

  static async getContentById(id: string) {
    const { data, error } = await Supabase.content
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
    const { data, error } = await Supabase.content
      .select("*")
      .eq("is_featured", true);

    if (error) {
      throw error;
    }

    return data || [];
  }

  static async getContentIdsByType(type: Exclude<Content["type"], null>) {
    const { data, error } = await Supabase.content
      .select("id")
      .eq("type", type);

    if (error) {
      throw error;
    }

    return data || [];
  }

  static async getServices() {
    const { data, error } = await Supabase.service
      .select("*")
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    return data || [];
  }

  static async getCoreTech() {
    const { data, error } = await Supabase.technology
      .select("*")
      .eq("is_core", true)
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    return data || [];
  }

  static async getAboutShortDescription() {
    const { data, error } = await Supabase.about
      .select("short_description")
      .limit(1);

    if (error) {
      throw error;
    }

    if (!data?.length) throw new Error("About should be available");

    return data[0].short_description;
  }

  static async getAboutFullDetails() {
    const { data, error } = await Supabase.about.select("*").limit(1);
    if (error) {
      throw error;
    }

    if (!data?.length) throw new Error("About should be available");

    return data[0];
  }
}

export default Supabase;
