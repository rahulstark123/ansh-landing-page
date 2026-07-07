import type { Metadata } from "next";

export const SITE_NAME = "ANSH Apps";
export const SITE_TITLE = "ANSH Apps - Simple Apps. Powerful Impact.";
export const SITE_TAGLINE = "Built for Bharat, ready for the world";
export const SITE_DESCRIPTION =
  "ANSH Apps offers simple business software for Bharat — manage tasks, HR, expenses, visitors, forms, and links in your own language. Free to start. Built for shops, salons, clinics, and growing teams.";
export const SITE_KEYWORDS = [
  "ANSH Apps",
  "Ansh Apps",
  "business apps India",
  "task management app",
  "HR software small business",
  "expense tracker India",
  "visitor management system",
  "form builder India",
  "link in bio India",
  "MSME software",
  "Bharat business tools",
  "simple business software",
];

export const LIVE_APPS = [
  {
    name: "Ansh Tasks",
    url: "https://tasks.anshapps.com/",
    description: "Assign daily work to staff, track completion, and stay organized.",
  },
  {
    name: "Ansh HR",
    url: "https://hr.anshapps.com/",
    description: "Manage staff attendance, leave, and employee records in one place.",
  },
  {
    name: "Ansh Expense",
    url: "https://expense.anshapps.com/",
    description: "Log receipts, track expenses, and manage approvals with ease.",
  },
  {
    name: "Ansh Visitor",
    url: "https://visitor.anshapps.com/",
    description: "Digitize visitor entry, approvals, and security with QR passes.",
  },
  {
    name: "Ansh Forms",
    url: "https://forms.anshapps.com/",
    description: "Create forms, landing pages, and collect responses effortlessly.",
  },
  {
    name: "Ansh Links",
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
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - ${SITE_TAGLINE}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: ["/og-image.png"],
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
        logo: `${siteUrl}/logoAnshapps.png`,
        email: "hello@anshapps.com",
        description: SITE_DESCRIPTION,
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: SITE_NAME,
        alternateName: ["Ansh Apps", "anshapps.com"],
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
