import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export type ActionResult = {
  error?: string;
};

export const SAVE_ERROR = "Couldn't save your changes. Please try again.";

export const getAboutId = () => process.env.ABOUT_ID as string;

/** Refreshes the public pages and the admin lists after a change. */
export const revalidateSite = () => revalidatePath("/", "layout");

type OrderedTable = "service" | "technology" | "link" | "content";
type OrderedRow = { id: string; sort_order: number; category?: string; type?: string | null };
type Client = SupabaseClient<Database>;

const getOrderedRows = async (supabase: Client, table: OrderedTable) => {
  const { data, error } = await supabase
    .from(table as "service")
    .select("*")
    .eq("about_id", getAboutId())
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data as unknown as OrderedRow[];
};

/** Position for a new row: after everything else in the table. */
export const getNextSortOrder = async (supabase: Client, table: OrderedTable) => {
  const rows = await getOrderedRows(supabase, table);
  return Math.max(0, ...rows.map((row) => row.sort_order)) + 1;
};

/** Swaps a row with its neighbour, within its category or content type. */
export const moveRow = async (supabase: Client, table: OrderedTable, id: string, direction: "up" | "down") => {
  const rows = await getOrderedRows(supabase, table);
  const current = rows.find((row) => row.id === id);
  if (!current) throw new Error("Row not found");

  const siblings = rows.filter(
    (row) =>
      (table !== "technology" || row.category === current.category) &&
      (table !== "content" || row.type === current.type)
  );
  const index = siblings.indexOf(current);
  const target = index + (direction === "up" ? -1 : 1);
  if (target < 0 || target >= siblings.length) return;

  [siblings[index], siblings[target]] = [siblings[target], siblings[index]];

  // Renumbers the group, because older rows may share the same sort_order.
  for (const [position, row] of siblings.entries()) {
    if (row.sort_order === position + 1) continue;
    const { error } = await supabase
      .from(table as "service")
      .update({ sort_order: position + 1 })
      .eq("id", row.id)
      .eq("about_id", getAboutId());
    if (error) throw error;
  }
};
