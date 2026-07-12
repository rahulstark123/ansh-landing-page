import type { Metadata } from "next";
import SaathiClient from "./saathi-client";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "ANSH Saathi",
  description:
    "Become an ANSH Saathi. Saath Chalein. Saath Badhein. Walk alongside Indian MSMEs with simple software, build recurring income, and grow together. First 20 founding Saathis. No joining fee.",
  path: "/saathi",
});

export default function SaathiPage() {
  return <SaathiClient />;
}
