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
  Home,
  Landmark,
  Mail,
  Plus,
  QrCode,
  Send,
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

// Responsive window size hook
function useWindowSize() {
  const [size, setSize] = useState({ width: 1280, height: 800 });
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
      { title: "Payer — Borderless Payments" },
      { name: "description", content: "Fast, secure and borderless payments, powered by Payer." },
      { property: "og:title", content: "Payer — Borderless Payments" },
      { property: "og:description", content: "Fast, secure and borderless payments, powered by Payer." },
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
    const handleCheck = () => {
      const lightSections = document.querySelectorAll('[data-theme-light="true"]');
      const headerTriggerY = 60;
      let lightActive = false;

      lightSections.forEach((sec) => {
        const r = sec.getBoundingClientRect();
        if (r.top <= headerTriggerY && r.bottom >= headerTriggerY) {
          lightActive = true;
        }
      });

      setIsLight(lightActive);
    };

    window.addEventListener("scroll", handleCheck, { passive: true });
    window.addEventListener("resize", handleCheck);
    handleCheck();

    return () => {
      window.removeEventListener("scroll", handleCheck);
      window.removeEventListener("resize", handleCheck);
    };
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
        href="#top"
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
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  // Responsive phone X offset (how far it shifts left/right)
  // On mobile, phone stays centered while text sits cleanly below
  const phoneShiftX = isMobile ? 0 : isTablet ? 175 : 260;
  // Hero start Y: phone enters from below, slides up as user scrolls
  const heroStartY = isMobile ? 150 : 250;

  // Track scroll throughout the 480vh sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Butter-smooth spring interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
    mass: 0.25,
  });

  // --- 1. HERO STAGE ("We've Got You") ---
  const heroOpacity = useTransform(smoothProgress, [0.0, 0.18, 0.30], [1, 0.9, 0]);
  const heroY = useTransform(smoothProgress, [0.0, 0.30], [0, -90]);
  const heroScale = useTransform(smoothProgress, [0.0, 0.30], [1, 0.94]);

  // --- 2. QUICK ACTIONS STAGE (Left Column on desktop / Bottom on mobile) ---
  const quickActionsOpacity = useTransform(
    smoothProgress,
    [0.24, 0.36, 0.58, 0.68],
    [0, 1, 1, 0]
  );
  const quickActionsX = useTransform(
    smoothProgress,
    [0.24, 0.36, 0.58, 0.68],
    isMobile ? [0, 0, 0, 0] : [-50, 0, 0, -50]
  );
  const quickActionsY = useTransform(
    smoothProgress,
    [0.24, 0.36, 0.58, 0.68],
    isMobile ? [25, 0, 0, -25] : [40, 0, 0, -40]
  );

  // --- 3. LARGE PAYMENTS STAGE (Right Column on desktop / Bottom on mobile) ---
  const largePaymentsOpacity = useTransform(
    smoothProgress,
    [0.64, 0.76, 0.96, 1.0],
    [0, 1, 1, 1]
  );
  const largePaymentsX = useTransform(
    smoothProgress,
    [0.64, 0.76],
    isMobile ? [0, 0] : [50, 0]
  );
  const largePaymentsY = useTransform(
    smoothProgress,
    [0.64, 0.76],
    isMobile ? [25, 0] : [40, 0]
  );

  // --- 4. THE SINGLE CONTINUOUS PHONE MOCKUP ---
  // Phone shifts RIGHT for Quick Actions, LEFT for Large Payments
  const phoneX = useTransform(
    smoothProgress,
    [0.0, 0.20, 0.36, 0.58, 0.76, 1.0],
    [0, isMobile ? 0 : 100, phoneShiftX, phoneShiftX, -phoneShiftX, -phoneShiftX]
  );

  // KEY SCROLL PARALLAX: Phone starts lower and moves upward.
  // On mobile, phone docks safely in the top half (-120px) to give clear headroom for the interactive controls below
  const phoneY = useTransform(
    smoothProgress,
    [0.0, 0.26, 0.38, 1.0],
    [heroStartY, 20, isMobile ? -120 : 0, isMobile ? -120 : 0]
  );

  // 3D Perspective Tilt
  const phoneRotateX = useTransform(
    smoothProgress,
    [0.0, 0.28, 0.38, 0.58, 0.76, 1.0],
    [isMobile ? 8 : 20, 0, 0, 0, 0, 0]
  );
  const phoneRotateY = useTransform(
    smoothProgress,
    [0.0, 0.22, 0.38, 0.58, 0.76, 1.0],
    [0, isMobile ? 0 : -3, isMobile ? 0 : -3, isMobile ? 0 : 3, isMobile ? 0 : 3, isMobile ? 0 : 3]
  );
  const phoneScale = useTransform(
    smoothProgress,
    [0.0, 0.26, 0.38, 0.58, 0.76, 1.0],
    [
      isMobile ? 0.70 : 0.86,
      isMobile ? 0.73 : 0.88,
      isMobile ? 0.74 : 0.88,
      isMobile ? 0.74 : 0.88,
      isMobile ? 0.74 : 0.88,
      isMobile ? 0.74 : 0.88,
    ]
  );

  // Screen Content Crossfades inside the SINGLE Phone
  const screen1Opacity = useTransform(smoothProgress, [0.0, 0.22, 0.30], [1, 0.7, 0]);
  const screen2Opacity = useTransform(
    smoothProgress,
    [0.24, 0.34, 0.58, 0.68],
    [0, 1, 1, 0]
  );
  const screen3Opacity = useTransform(smoothProgress, [0.64, 0.74, 1.0], [0, 1, 1]);

  // Ambient Dynamic Purple Glow — also follows phone X
  const glowX = useTransform(
    smoothProgress,
    [0.0, 0.28, 0.38, 0.58, 0.76, 1.0],
    [0, phoneShiftX * 0.85, phoneShiftX * 0.85, -phoneShiftX * 0.85, -phoneShiftX * 0.85, -phoneShiftX * 0.85]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#000000] text-white selection:bg-purple-500/30 overflow-visible"
      style={{ height: "480vh" }}
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-16 sm:pt-24 pb-4 sm:pb-8 px-4 sm:px-12 lg:px-20">
        {/* Ambient Radial Background Glows matching Reference */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Main Following Purple Halo behind Phone */}
          <motion.div
            style={{ x: glowX }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[900px] lg:w-[1050px] h-[450px] sm:h-[650px] bg-[radial-gradient(circle,rgba(168,85,247,0.26)_0%,rgba(217,70,239,0.15)_30%,rgba(129,140,248,0.1)_55%,transparent_75%)] blur-[100px] sm:blur-[120px]"
          />
          {/* Side Soft Lavender & Peach Highlights */}
          <div className="absolute top-1/2 right-[12%] -translate-y-1/2 w-[320px] sm:w-[420px] h-[400px] sm:h-[480px] bg-[radial-gradient(circle,rgba(192,132,252,0.16)_0%,transparent_70%)] blur-[80px] sm:blur-[100px]" />
          <div className="absolute top-1/2 left-[12%] -translate-y-1/2 w-[320px] sm:w-[420px] h-[400px] sm:h-[480px] bg-[radial-gradient(circle,rgba(244,114,182,0.12)_0%,transparent_70%)] blur-[80px] sm:blur-[100px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000000_95%)]" />
        </div>

        {/* ========================================================================= */}
        {/* POSITION 1: HERO VIEW ("We've Got You") */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            opacity: heroOpacity,
            y: heroY,
            scale: heroScale,
            pointerEvents: useTransform(smoothProgress, (v) => (v < 0.22 ? "auto" : "none")),
          }}
          className="absolute top-14 xs:top-18 sm:top-20 md:top-24 inset-x-0 mx-auto z-10 flex flex-col items-center text-center px-3 max-w-4xl"
        >
          <h1 className="font-sans font-bold tracking-[-0.045em] leading-[0.88] text-[4.85rem] xs:text-[5.6rem] sm:text-[6.25rem] md:text-[6.25rem] lg:text-[7.25rem] xl:text-[7.75rem] flex flex-col items-center justify-center select-none">
            {/* Top Line: "We've" */}
            <span className="inline-block bg-gradient-to-r from-[#ffd3b6] via-[#fbcfe8] via-[#f472b6] via-[#c084fc] to-[#a5b4fc] bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(244,114,182,0.12)]">
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
            x: quickActionsX,
            y: quickActionsY,
            pointerEvents: useTransform(smoothProgress, (v) =>
              v >= 0.24 && v <= 0.66 ? "auto" : "none"
            ),
          }}
          className="absolute
            left-0 right-0 mx-auto sm:left-12 sm:right-auto lg:left-20 xl:left-28
            bottom-4 xs:bottom-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2
            z-30 w-full max-w-[92%] sm:max-w-md lg:max-w-lg
            flex flex-col justify-center items-center sm:items-start
            text-center sm:text-left px-2 sm:px-0"
        >
          <h2 className="font-sans font-bold tracking-[-0.035em] leading-[1.0] text-3xl xs:text-4xl sm:text-5xl lg:text-[4.75rem]">
            <span className="inline-block sm:block bg-gradient-to-r from-[#ffd3b6] via-[#fbcfe8] to-[#f472b6] bg-clip-text text-transparent mr-2 sm:mr-0">
              Quick
            </span>
            <span className="inline-block sm:block bg-gradient-to-r from-[#f472b6] via-[#c084fc] to-[#818cf8] bg-clip-text text-transparent">
              Actions
            </span>
          </h2>
          <p className="mt-2 sm:mt-5 text-xs sm:text-base text-slate-400 font-normal leading-relaxed max-w-md hidden sm:block">
            All major actions are just a tap away, right on the home screen. Enjoy a seamless and
            efficient user experience.
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-2 gap-2.5 sm:gap-3.5 mt-3 sm:mt-8 w-full max-w-[260px] xs:max-w-[290px] sm:max-w-[280px] md:max-w-[320px]">
            <div className="h-12 xs:h-14 sm:h-20 rounded-xl xs:rounded-2xl bg-[#0e0e14]/90 border border-white/10 hover:border-white/25 hover:bg-[#151520] transition-all duration-300 flex items-center justify-center shadow-lg group cursor-pointer">
              <ArrowUp className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 text-slate-200 group-hover:scale-110 transition-transform" />
            </div>
            <div className="h-12 xs:h-14 sm:h-20 rounded-xl xs:rounded-2xl bg-[#0e0e14]/90 border border-white/10 hover:border-white/25 hover:bg-[#151520] transition-all duration-300 flex items-center justify-center shadow-lg group cursor-pointer">
              <Mail className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 text-slate-200 group-hover:scale-110 transition-transform" />
            </div>
            <div className="h-12 xs:h-14 sm:h-20 rounded-xl xs:rounded-2xl bg-[#0e0e14]/90 border border-white/10 hover:border-white/25 hover:bg-[#151520] transition-all duration-300 flex items-center justify-center shadow-lg group cursor-pointer">
              <Database className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 text-slate-200 group-hover:scale-110 transition-transform" />
            </div>
            <div className="h-12 xs:h-14 sm:h-20 rounded-xl xs:rounded-2xl bg-[#0e0e14]/90 border border-white/10 hover:border-white/25 hover:bg-[#151520] transition-all duration-300 flex items-center justify-center shadow-lg group cursor-pointer">
              <Users className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 text-slate-200 group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* POSITION 3: LARGE PAYMENTS VIEW (Right Column on desktop / Bottom on mobile) */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            opacity: largePaymentsOpacity,
            x: largePaymentsX,
            y: largePaymentsY,
            pointerEvents: useTransform(smoothProgress, (v) => (v >= 0.66 ? "auto" : "none")),
          }}
          className="absolute
            left-0 right-0 mx-auto sm:left-auto sm:right-12 lg:right-20 xl:right-28
            bottom-4 xs:bottom-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2
            z-30 w-full max-w-[92%] sm:max-w-md lg:max-w-lg
            flex flex-col justify-center items-center sm:items-end
            text-center sm:text-right px-2 sm:px-0"
        >
          <h2 className="font-sans font-bold tracking-[-0.035em] leading-[1.0] text-3xl xs:text-4xl sm:text-5xl lg:text-[4.75rem]">
            <span className="inline-block sm:block bg-gradient-to-r from-[#ffd3b6] via-[#fbcfe8] to-[#f472b6] bg-clip-text text-transparent mr-2 sm:mr-0">
              Large
            </span>
            <span className="inline-block sm:block bg-gradient-to-r from-[#f472b6] via-[#c084fc] to-[#818cf8] bg-clip-text text-transparent">
              Payments
            </span>
          </h2>
          <p className="mt-2 sm:mt-5 text-xs sm:text-base text-slate-400 font-normal leading-relaxed max-w-md hidden sm:block">
            Send payments over $1,000,000 USD with ease and confidence. Experience unmatched
            security for high-value transactions.
          </p>
          <div className="mt-3 sm:mt-8 w-full max-w-[240px] xs:max-w-[280px] sm:max-w-[320px] md:max-w-[360px] rounded-xl xs:rounded-2xl sm:rounded-3xl bg-[#0c0c14]/90 border border-white/10 p-2.5 xs:p-3.5 sm:p-5 md:p-7 shadow-2xl backdrop-blur-xl text-left">
            <p className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              $1,000,000
            </p>
            <div className="flex items-center gap-2 xs:gap-2.5 mt-3 sm:mt-5">
              <div className="flex-1 bg-[#181824] border border-white/10 rounded-full px-3 xs:px-4 py-1.5 xs:py-2.5 text-[11px] xs:text-xs text-slate-400 truncate">
                Add Note (Optional)
              </div>
              <button
                aria-label="Send Payment"
                className="w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
              >
                <Send className="w-3 xs:w-3.5 h-3 xs:h-3.5 fill-black text-black ml-0.5" />
              </button>
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
            className="relative w-[260px] sm:w-[290px] md:w-[320px] lg:w-[340px] h-[520px] sm:h-[580px] md:h-[630px] lg:h-[660px] pointer-events-auto"
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
                  style={{ opacity: screen1Opacity }}
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
                  style={{ opacity: screen2Opacity }}
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
                        <ArrowUp className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] text-slate-300 font-medium">Transfer</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-7.5 h-7.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] text-slate-300 font-medium">Request</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-7.5 h-7.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        <Database className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] text-slate-300 font-medium">Savings</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-7.5 h-7.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] text-slate-300 font-medium">Contact</span>
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
                {/* SCREEN 3: LARGE PAYMENTS STATE (Transfer $44,000 Screen) */}
                {/* ------------------------------------------------------------- */}
                <motion.div
                  style={{ opacity: screen3Opacity }}
                  className="absolute inset-0 pt-10 px-5 pb-5 flex flex-col justify-between z-30"
                >
                  <div>
                    <div className="flex items-center justify-between pt-0.5">
                      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-white">Transfer Money</p>
                      <div className="w-7" />
                    </div>

                    <div className="mt-3.5 bg-white/5 border border-white/10 rounded-2xl p-2 px-3 flex items-center gap-2.5 mx-auto max-w-[200px]">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                        alt="Haley"
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-white/20"
                      />
                      <div className="text-left">
                        <p className="text-[11px] font-bold text-white leading-tight">Haley Baylee</p>
                        <p className="text-[8px] text-slate-400 font-mono">
                          1234 - 5678 - 9012 - 3456
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="my-auto text-center">
                    <p className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
                      $44,000
                    </p>
                  </div>

                  <div className="absolute bottom-14 inset-x-3 h-40 bg-gradient-to-t from-indigo-600/35 via-purple-600/25 to-transparent rounded-b-3xl pointer-events-none" />

                  <div className="relative z-20 flex items-center gap-2 bg-[#12121e] border border-white/10 rounded-full p-1.5 pl-3">
                    <span className="text-[11px] text-slate-400 flex-1">Add Note (Optional)</span>
                    <button
                      aria-label="Send"
                      className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center"
                    >
                      <Send className="w-3.5 h-3.5 fill-black text-black ml-0.5" />
                    </button>
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
  const containerRef = useRef<HTMLElement>(null);
  const { width } = useWindowSize();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 30%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 26,
    stiffness: 80,
    mass: 0.2,
  });

  // Headline scroll animation: Starts closer to cards (+165px down), floats smoothly upwards to +15px on scroll
  const titleY = useTransform(smoothProgress, [0.0, 0.75], [isMobile ? 100 : 165, 15]);
  const titleOpacity = useTransform(smoothProgress, [0.0, 0.18], [0.7, 1]);

  // Left Card Scroll Transforms
  const leftCardX = useTransform(
    smoothProgress,
    [0.05, 0.85],
    [0, isMobile ? -58 : isTablet ? -85 : -105]
  );
  const leftCardY = useTransform(smoothProgress, [0.05, 0.85], [115, 12]);
  const leftCardRotate = useTransform(smoothProgress, [0.05, 0.85], [0, isMobile ? -16 : -22]);
  const leftCardScale = useTransform(smoothProgress, [0.05, 0.85], [0.92, 0.98]);

  // Center Card Scroll Transforms
  const centerCardY = useTransform(smoothProgress, [0.05, 0.85], [125, -10]);
  const centerCardRotate = useTransform(smoothProgress, [0.05, 0.85], [0, -3]);
  const centerCardScale = useTransform(smoothProgress, [0.05, 0.85], [0.94, 1.02]);

  // Right Card Scroll Transforms
  const rightCardX = useTransform(
    smoothProgress,
    [0.05, 0.85],
    [0, isMobile ? 58 : isTablet ? 85 : 105]
  );
  const rightCardY = useTransform(smoothProgress, [0.05, 0.85], [115, 12]);
  const rightCardRotate = useTransform(smoothProgress, [0.05, 0.85], [0, isMobile ? 14 : 18]);
  const rightCardScale = useTransform(smoothProgress, [0.05, 0.85], [0.92, 0.98]);

  return (
    <section
      id="download"
      ref={containerRef}
      className="relative pt-12 sm:pt-24 md:pt-28 pb-4 bg-[#000000] flex flex-col items-center justify-start overflow-visible min-h-0"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] xs:w-[450px] sm:w-[700px] h-[300px] sm:h-[350px] bg-[radial-gradient(circle,rgba(168,85,247,0.13)_0%,transparent_70%)] blur-[70px] sm:blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center w-full flex flex-col items-center mt-2 sm:mt-8">
        {/* Compact Headline that starts close to cards and ascends smoothly on scroll */}
        <motion.h2
          style={{ y: titleY, opacity: titleOpacity }}
          className="font-sans font-bold tracking-[-0.035em] text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-white text-center mb-2 select-none"
        >
          Manage <span className="bg-gradient-to-r from-[#f472b6] via-[#c084fc] to-[#818cf8] bg-clip-text text-transparent">all</span> cards in one place
        </motion.h2>

        {/* Fanned Cards Showcase (Scroll Scrubbed) */}
        <div className="relative w-full max-w-2xl h-[260px] xs:h-[280px] sm:h-[320px] md:h-[350px] flex items-center justify-center select-none mt-6 sm:mt-12 md:mt-14">
          {/* Left Card */}
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
              <IndianBankLogo />
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

          {/* Center Card (Front Card with Topo Pattern) */}
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
              <IndianBankLogo />
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

          {/* Right Card */}
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
              <IndianBankLogo />
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
    </section>
  );
}

function IndianBankLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* Official Indian Bank Tri-Petal Flame Emblem in Deep Blue Circle */}
      <svg
        viewBox="0 0 32 32"
        className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="15" fill="#00338D" stroke="#1d4ed8" strokeWidth="0.75" />
        <path
          d="M16 5.5C17.5 9.5 21 12 24.5 12.8C22.2 16.8 18.2 19 16 26.5C13.8 19 9.8 16.8 7.5 12.8C11 12 14.5 9.5 16 5.5Z"
          fill="#FFB81C"
        />
        <path
          d="M16 8.5C17.2 11.8 19.8 13.8 22.5 14.2C20.8 17.2 17.8 18.5 16 23.5C14.2 18.5 11.2 17.2 9.5 14.2C12.2 13.8 14.8 11.8 16 8.5Z"
          fill="#00338D"
        />
        <circle cx="16" cy="15.5" r="2.2" fill="#FFB81C" />
      </svg>
      <span className="text-[7px] xs:text-[7.5px] sm:text-[8.5px] font-bold text-white/95 tracking-wide uppercase font-sans whitespace-nowrap">
        Indian Bank
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

function InvertedCornerLeft({ className = "w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16" }: { className?: string }) {
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

function InvertedCornerRight({ className = "w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16" }: { className?: string }) {
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
        <section id="company" data-theme-light="true" className="relative z-20 mt-64 sm:mt-60 md:mt-56 bg-[#f4f5f8] text-black pt-16 pb-28 px-6 sm:px-12 md:px-16 shadow-[0_-30px_70px_rgba(0,0,0,0.7)]">
          {/* Inverted / Opposite Concave Corners */}
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
              <div className="overflow-hidden relative">
                <div className="flex items-center justify-center flex-wrap gap-x-4 sm:gap-x-7 gap-y-4 sm:gap-y-5 select-none max-w-5xl mx-auto">
                  {/* Axis Bank */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
                  >
                    <svg viewBox="0 0 100 100" className="w-5 h-5 shrink-0" fill="none">
                      <path d="M50 8L4 88H26.8L50 48L73.2 88H96L50 8Z" fill="#97144D" />
                      <path d="M50 51.5L38 72H62L50 51.5Z" fill="#FFFFFF" />
                    </svg>
                    <span className="font-extrabold text-xs sm:text-sm tracking-tight text-[#97144D] font-sans">
                      AXIS BANK
                    </span>
                  </motion.div>

                  {/* Setu */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
                  >
                    <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none">
                      <rect width="32" height="32" rx="7" fill="#13B58C" />
                      <path d="M8 20C8 14.4772 12.4772 10 18 10H24M24 10L19.5 5.5M24 10L19.5 14.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-bold text-xs sm:text-sm tracking-tight text-[#1A202C] font-sans">
                      setu<span className="text-[#13B58C]">.</span>
                    </span>
                  </motion.div>

                  {/* Shipway */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
                  >
                    <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none">
                      <circle cx="16" cy="16" r="15" fill="#0284C7" />
                      <path d="M9 16L23 9L18 23L15 17L9 16Z" fill="#FFFFFF" />
                    </svg>
                    <span className="font-bold text-xs sm:text-sm tracking-tight text-[#0F172A] font-sans">
                      ship<span className="text-[#0284C7]">way</span>
                    </span>
                  </motion.div>

                  {/* InstantPay */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
                  >
                    <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none">
                      <circle cx="16" cy="16" r="15" fill="#F97316" />
                      <path d="M17.5 5L9 17.5H15.5L14.5 27L23 14.5H16.5L17.5 5Z" fill="#FFFFFF" />
                    </svg>
                    <span className="font-bold text-xs sm:text-sm tracking-tight text-[#0F172A] font-sans">
                      Instant<span className="text-[#F97316]">Pay</span>
                    </span>
                  </motion.div>

                  {/* Razorpay */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
                  >
                    <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none">
                      <path d="M20 4H10.5L7 19H14.5L12.5 28L26 12.5H18L20 4Z" fill="#0C2340" />
                      <path d="M15 10H10.5L7 19H14.5L12.5 28L22 16.5H16L18 10Z" fill="#3395FF" />
                    </svg>
                    <span className="font-bold text-xs sm:text-sm tracking-tight text-[#0C2340] font-sans">
                      Razorpay
                    </span>
                  </motion.div>

                  {/* Route Mobile */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
                  >
                    <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none">
                      <circle cx="8" cy="24" r="4" fill="#6366F1" />
                      <circle cx="24" cy="8" r="4" fill="#4F46E5" />
                      <path d="M11 21L21 11M8 20V12C8 9.79086 9.79086 8 12 8H20" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    <span className="font-bold text-xs sm:text-sm tracking-tight text-[#1E1B4B] font-sans">
                      route<span className="text-[#6366F1] font-medium text-[10px] sm:text-xs ml-0.5">mobile</span>
                    </span>
                  </motion.div>

                  {/* Airtel */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
                  >
                    <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none">
                      <path d="M16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28C20.4183 28 24.237 25.6176 26.2625 22.0963C24.4754 22.0963 22.4286 21.3787 21.0504 19.9863C19.6723 18.5939 18.9669 16.5471 18.9669 14.3382C18.9669 8.62939 14.5097 4 8.80088 4C11.134 4 13.6765 4 16 4Z" fill="#ED1C24" />
                    </svg>
                    <span className="font-bold text-xs sm:text-sm tracking-tight text-[#ED1C24] font-sans">
                      airtel
                    </span>
                  </motion.div>

                  {/* Google */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                    <span className="font-semibold text-xs sm:text-sm tracking-tight text-[#475569] font-sans">
                      Google
                    </span>
                  </motion.div>

                  {/* Hubble Money */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
                  >
                    <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none">
                      <circle cx="16" cy="16" r="14" fill="#7C3AED" />
                      <circle cx="16" cy="16" r="8" stroke="#FDE047" strokeWidth="2.5" />
                      <circle cx="19" cy="13" r="2" fill="#FDE047" />
                    </svg>
                    <span className="font-bold text-xs sm:text-sm tracking-tight text-[#4C1D95] font-sans">
                      Hubble<span className="text-[#7C3AED] font-medium text-[10px] sm:text-xs ml-1">Money</span>
                    </span>
                  </motion.div>
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
      </div>

      {/* SECTION 8: GET THE APP SHOWCASE */}
      <GetTheAppSection />

      {/* FOOTER */}
      <Footer />
    </>
  );
}