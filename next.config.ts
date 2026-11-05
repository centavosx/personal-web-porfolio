import type { NextConfig } from "next";

// CMS uploads are served from the R2 public URL.
const r2PublicUrl = process.env.R2_PUBLIC_URL ? new URL(process.env.R2_PUBLIC_URL) : null;

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    optimizePackageImports: ["radix-ui"],
  },
  async redirects() {
    return [{ source: "/about", destination: "/", permanent: true }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/centavosx/**",
        search: "",
      },
      ...(r2PublicUrl
        ? [
            {
              protocol: r2PublicUrl.protocol.replace(":", "") as "http" | "https",
              hostname: r2PublicUrl.hostname,
              port: r2PublicUrl.port,
              pathname: `${r2PublicUrl.pathname.replace(/\/$/, "")}/**`,
            },
          ]
        : []),
    ],
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
