import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { Cikka3DLogo } from "./Cikka3DLogo";

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-footer-word]",
        { yPercent: 12, opacity: 0.25, scale: 0.96 },
        {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root.current as HTMLElement,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={root}
      className="relative w-full max-w-full overflow-hidden bg-[#070709] rounded-t-[36px] sm:rounded-t-[48px] md:rounded-t-[60px] border-t border-white/[0.12] pt-10 sm:pt-14 md:pt-16 pb-4 select-none shadow-[0_-30px_70px_rgba(0,0,0,0.6)]"
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
        <div className="pt-8 sm:pt-10 md:pt-12 pb-10 sm:pb-14 md:pb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 sm:gap-12">
          <div className="max-w-xl mt-4 sm:mt-8 md:mt-12">
            <h2 className="font-sans font-semibold md:font-bold tracking-[-0.02em] text-sm xs:text-base sm:text-lg md:text-xl lg:text-[1.45rem] text-white leading-[1.35] opacity-95">
              A perfect place for all of your{" "}
              <span className="bg-gradient-to-r from-[#ffd3b6] via-[#f472b6] via-[#c084fc] to-[#a5b4fc] bg-clip-text text-transparent">
                credit card activity.
              </span>
            </h2>
          </div>

          {/* Social Channels - Official Icons Only */}
          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-slate-400">
              Social
            </span>
            <div className="flex items-center gap-5 sm:gap-6">
              {[
                {
                  name: "LinkedIn",
                  href: "https://linkedin.com",
                  icon: (
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  ),
                },
                {
                  name: "Instagram",
                  href: "https://instagram.com",
                  icon: (
                    <svg className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                },
                {
                  name: "X",
                  href: "https://x.com",
                  icon: (
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="text-slate-400 hover:text-white transition-all duration-200 hover:scale-110 active:scale-95 p-1 cursor-pointer flex items-center justify-center"
                >
                  {s.icon}
                </a>
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
      <div className="relative mt-4 sm:mt-8 flex flex-col items-center justify-center min-h-[120px] xs:min-h-[150px] sm:min-h-[190px] md:min-h-[230px] w-full overflow-hidden pointer-events-none">
        <span
          data-footer-word
          aria-hidden
          className="block w-full select-none text-center font-black text-[27vw] sm:text-[26vw] leading-[0.82] sm:leading-[0.78] tracking-tight text-transparent opacity-95 max-w-full overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(192,132,252,0.65) 45%, rgba(168,85,247,0.35) 75%, rgba(255,255,255,0.03) 100%)",
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
