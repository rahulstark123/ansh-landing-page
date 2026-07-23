"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { SiteFooter } from "@/components/shared/site-footer";
import { TrustCompliance } from "@/components/shared/trust-compliance";
import { DarkCountrySelect } from "@/components/shared/dark-country-select";
import Lottie from "lottie-react";
import { translations, Language } from "./translations";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState<Language>("en");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [founderLottieData, setFounderLottieData] = useState<any>(null);

  // Initialize theme and fetch Lottie JSONs on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    fetch("https://lottie.host/63cd0e46-bbec-4cc6-ad89-0bd884164f8b/fJOmx5T5M6.json")
      .then((res) => res.json())
      .then((data) => setFounderLottieData(data))
      .catch((err) => console.error("Error loading Founder Lottie animation:", err));
  }, []);

  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const t = translations[lang];

  // Chip orbit partition — live on inner, building on mid, planned on outer
  const orbitItems = (t.hero as any).orbit || [];
  const innerChips = orbitItems.filter((c: any) => c.status === "live");
  const midChips = orbitItems.filter((c: any) => c.status === "building");
  const outerChips = orbitItems.filter((c: any) => c.status === "planned");

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
            alt="ANSH Apps logo"
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

  const initiativeScreenshots: Record<string, string> = {
    rentawas: "/rentawas.jpg",
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
              alt={`${app.name} screenshot by ANSH Apps`}
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
      { title: "Clean & Simple", desc: "Software anyone can use in minutes — no steep learning curve." },
      { title: "Built to Scale", desc: "From first user to growing teams, our products grow with you." },
      { title: "Global First", desc: "Modern software designed for people and businesses worldwide." },
    ],
    hi: [
      { title: "साफ़ और सरल", desc: "सॉफ्टवेयर जो कोई भी मिनटों में उपयोग कर सके — कोई कठिन लर्निंग कर्व नहीं।" },
      { title: "स्केल के लिए बना", desc: "पहले उपयोगकर्ता से बढ़ती टीमों तक — हमारे उत्पाद आपके साथ बढ़ते हैं।" },
      { title: "ग्लोबल फ़र्स्ट", desc: "दुनिया भर के लोगों और व्यवसायों के लिए डिज़ाइन किया गया आधुनिक सॉफ्टवेयर।" },
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

    if (formData.phone && !isValidPhoneNumber(formData.phone)) {
      errors.phone = lang === "hi" ? "कृपया एक वैध व्हाट्सएप नंबर दर्ज करें" :
                     "Please enter a valid WhatsApp number";
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

  const businessApps = t.products.business.apps;
  const featuredBusinessApps = businessApps.filter(
    (app: any) =>
      app.id !== "bookings" &&
      (isLiveStatus(app.status) || isBuildingStatus(app.status))
  );
  const propertyApps = t.products.property.apps;
  const comingSoonProducts = t.products.comingSoon.apps;

  const initiativeIcon = (icon: string) => {
    const className = "h-6 w-6";
    switch (icon) {
      case "briefcase":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 13.255V20a2 2 0 01-2 2H5a2 2 0 01-2-2v-6.745M9 3h6v4H9V3zM3 8h18v5H3V8z" />
          </svg>
        );
      case "home":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6" />
          </svg>
        );
      case "graduation":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" />
          </svg>
        );
      case "spark":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case "wallet":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case "video":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case "code":
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      default:
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

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
            <Link href="#" className="text-xl md:text-2xl font-extrabold font-cormorant text-white tracking-wide">
              ANSH Apps
            </Link>
            <span className="text-[10px] md:text-[11px] text-gray-400 font-medium tracking-[0.22em] uppercase mt-1">
              Software ecosystem
            </span>
          </div>
          
          <div className="hidden md:flex gap-10 items-center">
            <Link href="#products" className="text-gray-400 font-medium hover:text-white transition-colors duration-300 text-[15px]">{t.nav.products}</Link>
            <Link href="#about" className="text-gray-400 font-medium hover:text-white transition-colors duration-300 text-[15px]">{t.nav.vision}</Link>
            <Link href="#founder" className="text-gray-400 font-medium hover:text-white transition-colors duration-300 text-[15px]">{t.nav.founder}</Link>
            <a href="https://saathi.anshapps.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 font-medium hover:text-white transition-colors duration-300 text-[15px]">{lang === "hi" ? "साथी" : "Saathi"}</a>
            <Link href="#contact" className="text-gray-400 font-medium hover:text-white transition-colors duration-300 text-[15px]">{t.nav.contact}</Link>
          </div>

          {/* Right side: Saathi CTA + Language selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://saathi.anshapps.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center whitespace-nowrap rounded-full border border-white/12 bg-white/[0.03] px-4 sm:px-5 py-2 text-[13px] sm:text-[14px] font-semibold tracking-wide shadow-[0_0_16px_-6px_rgba(99,102,241,0.45),0_0_16px_-6px_rgba(168,85,247,0.35)] transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_0_22px_-4px_rgba(99,102,241,0.55),0_0_22px_-4px_rgba(168,85,247,0.45)]"
            >
              <span className="gradient-text font-cormorant">ANSH Saathi</span>
            </a>

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

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-300 bg-white/5 p-2 rounded-full border border-white/10 cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <svg className="w-4.5 h-4.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="5" fill="currentColor" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.72-12.72l1.42-1.42" />
                </svg>
              ) : (
                <svg className="w-4.5 h-4.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" fill="currentColor" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
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
              <h1 className="mb-8 reveal">
                <span className="block text-5xl md:text-6xl lg:text-[70px] leading-[1.1] font-extrabold gradient-text mb-4">
                  ANSH Apps
                </span>
                <span className="block text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-extrabold text-white">
                  {t.hero.title1} <br />
                  <span className="gradient-text">{t.hero.title2}</span>
                </span>
              </h1>
              <div className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-lg reveal delay-100">
                <p className="mb-4">
                  {t.hero.desc1}
                </p>
                {t.hero.desc2 ? <p>{t.hero.desc2}</p> : null}
              </div>
              <div className="flex flex-col gap-4 reveal delay-200">
                <div className="flex flex-wrap gap-4">
                  <Link href="#products" className="btn btn-primary">
                    {t.hero.btnPrimary}
                  </Link>
                  <Link href="#initiatives" className="btn btn-outline">
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
                  alt="ANSH Apps logo" 
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

      {/* SECTION 2 — ABOUT */}
      <section id="about" className="py-32 relative">
        <div className="page-container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            
            <div className="reveal">
              <span className="text-primary-bright font-semibold uppercase tracking-widest text-sm mb-4 block">{t.about.tagline}</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-[1.2]">
                {t.about.title}
              </h2>
              <div className="text-gray-400 text-lg leading-relaxed space-y-6">
                <p>{t.about.desc1}</p>
                <p>{t.about.desc2}</p>
              </div>
            </div>

            <div className="reveal md:mt-20">
              <div className="glass-card p-10 rounded-[32px]">
                <p className="text-lg text-gray-300 italic mb-8 uppercase tracking-wide leading-relaxed">
                  &quot;{t.about.quote}&quot;
                </p>
                
                <h4 className="text-white font-bold mb-4 text-xl">{t.about.believeTitle}</h4>
                <ul className="space-y-4 text-gray-400 text-[17px]">
                  <li className="flex items-start">
                    <span className="text-primary-bright mr-3">•</span>
                    {t.about.believe1}
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-bright mr-3">•</span>
                    {t.about.believe2}
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-bright mr-3">•</span>
                    {t.about.believe3}
                  </li>
                </ul>

                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-white font-semibold text-lg">
                    {t.about.footer1}
                  </p>
                  <p className="text-gray-400 mt-2">
                    {t.about.footer2}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2.5 — WHY ANSH APPS */}
      <section id="why" className="py-32 relative bg-[#0c0c0e]/40 border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_50%)] pointer-events-none" />
        <div className="page-container relative z-10">
          <div className="text-center mb-16 reveal max-w-3xl mx-auto">
            <span className="text-primary-bright font-semibold uppercase tracking-widest text-sm mb-4 block">
              {t.why.tagline}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-[1.2]">
              {t.why.title}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">{t.why.desc}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
            {t.why.cards.map((card, idx) => (
              <div
                key={card.title}
                className="glass-card p-7 rounded-2xl hover:border-primary/20 transition-all duration-300 text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-bright mb-5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-white font-bold mb-2 text-lg">{card.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
                <span className="sr-only">{idx + 1}</span>
              </div>
            ))}
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

          <div className="w-full space-y-32">
            
            {/* Business Productivity */}
            <div className="flex flex-col reveal">
              <div className="mb-16 border-l-4 border-primary pl-8 text-left">
                <h3 className="text-4xl font-bold mb-3 text-white">{t.products.business.title}</h3>
                <p className="text-gray-400 text-xl leading-relaxed">{t.products.business.subtitle}</p>
              </div>

              <div className="space-y-32">
                {featuredBusinessApps.map((app: any, idx: number) => renderAppRow(app, idx))}
              </div>
            </div>

            {/* Property Management */}
            <div id="products-property" className="flex flex-col reveal scroll-mt-28">
              <div className="mb-16 border-l-4 border-amber-500/70 pl-8 text-left">
                <h3 className="text-4xl font-bold mb-3 text-white">{t.products.property.title}</h3>
                <p className="text-gray-400 text-xl leading-relaxed">{t.products.property.subtitle}</p>
              </div>

              <div className="space-y-24">
                {propertyApps.map((app: any, idx: number) => {
                  const screenshot = initiativeScreenshots[app.id] || appScreenshots[app.id];
                  const building = isBuildingStatus(app.status);
                  return (
                    <div
                      key={app.id}
                      className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center group"
                    >
                      <div className={`space-y-5 text-left ${idx % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
                        <div className="flex flex-wrap items-center gap-3">
                          <h4 className="text-3xl lg:text-4xl font-extrabold text-white">{app.name}</h4>
                          {app.badge ? (
                            <span className="inline-flex items-center text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border bg-primary/20 text-primary-bright border-primary/30">
                              {app.badge}
                            </span>
                          ) : null}
                          {app.status ? (
                            <span
                              className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                                building
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              }`}
                            >
                              <span className="relative flex h-2 w-2 shrink-0">
                                <span
                                  className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                                    building ? "bg-amber-400" : "bg-emerald-400"
                                  }`}
                                />
                                <span
                                  className={`relative inline-flex h-2 w-2 rounded-full ${
                                    building ? "bg-amber-500" : "bg-emerald-500"
                                  }`}
                                />
                              </span>
                              {app.status}
                            </span>
                          ) : null}
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed">{app.desc}</p>
                        {app.features?.length ? (
                          <ul className="space-y-3 pt-2">
                            {app.features.map((feature: string, fIdx: number) => (
                              <li key={fIdx} className="flex items-start text-sm text-gray-500">
                                <span className="text-primary-bright mr-2.5 mt-1 text-xs">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        <div className="pt-2">
                          {building ? (
                            <span className="inline-flex text-xs font-bold uppercase tracking-wider text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-4 py-2.5 rounded-full">
                              {lang === "hi" ? "बन रहा है" : "In Building"}
                            </span>
                          ) : app.link ? (
                            <Link
                              href={app.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline inline-flex items-center gap-2 text-sm"
                            >
                              <span>{t.initiatives.visit} {app.name}</span>
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </Link>
                          ) : null}
                        </div>
                      </div>

                      <div className={`${idx % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
                        {screenshot ? (
                          <div className="mock-browser w-full max-w-[560px] mx-auto group-hover:border-primary/20 transition-all duration-300">
                            <div className="mock-browser-header">
                              <div className="mock-browser-dots">
                                <span className="mock-browser-dot red" />
                                <span className="mock-browser-dot yellow" />
                                <span className="mock-browser-dot green" />
                              </div>
                              <div className="mock-browser-url">
                                {app.link ? app.link.replace("https://", "") : app.name}
                              </div>
                              <div className="w-8" />
                            </div>
                            <div className="relative overflow-hidden rounded-b-[18px]">
                              <div className="absolute inset-0 bg-primary/10 blur-[40px] pointer-events-none z-0" />
                              <img
                                src={screenshot}
                                alt={`${app.name} — powered by ANSH Apps`}
                                className="w-full h-auto object-cover object-top relative z-10 transition-transform duration-700 group-hover:scale-[1.02]"
                                style={{ maxHeight: "360px", display: "block" }}
                              />
                              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0c0c0f] to-transparent z-20 pointer-events-none" />
                            </div>
                          </div>
                        ) : (
                          renderAppMockup(app)
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Coming Soon categories */}
            <div className="flex flex-col reveal">
              <div className="mb-12 border-l-4 border-primary/40 pl-8 text-left">
                <h3 className="text-4xl font-bold mb-3 text-white">{t.products.comingSoon.title}</h3>
                <p className="text-gray-400 text-xl leading-relaxed">{t.products.comingSoon.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comingSoonProducts.map((app: any) => renderUpcomingAppCard(app))}
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

      {/* SECTION 3.5 — OUR INITIATIVES */}
      <section id="initiatives" className="py-32 relative bg-[#0c0c0e]/40 border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.06),transparent_50%)] pointer-events-none" />
        <div className="page-container relative z-10">
          <div className="text-center mb-20 reveal">
            <span className="text-primary-bright font-semibold uppercase tracking-widest text-sm mb-4 block underline underline-offset-8 decoration-primary/30">
              {t.initiatives.tagline}
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-4">{t.initiatives.title}</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t.initiatives.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {t.initiatives.cards.map((card) => {
              const isLive = card.status === "live";
              const isBuilding = card.status === "building";
              const statusLabel = isLive
                ? t.initiatives.liveLabel
                : isBuilding
                  ? t.initiatives.buildingLabel
                  : t.initiatives.comingSoonLabel;
              const statusClass = isLive
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : isBuilding
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                  : "bg-primary/20 text-primary-bright border-primary/30";
              const CardInner = (
                <>
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-bright">
                      {initiativeIcon(card.icon)}
                    </div>
                    <span
                      className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border shrink-0 ${statusClass}`}
                    >
                      {statusLabel}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{card.name}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed flex-grow">{card.desc}</p>
                </>
              );

              if ((isLive || isBuilding) && "href" in card && card.href) {
                return (
                  <Link
                    key={card.id}
                    href={card.href}
                    className="glass-card p-6 rounded-2xl hover:border-primary/25 transition-all duration-300 text-left flex flex-col h-full reveal group"
                  >
                    {CardInner}
                  </Link>
                );
              }

              return (
                <div
                  key={card.id}
                  className="glass-card p-6 rounded-2xl hover:border-primary/20 transition-all duration-300 text-left flex flex-col h-full reveal"
                >
                  {CardInner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3.75 — ROADMAP */}
      <section id="roadmap" className="py-32 relative">
        <div className="page-container relative z-10">
          <div className="text-center mb-20 reveal">
            <span className="text-primary-bright font-semibold uppercase tracking-widest text-sm mb-4 block underline underline-offset-8 decoration-primary/30">
              {t.roadmap.tagline}
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-4">{t.roadmap.title}</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t.roadmap.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent md:-translate-x-px pointer-events-none" />

            <div className="space-y-16">
              <div className="relative reveal pl-12 md:pl-0">
                <div className="md:grid md:grid-cols-2 md:gap-16 items-start">
                  <div className="md:text-right md:pr-8 mb-6 md:mb-0">
                    <div className="inline-flex items-center gap-3 md:justify-end">
                      <span className="text-4xl md:text-5xl font-extrabold gradient-text">{t.roadmap.year}</span>
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400 mt-2">
                      {t.roadmap.yearLabel}
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[2.15rem] md:-left-8 top-2 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0a0a0c] shadow-[0_0_12px_rgba(52,211,153,0.6)]" />
                    <ul className="space-y-3">
                      {t.roadmap.shipped.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-gray-300 text-base md:text-lg">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                            <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative reveal pl-12 md:pl-0">
                <div className="md:grid md:grid-cols-2 md:gap-16 items-start">
                  <div className="md:text-right md:pr-8 mb-6 md:mb-0">
                    <p className="text-3xl md:text-4xl font-extrabold text-amber-300/90">{t.roadmap.buildingTitle}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[2.15rem] md:-left-8 top-2 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-[#0a0a0c] shadow-[0_0_12px_rgba(251,191,36,0.55)]" />
                    <ul className="space-y-3">
                      {t.roadmap.building.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-gray-300 text-base md:text-lg">
                          <span className="w-5 h-5 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                            <span className="relative flex h-2 w-2">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                            </span>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative reveal pl-12 md:pl-0">
                <div className="md:grid md:grid-cols-2 md:gap-16 items-start">
                  <div className="md:text-right md:pr-8 mb-6 md:mb-0">
                    <p className="text-3xl md:text-4xl font-extrabold text-white">{t.roadmap.comingTitle}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[2.15rem] md:-left-8 top-2 w-3.5 h-3.5 rounded-full bg-primary-bright border-2 border-[#0a0a0c] shadow-[0_0_12px_rgba(129,140,248,0.5)]" />
                    <ul className="space-y-3">
                      {t.roadmap.upcoming.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-gray-400 text-base md:text-lg">
                          <span className="w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 text-[10px] text-primary-bright font-bold">
                            •
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
              <div className="w-full max-w-[420px] aspect-square flex items-center justify-center relative overflow-hidden">
                {founderLottieData ? (
                  <Lottie 
                    animationData={founderLottieData} 
                    loop={true} 
                    className="w-full h-full object-contain relative z-10" 
                  />
                ) : (
                  <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                )}
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
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-cormorant">
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
                      <PhoneInput
                        international
                        defaultCountry="IN"
                        countryCallingCodeEditable={false}
                        countrySelectComponent={DarkCountrySelect}
                        value={formData.phone || undefined}
                        onChange={(value) => {
                          setFormData((prev) => ({
                            ...prev,
                            phone: value ?? "",
                          }));
                          if (formErrors.phone) {
                            setFormErrors((prev) => {
                              const next = { ...prev };
                              delete next.phone;
                              return next;
                            });
                          }
                        }}
                        placeholder={t.ctaForm.placeholderPhone}
                        className={`PhoneInput feedback-phone ${
                          formErrors.phone ? "feedback-phone--error" : ""
                        }`}
                      />
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
                          <div className="flex justify-between"><span>WhatsApp:</span><span className="text-white font-mono">{formData.phone}</span></div>
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

      {/* SECTION — ANSH SAATHI */}
      <section id="partners" className="py-20 border-t border-white/5 bg-[#0b0b10] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.12),transparent_45%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_40%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.1),transparent_45%)] pointer-events-none" />
        <div className="page-container relative z-10">
          <div className="glass-card rounded-[30px] border-white/10 p-8 md:p-12 flex flex-col lg:flex-row gap-10 lg:items-center lg:justify-between shadow-[0_20px_50px_rgba(0,0,0,0.45)] reveal relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#ec4899]"
              aria-hidden="true"
            />

            <div className="max-w-3xl">
              <span className="text-primary-bright font-semibold uppercase tracking-[0.22em] text-xs md:text-sm block mb-4">
                ANSH Saathi — Global Channel Partner Program
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">
                {lang === "hi"
                  ? "ANSH Saathi बनें — साथ चलें, साथ बढ़ें।"
                  : "Become an ANSH Saathi."}
              </h3>

              <div
                className="mb-4 h-1 w-24 overflow-hidden rounded-full bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#ec4899]"
                aria-hidden="true"
              />

              <p className="text-lg md:text-xl font-semibold font-cormorant mb-4 bg-gradient-to-r from-[#38bdf8] via-white to-[#ec4899] bg-clip-text text-transparent">
                {lang === "hi"
                  ? "सबके लिए खुला। कोई भी पार्टनर बन सकता है।"
                  : "Open to all. Anyone can become a channel partner."}
              </p>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                {lang === "hi"
                  ? "छात्र, फ्रीलांसर, सलाहकार, एजेंसी या उद्यमी — दुनिया में कहीं से भी। लोगों को ANSH Apps के आधुनिक सॉफ़्टवेयर खोजने में मदद करें और अपनी रिकरिंग आय बनाएँ। कोई जॉइनिंग फीस नहीं।"
                  : "Student, freelancer, consultant, agency, or entrepreneur — from anywhere in the world. Help people discover modern ANSH Apps software and build your own recurring income. No joining fee."}
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {(lang === "hi"
                  ? ["सबके लिए खुला", "किसी भी देश से", "कोई जॉइनिंग फीस नहीं", "तकनीकी ज्ञान ज़रूरी नहीं"]
                  : ["Open to everyone", "Any country", "No joining fee", "No tech background needed"]
                ).map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs md:text-[13px] font-medium text-gray-300"
                  >
                    <svg className="w-3.5 h-3.5 text-primary-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0">
              <a
                href="https://saathi.anshapps.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn btn-primary px-8 py-3.5 text-sm md:text-base rounded-xl"
              >
                <span>{lang === "hi" ? "पार्टनर बनें" : "Become a Partner"}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION — ANSH VISION MINI (temporarily hidden) */}
      {false && (
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
                We are building a software ecosystem — across productivity, property, education, AI, and frontier innovation for generations to come.
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
      )}

      <TrustCompliance />

      <SiteFooter msmeHref="#trust-compliance" />

    </main>
  );
}
