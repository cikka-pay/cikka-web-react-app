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
import React, { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

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
      <Header />
      {/* Unified Pinned Scroll Experience with ONE continuous transitioning Phone */}
      <UnifiedPhoneShowcase />
      <CardsScene />
      <LightContinuation />
    </main>
  );
}

function Header() {
  return (
    <header className="site-header fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-6 sm:px-12 md:px-16 bg-transparent">
      <a className="brand-mark group" href="#top" aria-label="Payer home">
        <div className="w-7 h-7 rounded-[8px] bg-white flex items-center justify-center p-[2px] shadow-[0_0_12px_rgba(255,255,255,0.2)] transition-transform duration-200 group-hover:scale-105">
          <div className="w-full h-full bg-black rounded-[6px] flex items-center justify-center relative overflow-hidden">
            <div className="w-3.5 h-3.5 rounded-full bg-white relative">
              <div className="absolute top-0 right-0 w-2 h-2 bg-black rounded-bl-full" />
            </div>
          </div>
        </div>
      </a>
      <nav className="nav-links hidden md:flex items-center gap-8 text-[13.5px] font-normal text-[#a1a1aa]">
        <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
        <a href="#download" className="hover:text-white transition-colors duration-200">Download</a>
        <a href="#company" className="hover:text-white transition-colors duration-200">Company</a>
        <a href="#support" className="hover:text-white transition-colors duration-200">Support</a>
      </nav>
      <a
        className="get-app bg-white text-black font-semibold text-[13px] px-5 py-2 rounded-full hover:bg-neutral-200 transition-all shadow-sm active:scale-95"
        href="#download"
      >
        Get app
      </a>
    </header>
  );
}

