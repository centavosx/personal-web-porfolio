import { Metadata } from "next";
import Supabase from "./supabase";
import { getImageUrlFromExternal } from "./getImageFromExternal";

export async function createContentMetadata(
  id: string,
  prefix: string,
  previousImages: string[] = []
): Promise<Metadata> {
  const {
    data: { name, description, featured_image_url },
  } = Supabase.handleError(
    await Supabase.content
      .eq("id", id)
      .select("name, description, featured_image_url")
      .single(),
    "Content should be available"
  );

  const currentDescription = description || [prefix];
  const descriptionFirstItem = currentDescription[0];

  const fullTitle = `${prefix} | ${name}`;

  return {
    title: fullTitle,
    description: descriptionFirstItem,
    openGraph: {
      title: fullTitle,
      description: descriptionFirstItem,
      images: [
        ...(featured_image_url
          ? [getImageUrlFromExternal(featured_image_url)]
          : []),
        ...previousImages,
      ],
    },
  };
}
