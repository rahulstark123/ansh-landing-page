"use client";

import Link from "next/link";

const aspirationPillars = [
  {
    icon: "💼",
    title: "Business Ecosystem",
    desc: "Software that helps organizations manage work, people, expenses, visitors, operations, and growth with clarity.",
  },
  {
    icon: "🎓",
    title: "Education",
    desc: "ANSH Schools and ANSH Colleges focused on practical learning, innovation, entrepreneurship, and future-ready leadership.",
  },
  {
    icon: "🔬",
    title: "Research & Development",
    desc: "Advanced R&D across AI, robotics, healthcare innovation, scientific discovery, and emerging technologies.",
  },
  {
    icon: "❤️",
    title: "Social Impact",
    desc: "An ANSH Foundation dedicated to education access, community development, opportunity creation, and meaningful support.",
  },
  {
    icon: "🛰️",
    title: "Space Exploration",
    desc: "Long-horizon research into satellites, space technologies, deep space systems, and future human expansion beyond Earth.",
  },
  {
    icon: "🛡️",
    title: "Defence & Security Technologies",
    desc: "Innovation in aerospace systems, advanced engineering, robotics, and security technologies that strengthen resilience.",
  },
  {
    icon: "🤝",
    title: "Public Collaboration",
    desc: "Partnership with governments, institutions, researchers, businesses, and communities to solve large-scale challenges.",
  },
  {
    icon: "📰",
    title: "ANSH Media House",
    desc: "A modern media ecosystem for storytelling, knowledge sharing, and meaningful content that informs and inspires society.",
  },
  {
    icon: "🎬",
    title: "ANSH Productions",
    desc: "A creative production arm focused on high-quality digital, cinematic, and educational content built for global audiences.",
  },
];

const reasonLines = [
  "Because the future cannot be built by software alone.",
  "It requires education.",
  "It requires research.",
  "It requires innovation.",
  "It requires people willing to think beyond today's problems.",
];

export default function VisionPage() {
  return (
    <main className="min-h-screen bg-[#05060a] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.1),transparent_35%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.14),transparent_42%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.16),transparent_45%)] pointer-events-none" />

      <section className="pt-24 md:pt-32 pb-14 md:pb-18 relative z-10">
        <div className="page-container">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-10"
          >
            <span aria-hidden="true">←</span>
            Back to Home
          </Link>

          <div className="max-w-4xl">
            <span className="text-primary-bright uppercase tracking-[0.24em] text-xs md:text-sm font-semibold block mb-5">
              ANSH Vision
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.06] mb-6">
              Built from Bharat.
              <br />
              Ready for the World.
              <br />
              Built for the Future.
            </h1>
            <p className="text-gray-300 text-lg md:text-2xl leading-relaxed max-w-3xl">
              ANSH Vision starts where conventional thinking stops.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 relative z-10">
        <div className="page-container">
          <div className="glass-card rounded-[32px] border-white/10 p-8 md:p-12">
            <p className="text-2xl md:text-4xl font-bold leading-tight mb-6">
              We are not building just software.
            </p>
            <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-4xl">
              We are building an ecosystem that empowers businesses, education, research, innovation, and humanity&apos;s future.
            </p>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mt-6 max-w-4xl">
              ANSH believes technology should not be limited to one industry. Our vision extends across multiple domains that can create meaningful impact for generations to come.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 relative z-10">
        <div className="page-container">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">What ANSH Aspires To Build</h2>
            <p className="text-gray-400 text-base md:text-lg max-w-3xl">
              A long-term mission spanning technology, institutions, and impact at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {aspirationPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md hover:border-primary/30 transition-colors duration-300"
              >
                <span className="text-2xl mb-4 block">{pillar.icon}</span>
                <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{pillar.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 relative z-10">
        <div className="page-container">
          <div className="rounded-[28px] border border-white/10 bg-[#0a0b10]/80 p-8 md:p-12">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-6">Why?</h2>
            <div className="space-y-3">
              {reasonLines.map((line) => (
                <p key={line} className="text-gray-300 text-lg leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
            <div className="h-px w-full bg-white/10 my-8" />
            <p className="text-white text-xl md:text-2xl font-semibold leading-relaxed">
              ANSH exists to build solutions that matter.
            </p>
            <p className="text-gray-400 text-base md:text-lg mt-4 leading-relaxed">
              For businesses. For society. For humanity.
            </p>
          </div>
        </div>
      </section>

      <section className="pt-10 pb-20 relative z-10">
        <div className="page-container">
          <div className="glass-card rounded-[32px] border-white/10 p-10 md:p-14 text-center">
            <p className="text-xl md:text-3xl font-bold leading-relaxed">
              Built from Bharat. Ready for the World. Built for the Future.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/" className="btn btn-outline px-6 py-3 rounded-xl text-sm">
                Back to Home
              </Link>
              <a href="mailto:hello@anshapps.com" className="btn btn-primary px-6 py-3 rounded-xl text-sm">
                Connect with ANSH
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
