import type { Metadata } from "next";
import RoadmapClient from "./roadmap-client";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Roadmap",
  description:
    "Explore the ANSH Apps roadmap — from live tools for growing businesses to education, research, social impact, and long-term innovation.",
  path: "/roadmap",
});

export default function RoadmapPage() {
  return <RoadmapClient />;
}
