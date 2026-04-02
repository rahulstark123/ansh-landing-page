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

      {/* SECTION 3 — OUR PRODUCTS */}
      <section id="products" className="py-32">
        <div className="max-w-[1200px] mx-auto px-8">
          
          <div className="text-center mb-20 reveal">
            <span className="text-primary-bright font-semibold uppercase tracking-widest text-sm mb-4 block">{t.products.tagline}</span>
            <h2 className="text-4xl md:text-5xl font-extrabold">{t.products.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Product 1: Ansh Bookings */}
            <div className="glass-card p-10 rounded-[40px] hover:border-primary/50 hover:-translate-y-2 transition-all duration-400 reveal group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-8 border border-white/5 group-hover:border-primary/30 transition-colors">
                <svg className="w-8 h-8 text-primary-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white">{t.products.ansh_bookings.title}</h3>
              <p className="text-gray-400 text-lg mb-8 h-14">
                {t.products.ansh_bookings.desc}
              </p>
              <Link href="#" className="btn btn-primary w-max">
                {t.products.ansh_bookings.btn}
              </Link>
            </div>

            {/* Product 2: Ansh Ledger */}
            <div className="glass-card p-10 rounded-[40px] opacity-70 hover:opacity-100 transition-all duration-400 reveal delay-100">
              <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-6">{t.products.ansh_ledger.status}</span>
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5">
                <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-200">{t.products.ansh_ledger.title}</h3>
              <p className="text-gray-500 text-lg">
                {t.products.ansh_ledger.desc}
              </p>
            </div>

            {/* Product 3: Ansh Expense */}
            <div className="glass-card p-10 rounded-[40px] opacity-70 hover:opacity-100 transition-all duration-400 reveal">
              <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-6">{t.products.ansh_expense.status}</span>
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5">
                <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-200">{t.products.ansh_expense.title}</h3>
              <p className="text-gray-500 text-lg">
                {t.products.ansh_expense.desc}
              </p>
            </div>

            {/* Product 4: Ansh CRM */}
            <div className="glass-card p-10 rounded-[40px] opacity-70 hover:opacity-100 transition-all duration-400 reveal delay-100">
              <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-6">{t.products.ansh_crm.status}</span>
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5">
                <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-200">{t.products.ansh_crm.title}</h3>
              <p className="text-gray-500 text-lg">
                {t.products.ansh_crm.desc}
              </p>
            </div>

          </div>

          <div className="text-center mt-16 reveal delay-200">
            <p className="text-gray-400 text-xl font-medium">
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

            <Link href="#get-started" className="btn btn-primary text-lg !px-10 !py-4">
              {t.cta.btn}
            </Link>
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
