import Link from "next/link";

const termsSections = [
  {
    title: "1. Acceptance of Terms",
    body: [
      "These Terms and Conditions (\"Terms\") govern your use of ANSH websites, products, and SaaS applications, including Ansh Booking and other current or future ANSH apps.",
      "By accessing or using our services, you agree to these Terms and our Privacy Policy. If you do not agree, do not use the services.",
    ],
  },
  {
    title: "2. ANSH Parent Platform Relationship",
    body: [
      "ANSH is the parent brand and platform operator for multiple products and services. Product-specific terms, feature notices, pricing pages, and onboarding disclosures may apply in addition to these Terms.",
      "In case of conflict, product-specific terms for that service prevail only for that limited scope.",
    ],
  },
  {
    title: "3. Eligibility and Account Responsibility",
    body: [
      "You represent that you are legally competent to contract under applicable law and that information provided by you is accurate and current.",
      "You are responsible for maintaining account confidentiality, restricting unauthorized access, and all activity under your account.",
    ],
  },
  {
    title: "4. Service Access and Acceptable Use",
    body: [
      "You agree not to misuse the services, including unauthorized access, reverse engineering (except where legally permitted), malware distribution, fraudulent conduct, rights infringement, or unlawful processing of third-party data.",
      "We may suspend or restrict access where misuse, security risk, legal risk, or non-payment is reasonably suspected.",
    ],
  },
  {
    title: "5. Subscription, Billing, and Taxes",
    body: [
      "Certain ANSH services are paid subscriptions. Fees, billing cycle, and plan features are shown at checkout or proposal stage.",
      "You authorize applicable payment charges. Prices are exclusive of applicable taxes unless expressly stated otherwise.",
      "Late or failed payments may result in service suspension, downgrade, or termination.",
    ],
  },
  {
    title: "6. Cancellation and No-Refund Policy",
    body: [
      "You may cancel renewal of your paid subscription at any time before the next billing cycle. Cancellation stops future renewals.",
      "No Refund Policy: All fees paid are non-refundable and non-creditable, including in cases of early cancellation, non-usage, partial usage, feature preference changes, or account closure.",
      "If cancellation is initiated after a billing cycle starts, access may continue until the current period ends, but no pro-rata refund will be provided.",
      "Any exception required by non-waivable applicable law will be honored to that limited extent.",
    ],
  },
  {
    title: "7. Account Deletion and Data Consequences",
    body: [
      "You may request account deletion by contacting legal@anshapps.com from your registered email ID.",
      "Deletion may lead to permanent loss of records, configurations, and service history across linked ANSH apps. Please export required data before requesting deletion.",
      "We may retain limited records where required for legal compliance, fraud prevention, audit, or enforcement.",
    ],
  },
  {
    title: "8. Intellectual Property",
    body: [
      "All rights, title, and interest in ANSH services, software, branding, and content remain with ANSH and its licensors. No ownership transfer occurs through service usage.",
      "You retain ownership of your lawful business data uploaded to ANSH apps, while granting us limited rights necessary to operate and improve services.",
    ],
  },
  {
    title: "9. Third-Party Services",
    body: [
      "Services may integrate with third-party tools, gateways, or APIs. Their availability, uptime, and policies are outside our direct control. ANSH is not responsible for third-party platform terms or outages.",
    ],
  },
  {
    title: "10. Disclaimers",
    body: [
      "Services are provided on an \"as is\" and \"as available\" basis. To the maximum extent permitted by law, we disclaim implied warranties including merchantability, fitness for a particular purpose, and non-infringement.",
      "We do not guarantee uninterrupted, error-free, or fully secure operation at all times.",
    ],
  },
  {
    title: "11. Limitation of Liability",
    body: [
      "To the extent permitted by law, ANSH will not be liable for indirect, incidental, special, consequential, or punitive damages, or loss of data, profits, goodwill, or business opportunity.",
      "ANSH's aggregate liability for any claim relating to paid services is limited to fees actually paid by you to the relevant service in the 3 months preceding the claim event.",
    ],
  },
  {
    title: "12. Indemnity",
    body: [
      "You agree to indemnify and hold harmless ANSH, its founders, employees, and affiliates from claims, losses, liabilities, and expenses arising from your misuse of services, breach of these Terms, or violation of applicable law.",
    ],
  },
  {
    title: "13. Governing Law and Dispute Resolution",
    body: [
      "These Terms are governed by the laws of India. Subject to mandatory legal rights, courts at Pune, Maharashtra shall have exclusive jurisdiction.",
      "Before initiating legal proceedings, parties should attempt good-faith resolution through written notice.",
    ],
  },
  {
    title: "14. Changes to Terms",
    body: [
      "We may revise these Terms to reflect legal, business, or service updates. Material changes may be notified through website/app notice or email. Continued use after effective date constitutes acceptance.",
    ],
  },
  {
    title: "15. Contact",
    body: [
      "For legal notices, cancellations, account deletion requests, and terms-related questions:",
      "Email: legal@anshapps.com",
      "Address: [To be updated]",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-[#14141b] to-[#0b0b0f]">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-8">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-primary-bright">
            Legal
          </p>
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-gray-300 md:text-lg">
            Effective Date: 16 April 2026. These terms apply to ANSH as parent
            platform and all ANSH-operated products and SaaS applications.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm text-gray-200 transition hover:border-white/40 hover:text-white"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14 md:px-8 md:py-16">
        <div className="space-y-8">
          {termsSections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
            >
              <h2 className="text-xl font-bold md:text-2xl">{section.title}</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-gray-300 md:text-base">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
