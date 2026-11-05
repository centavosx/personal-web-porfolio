export const getImageUrlFromExternal = (endpoint: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL!;
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
  const normalizedPath = endpoint.replace(/^\//, "");

  return `${normalizedBaseUrl}/${normalizedPath}`;
};

/**
 * Full URLs (R2 uploads) are used as they are, paths under /svg and /image ship
 * with the site, and any other path is relative to NEXT_PUBLIC_IMAGE_URL.
 */
export const getContentImageUrl = (path: string) =>
  /^https?:\/\//.test(path) || /^\/(svg|image)\//.test(path)
    ? path
    : getImageUrlFromExternal(path);
