"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { translations, Language } from "./translations";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState<Language>("en");
  const [isLangOpen, setIsLangOpen] = useState(false);

  const t = translations[lang];

  // Chip orbit partition
  const orbitItems = (t.hero as any).orbit || [];
  const innerChips = orbitItems.filter((c: any) => c.status === "live");
  const midChips = orbitItems.filter((c: any) => c.status === "building" || ["crm", "inventory", "projects", "calendar"].includes(c.id));
  const outerChips = orbitItems.filter((c: any) => !innerChips.includes(c) && !midChips.includes(c));

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
    
    return (
      <div
        className="orbit-chip"
        style={{
          "--chip-glow": statusGlow,
          "--chip-border": statusBorder,
        } as React.CSSProperties}
      >
        <span className={dotClass} />
        <span>{chip.name}</span>
      </div>
    );
  };

  const appFeatures = {
    en: [
      ["Assign tasks to staff in 1-click", "Real-time task completion progress", "Visual Kanban board tracking"],
      ["Digital check-in & check-out registry", "Leave logs & attendance history", "Secure employee directories"],
      ["Shareable appointment calendar links", "Custom daily available slots setup", "Automated email & text reminders"],
      ["Organized client contact directory", "Track lead stages (Hot / Warm / Proposal)", "Detailed client history log"],
      ["Real-time quantity & count monitoring", "Smart low stock alert notifications", "Simple stock-in & stock-out tracker"]
    ],
    hi: [
      ["१-क्लिक में स्टाफ को काम सौंपें", "वास्तविक समय में काम पूरा होने की प्रगति", "विजुअल कानबान बोर्ड ट्रैकिंग"],
      ["डिजिटल चेक-इन और चेक-आउट रजिस्ट्री", "छुट्टी के लॉग और उपस्थिति का इतिहास", "सुरक्षित कर्मचारी डायरेक्टरी"],
      ["साझा करने योग्य अपॉइंटमेंट कैलेंडर लिंक", "दैनिक उपलब्ध स्लॉट का कस्टम सेटअप", "स्वचालित ईमेल और संदेश रिमाइंडर"],
      ["व्यवस्थित ग्राहक संपर्क डायरेक्टरी", "लीड चरणों को ट्रैक करें (हॉट / वार्म / प्रस्ताव)", "विस्तृत ग्राहक इतिहास लॉग"],
      ["वास्तविक समय में स्टॉक की मात्रा की निगरानी", "स्मार्ट लो-स्टॉक अलर्ट नोटिफिकेशन", "सरल स्टॉक-इन और स्टॉक-आउट ट्रैकर"]
    ]
  }[lang];

  // Image map for live apps with real screenshots
  const appScreenshots: Record<number, string> = {
    0: "/Ansh Task.jpg",
    1: "/ANSH HR.jpg",
    2: "/ANSH Expense.jpg",
  };

  const renderAppMockup = (idx: number, app: any) => {
    const screenshot = appScreenshots[idx];

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
              {idx === 3 && (
                <div className="registry-list text-left">
                  <div className="registry-item border-white/5">
                    <span className="text-white font-medium">Rahul Sharma</span>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">Hot Lead</span>
                  </div>
                  <div className="registry-item border-white/5">
                    <span className="text-white font-medium">Priya Patel</span>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">Proposal Sent</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px]">
                    <span className="text-gray-500">Win Rate</span>
                    <span className="text-white font-bold font-mono">78%</span>
                  </div>
                </div>
              )}

              {idx === 4 && (
                <div className="text-left">
                  <table className="inventory-table">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>In Stock</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-white font-medium">Steel Rods</td>
                        <td className="font-mono text-gray-300">120 pcs</td>
                        <td className="text-emerald-400 font-semibold">Healthy</td>
                      </tr>
                      <tr>
                        <td className="text-white font-medium">Copper Wire</td>
                        <td className="font-mono text-gray-300">15 rolls</td>
                        <td className="text-amber-400 font-semibold">Low Alert</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Scheduler for Bookings (idx 2 in wireframe path, but now handled by screenshot) */}
              {idx !== 3 && idx !== 4 && (
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
        <div className="max-w-[1200px] mx-auto w-full px-8 flex justify-between items-center">
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
        <div className="max-w-[1200px] mx-auto px-8 w-full">
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
              <div className="flex flex-wrap items-center gap-6 reveal delay-200">
                <div className="flex flex-wrap gap-4">
                  <Link href="#get-started" className="btn btn-primary">
                    {t.hero.btnPrimary}
                  </Link>
                  <Link href="#products" className="btn btn-outline">
                    {t.hero.btnOutline}
                  </Link>
                </div>

                {/* Status Dot Legend */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-semibold tracking-wider text-gray-400 bg-white/[0.02] border border-white/5 px-4.5 py-2.5 rounded-full backdrop-blur-md">
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

            {/* Right Side */}
            <div className="relative flex justify-center items-center reveal order-first lg:order-last">
              <div className="orbit-container relative w-full max-w-[450px] aspect-square flex justify-center items-center">
                {/* Fallback glow if image doesn't load */}
                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
                
                {/* Orbit Tracks (Dashed Circles) */}
                <div className="orbit-track w-[calc(var(--orbit-r-inner)*2)] h-[calc(var(--orbit-r-inner)*2)]" />
                <div className="orbit-track w-[calc(var(--orbit-r-mid)*2)] h-[calc(var(--orbit-r-mid)*2)]" />
                <div className="orbit-track w-[calc(var(--orbit-r-outer)*2)] h-[calc(var(--orbit-r-outer)*2)]" />

                {/* Inner Orbit (Speed: 45s, CW) */}
                <div
                  className="absolute inset-0 flex justify-center items-center animate-orbit-cw pointer-events-none"
                  style={{ "--orbit-speed": "45s" } as React.CSSProperties}
                >
                  {innerChips.map((chip: any, index: number) => {
                    const angle = (index * 360) / innerChips.length;
                    return (
                      <div
                        key={chip.id}
                        className="absolute pointer-events-auto"
                        style={{
                          transform: `rotate(${angle}deg) translateX(var(--orbit-r-inner)) rotate(${-angle}deg)`,
                        }}
                      >
                        <div
                          className="animate-orbit-ccw"
                          style={{ "--orbit-speed": "45s" } as React.CSSProperties}
                        >
                          {renderOrbitChip(chip)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Middle Orbit (Speed: 55s, CCW) */}
                <div
                  className="absolute inset-0 flex justify-center items-center animate-orbit-ccw pointer-events-none"
                  style={{ "--orbit-speed": "55s" } as React.CSSProperties}
                >
                  {midChips.map((chip: any, index: number) => {
                    const angle = (index * 360) / midChips.length;
                    return (
                      <div
                        key={chip.id}
                        className="absolute pointer-events-auto"
                        style={{
                          transform: `rotate(${angle}deg) translateX(var(--orbit-r-mid)) rotate(${-angle}deg)`,
                        }}
                      >
                        <div
                          className="animate-orbit-cw"
                          style={{ "--orbit-speed": "55s" } as React.CSSProperties}
                        >
                          {renderOrbitChip(chip)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Outer Orbit (Speed: 70s, CW) */}
                <div
                  className="absolute inset-0 flex justify-center items-center animate-orbit-cw pointer-events-none"
                  style={{ "--orbit-speed": "70s" } as React.CSSProperties}
                >
                  {outerChips.map((chip: any, index: number) => {
                    const angle = (index * 360) / outerChips.length;
                    return (
                      <div
                        key={chip.id}
                        className="absolute pointer-events-auto"
                        style={{
                          transform: `rotate(${angle}deg) translateX(var(--orbit-r-outer)) rotate(${-angle}deg)`,
                        }}
                      >
                        <div
                          className="animate-orbit-ccw"
                          style={{ "--orbit-speed": "70s" } as React.CSSProperties}
                        >
                          {renderOrbitChip(chip)}
                        </div>
                      </div>
                    );
                  })}
                </div>

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
      </section>

      {/* SECTION 2 — OUR VISION */}
      <section id="vision" className="py-32 relative">
        <div className="max-w-[1200px] mx-auto px-8 relative z-10">
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
        <div className="max-w-[1200px] mx-auto px-8 relative z-10">
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
        <div className="max-w-[1200px] mx-auto px-8">
          
          <div className="text-center mb-24 reveal">
            <span className="text-primary-bright font-semibold uppercase tracking-widest text-sm mb-4 block underline underline-offset-8 decoration-primary/30">{t.products.tagline}</span>
            <h2 className="text-5xl md:text-6xl font-extrabold">{t.products.title}</h2>
          </div>

          <div className="max-w-[1100px] mx-auto">
            
            {/* For Business Column */}
            <div className="flex flex-col reveal">
              <div className="mb-16 border-l-4 border-primary pl-8 text-left">
                <h3 className="text-4xl font-bold mb-3 text-white">{t.products.business.title}</h3>
                <p className="text-gray-400 text-xl leading-relaxed">{t.products.business.subtitle}</p>
              </div>

              {/* Alternating App Rows */}
              <div className="space-y-32">
                {t.products.business.apps.map((app: any, idx: number) => {
                  const isEven = idx % 2 === 0;
                  const features = appFeatures[idx] || [];

                  return (
                    <div 
                      key={idx} 
                      className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center group"
                    >
                      {/* Left: Info details */}
                      <div className={`space-y-6 text-left ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
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
                        
                        {/* Bullet Highlights */}
                        <ul className="space-y-3 pt-2">
                          {features.map((feature: string, fIdx: number) => (
                            <li key={fIdx} className="flex items-start text-sm text-gray-500">
                              <span className="text-primary-bright mr-2.5 mt-1 text-xs">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Visit link button */}
                        {app.link ? (
                          <div className="pt-4">
                            <Link
                              href={app.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline inline-flex items-center gap-2 text-sm"
                            >
                              <span>Try {app.name} Now</span>
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                            </Link>
                          </div>
                        ) : (
                          <div className="pt-4">
                            <span className="inline-flex text-xs font-bold uppercase tracking-wider text-gray-500 bg-white/[0.02] border border-white/5 px-4 py-2.5 rounded-full cursor-not-allowed">
                              Coming Soon
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Right: Wireframe Mockup Container */}
                      <div className={`relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        {renderAppMockup(idx, app)}
                      </div>
                    </div>
                  );
                })}
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
        <div className="max-w-[1200px] mx-auto px-8">
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
              <div className="relative w-full max-w-[460px] aspect-square rounded-[32px] border border-white/10 bg-[#0c0c0e]/80 p-6 overflow-hidden flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md group hover:border-primary/30 transition-all duration-500">
                {/* Background Grid & Glows */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/25 transition-colors duration-500 pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary/15 rounded-full blur-[80px] pointer-events-none"></div>

                {/* Dashboard Header */}
                <div className="z-10 flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                    </div>
                    <span className="text-[11px] font-bold font-outfit uppercase tracking-[0.25em] text-gray-400">ANSH Suite OS</span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono tracking-wider">Workspace active</span>
                </div>

                {/* 2x2 Grid of Apps */}
                <div className="z-10 flex-grow grid grid-cols-2 gap-4 mb-4">
                  {/* Card 1: Ansh Tasks (Purple/Violet Theme) */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3.5 flex flex-col justify-between hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-lg bg-violet-500/10 flex items-center justify-center border border-violet-500/20 text-violet-400">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-white font-outfit">Tasks</span>
                      </div>
                      <span className="text-[8px] font-black uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-full inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                      </span>
                    </div>
                    {/* Mini Task List */}
                    <div className="space-y-1.5 flex-grow flex flex-col justify-center">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-md bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                          <svg className="w-2 h-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                        </div>
                        <span className="text-[10px] text-gray-400 line-through">Setup Landing Page</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-400"></div>
                        </div>
                        <span className="text-[10px] text-white font-medium">Design System</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-md bg-white/5 border border-white/10"></div>
                        <span className="text-[10px] text-gray-500">Deploy Server</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Ansh Bookings (Indigo Theme) */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3.5 flex flex-col justify-between hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-white font-outfit">Bookings</span>
                      </div>
                      <span className="text-[8px] font-black uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded-full inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        Building
                      </span>
                    </div>
                    {/* Calendar slot preview */}
                    <div className="space-y-1.5 flex-grow flex flex-col justify-center">
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-1.5 flex flex-col">
                        <span className="text-[7px] text-indigo-400 font-bold uppercase tracking-wider">Coming up</span>
                        <span className="text-[10px] text-white font-semibold leading-tight mt-0.5 truncate">Client Sync Call</span>
                        <span className="text-[8px] text-gray-400 font-mono mt-0.5">14:30 - 15:00</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Ansh CRM Lite (Emerald/Green Theme) */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3.5 flex flex-col justify-between hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-white font-outfit">CRM Lite</span>
                      </div>
                      <span className="text-[8px] font-black uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">Soon</span>
                    </div>
                    {/* CRM metrics */}
                    <div className="flex flex-col justify-center flex-grow">
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-[8px] text-gray-500">Pipeline Value</span>
                        <span className="text-[10px] text-white font-extrabold font-mono">$12,480</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[70%] rounded-full"></div>
                      </div>
                      <span className="text-[8px] text-emerald-400 font-medium mt-1">▲ 14.5% conversion</span>
                    </div>
                  </div>

                  {/* Card 4: Ansh Inventory (Blue Theme) */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3.5 flex flex-col justify-between hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-white font-outfit">Inventory</span>
                      </div>
                      <span className="text-[8px] font-black uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded-full">Soon</span>
                    </div>
                    {/* Inventory details */}
                    <div className="space-y-1.5 flex-grow flex flex-col justify-center">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-gray-400 truncate">Stock Items</span>
                        <span className="text-white font-bold font-mono">1,240</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-gray-400 truncate">Low Stock Alert</span>
                        <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[8px] font-bold px-1 py-0.2 rounded">3 Alert</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer status summary bar */}
                <div className="z-10 border-t border-white/10 pt-4 flex justify-between items-center text-[10px] text-gray-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>All services operational</span>
                  </div>
                  <span>99.9% Uptime SLA</span>
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
        
        <div className="max-w-[1200px] mx-auto px-8 relative z-10">
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

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#060608] pt-24 pb-12 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-8">
          
          {/* Giant Header: Ansh Apps */}
          <div className="text-center mb-20 select-none">
            <h1 className="text-6xl sm:text-8xl md:text-[140px] lg:text-[180px] font-black tracking-tighter font-outfit bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#ec4899] bg-clip-text text-transparent leading-none">
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
                <a href="https://bookings.anshapps.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ansh Bookings</a>
                <a href="#products" className="hover:text-white transition-colors">Ansh CRM Lite</a>
                <a href="#products" className="hover:text-white transition-colors">Ansh Inventory</a>
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
                <a href="mailto:contact@anshapps.com" className="text-[14px] text-emerald-400 font-semibold hover:underline">
                  contact@anshapps.com
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2026 ANSH Apps. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>

        </div>
      </footer>

    </main>
  );
}
