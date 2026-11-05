"use server";

import { TechnologyFormValues, technologySchema } from "@/schemas/admin";
import { ActionResult, SAVE_ERROR, getAboutId, getNextSortOrder, moveRow, revalidateSite } from "@/utils/admin-rows";
import { requireAdmin } from "@/utils/supabase-server";

export const saveTechnology = async (id: string | null, values: TechnologyFormValues): Promise<ActionResult> => {
  const { supabase } = await requireAdmin();
  const parsed = technologySchema.safeParse(values);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const row = { ...parsed.data, link: parsed.data.link || null };

  try {
    const { error } = id
      ? await supabase.from("technology").update(row).eq("id", id).eq("about_id", getAboutId())
      : await supabase.from("technology").insert({
          ...row,
          about_id: getAboutId(),
          sort_order: await getNextSortOrder(supabase, "technology"),
        });
    if (error) throw error;
  } catch (error) {
    console.error("saveTechnology", error);
    return { error: SAVE_ERROR };
  }

  revalidateSite();
  return {};
};

export const deleteTechnology = async (id: string): Promise<ActionResult> => {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("technology").delete().eq("id", id).eq("about_id", getAboutId());
  if (error) {
    console.error("deleteTechnology", error);
    return { error: SAVE_ERROR };
  }

  revalidateSite();
  return {};
};

export const moveTechnology = async (id: string, direction: "up" | "down"): Promise<ActionResult> => {
  const { supabase } = await requireAdmin();
  try {
    await moveRow(supabase, "technology", id, direction);
  } catch (error) {
    console.error("moveTechnology", error);
    return { error: SAVE_ERROR };
  }

  revalidateSite();
  return {};
};
