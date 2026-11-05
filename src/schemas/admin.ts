import { ContentSection } from "@/types/content";
import { Content } from "@/types/supabase";
import { z } from "zod";

const requiredText = (label: string) => z.string().trim().min(1, `${label} is required`);

/** A site path such as /svg/x.svg or /project/x.jpg, or a full http(s) URL. */
const imagePath = z
  .string()
  .trim()
  .regex(/^(\/[^/\s]|https?:\/\/)\S*$/, "Use a path starting with / or a full URL");

const webUrl = z
  .string()
  .trim()
  .regex(/^https?:\/\/\S+$/, "Use a full URL starting with http:// or https://");

const optionalWebUrl = z.union([z.literal(""), webUrl]);

export const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

export const serviceSchema = z.object({
  name: requiredText("Name"),
  description: requiredText("Description"),
  icon_url: imagePath,
});
export type ServiceFormValues = z.infer<typeof serviceSchema>;

export const technologyCategories = [
  "language",
  "frameworks",
  "database",
  "automation",
  "cicd",
  "cloud",
  "design",
  "documentation",
  "re",
  "state",
  "styling",
  "tests",
  "web3",
] as const;

export const technologySchema = z.object({
  name: requiredText("Name"),
  icon_url: imagePath,
  link: optionalWebUrl,
  category: z.enum(technologyCategories),
  is_core: z.boolean(),
});
export type TechnologyFormValues = z.infer<typeof technologySchema>;

export const linkTypes = ["github", "linkedin", "codewars", "email"] as const;

export const linkSchema = z.object({
  type: z.enum(linkTypes),
  link: z
    .string()
    .trim()
    .regex(/^(https?:\/\/|mailto:)\S+$/, "Use a full URL, or mailto: for email"),
});
export type LinkFormValues = z.infer<typeof linkSchema>;

export const profileSchema = z.object({
  short_description: requiredText("Intro"),
});
export type ProfileFormValues = z.infer<typeof profileSchema>;

const galleryItemSchema = z.object({
  title: z.string().trim(),
  body: z.string().trim(),
  images: z.array(imagePath).min(1, "Add at least one image"),
  orientation: z.enum(["landscape", "portrait"]),
});

const stackGroupSchema = z.object({
  group: requiredText("Group name"),
  items: z
    .array(
      z.object({
        name: requiredText("Name"),
        icon: imagePath,
        href: optionalWebUrl,
      })
    )
    .min(1, "Add at least one technology"),
});

const sectionSchema = z.object({
  title: requiredText("Section title"),
  body: z.string().trim(),
  gallery: z.array(galleryItemSchema),
  stack: z.array(stackGroupSchema),
});

export const contentStatuses = ["completed", "pending", "hold", "dropped"] as const;

export const contentSchema = z.object({
  name: requiredText("Name"),
  role: z.string().trim(),
  date: z.string().trim(),
  status: z.union([z.literal(""), z.enum(contentStatuses)]),
  description: z.string().trim(),
  icon_url: z.union([z.literal(""), imagePath]),
  featured_image_url: z.union([z.literal(""), imagePath]),
  is_featured: z.boolean(),
  sections: z.array(sectionSchema),
});
export type ContentFormValues = z.infer<typeof contentSchema>;

export const toContentFormValues = (content?: Content): ContentFormValues => ({
  name: content?.name ?? "",
  role: content?.role ?? "",
  date: content?.date ?? "",
  status: content?.status ?? "",
  description: (content?.description ?? []).join("\n\n"),
  icon_url: content?.icon_url ?? "",
  featured_image_url: content?.featured_image_url ?? "",
  is_featured: content?.is_featured ?? false,
  sections: (content?.sections ?? []).map((section) => ({
    title: section.title,
    body: section.body ?? "",
    gallery: (section.gallery ?? []).map((item) => ({
      title: item.title ?? "",
      body: item.body ?? "",
      images: item.images,
      orientation: item.orientation,
    })),
    stack: (section.stack ?? []).map((group) => ({
      group: group.group,
      items: group.items.map((item) => ({
        name: item.name,
        icon: item.icon,
        href: item.href ?? "",
      })),
    })),
  })),
});

/** Leaves out empty optional fields so stored rows match ContentSection. */
export const toStoredSections = (sections: ContentFormValues["sections"]): ContentSection[] =>
  sections.map(({ title, body, gallery, stack }) => ({
    title,
    ...(body ? { body } : {}),
    ...(gallery.length
      ? {
          gallery: gallery.map((item) => ({
            ...(item.title ? { title: item.title } : {}),
            ...(item.body ? { body: item.body } : {}),
            images: item.images,
            orientation: item.orientation,
          })),
        }
      : {}),
    ...(stack.length
      ? {
          stack: stack.map((group) => ({
            group: group.group,
            items: group.items.map(({ name, icon, href }) => ({
              name,
              icon,
              ...(href ? { href } : {}),
            })),
          })),
        }
      : {}),
  }));
