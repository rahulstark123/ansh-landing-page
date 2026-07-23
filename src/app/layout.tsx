import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_OG_DESCRIPTION,
  SITE_TITLE,
  buildStructuredData,
  getSiteUrl,
} from "@/lib/site";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import "./globals.css";

const SITE_URL = getSiteUrl();

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: "ANSH Team", url: SITE_URL.origin }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_OG_DESCRIPTION,
    locale: "en_IN",
    // og:image / twitter:image come from src/app/opengraph-image.tsx (file convention)
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_OG_DESCRIPTION,
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
  verification: {
    google: "6NT93y8x-9C64bHtGg16eLSai-vwWV4xodUzYOsdqoE",
  },
  icons: {
    icon: [{ url: "/anshFavicon.png", type: "image/png" }],
    shortcut: ["/anshFavicon.png"],
    apple: [{ url: "/anshFavicon.png" }],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    title: SITE_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`dark scroll-smooth ${inter.variable} ${cormorant.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData()) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
