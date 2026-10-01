import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const words = ["PAY.", "EARN.", "REDEEM.", "REPEAT."];

export function SizzleSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current as HTMLElement,
          start: "top top",
          end: isMobile ? "+=160%" : "+=350%",
          scrub: isMobile ? true : 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      const items = gsap.utils.toArray<HTMLElement>("[data-word]");
      items.forEach((w, i) => {
        tl.fromTo(
          w,
          {
            opacity: 0,
            scale: 0.86,
            filter: isMobile ? "blur(4px)" : "blur(14px)",
            willChange: "transform, opacity, filter",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power1.out",
          },
          i,
        ).to(
          w,
          {
            opacity: 0,
            scale: 1.14,
            filter: isMobile ? "blur(4px)" : "blur(14px)",
            duration: 0.8,
            ease: "power1.in",
          },
          i + 1,
        );
      });

      tl.fromTo(
        "[data-sizzle-bg]",
        { opacity: 0 },
        { opacity: 1, duration: 2 },
        0.5,
      ).to("[data-sizzle-bg]", { opacity: 0, duration: 1.4 }, 2.6);

      tl.fromTo(
        "[data-sizzle-arrow]",
        { opacity: 0, yPercent: 24, rotate: -8 },
        { opacity: 0.75, yPercent: -10, rotate: 4, duration: 3 },
        0.8,
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex h-screen min-h-screen items-center justify-center overflow-hidden bg-[#07070a] w-full max-w-full will-change-transform"
    >
      <div
        data-sizzle-bg
        className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_50%,rgba(109,40,217,0.4),transparent_70%)] opacity-0 pointer-events-none"
      />
      <div className="relative grid place-items-center">
        {words.map((w) => (
          <span
            key={w}
            data-word
            className="display col-start-1 row-start-1 text-[14vw] sm:text-[18vw] leading-none opacity-0 max-w-full overflow-hidden will-change-transform"
          >
            {w}
          </span>
        ))}
      </div>
    </section>
  );
}