// =========================================================================
// UNIFIED PHONE SHOWCASE (EXACT MATCH TO REFERENCE SCREENSHOT)
// =========================================================================
function UnifiedPhoneShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

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

  // --- 2. QUICK ACTIONS STAGE (Left Column) ---
  const quickActionsOpacity = useTransform(
    smoothProgress,
    [0.24, 0.36, 0.58, 0.68],
    [0, 1, 1, 0]
  );
  const quickActionsX = useTransform(smoothProgress, [0.24, 0.36, 0.58, 0.68], [-50, 0, 0, -50]);
  const quickActionsY = useTransform(smoothProgress, [0.24, 0.36, 0.58, 0.68], [40, 0, 0, -40]);

  // --- 3. LARGE PAYMENTS STAGE (Right Column) ---
  const largePaymentsOpacity = useTransform(
    smoothProgress,
    [0.64, 0.76, 0.96, 1.0],
    [0, 1, 1, 1]
  );
  const largePaymentsX = useTransform(smoothProgress, [0.64, 0.76], [50, 0]);
  const largePaymentsY = useTransform(smoothProgress, [0.64, 0.76], [40, 0]);

  // --- 4. THE SINGLE CONTINUOUS PHONE MOCKUP ---
  // Position moves: Center (0) -> Right (+260px) -> Left (-260px)
  const phoneX = useTransform(
    smoothProgress,
    [0.0, 0.20, 0.36, 0.58, 0.76, 1.0],
    [0, 100, 260, 260, -260, -260]
  );

  // Vertical position: Starts lower down (250px) in Hero so it sits cleanly below "Got You", moves to center (0px) for Quick Actions & Large Payments
  const phoneY = useTransform(
    smoothProgress,
    [0.0, 0.26, 0.38, 0.58, 0.76, 1.0],
    [250, 40, 0, 0, 0, 0]
  );

  // 3D Perspective Tilt: 20deg in Hero (tilted back into depth), stands straight (0deg) for Quick Actions & Large Payments
  const phoneRotateX = useTransform(
    smoothProgress,
    [0.0, 0.28, 0.38, 0.58, 0.76, 1.0],
    [20, 0, 0, 0, 0, 0]
  );
  const phoneRotateY = useTransform(
    smoothProgress,
    [0.0, 0.22, 0.38, 0.58, 0.76, 1.0],
    [0, -3, -3, 3, 3, 3]
  );
  const phoneScale = useTransform(
    smoothProgress,
    [0.0, 0.26, 0.38, 0.58, 0.76, 1.0],
    [0.86, 0.88, 0.88, 0.88, 0.88, 0.88]
  );

  // Screen Content Crossfades inside the SINGLE Phone
  const screen1Opacity = useTransform(smoothProgress, [0.0, 0.22, 0.30], [1, 0.7, 0]);
  const screen2Opacity = useTransform(
    smoothProgress,
    [0.24, 0.34, 0.58, 0.68],
    [0, 1, 1, 0]
  );
  const screen3Opacity = useTransform(smoothProgress, [0.64, 0.74, 1.0], [0, 1, 1]);

  // Ambient Dynamic Purple Glow Translation behind the Phone
  const glowX = useTransform(
    smoothProgress,
    [0.0, 0.28, 0.38, 0.58, 0.76, 1.0],
    [0, 220, 220, -220, -220, -220]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#000000] text-white selection:bg-purple-500/30 overflow-visible"
      style={{ height: "480vh" }}
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-8 px-6 sm:px-12 lg:px-20">
        {/* Ambient Radial Background Glows matching Reference */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Main Following Purple Halo behind Phone */}
          <motion.div
            style={{ x: glowX }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] lg:w-[1050px] h-[550px] sm:h-[650px] bg-[radial-gradient(circle,rgba(168,85,247,0.26)_0%,rgba(217,70,239,0.15)_30%,rgba(129,140,248,0.1)_55%,transparent_75%)] blur-[120px]"
          />
          {/* Side Soft Lavender & Peach Highlights */}
          <div className="absolute top-1/2 right-[12%] -translate-y-1/2 w-[420px] h-[480px] bg-[radial-gradient(circle,rgba(192,132,252,0.16)_0%,transparent_70%)] blur-[100px]" />
          <div className="absolute top-1/2 left-[12%] -translate-y-1/2 w-[420px] h-[480px] bg-[radial-gradient(circle,rgba(244,114,182,0.12)_0%,transparent_70%)] blur-[100px]" />
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
          className="absolute top-14 sm:top-18 md:top-20 inset-x-0 mx-auto z-10 flex flex-col items-center text-center px-4 max-w-4xl"
        >
          <h1 className="font-sans font-bold tracking-[-0.04em] leading-[0.92] text-5xl sm:text-6xl md:text-[6.25rem] lg:text-[7.25rem] xl:text-[7.75rem] flex flex-col items-center justify-center select-none">
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
        {/* POSITION 2: QUICK ACTIONS VIEW (Left Column) */}
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
          className="absolute left-6 sm:left-12 lg:left-20 xl:left-28 top-1/2 -translate-y-1/2 z-10 max-w-md lg:max-w-lg w-full flex flex-col justify-center"
        >
          <h2 className="font-sans font-bold tracking-[-0.035em] leading-[1.0] text-5xl sm:text-6xl lg:text-[4.75rem]">
            <span className="block bg-gradient-to-r from-[#ffd3b6] via-[#fbcfe8] to-[#f472b6] bg-clip-text text-transparent">
              Quick
            </span>
            <span className="block bg-gradient-to-r from-[#f472b6] via-[#c084fc] to-[#818cf8] bg-clip-text text-transparent">
              Actions
            </span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-md">
            All major actions are just a tap away, right on the home screen. Enjoy a seamless and
            efficient user experience.
          </p>
          <div className="grid grid-cols-2 gap-3.5 sm:gap-4 mt-8 max-w-[280px] sm:max-w-[320px]">
            <div className="h-16 sm:h-20 rounded-2xl bg-[#0e0e14]/90 border border-white/10 hover:border-white/25 hover:bg-[#151520] transition-all duration-300 flex items-center justify-center shadow-lg group cursor-pointer">
              <ArrowUp className="w-5 sm:w-6 h-5 sm:h-6 text-slate-200 group-hover:scale-110 transition-transform" />
            </div>
            <div className="h-16 sm:h-20 rounded-2xl bg-[#0e0e14]/90 border border-white/10 hover:border-white/25 hover:bg-[#151520] transition-all duration-300 flex items-center justify-center shadow-lg group cursor-pointer">
              <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-slate-200 group-hover:scale-110 transition-transform" />
            </div>
            <div className="h-16 sm:h-20 rounded-2xl bg-[#0e0e14]/90 border border-white/10 hover:border-white/25 hover:bg-[#151520] transition-all duration-300 flex items-center justify-center shadow-lg group cursor-pointer">
              <Database className="w-5 sm:w-6 h-5 sm:h-6 text-slate-200 group-hover:scale-110 transition-transform" />
            </div>
            <div className="h-16 sm:h-20 rounded-2xl bg-[#0e0e14]/90 border border-white/10 hover:border-white/25 hover:bg-[#151520] transition-all duration-300 flex items-center justify-center shadow-lg group cursor-pointer">
              <Users className="w-5 sm:w-6 h-5 sm:h-6 text-slate-200 group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* POSITION 3: LARGE PAYMENTS VIEW (Right Column) */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            opacity: largePaymentsOpacity,
            x: largePaymentsX,
            y: largePaymentsY,
            pointerEvents: useTransform(smoothProgress, (v) => (v >= 0.66 ? "auto" : "none")),
          }}
          className="absolute right-6 sm:right-12 lg:right-20 xl:right-28 top-1/2 -translate-y-1/2 z-10 max-w-md lg:max-w-lg w-full flex flex-col justify-center items-start lg:items-end text-left lg:text-right"
        >
          <h2 className="font-sans font-bold tracking-[-0.035em] leading-[1.0] text-5xl sm:text-6xl lg:text-[4.75rem]">
            <span className="block bg-gradient-to-r from-[#ffd3b6] via-[#fbcfe8] to-[#f472b6] bg-clip-text text-transparent">
              Large
            </span>
            <span className="block bg-gradient-to-r from-[#f472b6] via-[#c084fc] to-[#818cf8] bg-clip-text text-transparent">
              Payments
            </span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-md">
            Send payments over $1,000,000 USD with ease and confidence. Experience unmatched
            security for high-value transactions.
          </p>
          <div className="mt-8 w-full max-w-[320px] sm:max-w-[360px] rounded-3xl bg-[#0c0c14]/90 border border-white/10 p-5 sm:p-7 shadow-2xl backdrop-blur-xl text-left">
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              $1,000,000
            </p>
            <div className="flex items-center gap-2.5 mt-5">
              <div className="flex-1 bg-[#181824] border border-white/10 rounded-full px-4 py-2.5 text-xs text-slate-400">
                Add Note (Optional)
              </div>
              <button
                aria-label="Send Payment"
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
              >
                <Send className="w-3.5 h-3.5 fill-black text-black ml-0.5" />
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

        {/* Bottom Right "Made in Framer" Badge */}
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href="https://payer.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-200"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
            </svg>
            <span>Made in Framer</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function CardsScene() {
  const containerRef = useRef<HTMLElement>(null);
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
  const titleY = useTransform(smoothProgress, [0.0, 0.75], [165, 15]);
  const titleOpacity = useTransform(smoothProgress, [0.0, 0.18], [0.7, 1]);

  // Left Card Scroll Transforms
  const leftCardX = useTransform(smoothProgress, [0.05, 0.85], [0, -105]);
  const leftCardY = useTransform(smoothProgress, [0.05, 0.85], [115, 12]);
  const leftCardRotate = useTransform(smoothProgress, [0.05, 0.85], [0, -22]);
  const leftCardScale = useTransform(smoothProgress, [0.05, 0.85], [0.92, 0.98]);

  // Center Card Scroll Transforms
  const centerCardY = useTransform(smoothProgress, [0.05, 0.85], [125, -10]);
  const centerCardRotate = useTransform(smoothProgress, [0.05, 0.85], [0, -3]);
  const centerCardScale = useTransform(smoothProgress, [0.05, 0.85], [0.94, 1.02]);

  // Right Card Scroll Transforms
  const rightCardX = useTransform(smoothProgress, [0.05, 0.85], [0, 105]);
  const rightCardY = useTransform(smoothProgress, [0.05, 0.85], [115, 12]);
  const rightCardRotate = useTransform(smoothProgress, [0.05, 0.85], [0, 18]);
  const rightCardScale = useTransform(smoothProgress, [0.05, 0.85], [0.92, 0.98]);

  return (
    <section
      id="download"
      ref={containerRef}
      className="relative pt-16 sm:pt-24 md:pt-28 pb-4 bg-[#000000] flex flex-col items-center justify-start overflow-visible min-h-0"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[350px] bg-[radial-gradient(circle,rgba(168,85,247,0.13)_0%,transparent_70%)] blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center w-full flex flex-col items-center mt-4 sm:mt-8">
        {/* Compact Headline that starts close to cards and ascends smoothly on scroll */}
        <motion.h2
          style={{ y: titleY, opacity: titleOpacity }}
          className="font-sans font-bold tracking-[-0.035em] text-4xl sm:text-5xl md:text-6xl text-white text-center mb-2 select-none"
        >
          Say <span className="bg-gradient-to-r from-[#f472b6] via-[#c084fc] to-[#818cf8] bg-clip-text text-transparent">bye</span> to cards
        </motion.h2>

        {/* Fanned Cards Showcase (Scroll Scrubbed) */}
        <div className="relative w-full max-w-2xl h-[280px] sm:h-[320px] md:h-[350px] flex items-center justify-center select-none mt-8 sm:mt-12 md:mt-14">
          {/* Left Card */}
          <motion.div
            style={{
              x: leftCardX,
              y: leftCardY,
              rotate: leftCardRotate,
              scale: leftCardScale,
            }}
            className="absolute w-[185px] sm:w-[215px] md:w-[235px] h-[285px] sm:h-[330px] md:h-[365px] rounded-[20px] sm:rounded-[24px] bg-gradient-to-b from-[#1a1a22] via-[#101016] to-[#09090d] border border-white/15 p-4 sm:p-5 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-10 origin-bottom"
          >
            <div className="flex justify-end">
              <EmvChip />
            </div>
            <div className="my-auto flex items-center justify-between pl-0.5">
              <div className="font-mono text-white/90 text-xs sm:text-[13px] tracking-[0.16em] font-semibold [writing-mode:vertical-rl] rotate-180">
                3455 4562 7710 3507
              </div>
              <div className="text-right text-[9px] sm:text-[10px] text-slate-400 space-y-0.5">
                <p className="text-[8px] uppercase tracking-wider text-slate-500">Card holder name</p>
                <p className="font-semibold text-white">Haley Baylee</p>
                <p className="text-[8px] uppercase tracking-wider text-slate-500 pt-1.5">Expiry date</p>
                <p className="font-semibold text-white">02/30</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 opacity-60">
              <div className="w-5 h-5 rounded-full bg-white/20" />
              <div className="w-5 h-5 rounded-full bg-white/15 -ml-2.5" />
            </div>
          </motion.div>

          {/* Center Card (Front Card with Topo Pattern) */}
          <motion.div
            style={{
              y: centerCardY,
              rotate: centerCardRotate,
              scale: centerCardScale,
            }}
            className="absolute w-[185px] sm:w-[215px] md:w-[235px] h-[285px] sm:h-[330px] md:h-[365px] rounded-[20px] sm:rounded-[24px] bg-gradient-to-b from-[#252532] via-[#14141c] to-[#0c0c12] border border-white/25 p-4 sm:p-5 flex flex-col justify-between shadow-[0_25px_80px_rgba(0,0,0,0.95),_0_0_35px_rgba(168,85,247,0.12)] z-20 overflow-hidden origin-bottom"
          >
            {/* Topographic Lines Overlay */}
            <TopoPattern />

            <div className="relative z-10 flex justify-end">
              <EmvChip />
            </div>

            <div className="relative z-10 my-auto flex items-center justify-between pl-0.5">
              <div className="font-mono text-white text-xs sm:text-[13px] tracking-[0.16em] font-semibold [writing-mode:vertical-rl] rotate-180 drop-shadow">
                3455 4562 7710 3507
              </div>
              <div className="text-right text-[9px] sm:text-[10px] text-slate-300 space-y-0.5">
                <p className="text-[8px] uppercase tracking-wider text-slate-400">Card holder name</p>
                <p className="font-semibold text-white">Haley Baylee</p>
                <p className="text-[8px] uppercase tracking-wider text-slate-400 pt-1.5">Expiry date</p>
                <p className="font-semibold text-white">02/30</p>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-1.5 opacity-75">
              <div className="w-5 h-5 rounded-full bg-white/30" />
              <div className="w-5 h-5 rounded-full bg-white/20 -ml-2.5" />
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
            className="absolute w-[185px] sm:w-[215px] md:w-[235px] h-[285px] sm:h-[330px] md:h-[365px] rounded-[20px] sm:rounded-[24px] bg-gradient-to-b from-[#1a1a22] via-[#101016] to-[#09090d] border border-white/15 p-4 sm:p-5 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-10 origin-bottom"
          >
            <div className="flex justify-end">
              <EmvChip />
            </div>
            <div className="my-auto flex items-center justify-between pl-0.5">
              <div className="font-mono text-white/90 text-xs sm:text-[13px] tracking-[0.16em] font-semibold [writing-mode:vertical-rl] rotate-180">
                3455 4562 7710 3507
              </div>
              <div className="text-right text-[9px] sm:text-[10px] text-slate-400 space-y-0.5">
                <p className="text-[8px] uppercase tracking-wider text-slate-500">Card holder name</p>
                <p className="font-semibold text-white">Haley Baylee</p>
                <p className="text-[8px] uppercase tracking-wider text-slate-500 pt-1.5">Expiry date</p>
                <p className="font-semibold text-white">02/30</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 opacity-60">
              <div className="w-5 h-5 rounded-full bg-white/20" />
              <div className="w-5 h-5 rounded-full bg-white/15 -ml-2.5" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
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

function TranslucentRibbon() {
  return (
    <div className="absolute -bottom-6 -right-6 w-44 h-44 pointer-events-none opacity-85 select-none">
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]">
        <path d="M75,20 L135,20 L105,75 L45,75 Z" fill="white" fillOpacity="0.8" />
        <path d="M105,75 L165,75 L135,130 L75,130 Z" fill="white" fillOpacity="0.95" />
      </svg>
    </div>
  );
}

// =========================================================================
// LIGHT CONTINUATION & BENTO SECTIONS (PIXEL PERFECT TO SCREENSHOTS)
// =========================================================================
function LightContinuation() {
  return (
    <section id="company" className="relative z-20 mt-64 sm:mt-60 md:mt-56 bg-[#f4f5f8] text-black pt-16 pb-28 px-6 sm:px-12 md:px-16 shadow-[0_-30px_70px_rgba(0,0,0,0.7)]">
      {/* Inverted / Opposite Concave Corners */}
      <InvertedCornerLeft />
      <InvertedCornerRight />

      <div className="max-w-6xl mx-auto space-y-24 sm:space-y-32">
        {/* LOGO MARQUEE STRIP */}
        <div className="text-center pb-12 border-b border-slate-200">
          <p className="text-sm font-semibold text-slate-700 tracking-wide mb-8 select-none">
            Trusted by 15,000+ founders &amp; business owners
          </p>
          <div className="overflow-hidden relative mask-linear">
            <div className="flex items-center justify-around flex-wrap gap-8 sm:gap-14 text-slate-400 font-semibold text-base sm:text-lg select-none">
              <div className="flex items-center gap-2 hover:text-slate-700 transition-colors">
                <span className="text-xl font-bold font-mono">‹</span>
                <span>Brand Name</span>
              </div>
              <div className="flex items-center gap-2 hover:text-slate-700 transition-colors">
                <span className="text-xl">◒</span>
                <span>Logo ipsum</span>
              </div>
              <div className="flex items-center gap-2 hover:text-slate-700 transition-colors">
                <span className="text-xl">◎</span>
                <span>Dummy Logo</span>
              </div>
              <div className="flex items-center gap-2 hover:text-slate-700 transition-colors">
                <span className="text-xl">☯</span>
                <span>Digital Dummy</span>
              </div>
              <div className="flex items-center gap-2 hover:text-slate-700 transition-colors">
                <span className="text-xl">✺</span>
                <span>Logo Text</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: WE SIMPLIFY THE WAY YOU PAY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Visual: 3D Cushion Box with iPhone & Glass Banner */}
          <div className="lg:col-span-6 relative rounded-[32px] sm:rounded-[38px] bg-[#111116] p-6 sm:p-8 flex items-center justify-center min-h-[580px] sm:min-h-[660px] overflow-hidden shadow-2xl border border-slate-800">
            {/* 3D Inflated Cushions / Pillows */}
            <SoftCushionsBackground />

            {/* Expenses iPhone Screen Mockup */}
            <ExpensesPhoneMockup />

            {/* Bottom Frosted Glass Banner */}
            <div className="absolute bottom-4 left-4 right-4 z-30 p-3.5 sm:p-4 rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/20 shadow-2xl flex items-center justify-between text-white">
              <div className="space-y-1">
                <div className="flex items-center -space-x-2">
                  <img
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white/80 object-cover shadow-sm"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="avatar1"
                  />
                  <img
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white/80 object-cover shadow-sm"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="avatar2"
                  />
                  <img
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white/80 object-cover shadow-sm"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                    alt="avatar3"
                  />
                </div>
                <p className="font-semibold text-xs sm:text-sm text-white drop-shadow-sm leading-snug">
                  Welcome to our finance<br />banking services
                </p>
              </div>
              <button
                aria-label="Open service details"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-base transition-transform hover:scale-105 active:scale-95 shadow-md shrink-0"
              >
                ↗
              </button>
            </div>
          </div>

          {/* Right Column Content */}
          <div className="lg:col-span-6 space-y-8">
            <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-black leading-[1.08]">
              We simplify the way you pay our platform offers
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              We simplify the way you pay our platform offers secure transactions, tools, and a seamless experience for easy everyday payments
            </p>

            {/* Luxury Pill CTA Button */}
            <div>
              <a
                href="#download"
                className="inline-flex items-center gap-4 bg-black text-white pl-8 pr-2.5 py-2.5 rounded-full font-bold text-base hover:bg-neutral-900 transition-all shadow-md group active:scale-95"
              >
                <span>Get started now</span>
                <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#7c3aed] flex items-center justify-center text-xl font-bold transition-transform duration-300 group-hover:rotate-45 shadow-sm">
                  ↗
                </span>
              </a>
            </div>

            {/* 2-Column Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
              <div className="space-y-1.5">
                <p className="text-4xl sm:text-5xl font-bold text-black tracking-tight">
                  20<span className="text-[#6366f1]">m</span>
                </p>
                <p className="text-sm font-bold text-slate-900">Active users</p>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Active users engaging regularly on platform
                </p>
              </div>

              <div className="space-y-1.5 sm:border-l sm:border-slate-200 sm:pl-8">
                <p className="text-4xl sm:text-5xl font-bold text-black tracking-tight">
                  100<span className="text-[#6366f1]">+</span>
                </p>
                <p className="text-sm font-bold text-slate-900">Team member</p>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Skilled team driving success together
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: GAIN WEEKLY REVENUE INSIGHTS BENTO GRID (EXACT TO REFERENCE) */}
        <div className="pt-12 space-y-16">
          {/* Centered Section Header */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-[2.85rem] font-bold tracking-tight text-black leading-tight">
              Gain weekly revenue insights for smarter business decisions
            </h2>
          </div>

          {/* 2x2 Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
            {/* ROW 1 - CARD 1: Left Violet Gradient Card (Finance) */}
            <div className="lg:col-span-5 rounded-[32px] sm:rounded-[36px] p-8 sm:p-9 bg-[linear-gradient(135deg,#5020c4_0%,#7535e6_32%,#9e6cf0_65%,#ede6ff_100%)] text-white flex flex-col justify-between min-h-[390px] shadow-lg relative overflow-hidden">
              {/* Geometric folded translucent ribbon shape on bottom right */}
              <TranslucentRibbon />

              <div>
                <span className="inline-block bg-white text-slate-950 font-extrabold text-[11px] tracking-widest px-4 py-1.5 rounded-full uppercase shadow-sm">
                  FINANCE
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-6 leading-tight max-w-[260px]">
                  Keep track of your income and payment
                </h3>
              </div>

              {/* View more pill button */}
              <div className="mt-8 relative z-10">
                <button className="inline-flex items-center gap-3 bg-black text-white pl-5 pr-1.5 py-1.5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:bg-neutral-900 transition-all group">
                  <span>View more</span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#5020c4] flex items-center justify-center text-sm sm:text-base font-extrabold transition-transform group-hover:rotate-45 shadow-sm">
                    ↗
                  </span>
                </button>
              </div>
            </div>

            {/* ROW 1 - CARD 2: Right Light Card (Daily Active Users Snapshot) */}
            <div className="lg:col-span-7 rounded-[32px] sm:rounded-[36px] p-8 sm:p-9 bg-white border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[390px]">
              {/* Floating Notification Pill (Top Right Overlap) */}
              <div className="sm:absolute sm:top-5 sm:right-6 z-30 bg-[#111116] text-white py-2.5 px-3.5 sm:px-4 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.25)] border border-white/10 flex items-center gap-3 select-none mb-4 sm:mb-0 w-max">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                    alt="Kevin"
                    className="w-8 h-8 rounded-full object-cover border border-white/20"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#22c55e] rounded-full border-2 border-[#111116] flex items-center justify-center text-[8px] font-bold text-black">
                    ✓
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-slate-400">Payment Received</p>
                  <p className="text-xs sm:text-sm font-bold text-white tracking-tight">
                    $293.00 <span className="font-normal text-slate-400 text-xs">from Kevin</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full">
                {/* Left Column Text */}
                <div className="md:col-span-5 flex flex-col justify-between h-full pt-1">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 leading-snug">
                      Daily active users performance snapshot
                    </h3>
                    <div className="h-[1px] w-full bg-slate-100 my-4" />
                  </div>

                  <div className="mt-8 md:mt-14 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[210px]">
                      Daily users snapshot shows engagement trends and growth
                    </p>
                    <a href="#download" className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-950 hover:gap-1.5 transition-all">
                      View more <span>↗</span>
                    </a>
                  </div>
                </div>

                {/* Right Column Dashboard Sub-Card */}
                <div className="md:col-span-7 bg-[#fbfcfd] rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <span>📈</span>
                    <span>Performance</span>
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-1.5 bg-slate-100/70 p-1 rounded-xl text-xs font-semibold">
                    <span className="bg-white text-slate-900 px-3 py-1 rounded-lg shadow-sm">
                      New Users
                    </span>
                    <span className="text-slate-400 px-2.5 py-1">Old Users</span>
                    <span className="text-slate-400 px-2.5 py-1">Daily Users</span>
                  </div>

                  {/* Top User Card */}
                  <div className="bg-white rounded-xl p-3.5 border border-slate-100/80 shadow-sm flex items-center gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                      alt="Zaire Carder"
                      className="w-14 h-14 rounded-full object-cover border border-slate-100 shadow-inner"
                    />
                    <div className="space-y-1">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Top Users</p>
                        <p className="font-bold text-sm sm:text-base text-slate-950">Zaire Carder</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Daily Transaction</p>
                        <p className="font-extrabold text-sm sm:text-base text-slate-950">$20,000.00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 2 - CARD 3: Weekly Revenue Summary and Insights */}
            <div className="lg:col-span-7 rounded-[32px] sm:rounded-[36px] p-8 sm:p-9 bg-white border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[350px]">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full">
                {/* Left Column Text */}
                <div className="md:col-span-5 flex flex-col justify-between h-full pt-1">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 leading-snug">
                      Weekly revenue summary and insights
                    </h3>
                    <div className="h-[1px] w-full bg-slate-100 my-4" />
                  </div>

                  <div className="mt-8 md:mt-12 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[210px]">
                      Comprehensive weekly breakdowns to maximize profits
                    </p>
                    <a href="#download" className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-950 hover:gap-1.5 transition-all">
                      View more <span>↗</span>
                    </a>
                  </div>
                </div>

                {/* Right Column Metric & Bar Chart */}
                <div className="md:col-span-7 space-y-3.5">
                  {/* Income & Expenses Metric Chips */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#fbfcfd] rounded-2xl p-3.5 border border-slate-100/80 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#6366f1] text-white flex items-center justify-center text-sm font-bold shadow-sm">
                        ↓
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-semibold text-slate-400">Income</p>
                        <p className="text-base sm:text-lg font-extrabold text-slate-950">$48,000</p>
                      </div>
                    </div>

                    <div className="bg-[#fbfcfd] rounded-2xl p-3.5 border border-slate-100/80 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#6366f1] text-white flex items-center justify-center text-sm font-bold shadow-sm">
                        ↑
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-semibold text-slate-400">Expenses</p>
                        <p className="text-base sm:text-lg font-extrabold text-slate-950">$2,356</p>
                      </div>
                    </div>
                  </div>

                  {/* Metric Pill Card */}
                  <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-100 shadow-md flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-slate-400 font-semibold">Weekly Revenue</p>
                      <p className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">$2,464 USD</p>
                    </div>
                    <span className="bg-[#10b981]/15 text-[#059669] font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                      +12%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 2 - CARD 4: Predictive Analytics for Smarter Investing */}
            <div className="lg:col-span-5 rounded-[32px] sm:rounded-[36px] p-8 sm:p-9 bg-[#08080c] text-white border border-white/10 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[350px]">
              {/* Ambient glowing purple nebula */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#7c3aed]/25 rounded-full blur-3xl pointer-events-none" />

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  Predictive analytics for smarter investing
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-4 max-w-sm">
                  Predictive analytics guides smarter investing with data insights
                </p>
              </div>

              {/* Visual Graph / Trend Indicator */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Projected Growth</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                    +38.4% <span className="text-xs font-bold text-[#22c55e] bg-[#22c55e]/15 px-2 py-0.5 rounded-full">AI High</span>
                  </p>
                </div>
                <a
                  href="#download"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white px-4 py-2 rounded-full text-xs font-bold transition-all"
                >
                  <span>Explore</span> <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: GIGANTIC ANIMATED TEXT MARQUEE */}
        <div className="py-6 sm:py-10 border-y border-slate-200/80 overflow-hidden select-none -mx-6 sm:-mx-12 md:-mx-16">
          <div className="flex whitespace-nowrap animate-marquee">
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-bold tracking-tighter text-black flex items-center gap-6 px-4">
              <span>Pay faster</span>
              <span className="text-slate-300 font-light">—</span>
              <span>Receive payments faster</span>
              <span className="text-slate-300 font-light">—</span>
              <span>Move money globally</span>
              <span className="text-slate-300 font-light">—</span>
              <span>Pay faster</span>
              <span className="text-slate-300 font-light">—</span>
              <span>Receive payments faster</span>
              <span className="text-slate-300 font-light">—</span>
            </h2>
          </div>
        </div>

        {/* SECTION 4: MANAGE GENERAL PAYMENTS WITH CLEAR VISUAL INSIGHTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center pt-8">
          {/* Left Column Text & Highlights */}
          <div className="lg:col-span-6 space-y-7">
            <h2 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-bold tracking-tight text-slate-900 leading-[1.12]">
              Manage general payments <br className="hidden sm:inline" />
              with clear visual insights
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-lg">
              Manage payments with clear insights, track spending easily, and make smarter financial decisions with simple, organized views
            </p>

            {/* CTA Pill Button */}
            <div className="pt-1">
              <a
                href="#download"
                className="inline-flex items-center gap-4 bg-black text-white pl-7 pr-2 py-2 rounded-full font-bold text-base hover:bg-neutral-900 transition-all shadow-md group active:scale-95"
              >
                <span>Get started now</span>
                <span className="w-10 h-10 rounded-full bg-white text-[#4f46e5] flex items-center justify-center text-xl font-bold transition-transform duration-300 group-hover:rotate-45 shadow-sm">
                  ↗
                </span>
              </a>
            </div>

            {/* Feature 1: Effortless expense reporting and compliance */}
            <div className="flex items-start gap-4 pt-2">
              <div className="w-12 h-12 rounded-2xl bg-[#eff0fe] text-[#4f46e5] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 4V2H9v2" />
                  <path d="M19 8c0-.6-.4-1-1-1H6c-.6 0-1 .4-1 1l-1.5 10c-.3 1.7.9 3.2 2.6 3.5.3 0 .6.5.9.5h10c1.7 0 3-1.3 3.3-3L20 8Z" />
                  <path d="M12 11v5" />
                  <path d="M10 12.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 0 3h-1a1.5 1.5 0 0 0 0 3h1.5a1.5 1.5 0 0 0 1.5-1.5" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  Effortless expense reporting and compliance
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                  Effortless expense reporting with compliance insights tracks spending, reduces errors, and keeps you audit ready
                </p>
              </div>
            </div>

            {/* Dashed Separator */}
            <div className="border-t border-dashed border-slate-300 my-2" />

            {/* Feature 2: Set budget limits and receive alerts */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#eff0fe] text-[#4f46e5] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="14" width="3.5" height="7" rx="1" />
                  <rect x="10.25" y="9" width="3.5" height="12" rx="1" />
                  <rect x="16.5" y="4" width="3.5" height="17" rx="1" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  Set budget limits and receive alerts
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                  Set budget limits and get instant alerts to stay on track, control spending, and avoid overspending with ease
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Violet-Framed General Payment Card */}
          <div className="lg:col-span-6 p-3 sm:p-4 rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-[#5c24e5] via-[#7839ee] to-[#d8caff] shadow-[0_25px_60px_rgba(92,36,229,0.22)]">
            <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-7 shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">General Payment</h3>
                <button className="text-slate-800 hover:text-slate-600 text-xl font-bold px-1 tracking-widest leading-none">
                  ⋮
                </button>
              </div>

              {/* Big Balance Amount */}
              <div className="mt-4">
                <p className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  $47,928.00
                </p>
                <div className="flex items-center gap-5 text-xs font-semibold text-slate-600 mt-2.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]" /> Payment Done
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27272a]" /> Payment To Review
                  </span>
                </div>
              </div>

              {/* Two Subscription Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6">
                {/* Finova Solutions Card */}
                <div className="border border-slate-200/90 rounded-2xl p-3.5 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7 6c2 3 2 9 0 12 2-3 8-3 11 0-2-3-2-9 0-12-3 3-9 3-11 0Z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Finova Solutions</p>
                        <p className="text-[11px] text-slate-400">Lorem Ipsum</p>
                      </div>
                    </div>
                    {/* Toggle Pill */}
                    <div className="bg-[#eff1fe] rounded-full p-1 flex flex-col items-center gap-1 w-6">
                      <span className="text-[9px] text-slate-400 font-bold leading-none">✕</span>
                      <span className="w-4 h-4 rounded-full bg-[#4f46e5] text-white flex items-center justify-center text-[9px] font-bold">
                        ✓
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-1">
                    <span className="text-base font-extrabold text-slate-950">$36</span>
                    <span className="text-xs text-slate-400 font-medium"> /Month</span>
                  </div>
                </div>

                {/* Sync Systems Card */}
                <div className="border border-slate-200/90 rounded-2xl p-3.5 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <circle cx="12" cy="12" r="7" strokeDasharray="14 10" />
                          <line x1="8" y1="16" x2="16" y2="8" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Sync Systems</p>
                        <p className="text-[11px] text-slate-400">Lorem Ipsum</p>
                      </div>
                    </div>
                    {/* Toggle Pill */}
                    <div className="bg-[#f4f4f5] rounded-full p-1 flex flex-col items-center gap-1 w-6">
                      <span className="text-[9px] text-slate-400 font-bold leading-none">✕</span>
                      <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center text-[9px] font-bold">
                        ✓
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-1">
                    <span className="text-base font-extrabold text-slate-950">$46</span>
                    <span className="text-xs text-slate-400 font-medium"> /Month</span>
                  </div>
                </div>
              </div>

              {/* 12-Month Stacked Segmented Bar Chart */}
              <div className="mt-8 pt-4 relative">
                {/* Horizontal Dashed Guidelines */}
                <div className="absolute inset-x-0 top-4 bottom-8 flex flex-col justify-between pointer-events-none">
                  <div className="border-b border-dashed border-slate-200/80 w-full" />
                  <div className="border-b border-dashed border-slate-200/80 w-full" />
                  <div className="border-b border-dashed border-slate-200/80 w-full" />
                </div>

                {/* Bar Columns Container */}
                <div className="relative z-10 h-44 sm:h-48 flex items-end justify-between gap-1.5 sm:gap-2">
                  {[
                    { month: 'Jan', segments: 6, color: 'gray' },
                    { month: 'Feb', segments: 12, color: 'black' },
                    { month: 'Mar', segments: 14, color: 'gray' },
                    { month: 'Apr', segments: 7, color: 'black' },
                    { month: 'May', segments: 13, color: 'gray' },
                    { month: 'Jun', segments: 17, color: 'purple' },
                    { month: 'Jul', segments: 5, color: 'gray' },
                    { month: 'Aug', segments: 9, color: 'black' },
                    { month: 'Sep', segments: 13, color: 'gray' },
                    { month: 'Oct', segments: 19, color: 'black' },
                    { month: 'Nov', segments: 14, color: 'gray' },
                    { month: 'Dec', segments: 17, color: 'purple' },
                  ].map((item) => (
                    <div key={item.month} className="flex-1 flex flex-col items-center justify-end h-full">
                      {/* Stacked striped pill segments */}
                      <div className="flex flex-col-reverse gap-[2px] sm:gap-[2.5px] w-full max-w-[20px] items-center">
                        {Array.from({ length: item.segments }).map((_, i) => (
                          <span
                            key={i}
                            className={`w-full h-[4.5px] sm:h-[5.5px] rounded-full ${
                              item.color === 'purple'
                                ? 'bg-[#4f46e5]'
                                : item.color === 'black'
                                ? 'bg-[#09090b]'
                                : 'bg-[#e2e8f0]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Month Labels */}
                <div className="flex justify-between gap-1.5 sm:gap-2 mt-2.5 pt-1">
                  {[
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ].map((m) => (
                    <span
                      key={m}
                      className="flex-1 text-center text-[10px] sm:text-[11px] font-medium text-slate-500"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* SECTION 5: UNLOCK SMARTER FINANCIAL DECISIONS WITH REAL-TIME ANALYTICS */}
        <div className="mt-20 sm:mt-28 rounded-[32px] sm:rounded-[44px] bg-[#08080c] text-white p-6 sm:p-10 md:p-14 relative overflow-hidden border border-white/[0.08] shadow-[0_30px_90px_rgba(0,0,0,0.6)]">
          {/* Top Cosmic Purple Glow & Downward Glowing Crescent Arc */}
          <div className="absolute inset-x-0 top-0 h-64 sm:h-76 overflow-hidden pointer-events-none rounded-t-[32px] sm:rounded-t-[44px]">
            {/* Cosmic Deep Purple Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#4c1d95] via-[#2e1065]/70 to-transparent opacity-90" />
            
            {/* Ambient Nebula Bloom */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[600px] h-[160px] bg-[#7c3aed]/40 blur-[50px] rounded-full" />

            {/* Downward Arcing Glowing Curve */}
            <svg
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[115%] sm:w-[110%] h-44 sm:h-52"
              viewBox="0 0 1200 160"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="crescentGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4338ca" stopOpacity="0.4" />
                  <stop offset="25%" stopColor="#7c3aed" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#c084fc" stopOpacity="1" />
                  <stop offset="75%" stopColor="#7c3aed" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#4338ca" stopOpacity="0.4" />
                </linearGradient>
                <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              {/* Glowing soft blur path */}
              <path
                d="M-50 15 Q600 135 1250 15"
                stroke="url(#crescentGlow)"
                strokeWidth="4.5"
                filter="url(#softGlow)"
              />
              {/* Crisp bright inner line */}
              <path
                d="M-50 15 Q600 135 1250 15"
                stroke="#e9d5ff"
                strokeWidth="1.2"
                strokeOpacity="0.9"
              />
            </svg>
          </div>

          {/* Bottom Grid Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none [mask-image:linear-gradient(to_top,black,transparent)]" />

          {/* Section Heading with Exact 3-Line Breakdown */}
          <div className="relative z-10 text-center max-w-3xl mx-auto pt-8 sm:pt-12 pb-10 sm:pb-14">
            <h2 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-white leading-[1.14]">
              Unlock smarter financial <br />
              decisions <br />
              with real-time analytics
            </h2>
          </div>

          {/* 3-Column Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Card 1: Analytics */}
            <div className="bg-[#0e0e14]/90 backdrop-blur-xl border border-white/[0.08] rounded-[26px] sm:rounded-[30px] p-6 sm:p-7 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
              <div className="text-center space-y-1.5 mb-7">
                <h3 className="text-lg font-bold text-white tracking-wide">Analytics</h3>
                <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed max-w-[230px] mx-auto">
                  Set budget limits and get alerts to track spending and avoid overspending
                </p>
              </div>

              {/* Currency Widget */}
              <div className="bg-[#14141d] border border-white/[0.06] rounded-[20px] p-4 sm:p-4.5 space-y-3.5 shadow-inner">
                {/* US Dollar */}
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-[#374151] border border-[#4b5563] flex items-center justify-center text-[10px] text-white font-bold flex-shrink-0">
                    ✓
                  </div>
                  {/* US Flag SVG */}
                  <svg className="w-7 h-7 rounded-full flex-shrink-0 shadow-sm" viewBox="0 0 32 32">
                    <clipPath id="us-flag-clip-2">
                      <circle cx="16" cy="16" r="16" />
                    </clipPath>
                    <g clipPath="url(#us-flag-clip-2)">
                      <rect width="32" height="32" fill="#b22234" />
                      <rect y="2.46" width="32" height="2.46" fill="#fff" />
                      <rect y="7.38" width="32" height="2.46" fill="#fff" />
                      <rect y="12.3" width="32" height="2.46" fill="#fff" />
                      <rect y="17.22" width="32" height="2.46" fill="#fff" />
                      <rect y="22.14" width="32" height="2.46" fill="#fff" />
                      <rect y="27.06" width="32" height="2.46" fill="#fff" />
                      <rect width="14" height="17.2" fill="#3c3b6e" />
                      <circle cx="3.5" cy="4" r="1" fill="#fff" />
                      <circle cx="10.5" cy="4" r="1" fill="#fff" />
                      <circle cx="7" cy="8.5" r="1" fill="#fff" />
                      <circle cx="3.5" cy="13" r="1" fill="#fff" />
                      <circle cx="10.5" cy="13" r="1" fill="#fff" />
                    </g>
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">US Dollar</p>
                    <div className="w-full h-1.5 bg-[#25252f] rounded-full mt-1.5 overflow-hidden">
                      <div className="w-[60%] h-full bg-white rounded-full" />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-300 pl-1">$120.000</span>
                </div>

                {/* Euro */}
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded border border-slate-700 bg-transparent flex-shrink-0" />
                  {/* EU Flag SVG */}
                  <svg className="w-7 h-7 rounded-full flex-shrink-0 shadow-sm" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="16" fill="#003399" />
                    <g fill="#ffcc00">
                      <circle cx="16" cy="5.5" r="0.9" />
                      <circle cx="21.5" cy="7" r="0.9" />
                      <circle cx="25.5" cy="11" r="0.9" />
                      <circle cx="26.5" cy="16" r="0.9" />
                      <circle cx="25.5" cy="21" r="0.9" />
                      <circle cx="21.5" cy="25" r="0.9" />
                      <circle cx="16" cy="26.5" r="0.9" />
                      <circle cx="10.5" cy="25" r="0.9" />
                      <circle cx="6.5" cy="21" r="0.9" />
                      <circle cx="5.5" cy="16" r="0.9" />
                      <circle cx="6.5" cy="11" r="0.9" />
                      <circle cx="10.5" cy="7" r="0.9" />
                    </g>
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">Euro</p>
                    <div className="w-full h-1.5 bg-[#25252f] rounded-full mt-1.5 overflow-hidden">
                      <div className="w-[32%] h-full bg-white rounded-full" />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-300 pl-1">$16.005</span>
                </div>

                {/* Canadian Dollar */}
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded border border-slate-700 bg-transparent flex-shrink-0" />
                  {/* Canada Flag SVG */}
                  <svg className="w-7 h-7 rounded-full flex-shrink-0 shadow-sm" viewBox="0 0 32 32">
                    <clipPath id="ca-flag-clip-2">
                      <circle cx="16" cy="16" r="16" />
                    </clipPath>
                    <g clipPath="url(#ca-flag-clip-2)">
                      <rect width="32" height="32" fill="#d80027" />
                      <rect x="8" width="16" height="32" fill="#fff" />
                      <path d="M16 8l1.3 3.5 2.2-.8-.7 2.3 2.5 1-1.3 1.8 1.8 1.2-3.8.5.5 4.5h-5l.5-4.5-3.8-.5 1.8-1.2-1.3-1.8 2.5-1-.7-2.3 2.2.8Z" fill="#d80027" />
                    </g>
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">Canadian Dollar</p>
                    <div className="w-full h-1.5 bg-[#25252f] rounded-full mt-1.5 overflow-hidden">
                      <div className="w-[45%] h-full bg-white rounded-full" />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-300 pl-1">$6.260.55</span>
                </div>
              </div>
            </div>

            {/* Card 2: Budgeting */}
            <div className="bg-[#0e0e14]/90 backdrop-blur-xl border border-white/[0.08] rounded-[26px] sm:rounded-[30px] p-6 sm:p-7 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
              <div className="text-center space-y-1.5 mb-7">
                <h3 className="text-lg font-bold text-white tracking-wide">Budgeting</h3>
                <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed max-w-[230px] mx-auto">
                  Analytics turns data into insights to drive smarter decisions fast
                </p>
              </div>

              <div className="space-y-3">
                {/* Subcard 1: Gross Sale */}
                <div className="bg-[#14141d] border border-white/[0.06] rounded-[20px] p-4 sm:p-4.5 flex items-center justify-between shadow-inner">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 2a8 8 0 0 1 7.9 6.8L12 12V4Z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm sm:text-base font-extrabold text-white tracking-tight">€290132.99</span>
                        <span className="text-[10px] font-bold text-black bg-white px-1.5 py-0.2 rounded-full">+9%</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">Gross Sale</p>
                    </div>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium text-right self-end leading-tight">
                    <span>Last 20</span>
                    <br />
                    <span>Days</span>
                  </div>
                </div>

                {/* Subcard 2: Orders */}
                <div className="bg-[#14141d] border border-white/[0.06] rounded-[20px] p-4 sm:p-4.5 flex items-center justify-between shadow-inner">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm sm:text-base font-extrabold text-white tracking-tight">12,500+</span>
                        <span className="text-[10px] font-bold text-black bg-white px-1.5 py-0.2 rounded-full">+5%</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">Orders</p>
                    </div>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium text-right self-end leading-tight">
                    <span>Last 20</span>
                    <br />
                    <span>Days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Accounts */}
            <div className="bg-[#0e0e14]/90 backdrop-blur-xl border border-white/[0.08] rounded-[26px] sm:rounded-[30px] p-6 sm:p-7 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
              <div className="text-center space-y-1.5 mb-7">
                <h3 className="text-lg font-bold text-white tracking-wide">Accounts</h3>
                <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed max-w-[230px] mx-auto">
                  Budgeting helps you track spending, save money, and stay in control
                </p>
              </div>

              {/* Accounts List */}
              <div className="bg-[#14141d] border border-white/[0.06] rounded-[20px] p-4 sm:p-4.5 space-y-3.5 shadow-inner">
                {/* Shopping */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                        <path d="M3 6h18" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-white">Shopping</span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-300">€330.00</span>
                </div>

                {/* Restaurants */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                        <line x1="6" y1="2" x2="6" y2="4" />
                        <line x1="10" y1="2" x2="10" y2="4" />
                        <line x1="14" y1="2" x2="14" y2="4" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-white">Restaurants</span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-300">€154.00</span>
                </div>

                {/* Travels */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0 shadow-sm">
                      <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-white">Travels</span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-300">-€2,592.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <div id="support" className="mt-28 pt-8 border-t border-slate-200 text-center text-slate-500 text-sm">
        <b>Payer</b> · Payments without borders.
      </div>
    </section>
  );
}

// 3D Inflated Pillowy Cushions Background
function SoftCushionsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[32px] sm:rounded-[38px] bg-[#121216] pointer-events-none select-none">
      {/* 3D Inflated Cushion 1 (Top Left) */}
      <div className="absolute -top-14 -left-14 w-72 h-72 rounded-[48%] bg-[radial-gradient(circle_at_35%_25%,#40404a_0%,#1e1e24_45%,#0d0d10_80%)] shadow-[inset_15px_15px_30px_rgba(255,255,255,0.08),_inset_-15px_-15px_35px_rgba(0,0,0,0.9),_0_25px_50px_rgba(0,0,0,0.8)] rotate-12" />

      {/* 3D Inflated Cushion 2 (Top Right) */}
      <div className="absolute top-4 -right-16 w-80 h-80 rounded-[46%] bg-[radial-gradient(circle_at_40%_25%,#3a3a44_0%,#1a1a20_50%,#0a0a0d_85%)] shadow-[inset_18px_18px_35px_rgba(255,255,255,0.07),_inset_-20px_-20px_40px_rgba(0,0,0,0.95),_0_30px_60px_rgba(0,0,0,0.85)] -rotate-12" />

      {/* 3D Inflated Cushion 3 (Bottom Left) */}
      <div className="absolute -bottom-16 -left-8 w-88 h-88 rounded-[44%] bg-[radial-gradient(circle_at_30%_30%,#3e3e48_0%,#1c1c22_48%,#08080a_85%)] shadow-[inset_20px_20px_40px_rgba(255,255,255,0.08),_inset_-25px_-25px_45px_rgba(0,0,0,0.95),_0_35px_70px_rgba(0,0,0,0.9)] rotate-45" />

      {/* 3D Inflated Cushion 4 (Bottom Right) */}
      <div className="absolute -bottom-12 -right-10 w-76 h-76 rounded-[50%] bg-[radial-gradient(circle_at_35%_25%,#42424c_0%,#1f1f26_45%,#0c0c0f_80%)] shadow-[inset_16px_16px_32px_rgba(255,255,255,0.07),_inset_-18px_-18px_38px_rgba(0,0,0,0.9),_0_25px_55px_rgba(0,0,0,0.8)] -rotate-20" />

      {/* Center Deep Vignette Behind Mockup */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />
    </div>
  );
}

// Expenses iPhone Screen Mockup
function ExpensesPhoneMockup() {
  return (
    <div className="relative z-10 w-[265px] sm:w-[290px] h-[520px] sm:h-[560px] rounded-[42px] sm:rounded-[46px] p-2.5 sm:p-3 bg-black border-[5px] sm:border-[6px] border-[#222228] shadow-[0_25px_60px_rgba(0,0,0,0.9),_0_0_40px_rgba(0,0,0,0.6)] flex flex-col mb-12 select-none">
      {/* Screen container */}
      <div className="relative w-full h-full bg-[#f8fafc] rounded-[34px] sm:rounded-[38px] overflow-hidden flex flex-col p-3.5 sm:p-4 text-black">
        {/* Dynamic Island */}
        <div className="w-18 h-4.5 bg-black rounded-full mx-auto mb-2 flex items-center justify-end px-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#111] border border-[#222]" />
        </div>

        {/* Top navigation */}
        <div className="flex items-center justify-between text-slate-700 mb-1">
          <span className="w-6 h-6 rounded-full bg-slate-200/70 flex items-center justify-center text-xs text-slate-800 cursor-pointer">
            ‹
          </span>
          <div className="flex items-center gap-1 font-bold text-xs sm:text-sm text-slate-900">
            Expenses <span className="text-[9px] text-slate-500">▾</span>
          </div>
          <span className="w-6 h-6 rounded-full bg-slate-200/70 flex items-center justify-center text-xs text-slate-800 cursor-pointer">
            +
          </span>
        </div>

        {/* Month Selector */}
        <div className="text-center text-[11px] font-semibold text-slate-400 mt-0.5 flex items-center justify-center gap-1">
          September 2020 <span className="text-[8px]">▾</span>
        </div>

        {/* Big Amount */}
        <div className="text-center font-extrabold text-3xl sm:text-4xl text-slate-950 tracking-tight my-1.5">
          $1,812
        </div>

        {/* Multi-segment Progress Card */}
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 my-1 space-y-2">
          <div className="flex items-center justify-between text-[10px]">
            <div>
              <p className="text-slate-400 text-[9px]">Left to spend</p>
              <p className="font-bold text-slate-900">$738</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-[9px]">Monthly budget</p>
              <p className="font-bold text-slate-900">$2,550</p>
            </div>
          </div>

          {/* Segmented Bar */}
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-0.5">
            <div className="h-full w-[28%] bg-[#f97316] rounded-full" />
            <div className="h-full w-[18%] bg-[#06b6d4] rounded-full" />
            <div className="h-full w-[32%] bg-[#8b5cf6] rounded-full" />
            <div className="h-full w-[22%] bg-slate-200 rounded-full" />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2 mt-1.5">
          {/* Category 1 */}
          <div className="bg-white rounded-2xl p-2.5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 text-xs">
                  🚙
                </div>
                <p className="font-bold text-[11px] text-slate-900">Auto &amp; transport</p>
              </div>
              <p className="font-bold text-[11px] text-slate-900">$700</p>
            </div>

            <div className="space-y-1 pt-1 border-t border-slate-50">
              <div className="flex justify-between text-[9px]">
                <span className="text-slate-500 font-medium">Auto &amp; transport</span>
                <span className="font-bold text-slate-800">$350 <span className="text-[8px] text-slate-400 font-normal">Left $186</span></span>
              </div>
              <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-[#7c3aed] rounded-full" />
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[9px]">
                <span className="text-slate-500 font-medium">Auto insurance</span>
                <span className="font-bold text-slate-800">$250 <span className="text-[8px] text-slate-400 font-normal">Left $120</span></span>
              </div>
              <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-[#7c3aed] rounded-full" />
              </div>
            </div>
          </div>

          {/* Category 2 */}
          <div className="bg-white rounded-2xl p-2.5 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 text-xs">
                🧾
              </div>
              <p className="font-bold text-[11px] text-slate-900">Bill &amp; Utilities</p>
            </div>
            <p className="font-bold text-[11px] text-slate-900">$320</p>
          </div>
        </div>
      </div>
    </div>
  );
}