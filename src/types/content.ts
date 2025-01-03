import { TextSize } from "@/components/Text";

export type ContentType =
  | "description"
  | "image"
  | "section"
  | "bullet"
  | "numeric"
  | "list-item"
  | "list-item-content"
  | "flex"
  | "image-stack";

export type AlignValue = "start" | "center" | "end";

export type ResponsiveStyleProps = {
  direction?: "row" | "column" | "row-reversed" | "column-reversed";
  gap?: number;
  justify?: AlignValue;
  alignItems?: AlignValue;
  selfAlign?: AlignValue;
};

export type ContentStyleProps = {
  textClassName?: string;
  titleTextSize?: TextSize;
  size?: TextSize;
} & ResponsiveStyleProps;

export type ContentBreakpoints = Partial<
  Record<"xsm" | "sm" | "md" | "lg" | "xl" | "xxl", ResponsiveStyleProps>
>;

export type ContentData = {
  id?: string;
  title?: string;
  type: ContentType;

  data: string | ContentData[] | ContentData;
  // Applicable for images only
  href?: string;
  // Applicable for images only
  orientation?: "landscape" | "portrait";
  breakpoints?: ContentBreakpoints;

  isExternal?: boolean;
} & ContentStyleProps;
