"use server";

import { LinkFormValues, ProfileFormValues, linkSchema, profileSchema } from "@/schemas/admin";
import { ActionResult, SAVE_ERROR, getAboutId, getNextSortOrder, moveRow, revalidateSite } from "@/utils/admin-rows";
import { requireAdmin } from "@/utils/supabase-server";

export const saveProfile = async (values: ProfileFormValues): Promise<ActionResult> => {
  const { supabase } = await requireAdmin();
  const parsed = profileSchema.safeParse(values);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { error } = await supabase.from("about").update(parsed.data).eq("id", getAboutId());
  if (error) {
    console.error("saveProfile", error);
    return { error: SAVE_ERROR };
  }

  revalidateSite();
  return {};
};

export const saveLink = async (id: string | null, values: LinkFormValues): Promise<ActionResult> => {
  const { supabase } = await requireAdmin();
  const parsed = linkSchema.safeParse(values);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  try {
    const { error } = id
      ? await supabase.from("link").update(parsed.data).eq("id", id).eq("about_id", getAboutId())
      : await supabase.from("link").insert({
          ...parsed.data,
          about_id: getAboutId(),
          sort_order: await getNextSortOrder(supabase, "link"),
        });
    if (error) throw error;
  } catch (error) {
    console.error("saveLink", error);
    return { error: SAVE_ERROR };
  }

  revalidateSite();
  return {};
};

export const deleteLink = async (id: string): Promise<ActionResult> => {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("link").delete().eq("id", id).eq("about_id", getAboutId());
  if (error) {
    console.error("deleteLink", error);
    return { error: SAVE_ERROR };
  }

  revalidateSite();
  return {};
};

export const moveLink = async (id: string, direction: "up" | "down"): Promise<ActionResult> => {
  const { supabase } = await requireAdmin();
  try {
    await moveRow(supabase, "link", id, direction);
  } catch (error) {
    console.error("moveLink", error);
    return { error: SAVE_ERROR };
  }

  revalidateSite();
  return {};
};
