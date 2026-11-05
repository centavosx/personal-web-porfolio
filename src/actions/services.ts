"use server";

import { ServiceFormValues, serviceSchema } from "@/schemas/admin";
import { ActionResult, SAVE_ERROR, getAboutId, getNextSortOrder, moveRow, revalidateSite } from "@/utils/admin-rows";
import { requireAdmin } from "@/utils/supabase-server";

export const saveService = async (id: string | null, values: ServiceFormValues): Promise<ActionResult> => {
  const { supabase } = await requireAdmin();
  const parsed = serviceSchema.safeParse(values);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  try {
    const { error } = id
      ? await supabase.from("service").update(parsed.data).eq("id", id).eq("about_id", getAboutId())
      : await supabase.from("service").insert({
          ...parsed.data,
          about_id: getAboutId(),
          sort_order: await getNextSortOrder(supabase, "service"),
        });
    if (error) throw error;
  } catch (error) {
    console.error("saveService", error);
    return { error: SAVE_ERROR };
  }

  revalidateSite();
  return {};
};

export const deleteService = async (id: string): Promise<ActionResult> => {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("service").delete().eq("id", id).eq("about_id", getAboutId());
  if (error) {
    console.error("deleteService", error);
    return { error: SAVE_ERROR };
  }

  revalidateSite();
  return {};
};

export const moveService = async (id: string, direction: "up" | "down"): Promise<ActionResult> => {
  const { supabase } = await requireAdmin();
  try {
    await moveRow(supabase, "service", id, direction);
  } catch (error) {
    console.error("moveService", error);
    return { error: SAVE_ERROR };
  }

  revalidateSite();
  return {};
};
