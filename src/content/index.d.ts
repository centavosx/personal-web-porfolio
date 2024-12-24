import type { TextSize } from "../components/Text";

export type ContentType =
  | "description"
  | "image"
  | "section"
  | "bullet"
  | "numeric"
  | "list-item"
  | "list-item-content"
  | "row"
  | "col";

export type ContentData = {
  id?: string;
  title?: string;
  type: ContentType;
  size?: TextSize;
  textClassName?: string;
  titleTextSize?: TextSize;
  data: string | ContentData[] | ContentData;
  // Applicable for images only
  href?: string;
};

export type Content = {
  id: string;
  title: string;
  description: string | string[];
  icon: string;
  content?: ContentData | ContentData[];
};
