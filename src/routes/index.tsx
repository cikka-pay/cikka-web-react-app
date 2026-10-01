import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUp,
  AudioLines,
  Bell,
  ChevronLeft,
  CircleDollarSign,
  Contact,
  CreditCard,
  Database,
  Eye,
  EyeOff,
  Gift,
  History,
  Home,
  Landmark,
  Mail,
  Plus,
  QrCode,
  Send,
  Sparkles,
  Trophy,
  Users,
  WalletCards,
  Activity,
} from "lucide-react";
import React, { useRef, useState, useEffect, type CSSProperties, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SizzleSection } from "../components/SizzleSection";
import { CikkaMall } from "../components/CikkaMall";
import { WaitlistSection } from "../components/WaitlistSection";
import { SimplifyPaySection } from "../components/SimplifyPaySection";
import { RevenueInsightsBentoSection } from "../components/RevenueInsightsBentoSection";
import { GeneralPaymentsSection } from "../components/GeneralPaymentsSection";
import { GetTheAppSection } from "../components/GetTheAppSection";
import { Footer } from "../components/Footer";
import { SmoothScroll } from "../components/SmoothScroll";
import { Cikka3DLogo } from "../components/Cikka3DLogo";

// Responsive window size hook with SSR-safe initial detection
function useWindowSize() {
  const [size, setSize] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1280,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  }));
  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cikka - A perfect place for all of your credit card activity" },
      { name: "description", content: "A perfect place for all of your credit card activity, powered by Cikka." },
      { property: "og:title", content: "Cikka - A perfect place for all of your credit card activity" },
      { property: "og:description", content: "A perfect place for all of your credit card activity, powered by Cikka." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PayerLanding,
});

function PayerLanding() {
  return (
    <main className="payer-page bg-[#000000] text-white">
      <SmoothScroll />
      <Header />
      {/* Unified Pinned Scroll Experience with ONE continuous transitioning Phone */}
      <UnifiedPhoneShowcase />
      <CardsScene />
      <LightContinuation />
    </main>
  );
}

function useHeaderTheme() {
  const [isLight, setIsLight] = React.useState(false);

  React.useEffect(() => {
    const lightSection = document.getElementById("company");
    if (!lightSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLight(entry?.isIntersecting ?? false);
      },
      {
        rootMargin: "-60px 0px -75% 0px",
        threshold: 0,
      }
    );

    observer.observe(lightSection);

    return () => observer.disconnect();
  }, []);

  return isLight;
}

function Header() {
  const isLight = useHeaderTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[72px] sm:h-[80px] flex items-center justify-between px-6 sm:px-12 md:px-16 bg-transparent pointer-events-auto">
      {/* 3D Brand Logo */}
      <a
        className="inline-flex items-center group transition-transform duration-200 hover:scale-105 cursor-pointer select-none"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo(0, 0);
          window.location.href = "/";
          window.location.reload();
        }}
        aria-label="Cikka home"
      >
        <Cikka3DLogo
          isLightBg={isLight}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
        />
      </a>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 sm:gap-3.5">
        <a
          href="/signin"
          style={{ color: isLight ? "#000000" : "#ffffff" }}
          className={`inline-flex items-center justify-center font-medium text-[13px] px-4 sm:px-4.5 py-2 rounded-full border shadow-[0_2px_12px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-500 active:scale-95 cursor-pointer select-none ${isLight
              ? "bg-black/5 hover:bg-black/10 text-black border-black/15 shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
              : "bg-[#15151c]/90 hover:bg-[#22222c] text-white border-white/20"
            }`}
        >
          <span className="font-medium">Sign in</span>
        </a>

        <a
          href="#download"
          style={{ color: isLight ? "#ffffff" : "#000000" }}
          className={`inline-flex items-center justify-center font-semibold text-[13px] px-5 sm:px-5.5 py-2 rounded-full border shadow-[0_2px_14px_rgba(0,0,0,0.25)] transition-all duration-500 active:scale-95 cursor-pointer select-none ${isLight
              ? "bg-black hover:bg-neutral-900 text-white border-black/20"
              : "bg-white hover:bg-neutral-100 text-black border-black/10"
            }`}
        >
          <span className="font-semibold">Get app</span>
        </a>
      </div>
    </header>
  );
}

