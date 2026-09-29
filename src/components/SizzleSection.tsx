import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const words = ["PAY.", "SHOP.", "EARN.", "REDEEM."];

export function SizzleSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current as HTMLElement,
          start: "top top",
          end: "+=350%",
          scrub: 0.6,
          pin: true,
        },
      });

      const items = gsap.utils.toArray<HTMLElement>("[data-word]");
      items.forEach((w, i) => {
        tl.fromTo(
          w,
          { opacity: 0, scale: 0.86, filter: "blur(14px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1 },
          i,
        ).to(
          w,
          { opacity: 0, scale: 1.14, filter: "blur(14px)", duration: 0.8 },
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
      className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-ink w-full max-w-full rounded-[32px] sm:rounded-[40px]"
    >
      <div
        data-sizzle-bg
        className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_50%,rgba(109,40,217,0.4),transparent_70%)] opacity-0"
      />
      <div className="relative grid place-items-center">
        {words.map((w) => (
          <span
            key={w}
            data-word
            className="display col-start-1 row-start-1 text-[14vw] sm:text-[18vw] leading-none opacity-0 max-w-full overflow-hidden text-[oklch(0.97_0.004_285)]"
            style={{ fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif' }}
          >
            {w}
          </span>
        ))}
      </div>
    </section>
  );
}
