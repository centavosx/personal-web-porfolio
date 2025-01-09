export const createSiteUrl = (endpoint?: string) => {
  return new URL(
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "localhost:3000"}`,
    endpoint
  );
};
