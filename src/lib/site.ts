import type { Metadata } from "next";

export const SITE_NAME = "ANSH Apps";
export const SITE_TITLE = "ANSH Apps – Software that Solves Everyday Problems";
export const SITE_TAGLINE = "Built for every business. Ready for what's next.";
export const SITE_OG_DESCRIPTION = "Software that solves everyday problems.";
export const SITE_DESCRIPTION =
  "ANSH Apps is a modern software company building products across industries — from business productivity and property management to future AI, education, and finance platforms. Simple, powerful, and accessible worldwide.";
export const SITE_KEYWORDS = [
  "ANSH Apps",
  "Ansh Apps",
  "software company",
  "modern software products",
  "business productivity software",
  "property management software",
  "RentAwas",
  "task management app",
  "HR software",
  "online form builder",
  "link in bio tool",
  "software ecosystem",
  "channel partner program",
  "ANSH Saathi",
  "AI software",
  "education software",
];

export const LIVE_APPS = [
  {
    name: "ANSH Tasks",
    url: "https://tasks.anshapps.com/",
    description: "Assign daily work to staff, track completion, and stay organized.",
  },
  {
    name: "ANSH HR",
    url: "https://hr.anshapps.com/",
    description: "Manage staff attendance, leave, and employee records in one place.",
  },
  {
    name: "ANSH Expense",
    url: "https://expense.anshapps.com/",
    description: "Log receipts, track expenses, and manage approvals with ease.",
  },
  {
    name: "ANSH Visitor",
    url: "https://visitor.anshapps.com/",
    description: "Digitize visitor entry, approvals, and security with QR passes.",
  },
  {
    name: "ANSH Forms",
    url: "https://forms.anshapps.com/",
    description: "Create forms, landing pages, and collect responses effortlessly.",
  },
  {
    name: "ANSH Links",
    url: "https://links.anshapps.com/",
    description: "Share your identity, social links, WhatsApp, and UPI in one page.",
  },
] as const;

export function getSiteUrl(): URL {
  const resolvedSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined) ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  return new URL(resolvedSiteUrl || "http://localhost:3000");
}

export function absoluteUrl(path: string): string {
  return new URL(path, getSiteUrl()).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const pageTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      url: canonicalPath,
      siteName: SITE_NAME,
      title: pageTitle,
      description,
      locale: "en_IN",
      // og:image / twitter:image come from src/app/opengraph-image.tsx (file convention)
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  };
}

export function buildStructuredData() {
  const siteUrl = getSiteUrl().origin;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: SITE_NAME,
        alternateName: "Ansh Apps",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          "@id": `${siteUrl}/#logo`,
          url: `${siteUrl}/logoAnshapps.png`,
          contentUrl: `${siteUrl}/logoAnshapps.png`,
        },
        email: "hello@anshapps.com",
        description: SITE_DESCRIPTION,
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: SITE_NAME,
        alternateName: "Ansh Apps",
        url: `${siteUrl}/`,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-IN",
      },
      ...LIVE_APPS.map((app) => ({
        "@type": "SoftwareApplication",
        name: app.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: app.url,
        description: app.description,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
        publisher: { "@id": `${siteUrl}/#organization` },
      })),
    ],
  };
}
