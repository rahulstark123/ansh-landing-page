import type { MetadataRoute } from "next";

const resolvedSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = resolvedSiteUrl
    ? new URL("/sitemap.xml", new URL(resolvedSiteUrl)).toString()
    : undefined;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: sitemapUrl,
  };
}