// =========================================================================
// UNIFIED PHONE SHOWCASE — FULLY RESPONSIVE WITH SCROLL PARALLAX
// =========================================================================
function UnifiedPhoneShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  // Responsive breakpoints
  const isStacked = width < 1024;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isLargeDesktop = width >= 1280;

  // Responsive phone X offset (how far it shifts left/right)
  // On stacked (<1024px), phone stays centered while text sits cleanly below in the lower half
  const phoneShiftX = isStacked ? 0 : isLargeDesktop ? 275 : 210;

  // Hero start Y: phone enters from below, slides up as user scrolls
  const heroStartY = isMobile ? 180 : isTablet ? 210 : 250;

  // Track scroll throughout the sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // On mobile: 1:1 instantaneous hardware response; On desktop: buttery smooth momentum
  const springProgress = useSpring(scrollYProgress, {
    damping: 28,
    stiffness: 100,
    mass: 0.16,
  });
  const smoothProgress = isStacked ? scrollYProgress : springProgress;

  // --- 1. HERO STAGE ("We've Got You") ---
  const heroOpacity = useTransform(smoothProgress, [0.0, 0.04, 0.09], [1, 0.1, 0]);
  const heroVisibility = useTransform(smoothProgress, (p) => (p > 0.09 ? "hidden" : "visible"));
  const heroY = useTransform(smoothProgress, [0.0, 0.10], [0, -70]);
  const heroScale = useTransform(smoothProgress, [0.0, 0.10], [1, 0.94]);

  // --- 2. QUICK ACTIONS STAGE (Left Column on desktop / Bottom on mobile) ---
  const quickActionsOpacity = useTransform(
    smoothProgress,
    [0.14, 0.24, 0.54, 0.62],
    [0, 1, 1, 0]
  );
  const quickActionsVisibility = useTransform(
    smoothProgress,
    (p) => (p > 0.12 && p < 0.64 ? "visible" : "hidden")
  );
  const quickActionsX = useTransform(
    smoothProgress,
    [0.14, 0.24, 0.56, 0.64],
    isStacked ? [0, 0, 0, 0] : [-40, 0, 0, -40]
  );
  const quickActionsY = useTransform(
    smoothProgress,
    [0.14, 0.24, 0.56, 0.64],
    isStacked ? [15, 0, 0, -15] : [35, 0, 0, -35]
  );

  // --- 3. LARGE PAYMENTS STAGE (Right Column on desktop / Bottom on mobile) ---
  const largePaymentsOpacity = useTransform(
    smoothProgress,
    [0.64, 0.74, 0.96, 1.0],
    [0, 1, 1, 1]
  );
  const largePaymentsVisibility = useTransform(
    smoothProgress,
    (p) => (p > 0.60 ? "visible" : "hidden")
  );
  const largePaymentsX = useTransform(
    smoothProgress,
    [0.64, 0.74],
    isStacked ? [0, 0] : [40, 0]
  );
  const largePaymentsY = useTransform(
    smoothProgress,
    [0.64, 0.74],
    isStacked ? [15, 0] : [35, 0]
  );

  // --- 4. THE SINGLE CONTINUOUS PHONE MOCKUP ---
  // Phone shifts RIGHT for Quick Actions, LEFT for Large Payments
  const phoneX = useTransform(
    smoothProgress,
    [0.0, 0.16, 0.30, 0.56, 0.72, 1.0],
    [0, isStacked ? 0 : 70, phoneShiftX, phoneShiftX, -phoneShiftX, -phoneShiftX]
  );

  // KEY SCROLL PARALLAX: When stacked (<1024px), phone docks in upper half (-125px) giving clear space for text & cards below
  const phoneY = useTransform(
    smoothProgress,
    [0.0, 0.18, 0.30, 1.0],
    [heroStartY, 20, isStacked ? -125 : 0, isStacked ? -125 : 0]
  );

  // 3D Perspective Tilt (zero tilt on mobile for maximum 120fps GPU performance)
  const phoneRotateX = useTransform(
    smoothProgress,
    [0.0, 0.18, 0.30, 0.56, 0.72, 1.0],
    isStacked ? [0, 0, 0, 0, 0, 0] : [20, 0, 0, 0, 0, 0]
  );
  const phoneRotateY = useTransform(
    smoothProgress,
    [0.0, 0.16, 0.30, 0.56, 0.72, 1.0],
    isStacked ? [0, 0, 0, 0, 0, 0] : [0, -3, -3, 3, 3, 3]
  );
  const phoneScale = useTransform(
    smoothProgress,
    [0.0, 0.18, 0.30, 0.56, 0.72, 1.0],
    [
      isMobile ? 0.64 : isTablet ? 0.72 : 0.86,
      isMobile ? 0.67 : isTablet ? 0.74 : 0.88,
      isMobile ? 0.68 : isTablet ? 0.75 : 0.88,
      isMobile ? 0.68 : isTablet ? 0.75 : 0.88,
      isMobile ? 0.68 : isTablet ? 0.75 : 0.88,
      isMobile ? 0.68 : isTablet ? 0.75 : 0.88,
    ]
  );

  // Screen Content Crossfades inside the SINGLE Phone
  const screen1Opacity = useTransform(smoothProgress, [0.0, 0.05, 0.10], [1, 0.2, 0]);
  const screen1Visibility = useTransform(smoothProgress, (p) => (p > 0.10 ? "hidden" : "visible"));
  const screen2Opacity = useTransform(
    smoothProgress,
    [0.14, 0.24, 0.56, 0.64],
    [0, 1, 1, 0]
  );
  const screen2Visibility = useTransform(
    smoothProgress,
    (p) => (p > 0.12 && p < 0.66 ? "visible" : "hidden")
  );
  const screen3Opacity = useTransform(smoothProgress, [0.62, 0.72, 1.0], [0, 1, 1]);
  const screen3Visibility = useTransform(smoothProgress, (p) => (p > 0.60 ? "visible" : "hidden"));

  // Ambient Dynamic Purple Glow — also follows phone X
  const glowX = useTransform(
    smoothProgress,
    [0.0, 0.18, 0.30, 0.56, 0.72, 1.0],
    [0, phoneShiftX * 0.85, phoneShiftX * 0.85, -phoneShiftX * 0.85, -phoneShiftX * 0.85, -phoneShiftX * 0.85]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#000000] text-white selection:bg-purple-500/30 overflow-visible"
      style={{ height: isStacked ? "230vh" : "480vh" }}
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-16 sm:pt-24 pb-4 sm:pb-8 px-4 sm:px-12 lg:px-20">
        {/* Ambient Radial Background Glows matching Reference */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Main Following Purple Halo behind Phone */}
          <motion.div
            style={{ x: glowX }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] sm:w-[850px] lg:w-[1000px] h-[320px] sm:h-[600px] bg-[radial-gradient(circle,rgba(168,85,247,0.24)_0%,rgba(217,70,239,0.12)_35%,rgba(129,140,248,0.06)_60%,transparent_75%)] blur-[24px] sm:blur-[60px] will-change-transform"
          />
          {/* Side Soft Lavender & Peach Highlights */}
          <div className="absolute top-1/2 right-[12%] -translate-y-1/2 w-[240px] sm:w-[400px] h-[300px] sm:h-[450px] bg-[radial-gradient(circle,rgba(192,132,252,0.12)_0%,transparent_70%)] blur-[24px] sm:blur-[50px]" />
          <div className="absolute top-1/2 left-[12%] -translate-y-1/2 w-[240px] sm:w-[400px] h-[300px] sm:h-[450px] bg-[radial-gradient(circle,rgba(244,114,182,0.08)_0%,transparent_70%)] blur-[24px] sm:blur-[50px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000000_95%)]" />
        </div>

        {/* ========================================================================= */}
        {/* POSITION 1: HERO VIEW ("We've Got You") */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            opacity: heroOpacity,
            visibility: heroVisibility,
            y: heroY,
            scale: heroScale,
          }}
          className="absolute top-[120px] xs:top-[135px] sm:top-20 md:top-24 inset-x-0 mx-auto z-10 flex flex-col items-center text-center px-2 max-w-4xl pointer-events-none will-change-transform"
        >
          <h1 className="font-sans font-bold tracking-[-0.045em] leading-[0.88] text-[4.25rem] xs:text-[5rem] sm:text-[6.25rem] md:text-[6.25rem] lg:text-[7.25rem] xl:text-[7.75rem] flex flex-col items-center justify-center select-none">
            {/* Top Line: "We've" */}
            <span className="inline-block bg-gradient-to-r from-[#ffd3b6] via-[#fbcfe8] via-[#f472b6] via-[#c084fc] to-[#a5b4fc] bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(244,114,182,0.12)] pb-1">
              We've
            </span>
            {/* Bottom Line: "Got You" with exact horizontal gradient matching We've + vertical shadow fade to black */}
            <span
              className="inline-block bg-gradient-to-r from-[#ffd3b6] via-[#fbcfe8] via-[#f472b6] via-[#c084fc] to-[#a5b4fc] bg-clip-text text-transparent"
              style={{
                WebkitMaskImage:
                  "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.88) 32%, rgba(0,0,0,0.32) 68%, rgba(0,0,0,0) 100%)",
                maskImage:
                  "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.88) 32%, rgba(0,0,0,0.32) 68%, rgba(0,0,0,0) 100%)",
              }}
            >
              Got You
            </span>
          </h1>
        </motion.div>

        {/* ========================================================================= */}
        {/* POSITION 2: QUICK ACTIONS VIEW (Left Column on desktop / Bottom on mobile) */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            opacity: quickActionsOpacity,
            visibility: quickActionsVisibility,
            x: quickActionsX,
            y: quickActionsY,
          }}
          className="absolute
            left-0 right-0 mx-auto lg:left-14 xl:left-24 2xl:left-36 lg:right-auto
            bottom-4 xs:bottom-6 sm:bottom-10 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2
            z-30 w-full max-w-[92%] xs:max-w-[380px] sm:max-w-[460px] lg:max-w-md xl:max-w-lg
            flex flex-col justify-center items-center lg:items-start
            text-center lg:text-left px-2 lg:px-0 will-change-transform"
        >
          <h2 className="font-sans font-bold tracking-[-0.035em] leading-[1.15] sm:leading-[1.1] text-xl xs:text-2xl sm:text-3xl lg:text-[2.85rem] xl:text-[3.35rem] pb-1 overflow-visible">
            <span className="inline-block sm:block bg-gradient-to-r from-[#ffd3b6] via-[#fbcfe8] to-[#f472b6] bg-clip-text text-transparent mr-2 sm:mr-0 pb-1">
              Most Rewarding
            </span>
            <span className="inline-block sm:block bg-gradient-to-r from-[#f472b6] via-[#c084fc] to-[#818cf8] bg-clip-text text-transparent pb-1 sm:pb-2">
              Credit Card Platform
            </span>
          </h2>
          <p className="mt-1 sm:mt-3 text-xs sm:text-sm lg:text-base text-slate-400 font-normal leading-relaxed max-w-sm sm:max-w-md">
            Turn your Cikka Points into rewards you actually want.
          </p>
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mt-2.5 sm:mt-5 w-full max-w-[210px] xs:max-w-[240px] sm:max-w-[270px] lg:max-w-[295px]">
            {/* Box 1: Redeem Points */}
            <div className="rounded-xl sm:rounded-2xl bg-[#0c0c14]/90 border border-white/10 hover:border-white/20 p-2 xs:p-2.5 sm:p-3 flex flex-col items-center text-center shadow-md backdrop-blur-xl group transition-all cursor-pointer">
              <Gift className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white group-hover:scale-110 transition-transform stroke-[1.75]" />
              <p className="font-semibold text-white text-[9.5px] xs:text-[10px] sm:text-[11px] md:text-[11.5px] mt-1.5 leading-tight">
                Redeem Points
              </p>
            </div>

            {/* Box 2: Real Products */}
            <div className="rounded-xl sm:rounded-2xl bg-[#0c0c14]/90 border border-white/10 hover:border-white/20 p-2 xs:p-2.5 sm:p-3 flex flex-col items-center text-center shadow-md backdrop-blur-xl group transition-all cursor-pointer">
              <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white group-hover:scale-110 transition-transform stroke-[1.75]" />
              <p className="font-semibold text-white text-[9.5px] xs:text-[10px] sm:text-[11px] md:text-[11.5px] mt-1.5 leading-tight">
                Real Products
              </p>
            </div>

            {/* Box 3: Selective Rewards */}
            <div className="rounded-xl sm:rounded-2xl bg-[#0c0c14]/90 border border-white/10 hover:border-white/20 p-2 xs:p-2.5 sm:p-3 flex flex-col items-center text-center shadow-md backdrop-blur-xl group transition-all cursor-pointer">
              <Trophy className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white group-hover:scale-110 transition-transform stroke-[1.75]" />
              <p className="font-semibold text-white text-[9.5px] xs:text-[10px] sm:text-[11px] md:text-[11.5px] mt-1.5 leading-tight">
                Selective Rewards
              </p>
            </div>

            {/* Box 4: Never Expired */}
            <div className="rounded-xl sm:rounded-2xl bg-[#0c0c14]/90 border border-white/10 hover:border-white/20 p-2 xs:p-2.5 sm:p-3 flex flex-col items-center text-center shadow-md backdrop-blur-xl group transition-all cursor-pointer">
              <History className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white group-hover:scale-110 transition-transform stroke-[1.75]" />
              <p className="font-semibold text-white text-[9.5px] xs:text-[10px] sm:text-[11px] md:text-[11.5px] mt-1.5 leading-tight">
                Never Expired
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* POSITION 3: SMART NAVIGATION VIEW (Right Column on desktop / Bottom on mobile) */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            opacity: largePaymentsOpacity,
            visibility: largePaymentsVisibility,
            x: largePaymentsX,
            y: largePaymentsY,
          }}
          className="absolute
            left-0 right-0 mx-auto lg:left-auto lg:right-14 xl:right-24 2xl:right-36
            bottom-4 xs:bottom-6 sm:bottom-10 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2
            z-30 w-full max-w-[95%] xs:max-w-[400px] sm:max-w-[500px] lg:max-w-xl xl:max-w-2xl
            flex flex-col justify-center items-center lg:items-end
            text-center lg:text-right px-2 lg:px-0 will-change-transform"
        >
          <div className="w-full flex flex-col items-center lg:items-end">
            <h2 className="font-sans font-bold tracking-[-0.035em] leading-[1.18] sm:leading-[1.12] text-2xl xs:text-3xl sm:text-4xl lg:text-[4rem] text-center lg:text-right pb-1 overflow-visible">
              <span className="inline-block sm:block bg-gradient-to-r from-[#ffd3b6] via-[#fbcfe8] to-[#f472b6] bg-clip-text text-transparent mr-2 sm:mr-0 pb-1">
                Smart
              </span>
              <span className="inline-block sm:block bg-gradient-to-r from-[#f472b6] via-[#c084fc] to-[#818cf8] bg-clip-text text-transparent pb-1 sm:pb-2">
                Navigation
              </span>
            </h2>

            <p className="mt-1 sm:mt-3 text-xs sm:text-sm lg:text-base text-slate-400 font-normal leading-relaxed max-w-sm sm:max-w-md text-center lg:text-right">
              Everything you need, one tap away. Pay bills, track orders, and stay ahead with smart
              reminders.
            </p>

            <div className="grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-3 mt-2.5 sm:mt-5 w-full max-w-[270px] xs:max-w-[310px] sm:max-w-[380px] lg:max-w-[420px]">
              {/* Card 1: One-Click Orders */}
              <div className="rounded-xl xs:rounded-2xl sm:rounded-[18px] bg-[#0c0c14]/90 border border-white/10 hover:border-white/20 p-2 xs:p-2.5 sm:p-3.5 flex flex-col items-center text-center shadow-lg backdrop-blur-xl group transition-all">
                <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-1.5 sm:mb-2 group-hover:scale-105 transition-transform">
                  <ShoppingBagNavIcon className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5.5 sm:h-5.5" />
                </div>
                <h3 className="font-bold text-white text-[9.5px] xs:text-[10.5px] sm:text-[12px] md:text-[13px] leading-tight">
                  One-Click Orders
                </h3>
                <p className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10px] text-slate-400 mt-0.5 leading-tight">
                  Reorder in one tap
                </p>
              </div>

              {/* Card 2: One-Click Payments */}
              <div className="rounded-xl xs:rounded-2xl sm:rounded-[18px] bg-[#0c0c14]/90 border border-white/10 hover:border-white/20 p-2 xs:p-2.5 sm:p-3.5 flex flex-col items-center text-center shadow-lg backdrop-blur-xl group transition-all">
                <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-1.5 sm:mb-2 group-hover:scale-105 transition-transform">
                  <CardLightningNavIcon className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5.5 sm:h-5.5" />
                </div>
                <h3 className="font-bold text-white text-[9.5px] xs:text-[10.5px] sm:text-[12px] md:text-[13px] leading-tight">
                  One-Click Payments
                </h3>
                <p className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10px] text-slate-400 mt-0.5 leading-tight">
                  Pay bills instantly
                </p>
              </div>

              {/* Card 3: Smart Reminders */}
              <div className="rounded-xl xs:rounded-2xl sm:rounded-[18px] bg-[#0c0c14]/90 border border-white/10 hover:border-white/20 p-2 xs:p-2.5 sm:p-3.5 flex flex-col items-center text-center shadow-lg backdrop-blur-xl group transition-all">
                <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-1.5 sm:mb-2 group-hover:scale-105 transition-transform">
                  <BellClockNavIcon className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5.5 sm:h-5.5" />
                </div>
                <h3 className="font-bold text-white text-[9.5px] xs:text-[10.5px] sm:text-[12px] md:text-[13px] leading-tight">
                  Smart Reminders
                </h3>
                <p className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10px] text-slate-400 mt-0.5 leading-tight">
                  Never miss a due date
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* THE SINGLE CONTINUOUS PHONE MOCKUP */}
        {/* ========================================================================= */}
        <div
          className="relative z-20 w-full h-full flex items-center justify-center pointer-events-none"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            style={{
              x: phoneX,
              y: phoneY,
              rotateX: phoneRotateX,
              rotateY: phoneRotateY,
              scale: phoneScale,
              transformStyle: "preserve-3d",
            }}
            className="relative w-[260px] sm:w-[290px] md:w-[320px] lg:w-[340px] h-[520px] sm:h-[580px] md:h-[630px] lg:h-[660px] pointer-events-auto will-change-transform"
          >
            {/* Titanium Frame & Specular Rim */}
            <div className="relative w-full h-full rounded-[44px] sm:rounded-[50px] p-2 sm:p-2.5 bg-gradient-to-b from-[#3a3a46] via-[#1c1c24] to-[#0c0c12] border border-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.15),_0_-25px_80px_rgba(168,85,247,0.35),_0_35px_100px_rgba(0,0,0,0.95)]">
              {/* Top Specular Edge Highlight */}
              <div className="absolute top-0 inset-x-12 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

              {/* Inner OLED Phone Screen */}
              <div className="relative w-full h-full rounded-[36px] sm:rounded-[42px] bg-[#09090b] border border-white/10 overflow-hidden flex flex-col justify-between shadow-inner">
                {/* Dynamic Island & Status Bar */}
                <div className="relative z-40 w-full flex items-center justify-between text-white text-[10px] sm:text-[11px] font-medium tracking-tight px-4 pt-3 pb-1 shrink-0">
                  <span className="font-semibold text-white/95">9:41</span>
                  <div className="w-20 sm:w-22 h-4.5 sm:h-5 bg-black rounded-full flex items-center justify-between px-2 shadow-inner border border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#111118] border border-white/10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a16] border border-white/10" />
                  </div>
                  <div className="flex items-center gap-1 text-white/90">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <rect x="2" y="14" width="3" height="8" rx="1" />
                      <rect x="7" y="10" width="3" height="12" rx="1" />
                      <rect x="12" y="6" width="3" height="16" rx="1" />
                      <rect x="17" y="2" width="3" height="20" rx="1" />
                    </svg>
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
                    </svg>
                    <div className="w-3.5 h-2 border border-white/80 rounded-[2px] p-[1px] flex items-center">
                      <div className="h-full w-full bg-white rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* SCREEN 1: HERO STATE ("Borderless Payments" + Exact 3D Torus) */}
                {/* ------------------------------------------------------------- */}
                <motion.div
                  style={{
                    opacity: screen1Opacity,
                    visibility: screen1Visibility,
                  }}
                  className="absolute inset-0 pt-9 px-5 pb-5 flex flex-col justify-between z-30 pointer-events-none"
                >
                  {/* Glowing Torus / Donut Ring */}
                  <div className="relative my-auto flex items-center justify-center py-1">
                    <div className="absolute w-48 sm:w-56 h-32 sm:h-38 rounded-full bg-gradient-to-r from-pink-500/30 via-purple-500/25 to-indigo-500/20 blur-2xl pointer-events-none" />
                    <div className="relative w-[190px] sm:w-[220px] h-[110px] sm:h-[125px] flex items-center justify-center">
                      <svg
                        viewBox="0 0 320 180"
                        className="w-full h-full drop-shadow-[0_15px_35px_rgba(217,70,239,0.35)]"
                      >
                        <defs>
                          <linearGradient id="exactTorusGrad" x1="0%" y1="20%" x2="100%" y2="80%">
                            <stop offset="0%" stopColor="#fef08a" />
                            <stop offset="25%" stopColor="#fed7aa" />
                            <stop offset="50%" stopColor="#f472b6" />
                            <stop offset="75%" stopColor="#c084fc" />
                            <stop offset="100%" stopColor="#a855f7" />
                          </linearGradient>
                          <radialGradient id="exactTorusShine" cx="30%" cy="25%" r="70%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                            <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
                          </radialGradient>
                        </defs>
                        {/* Outer Torus Body */}
                        <ellipse cx="160" cy="90" rx="140" ry="80" fill="url(#exactTorusGrad)" />
                        {/* 3D Specular Highlight */}
                        <ellipse
                          cx="160"
                          cy="90"
                          rx="140"
                          ry="80"
                          fill="url(#exactTorusShine)"
                          style={{ mixBlendMode: "overlay" }}
                        />
                        {/* Center Cutout Hole */}
                        <ellipse cx="160" cy="90" rx="64" ry="38" fill="#09090b" />
                      </svg>
                    </div>
                  </div>

                  {/* App Brand & Headline */}
                  <div className="relative z-20 pb-2">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-4.5 h-4.5 rounded-[5px] bg-gradient-to-tr from-purple-500 via-pink-500 to-amber-300 p-[1px] shadow-sm">
                        <div className="w-full h-full bg-[#09090b] rounded-[4px] flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-pink-400 to-purple-400" />
                        </div>
                      </div>
                      <span className="text-[13px] font-semibold text-white/95">Payer</span>
                    </div>
                    <h3 className="text-2xl sm:text-[1.85rem] font-bold tracking-tight text-white leading-[1.08]">
                      Borderless <br /> Payments
                    </h3>
                  </div>
                </motion.div>

                {/* ------------------------------------------------------------- */}
                {/* SCREEN 2: QUICK ACTIONS STATE (Haley Dashboard UI) */}
                {/* ------------------------------------------------------------- */}
                <motion.div
                  style={{
                    opacity: screen2Opacity,
                    visibility: screen2Visibility,
                  }}
                  className="absolute inset-0 pt-10 px-4 pb-3 flex flex-col justify-between z-30"
                >
                  <div className="flex items-center justify-between pt-0.5">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                        alt="Haley avatar"
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-1 ring-white/20"
                      />
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium">How's it going</p>
                        <p className="text-xs sm:text-sm font-bold text-white leading-tight">Haley</p>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                      <Bell className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="mt-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 flex items-center justify-between text-xs text-slate-300">
                    <span className="text-[11px] font-medium text-slate-300">Add Your New Card</span>
                    <div className="w-4.5 h-4.5 rounded-full bg-white/10 flex items-center justify-center">
                      <Plus className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  <div className="mt-2 rounded-2xl bg-gradient-to-r from-[#ffd3b6] via-[#f472b6] to-[#a5b4fc] p-3 sm:p-3.5 text-black shadow-md relative overflow-hidden">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="italic font-black text-sm tracking-tight">VISA</span>
                      <div className="flex items-center gap-1 font-mono text-[9px] sm:text-[10px] font-semibold tracking-wider">
                        <span>**** **** **** 3241</span>
                        <Eye className="w-3 h-3 text-black/70 ml-0.5" />
                      </div>
                    </div>
                    <div className="mt-3.5">
                      <p className="text-[9px] uppercase tracking-wider text-black/60 font-semibold">
                        Total Balance
                      </p>
                      <p className="text-lg sm:text-xl font-extrabold tracking-tight text-black leading-tight">
                        $214,453.00
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 mt-2 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-7.5 h-7.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        <Gift className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[8.5px] text-slate-300 font-medium">Redeem</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-7.5 h-7.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[8.5px] text-slate-300 font-medium">Rewards</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-7.5 h-7.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        <Trophy className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[8.5px] text-slate-300 font-medium">Trophy</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-7.5 h-7.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        <History className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[8.5px] text-slate-300 font-medium">History</span>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-white/90 mb-1">
                      <span>History Transaction</span>
                      <span className="text-[9px] text-slate-400 font-normal">See All</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/[0.03] border border-white/5 rounded-xl p-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6.5 h-6.5 rounded-lg bg-[#001e36] text-[#38bdf8] flex items-center justify-center text-[10px] font-bold">
                          Ps
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-white leading-tight">
                            Abode Photoshop
                          </p>
                          <p className="text-[8px] text-slate-400">Jan 21 2025 , 04:44 PM</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-white">$19</span>
                    </div>
                  </div>

                  <div className="mt-auto bg-[#13131a]/95 border border-white/10 rounded-full px-3.5 py-1.5 flex items-center justify-between shadow-xl">
                    <Home className="w-3.5 h-3.5 text-white" />
                    <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                    <div className="w-6.5 h-6.5 rounded-lg bg-gradient-to-tr from-pink-400 to-purple-400 flex items-center justify-center text-black shadow-sm">
                      <QrCode className="w-3.5 h-3.5 text-black" />
                    </div>
                    <Activity className="w-3.5 h-3.5 text-slate-400" />
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                      alt="Haley"
                      className="w-4.5 h-4.5 rounded-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* ------------------------------------------------------------- */}
                {/* SCREEN 3: SMART NAVIGATION STATE */}
                {/* ------------------------------------------------------------- */}
                <motion.div
                  style={{
                    opacity: screen3Opacity,
                    visibility: screen3Visibility,
                  }}
                  className="absolute inset-0 pt-10 px-4 pb-4 flex flex-col justify-between z-30"
                >
                  <div>
                    <div className="flex items-center justify-between pt-0.5">
                      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs font-semibold text-white">Smart Hub</p>
                      <div className="w-7" />
                    </div>

                    <div className="mt-3 bg-white/5 border border-white/10 rounded-2xl p-2.5 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] text-slate-400">Total Saved This Month</p>
                        <p className="text-base font-extrabold text-white mt-0.5">₹14,850</p>
                      </div>
                      <span className="text-[9px] font-bold text-[#22c55e] bg-[#22c55e]/15 px-2 py-0.5 rounded-md">
                        ↑ 34%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 my-auto">
                    <div className="bg-[#141420] border border-white/10 rounded-xl p-2 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#f472b6]/10 border border-[#f472b6]/20 flex items-center justify-center shrink-0">
                        <ShoppingBagNavIcon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-white leading-tight">One-Click Orders</p>
                        <p className="text-[7.5px] text-slate-400 truncate">2 repeat orders ready</p>
                      </div>
                      <span className="text-[9px] font-semibold text-purple-300">Reorder</span>
                    </div>

                    <div className="bg-[#141420] border border-white/10 rounded-xl p-2 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#818cf8]/10 border border-[#818cf8]/20 flex items-center justify-center shrink-0">
                        <CardLightningNavIcon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-white leading-tight">One-Click Payments</p>
                        <p className="text-[7.5px] text-slate-400 truncate">Electricity bill due</p>
                      </div>
                      <span className="text-[9px] font-semibold text-indigo-300">Pay</span>
                    </div>

                    <div className="bg-[#141420] border border-white/10 rounded-xl p-2 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#c084fc]/10 border border-[#c084fc]/20 flex items-center justify-center shrink-0">
                        <BellClockNavIcon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-white leading-tight">Smart Reminders</p>
                        <p className="text-[7.5px] text-slate-400 truncate">Credit card bill 5th Oct</p>
                      </div>
                      <span className="text-[9px] font-semibold text-pink-300">Active</span>
                    </div>
                  </div>

                  <div className="mt-auto bg-[#13131a]/95 border border-white/10 rounded-full px-3.5 py-1.5 flex items-center justify-between shadow-xl">
                    <Home className="w-3.5 h-3.5 text-slate-400" />
                    <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                    <div className="w-6.5 h-6.5 rounded-lg bg-gradient-to-tr from-pink-400 to-purple-400 flex items-center justify-center text-black shadow-sm">
                      <QrCode className="w-3.5 h-3.5 text-black" />
                    </div>
                    <Activity className="w-3.5 h-3.5 text-white" />
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                      alt="Haley"
                      className="w-4.5 h-4.5 rounded-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

function CardsScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const isMobile = width < 640;
  const isNarrow = width < 480;
  const isTablet = width >= 640 && width < 1024;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springProgress = useSpring(scrollYProgress, {
    damping: 28,
    stiffness: 100,
    mass: 0.16,
  });
  const smoothProgress = isMobile ? scrollYProgress : springProgress;

  // Headline scroll animation: Starts slightly lower (+65px), ascends & settles by 0.32, then holds paused
  const titleY = useTransform(smoothProgress, [0.0, 0.32, 1.0], [isMobile ? 45 : 65, 0, 0]);
  const titleOpacity = useTransform(smoothProgress, [0.0, 0.20, 1.0], [0.35, 1, 1]);

  // Left Card Scroll Transforms: Fans out smoothly (0.0 -> 0.35), then STICKS / PAUSES (0.35 -> 1.0)
  const leftCardX = useTransform(
    smoothProgress,
    [0.0, 0.35, 1.0],
    [0, isNarrow ? -48 : isMobile ? -60 : isTablet ? -85 : -105, isNarrow ? -48 : isMobile ? -60 : isTablet ? -85 : -105]
  );
  const leftCardY = useTransform(smoothProgress, [0.0, 0.35, 1.0], [120, 36, 36]);
  const leftCardRotate = useTransform(smoothProgress, [0.0, 0.35, 1.0], [0, isMobile ? -15 : -22, isMobile ? -15 : -22]);
  const leftCardScale = useTransform(smoothProgress, [0.0, 0.35, 1.0], [0.92, 0.98, 0.98]);

  // Center Card Scroll Transforms: Rises into focus (0.0 -> 0.35), then STICKS / PAUSES (0.35 -> 1.0)
  const centerCardY = useTransform(smoothProgress, [0.0, 0.35, 1.0], [130, 16, 16]);
  const centerCardRotate = useTransform(smoothProgress, [0.0, 0.35, 1.0], [0, -3, -3]);
  const centerCardScale = useTransform(smoothProgress, [0.0, 0.35, 1.0], [0.94, 1.02, 1.02]);

  // Right Card Scroll Transforms: Fans out smoothly (0.0 -> 0.35), then STICKS / PAUSES (0.35 -> 1.0)
  const rightCardX = useTransform(
    smoothProgress,
    [0.0, 0.35, 1.0],
    [0, isNarrow ? 48 : isMobile ? 60 : isTablet ? 85 : 105, isNarrow ? 48 : isMobile ? 60 : isTablet ? 85 : 105]
  );
  const rightCardY = useTransform(smoothProgress, [0.0, 0.35, 1.0], [120, 36, 36]);
  const rightCardRotate = useTransform(smoothProgress, [0.0, 0.35, 1.0], [0, isMobile ? 13 : 18, isMobile ? 13 : 18]);
  const rightCardScale = useTransform(smoothProgress, [0.0, 0.35, 1.0], [0.92, 0.98, 0.98]);

  return (
    <div
      id="download"
      ref={containerRef}
      className="relative w-full bg-[#000000] text-white selection:bg-purple-500/30 overflow-visible"
      style={{ height: isMobile ? "190vh" : "240vh" }}
    >
      {/* Pinned Sticky Fullscreen Viewport with Pause on Scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] xs:w-[450px] sm:w-[700px] h-[300px] sm:h-[450px] bg-[radial-gradient(circle,rgba(168,85,247,0.16)_0%,transparent_70%)] blur-[70px] sm:blur-[95px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center w-full flex flex-col items-center">
          {/* Headline */}
          <motion.h2
            style={{ y: titleY, opacity: titleOpacity }}
            className="font-sans font-bold tracking-[-0.035em] text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-white text-center mb-10 sm:mb-16 md:mb-20 select-none"
          >
            Manage <span className="bg-gradient-to-r from-[#f472b6] via-[#c084fc] to-[#818cf8] bg-clip-text text-transparent">all</span> cards in one place
          </motion.h2>

          {/* Fanned Cards Showcase (Scroll Scrubbed & Paused) */}
          <div className="relative w-full max-w-2xl h-[260px] xs:h-[280px] sm:h-[320px] md:h-[350px] flex items-center justify-center select-none">
            {/* Left Card - Axis Bank */}
            <motion.div
              style={{
                x: leftCardX,
                y: leftCardY,
                rotate: leftCardRotate,
                scale: leftCardScale,
              }}
              className="absolute w-[155px] xs:w-[180px] sm:w-[215px] md:w-[235px] h-[245px] xs:h-[280px] sm:h-[330px] md:h-[365px] rounded-[18px] sm:rounded-[24px] bg-gradient-to-b from-[#1a1a22] via-[#101016] to-[#09090d] border border-white/15 p-3.5 sm:p-5 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-10 origin-bottom"
            >
              <div className="flex items-center justify-between">
                <AxisBankLogo />
                <EmvChip />
              </div>
              <div className="my-auto flex items-center justify-between pl-0.5">
                <div className="font-mono text-white/90 text-[10px] xs:text-xs sm:text-[13px] tracking-[0.14em] sm:tracking-[0.16em] font-semibold [writing-mode:vertical-rl] rotate-180">
                  3455 4562 7710 3507
                </div>
                <div className="text-right text-[8px] xs:text-[9px] sm:text-[10px] text-slate-400 space-y-0.5">
                  <p className="text-[7px] xs:text-[8px] uppercase tracking-wider text-slate-500">Card holder name</p>
                  <p className="font-semibold text-white">Kunal Shah</p>
                  <p className="text-[7px] xs:text-[8px] uppercase tracking-wider text-slate-500 pt-1 sm:pt-1.5">Expiry date</p>
                  <p className="font-semibold text-white">02/30</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 opacity-60">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20" />
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/15 -ml-2 sm:-ml-2.5" />
              </div>
            </motion.div>

            {/* Center Card (Front Card with Topo Pattern) - HDFC Bank */}
            <motion.div
              style={{
                y: centerCardY,
                rotate: centerCardRotate,
                scale: centerCardScale,
              }}
              className="absolute w-[155px] xs:w-[180px] sm:w-[215px] md:w-[235px] h-[245px] xs:h-[280px] sm:h-[330px] md:h-[365px] rounded-[18px] sm:rounded-[24px] bg-gradient-to-b from-[#252532] via-[#14141c] to-[#0c0c12] border border-white/25 p-3.5 sm:p-5 flex flex-col justify-between shadow-[0_25px_80px_rgba(0,0,0,0.95),_0_0_35px_rgba(168,85,247,0.12)] z-20 overflow-hidden origin-bottom"
            >
              {/* Topographic Lines Overlay */}
              <TopoPattern />

              <div className="relative z-10 flex items-center justify-between">
                <HdfcBankLogo />
                <EmvChip />
              </div>

              <div className="relative z-10 my-auto flex items-center justify-between pl-0.5">
                <div className="font-mono text-white text-[10px] xs:text-xs sm:text-[13px] tracking-[0.14em] sm:tracking-[0.16em] font-semibold [writing-mode:vertical-rl] rotate-180 drop-shadow">
                  3455 4562 7710 3507
                </div>
                <div className="text-right text-[8px] xs:text-[9px] sm:text-[10px] text-slate-300 space-y-0.5">
                  <p className="text-[7px] xs:text-[8px] uppercase tracking-wider text-slate-400">Card holder name</p>
                  <p className="font-semibold text-white">Kunal Shah</p>
                  <p className="text-[7px] xs:text-[8px] uppercase tracking-wider text-slate-400 pt-1 sm:pt-1.5">Expiry date</p>
                  <p className="font-semibold text-white">02/30</p>
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-1.5 opacity-75">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/30" />
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 -ml-2 sm:-ml-2.5" />
              </div>
            </motion.div>

            {/* Right Card - SBI */}
            <motion.div
              style={{
                x: rightCardX,
                y: rightCardY,
                rotate: rightCardRotate,
                scale: rightCardScale,
              }}
              className="absolute w-[155px] xs:w-[180px] sm:w-[215px] md:w-[235px] h-[245px] xs:h-[280px] sm:h-[330px] md:h-[365px] rounded-[18px] sm:rounded-[24px] bg-gradient-to-b from-[#1a1a22] via-[#101016] to-[#09090d] border border-white/15 p-3.5 sm:p-5 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-10 origin-bottom"
            >
              <div className="flex items-center justify-between">
                <SbiBankLogo />
                <EmvChip />
              </div>
              <div className="my-auto flex items-center justify-between pl-0.5">
                <div className="font-mono text-white/90 text-[10px] xs:text-xs sm:text-[13px] tracking-[0.14em] sm:tracking-[0.16em] font-semibold [writing-mode:vertical-rl] rotate-180">
                  3455 4562 7710 3507
                </div>
                <div className="text-right text-[8px] xs:text-[9px] sm:text-[10px] text-slate-400 space-y-0.5">
                  <p className="text-[7px] xs:text-[8px] uppercase tracking-wider text-slate-500">Card holder name</p>
                  <p className="font-semibold text-white">Kunal Shah</p>
                  <p className="text-[7px] xs:text-[8px] uppercase tracking-wider text-slate-500 pt-1 sm:pt-1.5">Expiry date</p>
                  <p className="font-semibold text-white">02/30</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 opacity-60">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20" />
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/15 -ml-2 sm:-ml-2.5" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AxisBankLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 sm:gap-2 ${className}`}>
      <img
        src="/logo/axis_logo_clean.png"
        alt="Axis Bank"
        className="h-5 xs:h-6 sm:h-7 w-auto max-w-[85px] xs:max-w-[105px] sm:max-w-[120px] object-contain shrink-0 filter grayscale brightness-[2.6] contrast-[0.9] opacity-95 drop-shadow-sm"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/logo/axis_bank_clean.png";
        }}
      />
      <span className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] font-bold text-white/90 tracking-wider uppercase font-sans whitespace-nowrap">
        Axis Bank
      </span>
    </div>
  );
}

function HdfcBankLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 sm:gap-2 ${className}`}>
      <img
        src="/logo/hdfc.png"
        alt="HDFC Bank"
        className="h-5 xs:h-6 sm:h-7 w-auto max-w-[85px] xs:max-w-[105px] sm:max-w-[120px] object-contain shrink-0 filter grayscale brightness-[2.6] contrast-[0.9] opacity-95 drop-shadow-sm"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/logo/hdfc.jpg";
        }}
      />
      <span className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] font-bold text-white/90 tracking-wider uppercase font-sans whitespace-nowrap">
        HDFC Bank
      </span>
    </div>
  );
}

function SbiBankLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 sm:gap-2 ${className}`}>
      <img
        src="/logo/sbi.png"
        alt="State Bank of India"
        className="h-5 xs:h-6 sm:h-7 w-auto max-w-[85px] xs:max-w-[105px] sm:max-w-[120px] object-contain shrink-0 filter grayscale brightness-[2.6] contrast-[0.9] opacity-95 drop-shadow-sm"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/logo/SBI-logo.jfif";
        }}
      />
      <span className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] font-bold text-white/90 tracking-wider uppercase font-sans whitespace-nowrap">
        State Bank of India
      </span>
    </div>
  );
}

function EmvChip() {
  return (
    <div className="w-8 h-6 sm:w-8.5 sm:h-6.5 rounded-[5px] bg-gradient-to-br from-[#d4d4d8] via-[#a1a1aa] to-[#71717a] p-[1px] shadow-sm relative overflow-hidden shrink-0">
      <div className="w-full h-full bg-[#18181f] rounded-[4px] relative p-0.5 flex flex-col justify-between">
        <div className="flex justify-between h-full">
          <div className="w-[45%] h-full border-r border-[#a1a1aa]/30 relative">
            <div className="absolute top-[35%] inset-x-0 h-[1px] bg-[#a1a1aa]/30" />
            <div className="absolute bottom-[35%] inset-x-0 h-[1px] bg-[#a1a1aa]/30" />
          </div>
          <div className="w-[45%] h-full relative">
            <div className="absolute top-[35%] inset-x-0 h-[1px] bg-[#a1a1aa]/30" />
            <div className="absolute bottom-[35%] inset-x-0 h-[1px] bg-[#a1a1aa]/30" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoppingBagNavIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 10.5H23L21.7 25C21.6 25.8 20.9 26.5 20.1 26.5H11.9C11.1 26.5 10.4 25.8 10.3 25L9 10.5Z"
        stroke="#f472b6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 10.5V8C12.5 6.1 14.1 4.5 16 4.5C17.9 4.5 19.5 6.1 19.5 8V10.5"
        stroke="#f472b6"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CardLightningNavIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect
        x="5"
        y="7.5"
        width="22"
        height="17"
        rx="4"
        stroke="#818cf8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M5 12.5H27" stroke="#818cf8" strokeWidth="2" />
      <circle cx="21" cy="19.5" r="4.5" fill="#0c0c14" stroke="#818cf8" strokeWidth="1.5" />
      <path
        d="M21.5 17L19.5 19.5H22.5L20.5 22"
        stroke="#818cf8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BellClockNavIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 5.5C13.5 5.5 11.5 7.5 11.5 10V15C11.5 16 11 17 10.2 17.6L9.2 18.4C8.6 18.9 9 19.8 9.8 19.8H18.5"
        stroke="#c084fc"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 23C14 23.6 14.8 24 16 24C16.8 24 17.5 23.7 18 23.2"
        stroke="#c084fc"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="21.5" cy="18.5" r="4.5" fill="#0c0c14" stroke="#c084fc" strokeWidth="1.5" />
      <path
        d="M21.5 16.5V18.5L23 19.5"
        stroke="#c084fc"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TopoPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 300 450" fill="none">
      <path d="M-50 90 Q 80 30 180 110 T 350 80" stroke="white" strokeWidth="0.75" />
      <path d="M-50 120 Q 70 60 170 140 T 350 110" stroke="white" strokeWidth="0.75" />
      <path d="M-50 150 Q 90 90 190 170 T 350 140" stroke="white" strokeWidth="0.75" />
      <path d="M-50 180 Q 60 120 160 200 T 350 170" stroke="white" strokeWidth="0.75" />
      <path d="M-50 210 Q 100 150 200 230 T 350 200" stroke="white" strokeWidth="0.75" />
      <path d="M-50 240 Q 80 180 180 260 T 350 230" stroke="white" strokeWidth="0.75" />
      <path d="M-50 270 Q 110 210 210 290 T 350 260" stroke="white" strokeWidth="0.75" />
      <path d="M-50 300 Q 70 240 170 320 T 350 290" stroke="white" strokeWidth="0.75" />
      <path d="M-50 330 Q 90 270 190 350 T 350 320" stroke="white" strokeWidth="0.75" />
    </svg>
  );
}

