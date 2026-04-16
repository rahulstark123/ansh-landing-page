import Link from "next/link";

const policySections = [
  {
    title: "1. Scope and Applicability",
    body: [
      "This Privacy Policy explains how ANSH (\"we\", \"our\", \"us\") collects, uses, stores, discloses, and protects personal data across the ANSH ecosystem, including parent platform services and product applications such as Ansh Booking and other current or future ANSH apps.",
      "This policy applies to all users, visitors, customers, and partners who access our websites, apps, and related SaaS services in India or otherwise.",
    ],
  },
  {
    title: "2. Personal Data We Collect",
    body: [
      "Identity and contact details such as name, email address, mobile number, company/business details, and billing details.",
      "Account and authentication data such as login credentials, profile data, account settings, and linked device/session metadata.",
      "Usage and technical data such as IP address, browser type, OS, app activity logs, crash logs, diagnostics, cookies, and analytics events.",
      "Customer-provided business data uploaded into ANSH apps, including booking records, CRM records, attendance data, and related operational content.",
      "Support and communications data, including messages, attachments, and feedback shared with our support team.",
    ],
  },
  {
    title: "3. Legal Basis and Purpose of Processing",
    body: [
      "We process personal data for lawful purposes including account creation, service delivery, subscription management, product improvement, customer support, security monitoring, legal compliance, fraud prevention, and communication of service updates.",
      "Where required by applicable law, we rely on consent. In other cases, processing may be required for performance of contract, legal obligations, or legitimate business purposes that are not overridden by your rights.",
      "You may withdraw consent where consent is the basis of processing. Withdrawal may impact service availability.",
    ],
  },
  {
    title: "4. Children",
    body: [
      "Our services are not intended for children and should be used only by persons competent to contract under applicable law. If you believe a child has shared data with us, contact us for prompt deletion review.",
    ],
  },
  {
    title: "5. Cookies and Similar Technologies",
    body: [
      "We use cookies and similar technologies for authentication, session management, security, performance analytics, language preference, and feature improvement.",
      "You can control cookies through browser settings, but some features may not function properly if essential cookies are disabled.",
    ],
  },
  {
    title: "6. How We Share Data",
    body: [
      "We may share data with vetted service providers (for hosting, analytics, messaging, payments, and customer support), group entities, legal advisors, auditors, and government/law enforcement authorities when legally required.",
      "We do not sell personal data. Any sharing is limited to legitimate purposes and contractual safeguards.",
    ],
  },
  {
    title: "7. Cross-Border Transfers",
    body: [
      "Where data is processed outside India, we implement reasonable contractual, technical, and organizational safeguards to ensure an adequate level of protection under applicable law.",
    ],
  },
  {
    title: "8. Data Retention",
    body: [
      "We retain personal data only for as long as required for service delivery, legal compliance, dispute resolution, enforcement of agreements, and security purposes.",
      "When retention is no longer necessary, we securely delete, anonymize, or de-identify data, unless continued retention is required by law.",
    ],
  },
  {
    title: "9. Your Rights",
    body: [
      "Subject to applicable law, you may request access to your personal data, correction of inaccurate or incomplete data, deletion/erasure, withdrawal of consent, and grievance redressal.",
      "You may also request account closure. We may retain limited data where required for legal, regulatory, fraud-prevention, or legitimate operational purposes.",
      "To exercise rights, email us at legal@anshapps.com with your registered account details and request type.",
    ],
  },
  {
    title: "10. Account Deletion",
    body: [
      "You may request account deletion by emailing legal@anshapps.com from your registered email ID with subject line \"Account Deletion Request\".",
      "We may verify identity before processing. Once validated, we initiate deletion/anonymization of personal data associated with your account, subject to lawful retention obligations.",
      "Deletion may remove access to product history, records, and service features across ANSH apps linked to that account.",
    ],
  },
  {
    title: "11. Security Practices",
    body: [
      "We maintain reasonable security practices and procedures including access controls, encryption in transit, monitoring, periodic reviews, and administrative safeguards designed to protect data against unauthorized access, disclosure, loss, or misuse.",
      "No system is completely secure. You are responsible for maintaining confidentiality of your credentials and promptly notifying us of suspected misuse.",
    ],
  },
  {
    title: "12. Grievance Officer and Contact",
    body: [
      "For privacy concerns, rights requests, or grievances, contact our Grievance Officer:",
      "Name: [To be updated]",
      "Email: legal@anshapps.com",
      "Address: [To be updated]",
      "We aim to acknowledge and resolve grievances within timelines required by applicable law.",
    ],
  },
  {
    title: "13. Policy Updates",
    body: [
      "We may update this policy from time to time to reflect legal, operational, or product changes. Material updates will be notified through website/app notice or email. Continued use after effective date constitutes acceptance of revised terms.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-[#14141b] to-[#0b0b0f]">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-8">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-primary-bright">
            Legal
          </p>
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-gray-300 md:text-lg">
            Effective Date: 16 April 2026. This policy covers ANSH as the parent
            brand and all ANSH-operated applications and SaaS offerings.
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
          {policySections.map((section) => (
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
