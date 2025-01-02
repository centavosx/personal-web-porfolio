import { Content } from "@/types/supabase";
import supabase from ".";

export const getContentById = async (id: string) => {
  let { data, error } = await supabase
    .from("content")
    .select("*")
    .eq("id", id)
    .limit(1);

  if (error) {
    throw error;
  }

  if (!data?.length) throw new Error("Content should be available");

  return data[0];
};

export const getContents = async () => {
  let { data, error } = await supabase.from("content").select("*");

  if (error) {
    throw error;
  }

  return data || [];
};

export const getContentIdsByType = async (
  type: Exclude<Content["type"], null>
) => {
  let { data, error } = await supabase
    .from("content")
    .select("id")
    .eq("type", type);

  if (error) {
    throw error;
  }

  return data || [];
};