function InvertedCornerLeft({ className = "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={`absolute bottom-full left-0 pointer-events-none mb-[-1px] ${className}`}
    >
      <path
        d="M0,48 L48,48 C21.49,48 0,26.51 0,0 L0,48 Z"
        fill="#f4f5f8"
      />
    </svg>
  );
}

function InvertedCornerRight({ className = "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={`absolute bottom-full right-0 pointer-events-none mb-[-1px] ${className}`}
    >
      <path
        d="M48,48 L0,48 C26.51,48 48,26.51 48,0 L48,48 Z"
        fill="#f4f5f8"
      />
    </svg>
  );
}

// =========================================================================
// LIGHT CONTINUATION & BENTO SECTIONS (WITH ADVANCED SCROLL ANIMATIONS)
// =========================================================================
function LightContinuation() {
  return (
    <>
      <div id="light-continuation-wrap" className="w-full">
        <section id="company" data-theme-light="true" className="relative z-20 mt-10 sm:mt-16 md:mt-24 bg-[#f4f5f8] text-black pt-12 sm:pt-16 pb-28 px-6 sm:px-12 md:px-16 shadow-[0_-30px_70px_rgba(0,0,0,0.7)] w-full">
          {/* Inverted / Concave Upward Curving Corners */}
          <InvertedCornerLeft />
          <InvertedCornerRight />

          <div className="max-w-6xl mx-auto space-y-24 sm:space-y-32">
            {/* LOGO MARQUEE STRIP */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center pb-12 border-b border-slate-200"
            >
              <p className="text-sm font-semibold text-slate-700 tracking-wide mb-8 select-none">
                Built with Industry lead to serve Best
              </p>
              {/* Infinite Single-Line Marquee with Edge Fade Masks */}
              <div
                className="overflow-hidden relative w-full flex select-none py-3"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                }}
              >
                <div className="flex whitespace-nowrap will-change-transform animate-marquee">
                  <div className="flex items-center gap-14 sm:gap-20 md:gap-24 shrink-0 pr-14 sm:pr-20 md:pr-24">
                    <span className="font-extrabold text-base sm:text-lg md:text-xl tracking-wider uppercase font-sans bg-gradient-to-r from-slate-500 via-slate-700 to-slate-500 bg-clip-text text-transparent hover:from-slate-700 hover:via-slate-900 hover:to-slate-700 transition-all cursor-pointer">
                      AXIS BANK
                    </span>
                    <span className="font-bold text-base sm:text-lg md:text-xl tracking-tight font-sans bg-gradient-to-r from-slate-500 via-slate-700 to-slate-500 bg-clip-text text-transparent hover:from-slate-700 hover:via-slate-900 hover:to-slate-700 transition-all cursor-pointer">
                      setu.
                    </span>
                    <span className="font-bold text-base sm:text-lg md:text-xl tracking-tight font-sans bg-gradient-to-r from-slate-500 via-slate-700 to-slate-500 bg-clip-text text-transparent hover:from-slate-700 hover:via-slate-900 hover:to-slate-700 transition-all cursor-pointer">
                      shipway
                    </span>
                    <span className="font-bold text-base sm:text-lg md:text-xl tracking-tight font-sans bg-gradient-to-r from-slate-500 via-slate-700 to-slate-500 bg-clip-text text-transparent hover:from-slate-700 hover:via-slate-900 hover:to-slate-700 transition-all cursor-pointer">
                      InstantPay
                    </span>
                    <span className="font-bold text-base sm:text-lg md:text-xl tracking-tight font-sans bg-gradient-to-r from-slate-500 via-slate-700 to-slate-500 bg-clip-text text-transparent hover:from-slate-700 hover:via-slate-900 hover:to-slate-700 transition-all cursor-pointer">
                      Razorpay
                    </span>
                    <span className="font-bold text-base sm:text-lg md:text-xl tracking-tight font-sans bg-gradient-to-r from-slate-500 via-slate-700 to-slate-500 bg-clip-text text-transparent hover:from-slate-700 hover:via-slate-900 hover:to-slate-700 transition-all cursor-pointer">
                      route mobile
                    </span>
                    <span className="font-bold text-base sm:text-lg md:text-xl tracking-tight font-sans bg-gradient-to-r from-slate-500 via-slate-700 to-slate-500 bg-clip-text text-transparent hover:from-slate-700 hover:via-slate-900 hover:to-slate-700 transition-all cursor-pointer lowercase">
                      airtel
                    </span>
                    <span className="font-semibold text-base sm:text-lg md:text-xl tracking-tight font-sans bg-gradient-to-r from-slate-500 via-slate-700 to-slate-500 bg-clip-text text-transparent hover:from-slate-700 hover:via-slate-900 hover:to-slate-700 transition-all cursor-pointer">
                      Google
                    </span>
                    <span className="font-bold text-base sm:text-lg md:text-xl tracking-tight font-sans bg-gradient-to-r from-slate-500 via-slate-700 to-slate-500 bg-clip-text text-transparent hover:from-slate-700 hover:via-slate-900 hover:to-slate-700 transition-all cursor-pointer">
                      Hubble Money
                    </span>
                  </div>

                  {/* Duplicated track for seamless infinite looping */}
                  <div className="flex items-center gap-14 sm:gap-20 md:gap-24 shrink-0 pr-14 sm:pr-20 md:pr-24" aria-hidden="true">
                    <span className="font-extrabold text-base sm:text-lg md:text-xl tracking-wider uppercase font-sans bg-gradient-to-r from-slate-500 via-slate-700 to-slate-500 bg-clip-text text-transparent hover:from-slate-700 hover:via-slate-900 hover:to-slate-700 transition-all cursor-pointer">
                      AXIS BANK
                    </span>
                    <span className="font-bold text-base sm:text-lg md:text-xl tracking-tight font-sans bg-gradient-to-r from-slate-500 via-slate-700 to-slate-500 bg-clip-text text-transparent hover:from-slate-700 hover:via-slate-900 hover:to-slate-700 transition-all cursor-pointer">
                      setu.
                    </span>
                    <span className="font-bold text-base sm:text-lg md:text-xl tracking-tight font-sans bg-gradient-to-r from-slate-500 via-slate-700 to-slate-500 bg-clip-text text-transparent hover:from-slate-700 hover:via-slate-900 hover:to-slate-700 transition-all cursor-pointer">
                      shipway
                    </span>
                    <span className="font-bold text-base sm:text-lg md:text-xl tracking-tight font-sans bg-gradient-to-r from-slate-500 via-slate-700 to-slate-500 bg-clip-text text-transparent hover:from-slate-700 hover:via-slate-900 hover:to-slate-700 transition-all cursor-pointer">
                      InstantPay
                    </span>
                    <span className="font-bold text-base sm:text-lg md:text-xl tracking-tight font-sans bg-gradient-to-r from-slate-500 via-slate-700 to-slate-500 bg-clip-text text-transparent hover:from-slate-700 hover:via-slate-900 hover:to-slate-700 transition-all cursor-pointer">
                      Razorpay
                    </span>
                    <span className="font-bold text-base sm:text-lg md:text-xl tracking-tight font-sans bg-gradient-to-r from-slate-500 via-slate-700 to-slate-500 bg-clip-text text-transparent hover:from-slate-700 hover:via-slate-900 hover:to-slate-700 transition-all cursor-pointer">
                      route mobile
                    </span>
                    <span className="font-bold text-base sm:text-lg md:text-xl tracking-tight font-sans bg-gradient-to-r from-slate-500 via-slate-700 to-slate-500 bg-clip-text text-transparent hover:from-slate-700 hover:via-slate-900 hover:to-slate-700 transition-all cursor-pointer lowercase">
                      airtel
                    </span>
                    <span className="font-semibold text-base sm:text-lg md:text-xl tracking-tight font-sans bg-gradient-to-r from-slate-500 via-slate-700 to-slate-500 bg-clip-text text-transparent hover:from-slate-700 hover:via-slate-900 hover:to-slate-700 transition-all cursor-pointer">
                      Google
                    </span>
                    <span className="font-bold text-base sm:text-lg md:text-xl tracking-tight font-sans bg-gradient-to-r from-slate-500 via-slate-700 to-slate-500 bg-clip-text text-transparent hover:from-slate-700 hover:via-slate-900 hover:to-slate-700 transition-all cursor-pointer">
                      Hubble Money
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SECTION 1: WE SIMPLIFY THE WAY YOU PAY */}
            <SimplifyPaySection />

            {/* SECTION 2: GAIN WEEKLY REVENUE INSIGHTS BENTO GRID */}
            <RevenueInsightsBentoSection />

            {/* SECTION 3: GIGANTIC ANIMATED TEXT MARQUEE */}
            <div className="py-6 sm:py-10 border-y border-slate-200/80 overflow-hidden select-none -mx-6 sm:-mx-12 md:-mx-16 flex">
              <div className="flex whitespace-nowrap will-change-transform animate-marquee">
                <div className="flex items-center gap-6 shrink-0 pr-6">
                  <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-bold tracking-tighter text-black">Every Purchase</span>
                  <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] text-slate-300 font-light">—</span>
                  <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-bold tracking-tighter text-black">Turns Into Rewards</span>
                  <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] text-slate-300 font-light">—</span>
                  <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-bold tracking-tighter text-black">Every Purchase</span>
                  <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] text-slate-300 font-light">—</span>
                  <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-bold tracking-tighter text-black">Turns Into Rewards</span>
                  <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] text-slate-300 font-light">—</span>
                </div>
                <div className="flex items-center gap-6 shrink-0 pr-6" aria-hidden="true">
                  <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-bold tracking-tighter text-black">Every Purchase</span>
                  <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] text-slate-300 font-light">—</span>
                  <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-bold tracking-tighter text-black">Turns Into Rewards</span>
                  <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] text-slate-300 font-light">—</span>
                  <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-bold tracking-tighter text-black">Every Purchase</span>
                  <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] text-slate-300 font-light">—</span>
                  <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-bold tracking-tighter text-black">Turns Into Rewards</span>
                  <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] text-slate-300 font-light">—</span>
                </div>
              </div>
            </div>

            {/* SECTION 4: MANAGE GENERAL PAYMENTS WITH CLEAR VISUAL INSIGHTS */}
            <GeneralPaymentsSection />
          </div>
        </section>

        {/* SECTION 5: SIZZLE SECTION */}
        <div className="bg-[#f4f5f8] w-full px-2 sm:px-4 md:px-6 py-8 sm:py-14 md:py-20">
          <SizzleSection />
        </div>

        {/* SECTION 6: CIKKA MALL SECTION */}
        <CikkaMall />

        {/* SECTION 7: WAITLIST SECTION */}
        <WaitlistSection />

        {/* SECTION 8: GET THE APP SHOWCASE */}
        <GetTheAppSection />
      </div>

      {/* FOOTER WITH CURVED CORNERS */}
      <div className="bg-[#f4f5f8] w-full">
        <Footer />
      </div>
    </>
  );
}