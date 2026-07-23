import Image from "next/image";
import Link from "next/link";
import { MsmeBadge } from "@/components/shared/msme-badge";

type SiteFooterProps = {
  msmeHref?: string;
};

export function SiteFooter({
  msmeHref = "/#trust-compliance",
}: SiteFooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[#060608] pt-24 pb-12 overflow-hidden">
      <div className="page-container">
        <div className="text-center mb-20 select-none">
          <p
            className="text-8xl sm:text-[7rem] md:text-[190px] lg:text-[250px] font-black tracking-tighter font-cormorant bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#ec4899] bg-clip-text text-transparent leading-none"
            aria-hidden="true"
          >
            ANSH Apps
          </p>
          <p className="footer-tagline mt-2 md:mt-4 font-black tracking-tighter font-cormorant leading-none text-shimmer-white">
            Software that solves everyday problems.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-10 pb-16 text-left sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 flex flex-col items-start gap-5">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logoAnshapps.png"
                alt="ANSH Apps"
                width={80}
                height={32}
                className="h-7 w-auto"
              />
              <span className="text-xl font-bold font-cormorant text-white tracking-wider">
                ANSH Apps
              </span>
            </div>
            <p className="text-[14px] text-gray-400 leading-relaxed max-w-[280px]">
              A modern software company building products across industries — for
              businesses and people worldwide.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.facebook.com/anshapps"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1877F2] hover:opacity-80 transition-opacity duration-200"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/anshapps?igsh=d2hwZHVmMWQ3cjJ1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E1306C] hover:opacity-80 transition-opacity duration-200"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UC87q1S2bTuzpj-VwFM6l6fw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF0000] hover:opacity-80 transition-opacity duration-200"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.387.51a3.003 3.003 0 0 0-2.11 2.108C0 8.024 0 12 0 12s0 3.976.503 5.837a3.003 3.003 0 0 0 2.11 2.108c1.862.51 9.387.51 9.387.51s7.525 0 9.387-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.976 24 12 24 12s0-3.976-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
              Business Software
            </span>
            <div className="flex flex-col gap-2.5 text-[14px] text-gray-400">
              <a href="https://tasks.anshapps.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ANSH Tasks</a>
              <a href="https://hr.anshapps.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ANSH HR</a>
              <a href="https://forms.anshapps.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ANSH Forms</a>
              <a href="https://links.anshapps.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ANSH Links</a>
              <a href="https://expense.anshapps.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ANSH Expense</a>
              <a href="https://visitor.anshapps.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ANSH Visitor</a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
              Property
            </span>
            <div className="flex flex-col gap-2.5 text-[14px] text-gray-400">
              <span className="hover:text-white transition-colors">
                RentAwas <span className="text-amber-400/80 text-[11px]">(Building)</span>
              </span>
            </div>
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest mt-4">
              Coming Soon
            </span>
            <div className="flex flex-col gap-2.5 text-[14px] text-gray-500">
              <span>Education</span>
              <span>AI</span>
              <span>Finance</span>
              <span>Creator Tools</span>
              <span>Developer Tools</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
              Company
            </span>
            <div className="flex flex-col gap-2.5 text-[14px] text-gray-400">
              <Link href="/#about" className="hover:text-white transition-colors">About</Link>
              <Link href="/#why" className="hover:text-white transition-colors">Why ANSH Apps</Link>
              <Link href="/#roadmap" className="hover:text-white transition-colors">Roadmap</Link>
              <Link href="/vision" className="hover:text-white transition-colors">Vision</Link>
              <a href="https://saathi.anshapps.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ANSH Saathi</a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
              Support
            </span>
            <div className="flex flex-col gap-2.5 text-[14px] text-gray-400">
              <Link href="/#contact" className="hover:text-white transition-colors">Share Feedback</Link>
              <a href="mailto:hello@anshapps.com" className="hover:text-white transition-colors">hello@anshapps.com</a>
              <a href="tel:+919625727372" className="hover:text-white transition-colors">+91 96257 27372</a>
              <a
                href="https://wa.me/919625727372?text=Hi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                WhatsApp
              </a>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <MsmeBadge href={msmeHref} />
            <div className="flex flex-wrap gap-6 text-xs text-gray-500">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
          <p className="text-xs text-gray-500">© 2026 ANSH Apps. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
