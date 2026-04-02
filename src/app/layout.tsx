import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const SITE_NAME = "ANSH";
const SITE_DESCRIPTION =
  "Simple, fast, and affordable apps designed for Bharat. No jargon, just tools that work.";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ANSH | Built for Bharat, Ready for the World",
    template: "%s | ANSH",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Ansh",
    "Ansh Apps",
    "Bharat apps",
    "productivity tools",
    "simple software",
    "Indian startup",
    "booking app",
    "expense management",
    "CRM",
  ],
  authors: [{ name: "ANSH Team" }],
  creator: "ANSH Team",
  publisher: "ANSH",
  category: "technology",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: "ANSH | Built for Bharat, Ready for the World",
    description: SITE_DESCRIPTION,
    locale: "en_IN",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 1200,
        alt: "ANSH logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ANSH | Built for Bharat, Ready for the World",
    description: SITE_DESCRIPTION,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: ["/favicon.png"],
    apple: [{ url: "/favicon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
