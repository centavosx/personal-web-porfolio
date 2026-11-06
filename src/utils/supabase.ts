import { Content, Database } from "@/types/supabase";
import { createClient, PostgrestSingleResponse } from "@supabase/supabase-js";

class Supabase {
  static get client() {
    return createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );
  }

  static handleError<T>(
    result: PostgrestSingleResponse<T>,
    emptyError?: string
  ) {
    if (result.error) throw result.error;
    if (!!emptyError && !result.data) throw new Error(emptyError);
    return result;
  }

  static get content() {
    return Supabase.client
      .from("content")
      .select("*");
  }

  static get service() {
    return Supabase.client
      .from("service")
      .select("*");
  }

  static get technology() {
    return Supabase.client
      .from("technology")
      .select("*");
  }

  static get about() {
    return Supabase.client.from("about").select("*").order("created_at").limit(1);
  }

  static get link() {
    return Supabase.client
      .from("link")
      .select("*");
  }


  static async getContentById(id: string) {
    const { data } = Supabase.handleError(
      await Supabase.content.eq("id", id).single(),
      "Content should be available"
    );

    return data;
  }

  static async getContents() {
    const { data } = Supabase.handleError(
      await Supabase.content.eq("is_featured", true).order("sort_order", {
        ascending: true,
      })
    );

    return data;
  }

  static async getContentIdsByType(type: Exclude<Content["type"], null>) {
    const { data } = Supabase.handleError(
      await Supabase.content.eq("type", type).select("id")
    );

    return data;
  }

  static async getServices() {
    const { data } = Supabase.handleError(
      await Supabase.service.order("sort_order", {
        ascending: true,
      })
    );

    return data;
  }

  static async getCoreTech() {
    const { data } = Supabase.handleError(
      await Supabase.technology.eq("is_core", true).order("sort_order", {
        ascending: true,
      })
    );

    return data;
  }

  static async getAbout() {
    const { data } = Supabase.handleError(
      await Supabase.about.single(),
      "About should be available"
    );

    return data;
  }

  static async getLinks() {
    const { data } = Supabase.handleError(
      await Supabase.link.order("sort_order", { ascending: true })
    );

    return data;
  }

}

export default Supabase;
