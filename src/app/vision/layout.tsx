import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Vision",
  description:
    "ANSH Vision: Built for every business, ready for what's next. Explore our long-term mission across business tools, education, research, social impact, and innovation.",
  path: "/vision",
});

export default function VisionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
