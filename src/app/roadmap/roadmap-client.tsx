"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const phases = [
  {
    id: 1,
    title: "Business + Personal Ecosystem",
    tag: "Building the Foundation",
    items: null as string[] | null,
    split: true as const,
    whyTitle: "Two engines, one ecosystem",
    whyParagraphs: [
      "We do not boast about 10× sales or pretend we are rewriting physics. Our motto stays plain: no jargon, no buzzwords, no “scale fast” or “10× growth” talk—just honest tools that help people move.",
      "Simple apps: to get your work done, to save your time, to make your life a little easier. Work and life both matter, so we build for businesses and for individuals in one grounded ecosystem.",
      "We are not claiming to invent things that do not already exist. Taking inspiration from what others have built—and improving on it with care—is not weakness; it is how good products actually ship.",
      "Money has to come from somewhere. Later phases need fuel, and this foundation phase is where that fuel gets earned. Phase 1 is not a side note—it is what makes the rest of the roadmap even possible.",
    ],
  },
  {
    id: 2,
    title: "Education System",
    tag: "Shaping Future Minds",
    items: ["Schools", "Colleges", "AI Learning Apps", "Skill Labs"],
    split: false as const,
    whyTitle: "Education is everyone's right",
    whyParagraphs: [
      "Access matters—but the way we teach matters just as much. We believe learning should turn people into creators and thinkers, not into servants who only know how to take orders.",
      "Creativity is the motto: schools, colleges, and AI-assisted learning should expand imagination, judgment, and agency—not shrink them.",
    ],
  },
  {
    id: 3,
    title: "Defense & Security",
    tag: "Protecting Humanity",
    items: ["Cybersecurity", "AI Defense", "Robotics", "Space Security"],
    split: false as const,
    whyTitle: "Security without surrendering what makes us human",
    whyParagraphs: [
      "As tools grow more powerful, risk grows too. We invest in cybersecurity, AI defense, robotics, and space security to protect people and institutions—not to trade away trust or freedom.",
      "Defense, done right, widens the space where ordinary life can breathe safely.",
    ],
  },
  {
    id: 4,
    title: "Welfare & Governance",
    tag: "Empowering Society",
    items: ["Healthcare", "Legal", "Governance Systems"],
    split: false as const,
    whyTitle: "Systems that exist to serve people",
    whyParagraphs: [
      "Healthcare, legal access, and governance should feel humane and fair. Technology here is not an excuse for cold bureaucracy—it should reduce suffering and restore confidence in collective life.",
      "We care about welfare and institutions that leave no one invisible.",
    ],
  },
  {
    id: 5,
    title: "Exploration",
    tag: "Beyond Earth",
    items: ["Space Tech", "Multi-planet Systems"],
    split: false as const,
    whyTitle: "A civilization worth carrying forward",
    whyParagraphs: [
      "Earth is home, not a ceiling. Space technology and multi-planet thinking are long-horizon insurance and aspiration: learning to thrive beyond one world.",
      "Exploration keeps curiosity and cooperation larger than scarcity—and reminds us we are one species on a small stage under a wide sky.",
    ],
  },
] as const;

const businessApps = [
  "CRM",
  "Booking",
  "Payroll",
  "Task Management",
  "Forms",
  "Automation tools",
];

const personalApps = [
  "Expense Tracker",
  "Focus / Productivity App",
  "Notes / Knowledge App",
  "Personal AI Assistant",
  "Habit Tracker",
];

function IconBriefcase({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M21 13.255V20a2 2 0 01-2 2H5a2 2 0 01-2-2v-6.745M9 3h6v4H9V3zM3 8h18v5H3V8z"
      />
    </svg>
  );
}

function IconUserCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function Phase1Split() {
  return (
    <div className="grid min-w-0 gap-6 md:grid-cols-2 md:gap-10">
      <div className="min-w-0 rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-cyan-500/[0.08] to-transparent p-6 md:p-7 shadow-[inset_0_1px_0_0_rgba(34,211,238,0.15)]">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/15 text-cyan-300">
            <IconBriefcase className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300/90">Section A</p>
            <p className="font-outfit text-lg font-bold text-white">Business Apps (B2B)</p>
          </div>
        </div>
        <ul className="space-y-2.5 text-[15px] leading-snug text-slate-300 md:text-base">
          {businessApps.map((label) => (
            <li key={label} className="flex items-start gap-2.5 md:items-center">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              {label}
            </li>
          ))}
        </ul>
      </div>
      <div className="min-w-0 rounded-2xl border border-violet-400/25 bg-gradient-to-br from-violet-500/[0.1] to-transparent p-6 md:p-7 shadow-[inset_0_1px_0_0_rgba(167,139,250,0.15)]">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-300">
            <IconUserCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-300/90">Section B</p>
            <p className="font-outfit text-lg font-bold text-white">Personal Apps (B2C)</p>
          </div>
        </div>
        <ul className="space-y-2.5 text-[15px] leading-snug text-slate-300 md:text-base">
          {personalApps.map((label) => (
            <li key={label} className="flex items-start gap-2.5 md:items-center">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PhaseWhyPanel({
  phase,
  cardOnLeft,
}: {
  phase: (typeof phases)[number];
  cardOnLeft: boolean;
}) {
  const timelineGutter = cardOnLeft
    ? "md:pl-12 md:pr-4"
    : "md:pr-12 md:pl-4";

  return (
    <aside
      className={`roadmap-why-panel roadmap-reveal relative w-full pl-14 pr-4 pt-8 text-left md:w-1/2 md:pt-4 ${timelineGutter}`}
    >
      <div className="rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.05] to-transparent p-6 shadow-[0_0_48px_-12px_rgba(99,102,241,0.35),inset_0_1px_0_0_rgba(255,255,255,0.06)] md:mx-auto md:max-w-md">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-indigo-300/85">
          Why this phase
        </p>
        <h3 className="font-outfit text-xl font-bold leading-snug text-white md:text-2xl">{phase.whyTitle}</h3>
        <div className="mt-4 space-y-3 text-left text-[15px] leading-relaxed text-slate-400">
          {phase.whyParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </aside>
  );
}

function PhaseCardBody({ phase }: { phase: (typeof phases)[number] }) {
  if (phase.split) {
    return <Phase1Split />;
  }
  return (
    <ul className="mt-5 space-y-2.5 text-[15px] text-slate-300">
      {phase.items?.map((label) => (
        <li key={label} className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400 shadow-[0_0_10px_rgba(129,140,248,0.6)]" />
          {label}
        </li>
      ))}
    </ul>
  );
}

export default function RoadmapClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("roadmap-reveal-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".roadmap-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Star = { x: number; y: number; r: number; tw: number; o: number; s: number };
    let stars: Star[] = [];

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(140, Math.floor((window.innerWidth * window.innerHeight) / 12000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.3,
        tw: Math.random() * Math.PI * 2,
        o: Math.random() * 0.5 + 0.35,
        s: 0.4 + Math.random() * 1.2,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const tick = (t: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        st.tw += 0.015 * st.s;
        const alpha = st.o * (0.55 + 0.45 * Math.sin(st.tw));
        ctx.beginPath();
        ctx.fillStyle = `rgba(226,232,240,${alpha})`;
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030308] text-white">
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.55]"
        aria-hidden
      />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.18),transparent_55%)]" />

      <div className="relative z-10">
        <header className="border-b border-white/[0.06] bg-[#030308]/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-[90rem] items-center justify-between px-6 py-5">
            <Link href="/" className="font-outfit text-xl font-extrabold tracking-[0.2em] text-white">
              ANSH
            </Link>
            <Link
              href="/"
              className="text-sm font-semibold text-slate-400 transition-colors hover:text-white"
            >
              ← Back home
            </Link>
          </div>
        </header>

        <section className="mx-auto max-w-[90rem] px-6 pb-8 pt-16 text-center md:pt-24">
          <p className="roadmap-reveal mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-indigo-300/90">
            Roadmap
          </p>
          <h1 className="roadmap-reveal font-outfit text-4xl font-extrabold tracking-tight md:text-6xl md:leading-[1.08]">
            The <span className="gradient-text">ANSH</span> Vision
          </h1>
          <p className="roadmap-reveal mx-auto mt-6 max-w-2xl text-lg text-slate-400 md:text-xl">
            From individuals to civilizations
          </p>
        </section>

        <section className="relative mx-auto max-w-[90rem] px-6 pb-32 pt-12">
          {/* Center timeline — desktop */}
          <div
            className="roadmap-timeline-line pointer-events-none absolute left-1/2 top-0 hidden h-full w-[3px] -translate-x-1/2 md:block"
            aria-hidden
          />
          {/* Mobile timeline */}
          <div
            className="roadmap-timeline-line pointer-events-none absolute left-6 top-0 h-full w-[3px] md:hidden"
            aria-hidden
          />

          <div className="relative flex flex-col gap-20 md:gap-28">
            {phases.map((phase, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={phase.id}
                  className={`relative flex flex-col md:flex-row md:items-stretch ${
                    isLeft ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline node */}
                  <div
                    className={`absolute left-[calc(1.5rem+1.5px)] top-10 z-20 flex -translate-x-1/2 items-center justify-center rounded-full md:left-1/2 md:top-12 ${
                      phase.id === 1
                        ? "roadmap-live-ring h-5 w-5 border-2 border-emerald-400/80 bg-gradient-to-br from-emerald-400 to-cyan-500"
                        : "h-4 w-4 border-2 border-white/40 bg-gradient-to-br from-cyan-400 to-fuchsia-500 shadow-[0_0_20px_rgba(129,140,248,0.9)]"
                    }`}
                  >
                    <span
                      className={`rounded-full bg-white ${phase.id === 1 ? "h-2 w-2 shadow-[0_0_8px_#fff]" : "h-1.5 w-1.5"}`}
                    />
                  </div>
                  {phase.id === 1 ? (
                    <p className="pointer-events-none absolute left-[calc(1.5rem+1.5px)] top-[3.25rem] z-20 -translate-x-1/2 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-300 md:left-1/2 md:top-[3.75rem]">
                      Now
                    </p>
                  ) : null}

                  <div
                    className={`roadmap-reveal w-full pl-14 pr-4 pt-2 text-left md:w-1/2 md:px-0 ${isLeft ? "md:pr-14" : "md:pl-14"}`}
                  >
                    <div
                      className={`roadmap-card glass-card group rounded-[28px] border bg-white/[0.02] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] ${
                        phase.id === 1
                          ? "border-emerald-500/25 shadow-[0_0_48px_-12px_rgba(52,211,153,0.2),0_0_0_1px_rgba(255,255,255,0.04)_inset]"
                          : "border-white/[0.08]"
                      } ${phase.split ? "w-full lg:p-10" : "md:max-w-xl"} ${isLeft ? "md:ml-auto" : "md:mr-auto"}`}
                    >
                      <div className="flex flex-col items-start gap-2">
                        <div className="flex flex-wrap items-center justify-start gap-2">
                          <span className="inline-flex w-fit items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-200">
                            Phase {phase.id}
                          </span>
                          {phase.id === 1 ? (
                            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-500/[0.12] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-200 shadow-[0_0_20px_-4px_rgba(52,211,153,0.45)]">
                              <span className="relative flex h-2 w-2 shrink-0">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                              </span>
                              Live · We are here
                            </span>
                          ) : null}
                        </div>
                        <h2 className="font-outfit text-2xl font-bold text-white md:text-3xl">{phase.title}</h2>
                        <p className="text-base font-medium text-fuchsia-200/90">&ldquo;{phase.tag}&rdquo;</p>
                      </div>
                      <div className="mt-8 text-left">
                        <PhaseCardBody phase={phase} />
                      </div>
                    </div>
                  </div>

                  <PhaseWhyPanel phase={phase} cardOnLeft={isLeft} />
                </div>
              );
            })}
          </div>
        </section>

        <section className="relative mx-auto max-w-[90rem] px-6 pb-12 pt-4">
          <div className="roadmap-reveal mx-auto max-w-3xl rounded-[28px] border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent px-8 py-12 text-center shadow-[0_0_60px_-20px_rgba(99,102,241,0.25)] md:px-12 md:py-14">
            <p className="text-lg leading-relaxed text-slate-400 md:text-xl">
              I know many will laugh—or quietly assume this roadmap is just a cloudy dream floating too high above
              reality.
            </p>
            <p className="mt-8 font-outfit text-2xl font-semibold leading-snug text-white md:text-3xl">
              Dreams come true because someone dares to dream them first.
            </p>
            <p className="mt-6 text-base font-medium text-slate-300 md:text-lg">
              I will make it happen.{" "}
              <span className="gradient-text font-semibold">The rest, the Universe will handle.</span>
            </p>
            <p className="mt-10 font-outfit text-lg tracking-wide text-slate-500">- <span className="gradient-text">Rahul Raj</span></p>
          </div>
        </section>

        <footer className="border-t border-white/[0.06] py-10 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} ANSH — Less noise. More impact.</p>
        </footer>
      </div>
    </main>
  );
}
