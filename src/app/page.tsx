"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MsmeBadge } from "@/components/shared/msme-badge";
import { TrustCompliance } from "@/components/shared/trust-compliance";
import { translations, Language } from "./translations";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState<Language>("en");
  const [isLangOpen, setIsLangOpen] = useState(false);

  const t = translations[lang];

  // Chip orbit partition
  const orbitItems = (t.hero as any).orbit || [];
  const innerChips = orbitItems.filter((c: any) => c.status === "live");
  const midChips = orbitItems.filter((c: any) => c.status === "building" || ["projects", "calendar"].includes(c.id));
  const outerChips = orbitItems.filter((c: any) => !innerChips.includes(c) && !midChips.includes(c));

  const orbitAppLinks: Record<string, string> = {
    tasks: "https://tasks.anshapps.com/",
    hr: "https://hr.anshapps.com/",
    expense: "https://expense.anshapps.com/",
    visitor: "https://visitor.anshapps.com/",
    forms: "https://forms.anshapps.com/",
    links: "https://links.anshapps.com/",
  };

  const renderOrbitChip = (chip: any) => {
    let dotClass = "status-dot-planned";
    let statusGlow = "0 0 15px rgba(107, 114, 128, 0.25)";
    let statusBorder = "rgba(107, 114, 128, 0.4)";
    
    if (chip.status === "live") {
      dotClass = "status-dot-live";
      statusGlow = "0 0 15px rgba(16, 185, 129, 0.45)";
      statusBorder = "rgba(16, 185, 129, 0.5)";
    } else if (chip.status === "building") {
      dotClass = "status-dot-building";
      statusGlow = "0 0 15px rgba(245, 158, 11, 0.45)";
      statusBorder = "rgba(245, 158, 11, 0.5)";
    }
    
    const chipInner = (
      <>
        <span className={dotClass} />
        <span>{chip.name}</span>
      </>
    );

    const chipClassName = "orbit-chip";
    const chipStyle = {
      "--chip-glow": statusGlow,
      "--chip-border": statusBorder,
    } as React.CSSProperties;

    if (chip.status === "live" && orbitAppLinks[chip.id]) {
      return (
        <a
          href={orbitAppLinks[chip.id]}
          target="_blank"
          rel="noopener noreferrer"
          className={`${chipClassName} cursor-pointer hover:scale-105 transition-transform`}
          style={chipStyle}
        >
          {chipInner}
        </a>
      );
    }

    return (
      <div className={chipClassName} style={chipStyle}>
        {chipInner}
      </div>
    );
  };

  const renderOrbitRing = (
    chips: any[],
    radiusVar: string,
    speed: string,
    orbitClass: "animate-orbit-cw" | "animate-orbit-ccw",
    counterClass: "animate-orbit-ccw" | "animate-orbit-cw",
  ) => {
    if (!chips.length) return null;

    return (
      <div
        className={`absolute inset-0 flex justify-center items-center ${orbitClass} pointer-events-none`}
        style={{ "--orbit-speed": speed } as React.CSSProperties}
      >
        {chips.map((chip: any, index: number) => {
          const angle = (index * 360) / chips.length;
          return (
            <div
              key={chip.id}
              className="absolute pointer-events-auto"
              style={{
                transform: `rotate(${angle}deg) translateX(var(${radiusVar})) rotate(${-angle}deg)`,
              }}
            >
              <div
                className={counterClass}
                style={{ "--orbit-speed": speed } as React.CSSProperties}
              >
                {renderOrbitChip(chip)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMobileHeroOrbit = () => (
    <div className="hero-orbit-stage hero-orbit-stage--mobile md:hidden w-full flex justify-center overflow-hidden">
      <div className="hero-orbit-mobile-scale">
        <div className="orbit-container orbit-container--mobile relative aspect-square flex justify-center items-center">
          <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="orbit-track w-[calc(var(--orbit-r-mobile)*2)] h-[calc(var(--orbit-r-mobile)*2)]" />
          {renderOrbitRing(innerChips, "--orbit-r-mobile", "32s", "animate-orbit-cw", "animate-orbit-ccw")}
          <img
            src="/ANSH.png"
            alt="Ansh Global App Logo"
            className="w-[42%] h-auto animate-float drop-shadow-[0_20px_40px_rgba(99,102,241,0.3)] z-10 relative object-contain"
          />
        </div>
      </div>
    </div>
  );


  // Image map for live apps with real screenshots
  const appScreenshots: Record<string, string> = {
    tasks: "/Ansh Task.jpg",
    hr: "/ANSH HR.jpg",
    expense: "/ANSH Expense.jpg",
    visitor: "/ANSH Visitor.jpg",
    forms: "/ANSH Forms.jpg",
    links: "/ANSH Links.jpg",
  };

  const renderAppMockup = (app: any) => {
    const screenshot = app.id ? appScreenshots[app.id] : undefined;

    return (
      <div className="mock-browser w-full max-w-[500px] mx-auto group-hover:border-primary/20 transition-all duration-300">
        <div className="mock-browser-header">
          <div className="mock-browser-dots">
            <span className="mock-browser-dot red" />
            <span className="mock-browser-dot yellow" />
            <span className="mock-browser-dot green" />
          </div>
          <div className="mock-browser-url">
            {app.link ? app.link.replace("https://", "") : `${app.name.toLowerCase().replace(" ", "")}.anshapps.com`}
          </div>
          <div className="w-8" />
        </div>

        {/* If we have a real screenshot, show it */}
        {screenshot ? (
          <div className="relative overflow-hidden rounded-b-[18px]">
            {/* Subtle glow behind the image */}
            <div className="absolute inset-0 bg-primary/10 blur-[40px] pointer-events-none z-0" />
            <img
              src={screenshot}
              alt={`${app.name} app screenshot`}
              className="w-full h-auto object-cover object-top relative z-10 transition-transform duration-700 group-hover:scale-[1.02]"
              style={{ maxHeight: "340px", display: "block" }}
            />
            {/* Bottom fade overlay for a premium blended look */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0c0c0f] to-transparent z-20 pointer-events-none" />
          </div>
        ) : (
          <div className="mock-browser-body min-h-[260px] flex flex-col justify-between bg-black/40">
            <div className="absolute top-0 right-0 w-36 h-36 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-secondary/5 rounded-full blur-[60px] pointer-events-none" />

            <div className="z-10 flex-grow">
              {app.id === "visitor" && (
                <div className="registry-list text-left">
                  <div className="registry-item border-white/5">
                    <span className="text-white font-medium">Aarav Mehta</span>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">Active</span>
                  </div>
                  <div className="registry-item border-white/5">
                    <span className="text-white font-medium">Ananya Roy</span>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-full">Expected</span>
                  </div>
                  <div className="registry-item border-white/5">
                    <span className="text-white font-medium">Kabir Singh</span>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold bg-gray-500/10 text-gray-400 border border-gray-500/20 px-2.5 py-0.5 rounded-full">Checked Out</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px]">
                    <span className="text-gray-500">QR Pass System</span>
                    <span className="text-emerald-400 font-bold font-mono">LIVE</span>
                  </div>
                </div>
              )}

              {app.id === "bookings" && (
                <div className="scheduler-grid text-left">
                  <div className="scheduler-slot bg-white/[0.02] border-white/5 text-gray-500">
                    <span className="block font-mono text-[9px]">09:00 AM</span>
                    <span className="text-[7px] block mt-1 truncate">Booked</span>
                  </div>
                  <div className="scheduler-slot active">
                    <span className="block font-mono text-[9px]">10:30 AM</span>
                    <span className="text-[7px] block mt-1 font-bold">AVAILABLE</span>
                  </div>
                  <div className="scheduler-slot bg-white/[0.02] border-white/5 text-gray-500">
                    <span className="block font-mono text-[9px]">12:00 PM</span>
                    <span className="text-[7px] block mt-1 truncate">Booked</span>
                  </div>
                  <div className="scheduler-slot active">
                    <span className="block font-mono text-[9px]">02:30 PM</span>
                    <span className="text-[7px] block mt-1 font-bold">AVAILABLE</span>
                  </div>
                </div>
              )}

              {app.id === "forms" && (
                <div className="space-y-2 text-left">
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                    <span className="text-[9px] text-gray-500 uppercase tracking-wider">Contact Form</span>
                    <div className="mt-2 space-y-1.5">
                      <div className="h-2 w-full rounded bg-white/10" />
                      <div className="h-2 w-3/4 rounded bg-white/10" />
                      <div className="h-6 w-20 rounded bg-primary/30 mt-2" />
                    </div>
                  </div>
                  <div className="flex gap-2 text-[8px] text-gray-500 font-mono">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">12 Responses</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">QR Ready</span>
                  </div>
                </div>
              )}

              {app.id === "life" && (
                <div className="space-y-2 text-left">
                  <div className="flex gap-2">
                    <div className="flex-1 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2.5">
                      <span className="text-[8px] text-emerald-400 uppercase font-bold">Goals</span>
                      <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/10">
                        <div className="h-full w-3/4 rounded-full bg-emerald-400" />
                      </div>
                    </div>
                    <div className="flex-1 rounded-lg border border-violet-500/20 bg-violet-500/5 p-2.5">
                      <span className="text-[8px] text-violet-400 uppercase font-bold">Habits</span>
                      <div className="mt-1.5 flex gap-1">
                        {[1, 2, 3, 4, 5].map((d) => (
                          <div key={d} className={`w-2 h-2 rounded-full ${d <= 4 ? "bg-violet-400" : "bg-white/10"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5 flex justify-between items-center">
                    <span className="text-[9px] text-gray-400">Daily Progress</span>
                    <span className="text-[10px] font-bold text-white">78%</span>
                  </div>
                </div>
              )}
            </div>

            <div className="z-10 border-t border-white/5 pt-3 mt-4 text-center flex justify-between items-center text-[9px] text-gray-500 font-mono">
              <span>System Online</span>
              <span>App Preview Space</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Feedback form state
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    phone: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const benefits = {
    en: [
      { title: "No IT Team Required", desc: "Super simple to set up and use by anyone." },
      { title: "Cloud Sync", desc: "Access your business data securely from any device." },
      { title: "100% Mobile Friendly", desc: "Manage your business directly from your mobile phone." },
    ],
    hi: [
      { title: "आईटी टीम की कोई आवश्यकता नहीं", desc: "सेटअप करना और किसी के द्वारा भी उपयोग करना बेहद आसान।" },
      { title: "क्लाउड सिंक", desc: "किसी भी डिवाइस से अपने बिजनेस डेटा को सुरक्षित रूप से एक्सेस करें।" },
      { title: "100% मोबाइल अनुकूल", desc: "अपने मोबाइल फोन से सीधे अपने व्यवसाय का प्रबंधन करें।" },
    ],
  }[lang];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = lang === "hi" ? "कृपया अपना नाम दर्ज करें" : "Please enter your name";
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (formData.phone.trim() && !phoneRegex.test(formData.phone.trim())) {
      errors.phone = lang === "hi" ? "कृपया एक वैध 10-अंकीय व्हाट्सएप नंबर दर्ज करें" :
                     "Please enter a valid 10-digit WhatsApp number";
    }

    if (!formData.message.trim()) {
      errors.message = lang === "hi" ? "कृपया अपनी प्रतिक्रिया या सुझाव दर्ज करें" :
                       "Please enter your feedback or suggestions";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, lang }),
      });

      if (!response.ok) {
        throw new Error("Feedback submission failed");
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError(t.ctaForm.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Intersection Observer for scroll reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [lang]); // Re-run when language changes to ensure new content is observed

  // Sticky Navbar logic
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse Parallax effect for the hero image
  const heroImageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroImageRef.current) return;
      
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (clientX - centerX) / 40;
      const moveY = (clientY - centerY) / 40;
      
      heroImageRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const languages: { code: Language; name: string }[] = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी" },
  ];
  const isLiveStatus = (status: string) => /live|लाइव/i.test(status);
  const isBuildingStatus = (status: string) => /building|बन रहा है/i.test(status);
  const isSoonStatus = (status: string) => /soon|जल्द/i.test(status);

  const businessApps = t.products.business.apps;
  const featuredBusinessApps = businessApps.filter((app: any) => isLiveStatus(app.status) || isBuildingStatus(app.status));
  const upcomingBusinessApps = businessApps.filter((app: any) => isSoonStatus(app.status));
  const personalApps = t.products.personal.apps;

  const founderVisual = {
    en: {
      headline: "One suite. Every business.",
      subline: "Built from Bharat, for local entrepreneurs who deserve better tools.",
      live: "Live",
      building: "Building",
      planned: "Planned",
      explore: "Explore our apps",
      pillars: ["Zero learning curve", "Honest pricing", "Built for daily use"],
    },
    hi: {
      headline: "एक सुइट। हर व्यवसाय के लिए।",
      subline: "भारत से, उन स्थानीय उद्यमियों के लिए जो बेहतर टूल्स के हकदार हैं।",
      live: "लाइव",
      building: "बन रहा है",
      planned: "योजना में",
      explore: "हमारे ऐप्स देखें",
      pillars: ["जीरो लर्निंग कर्व", "ईमानदार कीमत", "दैनिक उपयोग के लिए"],
    },
  }[lang];

  const renderAppRow = (app: any, idx: number) => {
    const isEven = idx % 2 === 0;
    const features = app.features || [];

    return (
      <div
        key={app.id || app.name}
        className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center group"
      >
        <div className={`space-y-6 text-left ${isEven ? "lg:order-1" : "lg:order-2"}`}>
          <div className="flex flex-wrap items-center gap-4">
            <h4 className="text-3xl lg:text-4xl font-extrabold text-white">{app.name}</h4>
            {app.status && (
              <span
                className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                  isLiveStatus(app.status)
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : isBuildingStatus(app.status)
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      : "bg-primary/20 text-primary-bright border-primary/30"
                }`}
              >
                {isLiveStatus(app.status) && (
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                )}
                {isBuildingStatus(app.status) && (
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                  </span>
                )}
                {app.status}
              </span>
            )}
          </div>
          <p className="text-gray-400 text-lg leading-relaxed">{app.desc}</p>

          <ul className="space-y-3 pt-2">
            {features.map((feature: string, fIdx: number) => (
              <li key={fIdx} className="flex items-start text-sm text-gray-500">
                <span className="text-primary-bright mr-2.5 mt-1 text-xs">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {isLiveStatus(app.status) && app.link ? (
            <div className="pt-4">
              <Link
                href={app.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline inline-flex items-center gap-2 text-sm"
              >
                <span>Try {app.name} Now</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="pt-4">
              <span className="inline-flex text-xs font-bold uppercase tracking-wider text-gray-500 bg-white/[0.02] border border-white/5 px-4 py-2.5 rounded-full cursor-not-allowed">
                {isBuildingStatus(app.status)
                  ? (lang === "hi" ? "बन रहा है" : "In Building")
                  : (lang === "hi" ? "जल्द आ रहा है" : "Coming Soon")}
              </span>
            </div>
          )}
        </div>

        <div className={`relative ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          {renderAppMockup(app)}
        </div>
      </div>
    );
  };

  const renderUpcomingAppCard = (app: any) => {
    const features = (app.features || []).slice(0, 4);

    return (
      <div
        key={app.id || app.name}
        className="glass-card p-6 rounded-2xl hover:border-primary/20 transition-all duration-300 text-left flex flex-col h-full"
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <h4 className="text-xl font-bold text-white">{app.name}</h4>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border bg-primary/20 text-primary-bright border-primary/30 shrink-0">
            {lang === "hi" ? "जल्द" : "Soon"}
          </span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">{app.desc}</p>
        <ul className="space-y-2">
          {features.map((feature: string, fIdx: number) => (
            <li key={fIdx} className="flex items-start text-xs text-gray-500">
              <span className="text-primary-bright mr-2 mt-0.5">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderGradientTextWithGlobeEmoji = (text: string) => {
    const globe = "🌍";
    if (!text.includes(globe)) {
      return <span className="gradient-text">{text}</span>;
    }

    const [before, after] = text.split(globe);
    return (
      <>
        {before ? <span className="gradient-text">{before}</span> : null}
        <span className="mx-1 text-white">{globe}</span>
        {after ? <span className="gradient-text">{after}</span> : null}
      </>
    );
  };

  const renderTextWithIndiaFlag = (text: string) => {
    const flag = "🇮🇳";
    if (text.includes(flag)) {
      return text;
    }

    if (/\bIN\b/.test(text)) {
      const parts = text.split(/\bIN\b/);
      const before = parts[0] ?? "";
      const after = parts[1] ?? "";
      return (
        <>
          {before.trimEnd()}
          <span className="mx-1">{flag}</span>
          {after.trimStart()}
        </>
      );
    }

    return (
      <>
        {text}
        <span className="ml-1">{flag}</span>
      </>
    );
  };

  return (
    <main className="min-h-screen">
      
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 flex items-center ${
          isScrolled ? "h-[70px] glass" : "h-[80px]"
        }`}
      >
        <div className="page-container flex justify-between items-center">
          <div className="flex flex-col leading-none cursor-pointer">
            <Link href="#" className="text-2xl font-extrabold font-outfit text-white tracking-widest">
              ANSH
            </Link>
            <span className="text-[10px] md:text-[11px] text-gray-400 font-medium tracking-[0.22em] uppercase mt-1">
              Part of your dream
            </span>
          </div>
          
          <div className="hidden md:flex gap-10 items-center">
            <Link href="#products" className="text-gray-400 font-medium hover:text-white transition-colors duration-300 text-[15px]">{t.nav.products}</Link>
            <Link href="#vision" className="text-gray-400 font-medium hover:text-white transition-colors duration-300 text-[15px]">{t.nav.vision}</Link>
            <Link href="#founder" className="text-gray-400 font-medium hover:text-white transition-colors duration-300 text-[15px]">{t.nav.founder}</Link>
            <Link href="#contact" className="text-gray-400 font-medium hover:text-white transition-colors duration-300 text-[15px]">{t.nav.contact}</Link>
          </div>

          {/* Right side: Language selector */}
          <div className="flex items-center">
            {/* Language Selector — visible on ALL screen sizes */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 text-gray-400 font-medium hover:text-white transition-colors duration-300 text-[14px] bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="hidden xs:inline">{languages.find(l => l.code === lang)?.name}</span>
                <span className="xs:hidden">{languages.find(l => l.code === lang)?.name.slice(0, 2)}</span>
                <svg className={`w-3 h-3 transition-transform ${isLangOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-36 glass border border-white/10 rounded-2xl overflow-hidden shadow-2xl py-1">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        lang === l.code ? "bg-primary text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* SECTION 1 — HERO */}
      <section className="min-h-screen flex items-center relative hero-bg pt-[120px] pb-20 overflow-hidden">
        <div className="page-container w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
            
            {/* Left Side */}
            <div className="z-10">
              <div className="text-primary-bright font-semibold uppercase tracking-widest mb-6 text-lg reveal">
                {t.hero.tagline}
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-[70px] leading-[1.1] font-extrabold mb-8 reveal">
                {t.hero.title1} <br />
                <span className="gradient-text">{t.hero.title2}</span>
              </h1>
              <div className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-lg reveal delay-100">
                <p className="mb-4">
                  {t.hero.desc1}
                </p>
                <p>
                  {t.hero.desc2}
                </p>
              </div>
              <div className="flex flex-col gap-4 reveal delay-200">
                <div className="flex flex-wrap gap-4">
                  <Link href="#get-started" className="btn btn-primary">
                    {t.hero.btnPrimary}
                  </Link>
                  <Link href="#products" className="btn btn-outline">
                    {t.hero.btnOutline}
                  </Link>
                </div>

                {/* Status Dot Legend */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-semibold tracking-wider text-gray-400 bg-white/[0.02] border border-white/5 px-4.5 py-2.5 rounded-full backdrop-blur-md w-fit">
                  <div className="flex items-center gap-2">
                    <span className="status-dot-live w-2.5 h-2.5" />
                    <span>{(t.hero as any).legend?.live || "Live Apps"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="status-dot-building w-2.5 h-2.5" />
                    <span>{(t.hero as any).legend?.building || "In Building"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="status-dot-planned w-2.5 h-2.5" />
                    <span>{(t.hero as any).legend?.planned || "In Plan"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side — mobile: live apps orbit | tablet+: full orbit */}
            <div className="relative flex justify-center items-center reveal order-first lg:order-last w-full min-w-0">
              {renderMobileHeroOrbit()}

              <div className="hero-orbit-stage hidden md:flex">
              <div className="orbit-container relative w-full max-w-[450px] aspect-square flex justify-center items-center">
                {/* Fallback glow if image doesn't load */}
                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
                
                {/* Orbit Tracks (Dashed Circles) */}
                <div className="orbit-track w-[calc(var(--orbit-r-inner)*2)] h-[calc(var(--orbit-r-inner)*2)]" />
                <div className="orbit-track w-[calc(var(--orbit-r-mid)*2)] h-[calc(var(--orbit-r-mid)*2)]" />
                <div className="orbit-track w-[calc(var(--orbit-r-outer)*2)] h-[calc(var(--orbit-r-outer)*2)]" />

                {renderOrbitRing(innerChips, "--orbit-r-inner", "45s", "animate-orbit-cw", "animate-orbit-ccw")}
                {renderOrbitRing(midChips, "--orbit-r-mid", "55s", "animate-orbit-ccw", "animate-orbit-cw")}
                {renderOrbitRing(outerChips, "--orbit-r-outer", "70s", "animate-orbit-cw", "animate-orbit-ccw")}

                {/* Ensure ANSH.png is present in the public folder */}
                <img 
                  ref={heroImageRef}
                  src="/ANSH.png" 
                  alt="Ansh Global App Logo" 
                  className="w-[50%] h-auto animate-float drop-shadow-[0_20px_40px_rgba(99,102,241,0.3)] z-10 relative object-contain transition-transform duration-75"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // If visual test image fails, replace with a CSS fallback
                    target.style.display = 'none';
                    target.parentElement?.classList.add('bg-gradient-to-tr', 'from-indigo-600', 'to-purple-600', 'rounded-3xl', 'shadow-[0_20px_60px_-15px_rgba(99,102,241,0.6)]', 'w-[45%]', 'h-[45%]');
                  }}
                />
              </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2 — OUR VISION */}
      <section id="vision" className="py-32 relative">
        <div className="page-container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            
            <div className="reveal">
              <span className="text-primary-bright font-semibold uppercase tracking-widest text-sm mb-4 block">{t.vision.tagline}</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-[1.2]">
                {t.vision.title}
              </h2>
              <div className="text-gray-400 text-lg leading-relaxed space-y-6">
                <p>{t.vision.desc1}</p>
                <p>{t.vision.desc2}</p>
              </div>
            </div>

            <div className="reveal md:mt-20">
              <div className="glass-card p-10 rounded-[32px]">
                <p className="text-lg text-gray-300 italic mb-8 uppercase tracking-wide leading-relaxed">
                  &quot;{t.vision.quote}&quot;
                </p>
                
                <h4 className="text-white font-bold mb-4 text-xl">{t.vision.believeTitle}</h4>
                <ul className="space-y-4 text-gray-400 text-[17px]">
                  <li className="flex items-start">
                    <span className="text-primary-bright mr-3">•</span>
                    {t.vision.believe1}
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-bright mr-3">•</span>
                    {t.vision.believe2}
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-bright mr-3">•</span>
                    {t.vision.believe3}
                  </li>
                </ul>

                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-white font-semibold text-lg">
                    {t.vision.footer1}
                  </p>
                  <p className="text-gray-400 mt-2">
                    {t.vision.footer2}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2.5 — OUR MISSION */}
      <section id="mission" className="py-32 relative bg-[#0c0c0e]/40 border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_50%)] pointer-events-none" />
        <div className="page-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24 items-center">
            
            {/* Left Column: Visual Graph */}
            <div className="reveal">
              <div className="glass-card p-8 rounded-[32px] min-h-[350px] flex flex-col justify-between relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                
                {/* Visual Connection Nodes */}
                <div className="mission-graph">
                  {/* Center Node (Ansh Suite) */}
                  <div className="mission-node center-node animate-float" style={{ left: 'calc(50% - 37.5px)', top: 'calc(50% - 37.5px)' }}>
                    <span className="text-white font-extrabold text-sm font-outfit tracking-widest">ANSH</span>
                  </div>

                  {/* Connectors & Surrounding Nodes */}
                  {/* Node 1: Operations */}
                  <div className="mission-connector" style={{ left: '50%', top: '50%', width: '90px', transform: 'rotate(-30deg)' }} />
                  <div className="mission-node" style={{ left: 'calc(50% + 60px)', top: 'calc(50% - 80px)' }}>
                    <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                    </svg>
                  </div>

                  {/* Node 2: Growth */}
                  <div className="mission-connector" style={{ left: '50%', top: '50%', width: '90px', transform: 'rotate(90deg)' }} />
                  <div className="mission-node" style={{ left: 'calc(50% - 25px)', top: 'calc(50% + 75px)' }}>
                    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>

                  {/* Node 3: Efficiency */}
                  <div className="mission-connector" style={{ left: '50%', top: '50%', width: '90px', transform: 'rotate(210deg)' }} />
                  <div className="mission-node" style={{ left: 'calc(50% - 110px)', top: 'calc(50% - 80px)' }}>
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                <div className="z-10 border-t border-white/5 pt-4 text-center pointer-events-none">
                  <span className="text-[11px] font-mono text-gray-500 uppercase tracking-widest">Bridging The Technology Gap</span>
                </div>
              </div>
            </div>

            {/* Right Column: Mission Content */}
            <div className="reveal">
              <span className="text-primary-bright font-semibold uppercase tracking-widest text-sm mb-4 block">
                {(t as any).mission?.tagline || "Our Mission"}
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-[1.2]">
                {(t as any).mission?.title}
              </h2>
              <div className="text-gray-400 text-lg leading-relaxed mb-10 space-y-4">
                <p>{(t as any).mission?.desc1}</p>
                <p>{(t as any).mission?.desc2}</p>
              </div>

              {/* Mission Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-2xl hover:border-primary/20 transition-all duration-300 text-left">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 font-bold text-sm">1</div>
                  <h4 className="text-white font-bold mb-2 text-base">{(t as any).mission?.point1Title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{(t as any).mission?.point1Desc}</p>
                </div>
                <div className="glass-card p-6 rounded-2xl hover:border-primary/20 transition-all duration-300 text-left">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 font-bold text-sm">2</div>
                  <h4 className="text-white font-bold mb-2 text-base">{(t as any).mission?.point2Title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{(t as any).mission?.point2Desc}</p>
                </div>
                <div className="glass-card p-6 rounded-2xl hover:border-primary/20 transition-all duration-300 text-left">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 font-bold text-sm">3</div>
                  <h4 className="text-white font-bold mb-2 text-base">{(t as any).mission?.point3Title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{(t as any).mission?.point3Desc}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3 — OUR ECOSYSTEM */}
      <section id="products" className="py-32">
        <div className="page-container">
          
          <div className="text-center mb-24 reveal">
            <span className="text-primary-bright font-semibold uppercase tracking-widest text-sm mb-4 block underline underline-offset-8 decoration-primary/30">{t.products.tagline}</span>
            <h2 className="text-5xl md:text-6xl font-extrabold">{t.products.title}</h2>
          </div>

          <div className="w-full">
            
            {/* For Business Column */}
            <div className="flex flex-col reveal">
              <div className="mb-16 border-l-4 border-primary pl-8 text-left">
                <h3 className="text-4xl font-bold mb-3 text-white">{t.products.business.title}</h3>
                <p className="text-gray-400 text-xl leading-relaxed">{t.products.business.subtitle}</p>
              </div>

              {/* Featured Apps — Live & In Building */}
              <div className="space-y-32">
                {featuredBusinessApps.map((app: any, idx: number) => renderAppRow(app, idx))}
              </div>

              {/* Coming Soon — compact grid (scales as more apps are added) */}
              {upcomingBusinessApps.length > 0 && (
                <div className="mt-32">
                  <h4 className="text-2xl font-bold text-white mb-8 text-left">
                    {lang === "hi" ? "जल्द आ रहे हैं" : "Coming Soon"}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingBusinessApps.map((app: any) => renderUpcomingAppCard(app))}
                  </div>
                </div>
              )}

            </div>

            {/* For Personal Growth */}
            <div className="flex flex-col reveal mt-32">
              <div className="mb-16 border-l-4 border-secondary pl-8 text-left">
                <h3 className="text-4xl font-bold mb-3 text-white">{t.products.personal.title}</h3>
                <p className="text-gray-400 text-xl leading-relaxed">{t.products.personal.subtitle}</p>
              </div>

              <div className="space-y-32">
                {personalApps.map((app: any, idx: number) => renderAppRow(app, idx))}
              </div>
            </div>
          </div>

          <div className="text-center mt-32 reveal delay-400">
            <p className="text-gray-500 text-xl font-medium italic">
              {t.products.more}
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 4 — FOUNDER'S NOTE */}
      <section id="founder" className="py-32 bg-[#111114]">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-24 items-center">
            
            <div className="reveal">
              <span className="text-primary-bright font-semibold uppercase tracking-widest text-sm mb-4 block">{t.founder.tagline}</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-10">{t.founder.title}</h2>
              <div className="text-gray-400 text-[19px] leading-[1.7] space-y-6">
                <p>{t.founder.p1}</p>
                <p>{t.founder.p2}</p>
                <p>{t.founder.p3}</p>
                
                <div className="h-px w-full bg-white/10 my-8"></div>
                
                <p>{t.founder.p4}</p>
                <p>{t.founder.p5}</p>

                <p className="font-semibold text-white text-xl mt-8 italic border-l-4 border-primary-bright pl-6">
                  &quot;{t.founder.quote}&quot;
                </p>
              </div>
            </div>

            <div className="reveal order-first lg:order-last flex justify-center items-center">
              <div className="relative w-full max-w-[420px]">
                {/* Ambient glow */}
                <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-110 pointer-events-none" />

                <div className="relative rounded-[32px] border border-white/10 bg-[#0c0c0e]/60 backdrop-blur-xl p-10 sm:p-12 text-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_60%)] pointer-events-none" />

                  {/* Center mark */}
                  <div className="relative mx-auto mb-10 w-28 h-28">
                    <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_20s_linear_infinite]" style={{ borderStyle: "dashed" }} />
                    <div className="absolute inset-3 rounded-full bg-gradient-to-br from-primary/30 to-fuchsia-500/20 border border-white/10 flex items-center justify-center">
                      <span className="text-3xl font-extrabold font-outfit text-white tracking-tight">A</span>
                    </div>
                    <span className="absolute -top-1 right-2 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]" />
                  </div>

                  <h3 className="relative text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">
                    {founderVisual.headline}
                  </h3>
                  <p className="relative text-gray-400 text-sm leading-relaxed mb-10 max-w-[280px] mx-auto">
                    {founderVisual.subline}
                  </p>

                  {/* Clean stats row */}
                  <div className="relative grid grid-cols-3 gap-3 mb-10">
                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] py-4 px-2">
                      <p className="text-3xl font-extrabold text-emerald-400 font-outfit">4</p>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">{founderVisual.live}</p>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] py-4 px-2">
                      <p className="text-3xl font-extrabold text-amber-400 font-outfit">3</p>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">{founderVisual.building}</p>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] py-4 px-2">
                      <p className="text-3xl font-extrabold text-white/70 font-outfit">16+</p>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">{founderVisual.planned}</p>
                    </div>
                  </div>

                  {/* Principle pills */}
                  <div className="relative flex flex-wrap justify-center gap-2 mb-10">
                    {founderVisual.pillars.map((pillar) => (
                      <span key={pillar} className="text-[11px] text-gray-400 border border-white/8 bg-white/[0.02] rounded-full px-3.5 py-1.5">
                        {pillar}
                      </span>
                    ))}
                  </div>

                  <Link href="#products" className="relative btn btn-outline inline-flex items-center gap-2 text-sm">
                    <span>{founderVisual.explore}</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL SECTION (CTA) */}
      <section id="get-started" className="py-24 relative overflow-hidden">
        <span id="contact" className="absolute top-0"></span>
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 blur-[130px] rounded-full pointer-events-none"></div>
        
        <div className="page-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Copywriting */}
            <div className="text-left reveal">
              <span className="text-primary-bright font-bold uppercase tracking-widest text-sm mb-4 block">
                {t.cta.slogan}
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-[1.15] text-white">
                {t.cta.title1} <span className="gradient-text">{renderTextWithIndiaFlag(t.cta.title2)}</span> <br />
                {t.cta.title3} {renderGradientTextWithGlobeEmoji(t.cta.title4)}
              </h2>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-lg">
                {t.cta.desc}
              </p>

              {/* Guarantees */}
              <div className="space-y-6 mb-8">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-1">
                      <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base">{benefit.title}</h4>
                      <p className="text-sm text-gray-400">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Premium Glassmorphism Lead Form */}
            <div className="reveal">
              <div className="glass-card p-8 md:p-10 rounded-[32px] border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] relative overflow-hidden backdrop-blur-md">
                {/* Glow detail */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-primary/20 rounded-full blur-[50px] pointer-events-none"></div>

                {!isSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-outfit">
                        {t.ctaForm.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {t.ctaForm.desc}
                      </p>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                        {t.ctaForm.labelName}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t.ctaForm.placeholderName}
                        className={`w-full bg-white/[0.03] border ${
                          formErrors.name ? "border-red-500/50" : "border-white/10"
                        } rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300`}
                      />
                      {formErrors.name && (
                        <p className="text-xs text-red-400 mt-1 font-medium">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Business Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                        {t.ctaForm.labelBusiness}
                      </label>
                      <input
                        type="text"
                        name="business"
                        value={formData.business}
                        onChange={handleInputChange}
                        placeholder={t.ctaForm.placeholderBusiness}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                        {t.ctaForm.labelPhone}
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">
                          +91
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          maxLength={10}
                          placeholder={t.ctaForm.placeholderPhone}
                          className={`w-full bg-white/[0.03] border ${
                            formErrors.phone ? "border-red-500/50" : "border-white/10"
                          } rounded-xl pl-14 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300`}
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-xs text-red-400 mt-1 font-medium">{formErrors.phone}</p>
                      )}
                    </div>

                    {submitError && (
                      <p className="text-sm text-red-400 font-medium leading-relaxed">{submitError}</p>
                    )}

                    {/* Feedback Message */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                        {t.ctaForm.labelMessage}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder={t.ctaForm.placeholderMessage}
                        className={`w-full bg-white/[0.03] border ${
                          formErrors.message ? "border-red-500/50" : "border-white/10"
                        } rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 resize-none`}
                      />
                      {formErrors.message && (
                        <p className="text-xs text-red-400 mt-1 font-medium">{formErrors.message}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 space-y-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn btn-primary py-3.5 text-sm !rounded-xl relative flex justify-center items-center overflow-hidden group cursor-pointer"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <span className="font-bold">{t.ctaForm.btnSubmit}</span>
                            <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </button>

                      <a
                        href="mailto:hello@anshapps.com"
                        className="w-full inline-flex items-center justify-center gap-2 border border-blue-500/20 bg-blue-500/[0.06] hover:bg-blue-500/[0.12] text-blue-400 font-bold py-3.5 px-4 rounded-xl text-sm transition-all duration-300"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {t.ctaForm.btnEmail}
                      </a>
                    </div>
                  </form>
                ) : (
                  <div className="py-8 text-center space-y-6 animate-[fadeIn_0.5s_ease-out]">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-extrabold text-white">
                        {t.ctaForm.successTitle}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed px-2">
                        {t.ctaForm.successDesc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 space-y-4">
                      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 text-left text-xs text-gray-400 space-y-1">
                        <div className="flex justify-between"><span>Name:</span><span className="text-white font-bold">{formData.name}</span></div>
                        {formData.business && (
                          <div className="flex justify-between"><span>Business:</span><span className="text-white font-bold">{formData.business}</span></div>
                        )}
                        {formData.phone && (
                          <div className="flex justify-between"><span>WhatsApp:</span><span className="text-white font-mono">+91 {formData.phone}</span></div>
                        )}
                        <div className="flex flex-col mt-2 pt-2 border-t border-white/5">
                          <span className="text-[10px] uppercase font-bold text-gray-500 mb-1">Feedback:</span>
                          <p className="text-white text-xs leading-normal whitespace-pre-wrap">{formData.message}</p>
                        </div>
                      </div>
                      
                      <a
                        href="mailto:hello@anshapps.com"
                        className="w-full inline-flex items-center justify-center gap-2 border border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-bold py-3 px-4 rounded-xl text-sm transition-all duration-300"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {lang === "hi" ? "हमें ईमेल भेजें" : "Email Us Now"}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION — ANSH VISION MINI */}
      <section className="py-20 border-t border-white/5 bg-[#08090d] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_45%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.1),transparent_45%)] pointer-events-none" />
        <div className="page-container relative z-10">
          <div className="glass-card rounded-[30px] border-white/10 p-8 md:p-12 flex flex-col lg:flex-row gap-10 lg:items-center lg:justify-between shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
            <div className="max-w-3xl">
              <span className="text-primary-bright font-semibold uppercase tracking-[0.22em] text-xs md:text-sm block mb-4">
                ANSH Vision
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                ANSH Vision starts where ordinary thinking ends.
              </h3>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                We are building beyond software - across business, education, research, social impact, and frontier innovation for generations to come.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/vision"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn btn-primary px-8 py-3.5 text-sm md:text-base rounded-xl"
              >
                <span>Vision ✨</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustCompliance />

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#060608] pt-24 pb-12 overflow-hidden">
        <div className="page-container">
          
          {/* Giant Header: Ansh Apps */}
          <div className="text-center mb-20 select-none">
            <h1 className="text-8xl sm:text-[7rem] md:text-[190px] lg:text-[250px] font-black tracking-tighter font-outfit bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#ec4899] bg-clip-text text-transparent leading-none">
              Ansh Apps
            </h1>
          </div>

          {/* Footer Grid Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-[1.2fr_0.8fr_1.2fr] gap-12 md:gap-16 pb-16">
            
            {/* Column 1: Brand Info */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                {/* Clean matching logo emblem */}
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#ec4899] flex items-center justify-center p-[1.5px] shadow-[0_4px_12px_rgba(99,102,241,0.2)]">
                  <div className="w-full h-full bg-[#060608] rounded-[6px] flex items-center justify-center font-extrabold text-[11px] text-white tracking-widest font-outfit">
                    A
                  </div>
                </div>
                <span className="text-xl font-bold font-outfit text-white tracking-wider">ANSH Apps</span>
              </div>
              <p className="text-[14px] text-gray-400 leading-relaxed max-w-[260px]">
                Simple, fast, and affordable apps built to run your business and simplify your daily life.
              </p>
            </div>

            {/* Column 2: Product Links */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Product</span>
              <div className="flex flex-col gap-3 text-[14px] text-gray-400">
                <a href="https://tasks.anshapps.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ansh Tasks</a>
                <a href="https://hr.anshapps.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ansh HR</a>
                <a href="https://expense.anshapps.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ansh Expense</a>
                <a href="https://visitor.anshapps.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ansh Visitor</a>
                <a href="https://forms.anshapps.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ansh Forms</a>
                <a href="https://links.anshapps.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ansh Links</a>
                <a href="#products" className="hover:text-white transition-colors">Ansh Bookings</a>
              </div>
            </div>

            {/* Column 3: Contact / Get in Touch */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Get In Touch</span>
              <p className="text-[14px] text-gray-400 leading-relaxed max-w-[280px]">
                Have questions or need custom business plans? Talk to our creators.
              </p>
              <div className="flex items-center gap-2 mt-1 group">
                <svg className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:hello@anshapps.com" className="text-[14px] text-emerald-400 font-semibold hover:underline">
                  hello@anshapps.com
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <MsmeBadge href="#trust-compliance" />
              <div className="flex gap-6 text-xs text-gray-500">
                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
            <p className="text-xs text-gray-500">© 2026 ANSH Apps. All rights reserved.</p>
          </div>

        </div>
      </footer>

    </main>
  );
}
