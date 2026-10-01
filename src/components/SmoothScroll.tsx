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

    // Initialize Lenis with ultra-fast fluid momentum and native touch synchronization
    const lenis = new Lenis({
      duration: isTouch ? 0.75 : 0.95,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.0,
      wheelMultiplier: 1.0,
      autoResize: true,
      infinite: false,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // RAF loop via GSAP ticker for synchronized 60-120fps rendering
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    // lagSmoothing(0) prevents GSAP ScrollTrigger and Lenis from stuttering during frame drops
    gsap.ticker.lagSmoothing(0);

    // Make lenis globally available
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Handle resize events to recalculate scroll heights
    const handleResize = () => {
      lenis.resize();
    };
    window.addEventListener("resize", handleResize, { passive: true });

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
      document.removeEventListener("click", onClick);
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return null;
}
