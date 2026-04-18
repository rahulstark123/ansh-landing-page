import type { Metadata } from "next";
import RoadmapClient from "./roadmap-client";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "The ANSH Vision — a phased roadmap from business and personal tools to education, security, society, and exploration.",
  alternates: {
    canonical: "/roadmap",
  },
  openGraph: {
    title: "ANSH Roadmap | The ANSH Vision",
    description: "From individuals to civilizations — explore the ANSH roadmap.",
    url: "/roadmap",
  },
};

export default function RoadmapPage() {
  return <RoadmapClient />;
}
