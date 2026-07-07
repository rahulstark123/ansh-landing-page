import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

const PUBLIC_PAGES = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/vision", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/roadmap", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/privacy-policy", changeFrequency: "yearly" as const, priority: 0.4 },
  { path: "/terms-and-conditions", changeFrequency: "yearly" as const, priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  if (baseUrl.hostname === "localhost") {
    return [];
  }

  return PUBLIC_PAGES.map((page) => ({
    url: new URL(page.path, baseUrl).toString(),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
