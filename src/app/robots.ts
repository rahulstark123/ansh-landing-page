import type { MetadataRoute } from "next";
import { absoluteUrl, getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: siteUrl.hostname === "localhost" ? undefined : absoluteUrl("/sitemap.xml"),
    host: siteUrl.hostname === "localhost" ? undefined : siteUrl.origin,
  };
}
