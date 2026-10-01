import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { Cikka3DLogo } from "./Cikka3DLogo";

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-footer-word]",
        { yPercent: 12, opacity: 0, scale: 0.97 },
        {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root.current as HTMLElement,
            start: "top 85%",
            end: "bottom bottom",
            scrub: isMobile ? true : 0.5,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={root}
      className="relative w-full max-w-full overflow-hidden border-t border-white/[0.08] bg-[#070709] pt-8 sm:pt-12 md:pt-14 pb-4 select-none"
    >
      {/* Ambient Atmospheric Multi-Layered Purple & Violet Glow */}
      <div className="absolute left-1/2 top-0 h-[480px] w-[85vw] -translate-x-1/2 pointer-events-none rounded-full blur-[110px] bg-[radial-gradient(circle,rgba(168,85,247,0.28)_0%,rgba(217,70,239,0.12)_38%,transparent_70%)] opacity-70" />
      <div className="absolute right-[10%] top-1/3 h-[280px] w-[35vw] pointer-events-none rounded-full blur-[80px] bg-[radial-gradient(circle,rgba(129,140,248,0.15)_0%,transparent_70%)] opacity-50" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 md:px-12 z-10">
        {/* TOP BAR: Brand Logo (Positioned closer to the headline) */}
        <div className="flex items-center justify-between gap-6 pt-2 sm:pt-4 pb-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo(0, 0);
              window.location.href = "/";
              window.location.reload();
            }}
            className="flex items-center gap-3.5 group cursor-pointer transition-transform duration-300 hover:scale-105 select-none"
            aria-label="Cikka home"
          >
            <Cikka3DLogo className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]" />
            <span className="font-sans font-bold text-xl sm:text-2xl tracking-tight text-white group-hover:text-purple-300 transition-colors">
              Cikka
            </span>
          </a>
        </div>

        {/* HERO STATEMENT + SOCIAL SECTION */}
        <div className="pt-4 sm:pt-5 md:pt-6 pb-12 sm:pb-16 md:pb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 sm:gap-12">
          <div className="max-w-2xl">
            <h2 className="font-sans font-bold tracking-[-0.025em] text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] text-white leading-[1.2]">
              A perfect place for all of your{" "}
              <span className="bg-gradient-to-r from-[#ffd3b6] via-[#f472b6] via-[#c084fc] to-[#a5b4fc] bg-clip-text text-transparent">
                credit card activity.
              </span>
            </h2>
          </div>

          {/* Social Channels in the place of cards */}
          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-slate-400">
              Social
            </span>
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              {["LinkedIn", "Instagram", "X"].map((s) => (
                <span
                  key={s}
                  className="px-5 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-purple-400/60 hover:bg-white/[0.09] text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="pt-6 sm:pt-8 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs sm:text-sm border-t border-white/[0.06]">
          <p className="text-center sm:text-left text-slate-400 font-normal">
            © 2026 Cikka | A product of Sorvantis Platforms Pvt Ltd
          </p>
          <div className="flex items-center gap-5 text-slate-400 text-xs">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="text-slate-600">•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            <span className="text-slate-600">•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Security</span>
          </div>
        </div>
      </div>

      {/* Footer CIKKA Display Text (Big Iconic Animated Wordmark) */}
      <div className="relative mt-2 sm:mt-6 flex flex-col items-center justify-center min-h-[140px] sm:min-h-[190px] md:min-h-[230px] w-full overflow-hidden">
        <span
          data-footer-word
          aria-hidden
          className="block w-full select-none text-center font-black text-[29vw] sm:text-[26vw] leading-[0.78] tracking-tight text-transparent opacity-90 max-w-full overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(192,132,252,0.55) 50%, rgba(255,255,255,0.02) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          CIKKA
        </span>
      </div>
    </footer>
  );
}
