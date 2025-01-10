import { Metadata } from "next";
import Supabase from "./supabase";
import { getImageUrlFromExternal } from "./getImageFromExternal";
import { notFound } from "next/navigation";
import { createSiteUrl } from "./createSiteUrl";

export async function createContentMetadata(
  id: string,
  prefix: string,
  endpointPrefix: string,
  withRobotIndex?: boolean
): Promise<Metadata> {
  try {
    const {
      data: { name, description, featured_image_url },
    } = Supabase.handleError(
      await Supabase.content
        .eq("id", id)
        .select("name, description, featured_image_url")
        .single()
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
        images: featured_image_url
          ? getImageUrlFromExternal(featured_image_url)
          : undefined,
        url: createSiteUrl(`/${endpointPrefix}/${id}`),
        siteName: name,
      },
      robots: withRobotIndex ? "index, follow, noimageindex" : undefined,
    };
  } catch (e) {
    console.log(e);
    notFound();
  }
}
