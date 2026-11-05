"use server";

import { ContentFormValues, contentSchema, toStoredSections } from "@/schemas/admin";
import { Content } from "@/types/supabase";
import { ActionResult, SAVE_ERROR, getAboutId, getNextSortOrder, moveRow, revalidateSite } from "@/utils/admin-rows";
import { requireAdmin } from "@/utils/supabase-server";

export const saveContent = async (
  id: string | null,
  type: NonNullable<Content["type"]>,
  values: ContentFormValues
): Promise<ActionResult & { id?: string }> => {
  const { supabase } = await requireAdmin();
  const parsed = contentSchema.safeParse(values);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { sections, description, role, date, status, icon_url, featured_image_url, ...rest } = parsed.data;
  const row = {
    ...rest,
    role: role || null,
    date: date || null,
    status: status || null,
    icon_url: icon_url || null,
    featured_image_url: featured_image_url || null,
    description: description ? description.split(/\n\s*\n/).map((paragraph) => paragraph.trim()) : null,
    sections: toStoredSections(sections),
  };

  try {
    if (id) {
      const { error } = await supabase.from("content").update(row).eq("id", id).eq("about_id", getAboutId());
      if (error) throw error;
      revalidateSite();
      return { id };
    }

    const { data, error } = await supabase
      .from("content")
      .insert({
        ...row,
        type,
        about_id: getAboutId(),
        sort_order: await getNextSortOrder(supabase, "content"),
      })
      .select("id")
      .single();
    if (error) throw error;
    revalidateSite();
    return { id: data.id };
  } catch (error) {
    console.error("saveContent", error);
    return { error: SAVE_ERROR };
  }
};

export const deleteContent = async (id: string): Promise<ActionResult> => {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("content").delete().eq("id", id).eq("about_id", getAboutId());
  if (error) {
    console.error("deleteContent", error);
    return { error: SAVE_ERROR };
  }

  revalidateSite();
  return {};
};

export const moveContent = async (id: string, direction: "up" | "down"): Promise<ActionResult> => {
  const { supabase } = await requireAdmin();
  try {
    await moveRow(supabase, "content", id, direction);
  } catch (error) {
    console.error("moveContent", error);
    return { error: SAVE_ERROR };
  }

  revalidateSite();
  return {};
};
