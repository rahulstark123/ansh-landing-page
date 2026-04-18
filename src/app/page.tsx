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
    { code: "mr", name: "मराठी" },
    { code: "gu", name: "ગુજરાતી" },
    { code: "ta", name: "தமிழ்" },
  ];
  const bookingsUrl = "https://bookings.anshapps.in/";

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
              <div className="flex flex-wrap gap-4 reveal delay-200">
                <Link href="#get-started" className="btn btn-primary">
                  {t.hero.btnPrimary}
                </Link>
                <Link href="#products" className="btn btn-outline">
                  {t.hero.btnOutline}
                </Link>
              </div>
            </div>

            {/* Right Side */}
            <div className="relative flex justify-center items-center reveal order-first lg:order-last">
              <div className="relative w-full max-w-[450px] aspect-square flex justify-center items-center">
                {/* Fallback glow if image doesn't load */}
                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
                
                {/* Ensure logo.png is present in the public folder */}
                <img 
                  ref={heroImageRef}
                  src="/logo.png" 
                  alt="Ansh Global App Logo" 
                  className="w-[80%] h-auto animate-float drop-shadow-[0_20px_40px_rgba(99,102,241,0.3)] z-10 relative object-contain transition-transform duration-75"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // If visual test image fails, replace with a CSS fallback
                    target.style.display = 'none';
                    target.parentElement?.classList.add('bg-gradient-to-tr', 'from-indigo-600', 'to-purple-600', 'rounded-3xl', 'shadow-[0_20px_60px_-15px_rgba(99,102,241,0.6)]', 'w-[70%]', 'h-[70%]');
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

      {/* SECTION 3 — OUR ECOSYSTEM */}
      <section id="products" className="py-32">
        <div className="max-w-[1200px] mx-auto px-8">
          
          <div className="text-center mb-24 reveal">
            <span className="text-primary-bright font-semibold uppercase tracking-widest text-sm mb-4 block underline underline-offset-8 decoration-primary/30">{t.products.tagline}</span>
            <h2 className="text-5xl md:text-6xl font-extrabold">{t.products.title}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* For Business Column */}
            <div className="flex flex-col reveal">
              <div className="mb-12 border-l-4 border-primary pl-8">
                <h3 className="text-4xl font-bold mb-3 text-white">{t.products.business.title}</h3>
                <p className="text-gray-400 text-xl leading-relaxed">{t.products.business.subtitle}</p>
              </div>

              <div className="flex flex-col gap-6 mb-12 flex-grow">
                {t.products.business.apps.map((app: any, idx: number) => (
                  <div key={idx} className="glass-card p-8 rounded-[32px] flex items-center gap-6 border-white/5 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      {idx === 0 && ( /* Bookings */
                        <svg className="w-7 h-7 text-primary-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                      {idx === 1 && ( /* CRM */
                        <svg className="w-7 h-7 text-primary-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                      {idx === 2 && ( /* Attendance */
                        <svg className="w-7 h-7 text-primary-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <h4 className="text-2xl font-bold text-white">{app.name}</h4>
                        {idx === 0 ? (
                          <div className="flex flex-col items-end leading-tight">
                            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] bg-primary/20 text-primary-bright px-3 py-1 rounded-full border border-primary/30">
                              Building
                    
                            </span>
                            <Link
                              href={bookingsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary-bright hover:text-white transition-colors"
                            >
                              Visit
                              <svg
                                className="h-3.5 w-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 17L17 7M17 7H9m8 0v8"
                                />
                              </svg>
                            </Link>
                          </div>
                        ) : (
                          app.status && (
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-primary/20 text-primary-bright px-3 py-1 rounded-full border border-primary/30">
                            {app.status}
                          </span>
                          )
                        )}
                      </div>
                      <p className="text-gray-500 text-lg">{app.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="#" className="btn btn-primary w-full md:w-max text-lg px-10 py-5">
                {t.products.business.btn}
              </Link>
            </div>

            {/* For Individuals Column */}
            <div className="flex flex-col reveal delay-200">
              <div className="mb-12 border-l-4 border-secondary pl-8">
                <h3 className="text-4xl font-bold mb-3 text-white">{t.products.personal.title}</h3>
                <p className="text-gray-400 text-xl leading-relaxed">{t.products.personal.subtitle}</p>
              </div>

              <div className="flex flex-col gap-6 mb-12 flex-grow">
                {t.products.personal.apps.map((app: any, idx: number) => (
                  <div key={idx} className="glass-card p-8 rounded-[32px] flex items-center gap-6 border-white/5 hover:border-secondary/40 hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0 border border-secondary/20 group-hover:bg-secondary/20 transition-colors">
                      {idx === 0 && ( /* Habit */
                        <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                      {idx === 1 && ( /* Expense */
                        <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      )}
                      {idx === 2 && ( /* Focus */
                        <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-2xl font-bold text-white">{app.name}</h4>
                        {app.status && (
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-secondary/20 text-secondary px-3 py-1 rounded-full border border-secondary/30">
                            {app.status}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-lg">{app.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="#" className="btn btn-outline w-full md:w-max text-lg px-10 py-5 hover:border-secondary hover:text-secondary group transition-all duration-300">
                <span>{t.products.personal.btn}</span>
                <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

          </div>

          <div className="text-center mt-24 reveal delay-400">
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

            <div className="reveal order-first lg:order-last">
              <div className="relative p-3 rounded-[32px] border border-white/10 bg-white/5 rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="overflow-hidden rounded-[24px] aspect-[4/5] relative bg-[#1a1a20]">
                  <img 
                    src="/founder.png" 
                    alt="Founder of Ansh" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      // Fallback placeholder
                      target.parentElement!.innerHTML = '<div class="absolute inset-0 flex flex-col items-center justify-center text-gray-500"><svg class="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg><span>[Founder Portrait Image]</span></div>';
                    }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL SECTION (CTA) */}
      <section id="contact" className="py-40 text-center relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-[1200px] mx-auto px-8 relative z-10">
          <div className="reveal">
            <h2 className="text-5xl md:text-[80px] font-extrabold mb-6 leading-tight">
              {t.cta.title1} <span className="text-white">{renderTextWithIndiaFlag(t.cta.title2)}</span> <br className="hidden md:block"/>
              {t.cta.title3} {renderGradientTextWithGlobeEmoji(t.cta.title4)}
            </h2>
            <p className="text-2xl text-gray-400 mb-12">
              {t.cta.desc}
            </p>
            
            <p className="text-3xl md:text-4xl font-bold text-white mb-12 animate-pulse">
              {t.cta.namaskaram}
            </p>

            <Link href="/roadmap" className="btn btn-primary text-lg !px-10 !py-4">
              {t.cta.btn}
            </Link>

            <div className="mt-32 reveal delay-200">
              <h3 className="text-4xl md:text-[60px] font-extrabold text-[#3a3a40] tracking-tight">
                {t.cta.slogan}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#0a0a0c] pt-20 pb-10">
        <div className="max-w-[1200px] mx-auto px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div className="text-3xl font-extrabold font-outfit text-white tracking-widest">
              ANSH
            </div>
            
            <div className="flex gap-8 flex-wrap justify-center">
              <Link href="#products" className="text-gray-400 hover:text-white transition-colors">{t.nav.products}</Link>
              <Link href="#vision" className="text-gray-400 hover:text-white transition-colors">{t.nav.vision}</Link>
              <Link href="#founder" className="text-gray-400 hover:text-white transition-colors">{t.nav.founder}</Link>
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="text-gray-400 hover:text-white transition-colors">Terms &amp; Conditions</Link>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-white/5 text-gray-500 text-sm">
            <p>{t.footer.copyright}</p>
          </div>
          
        </div>
      </footer>

    </main>
  );
}
