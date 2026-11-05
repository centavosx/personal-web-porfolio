export const getImageUrlFromExternal = (endpoint: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL!;
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
  const normalizedPath = endpoint.replace(/^\//, "");

  return `${normalizedBaseUrl}/${normalizedPath}`;
};

/** Paths under /svg and /image ship with the site, everything else is remote. */
export const getContentImageUrl = (path: string) =>
  /^\/(svg|image)\//.test(path) ? path : getImageUrlFromExternal(path);
