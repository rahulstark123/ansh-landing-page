import type { Metadata } from "next";
import RoadmapClient from "./roadmap-client";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Roadmap",
  description:
    "Explore the ANSH Apps roadmap — from live business tools for Bharat to education, research, social impact, and long-term innovation.",
  path: "/roadmap",
});

export default function RoadmapPage() {
  return <RoadmapClient />;
}
