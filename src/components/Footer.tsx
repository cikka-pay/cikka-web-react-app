import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import cikkaLogo from "../assets/cikka-logo.png";

const groups = [
  {
    title: "Product",
    links: [
      { label: "Users", to: "/users" },
      { label: "Business", to: "/business" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Support", to: "/support" },
      { label: "Contact", to: "/support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
] as const;

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-footer-word]",
        { yPercent: 22, opacity: 0, scale: 0.94, clipPath: "inset(0 0 100% 0)" },
        {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          clipPath: "inset(0 0 0% 0)",
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current as HTMLElement,
            start: "top 85%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={root}
      className="relative w-full max-w-full overflow-hidden border-t border-white/[0.06] bg-[#09090b] pt-16 sm:pt-24 pb-12 select-none"
    >
      {/* Ambient Atmospheric Glow */}
      <div className="absolute left-1/2 top-10 h-[340px] w-[70vw] -translate-x-1/2 pointer-events-none rounded-full blur-[90px] bg-[radial-gradient(circle,rgba(168,85,247,0.35)_0%,transparent_70%)] opacity-30" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 z-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="col-span-2 sm:col-span-1 md:col-span-1">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo(0, 0);
                window.location.href = "/";
                window.location.reload();
              }}
              className="inline-block cursor-pointer transition-opacity hover:opacity-80 select-none"
              aria-label="Cikka home"
            >
              <img
                src={cikkaLogo}
                alt="Cikka"
                width={128}
                height={44}
                loading="lazy"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </a>
            <p className="mt-4 max-w-[15rem] text-xs sm:text-sm leading-relaxed text-slate-400">
              A perfect place for all of your credit card activity.
            </p>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-slate-400">
                {g.title}
              </p>
              <ul className="mt-4 space-y-2.5 sm:space-y-3">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.to}
                      className="text-xs sm:text-sm text-slate-300/80 transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-slate-400">
              Social
            </p>
            <ul className="mt-4 space-y-2.5 sm:space-y-3">
              {["LinkedIn", "Instagram", "X"].map((s) => (
                <li key={s}>
                  <span className="cursor-default text-xs sm:text-sm text-slate-400/60 hover:text-slate-300 transition-colors">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 sm:mt-20 text-[0.7rem] sm:text-[0.75rem] text-slate-500 text-center sm:text-left">
          © 2026 Cikka | A product of Sorvantis Platforms Pvt Ltd
        </p>
      </div>

      {/* Footer CIKKA Display Text */}
      <div className="relative mt-8 sm:mt-12 flex flex-col items-center justify-center min-h-[120px] sm:min-h-[160px] w-full overflow-hidden">
        <span
          data-footer-word
          aria-hidden
          className="block w-full select-none text-center font-black text-[28.5vw] sm:text-[25vw] leading-[0.8] tracking-tight text-transparent opacity-85 max-w-full overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(167,139,250,0.45) 55%, rgba(255,255,255,0.03) 100%)",
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
