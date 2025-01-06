import { Content, Database } from "@/types/supabase";
import { createClient, PostgrestSingleResponse } from "@supabase/supabase-js";
import { error } from "console";

class Supabase {
  static get currentId() {
    return (process.env.ABOUT_ID as string) || "";
  }
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
    if (result.error) throw error;
    if (!!emptyError && !result.data) throw new Error(emptyError);
    return result;
  }

  static get content() {
    return Supabase.client
      .from("content")
      .select("*")
      .eq("about_id", Supabase.currentId);
  }

  static get service() {
    return Supabase.client
      .from("service")
      .select("*")
      .eq("about_id", Supabase.currentId);
  }

  static get technology() {
    return Supabase.client
      .from("technology")
      .select("*")
      .eq("about_id", Supabase.currentId);
  }

  static get about() {
    return Supabase.client.from("about").select("*");
  }

  static get link() {
    return Supabase.client
      .from("link")
      .select("*")
      .eq("about_id", Supabase.currentId);
  }

  static get address() {
    return Supabase.client
      .from("address")
      .select("*")
      .eq("about_id", Supabase.currentId);
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
      await Supabase.content.eq("is_featured", true)
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
      await Supabase.service.order("created_at", {
        ascending: true,
      })
    );

    return data;
  }

  static async getCoreTech() {
    const { data } = Supabase.handleError(
      await Supabase.technology.eq("is_core", true).order("created_at", {
        ascending: true,
      })
    );

    return data;
  }

  static async getAbout() {
    const { data } = Supabase.handleError(
      await Supabase.about
        .select("*, content(id,name,description,type,icon_url,role)")
        .single(),
      "About should be available"
    );

    return data;
  }

  static async getLinks() {
    const { data } = Supabase.handleError(await Supabase.link);

    return data;
  }

  static async getAddresses() {
    const { data } = Supabase.handleError(await Supabase.address);

    return data;
  }
}

export default Supabase;
