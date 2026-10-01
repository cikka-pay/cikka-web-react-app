import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion()) return;

    const isTouch =
      "ontouchstart" in window ||
      (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0) ||
      window.innerWidth < 768;

    ScrollTrigger.config({ ignoreMobileResize: true });

    // Initialize Lenis with universal buttery fluid momentum across desktop, mobile, and tablet
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.15,
      wheelMultiplier: 1.0,
      autoResize: true,
      infinite: false,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // RAF loop via GSAP ticker for synchronized 60-120fps rendering without jank
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Make lenis globally accessible
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Refresh ScrollTrigger when layout / fonts finish rendering
    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Ensure ScrollTrigger refreshes after initial paint
    const timer = setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    }, 300);

    // Smooth in-page anchor scrolling with dynamic header offset
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a[href^='#']");
      const href = a?.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, {
        offset: window.innerWidth < 640 ? -60 : -75,
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    };
    document.addEventListener("click", onClick);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", onClick);
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return null;
}
