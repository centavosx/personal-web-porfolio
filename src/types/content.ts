export type ContentGalleryItem = {
  title?: string;
  body?: string;
  images: string[];
  orientation: "landscape" | "portrait";
};

export type ContentStackItem = {
  name: string;
  icon: string;
  href?: string;
};

export type ContentStackGroup = {
  group: string;
  items: ContentStackItem[];
};

export type ContentSection = {
  title: string;
  /** Markdown */
  body?: string;
  gallery?: ContentGalleryItem[];
  stack?: ContentStackGroup[];
};
