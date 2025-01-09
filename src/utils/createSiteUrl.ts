export const createSiteUrl = <T extends boolean>(
  endpoint?: string,
  isUrl?: T
) => {
  const url = `https://${
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "localhost:3000"
  }${endpoint || ""}`;
  if (!!isUrl) return new URL(url) as T extends true ? URL : string;
  return url as T extends true ? URL : string;
};
