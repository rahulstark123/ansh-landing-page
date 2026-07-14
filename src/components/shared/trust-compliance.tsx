import { BadgeCheck, Building2, ShieldCheck } from "lucide-react";

export const UDYAM_REGISTRATION_NUMBER = "UDYAM-BR-23-0127857";
export const GSTIN_NUMBER = "10DIUPR1358M1ZP";

export interface TrustComplianceProps {
  showDescription?: boolean;
  compact?: boolean;
}

export function TrustCompliance({
  showDescription = true,
  compact = false,
}: TrustComplianceProps) {
  return (
    <section
      id="trust-compliance"
      className={
        compact
          ? "py-12 relative"
          : "py-20 md:py-24 relative border-t border-white/5 bg-[#0a0a0c]/60"
      }
      aria-labelledby="trust-compliance-heading"
    >
      {!compact && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.06),transparent_50%)] pointer-events-none" />
      )}
      <div className="page-container relative z-10">
        <div
          className={
            compact
              ? "rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
              : "glass-card rounded-[28px] border-white/10 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          }
        >
          <div
            className={
              compact
                ? "flex flex-col gap-6"
                : "grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-start"
            }
          >
            <div className={compact ? "space-y-4" : "space-y-5 reveal"}>
              <div className="inline-flex items-center gap-2 text-primary-bright font-semibold uppercase tracking-[0.2em] text-xs">
                <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />
                <span>Trust &amp; Compliance</span>
              </div>

              <h2
                id="trust-compliance-heading"
                className={
                  compact
                    ? "text-2xl font-extrabold text-white leading-tight"
                    : "text-3xl md:text-4xl font-extrabold text-white leading-tight"
                }
              >
                ANSH Apps
              </h2>

              <p
                className={
                  compact
                    ? "text-lg font-semibold text-gray-300 leading-tight"
                    : "text-xl md:text-2xl font-semibold text-gray-300 leading-tight"
                }
              >
                Built for Bharat, ready for the world
              </p>

              {showDescription && (
                <p
                  className={
                    compact
                      ? "text-sm text-gray-400 leading-relaxed max-w-xl"
                      : "text-base md:text-lg text-gray-400 leading-relaxed max-w-xl"
                  }
                >
                  ANSH Apps is a Government of India MSME-registered software company
                  building simple, affordable, and modern business software for teams,
                  startups, and growing businesses.
                </p>
              )}
            </div>

            <div
              className={
                compact
                  ? "flex flex-col gap-4"
                  : "flex flex-col gap-5 reveal"
              }
            >
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6 hover:border-white/15 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                    <Building2
                      className="h-5 w-5 text-emerald-400"
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-sm font-bold text-white leading-snug">
                      MSME Registered Enterprise
                    </p>
                    <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                      Government of India Udyam Registered
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6 hover:border-white/15 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10">
                    <BadgeCheck
                      className="h-5 w-5 text-indigo-400"
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Udyam Registration Number
                    </p>
                    <p className="mt-1.5 font-mono text-sm md:text-base font-semibold text-white tracking-wide break-all">
                      {UDYAM_REGISTRATION_NUMBER}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6 hover:border-white/15 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/10">
                    <BadgeCheck
                      className="h-5 w-5 text-sky-400"
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      GSTIN
                    </p>
                    <p className="mt-1.5 font-mono text-sm md:text-base font-semibold text-white tracking-wide break-all">
                      {GSTIN_NUMBER}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
