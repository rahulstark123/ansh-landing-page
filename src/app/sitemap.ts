import type { MetadataRoute } from "next";

const resolvedSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

export default function sitemap(): MetadataRoute.Sitemap {
  if (!resolvedSiteUrl) {
    return [];
  }

  const baseUrl = new URL(resolvedSiteUrl);

  return [
    {
      url: new URL("/", baseUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/roadmap", baseUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];
}
