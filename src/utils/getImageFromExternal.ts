export const getImageUrlFromExternal = (endpoint: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL!;
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
  const normalizedPath = endpoint.replace(/^\//, "");
  return `${normalizedBaseUrl}/${normalizedPath}`;
};
