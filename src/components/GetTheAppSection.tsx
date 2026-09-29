import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ArrowUp,
  Mail,
  Database,
  Users,
  Eye,
  Bell,
  Plus,
  Home,
  CreditCard,
  QrCode,
  Activity,
  ChevronLeft,
  Send,
} from "lucide-react";

export function GetTheAppSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    restDelta: 0.001,
  });

  // Parallax shifts for the 3 phones
  const leftPhoneY = useTransform(smoothProgress, [0, 1], [40, -25]);
  const leftPhoneRotate = useTransform(smoothProgress, [0, 0.5, 1], [-15, -13, -11]);
  const leftPhoneX = useTransform(smoothProgress, [0, 0.5, 1], [-20, 0, 10]);

  const centerPhoneY = useTransform(smoothProgress, [0, 1], [25, -25]);
  const centerPhoneScale = useTransform(smoothProgress, [0, 0.5, 1], [0.97, 1.0, 0.98]);

  const rightPhoneY = useTransform(smoothProgress, [0, 1], [40, -25]);
  const rightPhoneRotate = useTransform(smoothProgress, [0, 0.5, 1], [15, 13, 11]);
  const rightPhoneX = useTransform(smoothProgress, [0, 0.5, 1], [20, 0, -10]);

  const glowScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1.15, 0.95]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.35, 0.65, 0.4]);

  return (
    <section
      id="get-app-section"
      ref={containerRef}
      className="relative w-full bg-[#000000] text-white pt-20 sm:pt-28 md:pt-36 pb-32 sm:pb-44 md:pb-52 px-4 sm:px-6 overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* Soft Expanded Purple Ambient Radial Glow reaching up to the button */}
      <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 w-[850px] sm:w-[1200px] md:w-[1450px] h-[560px] sm:h-[700px] md:h-[800px] bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.22)_0%,rgba(147,51,234,0.13)_35%,rgba(109,40,217,0.05)_65%,transparent_80%)] blur-[120px] z-0" />
      <div className="pointer-events-none absolute bottom-12 sm:bottom-20 left-1/2 -translate-x-1/2 w-[480px] sm:w-[720px] md:w-[860px] h-[300px] sm:h-[380px] bg-[radial-gradient(ellipse_at_center,rgba(192,132,252,0.16)_0%,rgba(168,85,247,0.08)_45%,transparent_70%)] blur-[90px] z-0" />

      {/* ------------------------------------------------------------- */}
      {/* 3-PHONE TRIPTYCH SHOWCASE (Solid, Opaque & Widely Spread with Bottom Fade) */}
      {/* ------------------------------------------------------------- */}
      <div
        className="relative w-full max-w-4xl h-[320px] xs:h-[370px] sm:h-[460px] md:h-[510px] mt-4 sm:mt-8 mb-6 sm:mb-10 flex items-center justify-center pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 58%, rgba(0,0,0,0.5) 80%, transparent 98%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 58%, rgba(0,0,0,0.5) 80%, transparent 98%)",
        }}
      >
        {/* LEFT PHONE: Quick Actions Dashboard */}
        <motion.div
          style={{
            y: leftPhoneY,
            x: leftPhoneX,
            rotateZ: leftPhoneRotate,
          }}
          initial={{ opacity: 0, x: -60, y: 40 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 -translate-x-[calc(50%+65px)] xs:-translate-x-[calc(50%+85px)] sm:-translate-x-[calc(50%+115px)] md:-translate-x-[calc(50%+138px)] z-10 w-[120px] xs:w-[155px] sm:w-[195px] md:w-[220px] h-[250px] xs:h-[320px] sm:h-[395px] md:h-[440px] pointer-events-auto origin-bottom"
        >
          <PhoneFrame>
            <LeftPhoneDashboardScreen />
          </PhoneFrame>
        </motion.div>

        {/* RIGHT PHONE: Large Payments Transfer */}
        <motion.div
          style={{
            y: rightPhoneY,
            x: rightPhoneX,
            rotateZ: rightPhoneRotate,
          }}
          initial={{ opacity: 0, x: 60, y: 40 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 translate-x-[calc(-50%+65px)] xs:translate-x-[calc(-50%+85px)] sm:translate-x-[calc(-50%+115px)] md:translate-x-[calc(-50%+138px)] z-10 w-[120px] xs:w-[155px] sm:w-[195px] md:w-[220px] h-[250px] xs:h-[320px] sm:h-[395px] md:h-[440px] pointer-events-auto origin-bottom"
        >
          <PhoneFrame>
            <RightPhoneTransferScreen />
          </PhoneFrame>
        </motion.div>

        {/* CENTER PHONE: Borderless Payments with 3D Torus Donut */}
        <motion.div
          style={{
            y: centerPhoneY,
            scale: centerPhoneScale,
          }}
          initial={{ opacity: 0, y: 35, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1.0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 w-[135px] xs:w-[170px] sm:w-[210px] md:w-[238px] h-[275px] xs:h-[345px] sm:h-[425px] md:h-[475px] pointer-events-auto shadow-[0_25px_70px_rgba(0,0,0,0.95),_0_0_35px_rgba(168,85,247,0.22)] rounded-[26px] xs:rounded-[34px] sm:rounded-[42px]"
        >
          <PhoneFrame isCenter>
            <CenterPhoneHeroScreen />
          </PhoneFrame>
        </motion.div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM HEADLINE, SUBTITLE & CTA BUTTON (Overlapping bottom fade) */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 text-center flex flex-col items-center max-w-2xl px-4 pointer-events-auto"
      >
        <h2 className="font-sans font-bold tracking-tight text-3xl xs:text-4xl sm:text-6xl md:text-[4.4rem] text-white leading-none drop-shadow-md">
          Get the App.
        </h2>

        <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-400 font-normal leading-relaxed max-w-md text-center">
          Fast, secure, and borderless payments—
          <br className="hidden sm:inline" />
          powered by Payer.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="mt-6 sm:mt-8 mb-4 sm:mb-8"
        >
          <a
            href="#download"
            style={{ color: "#000000" }}
            className="inline-flex items-center justify-center bg-white text-black !text-black font-semibold text-xs sm:text-sm px-7 sm:px-9 py-2.5 sm:py-3 rounded-full hover:bg-neutral-200 transition-all shadow-[0_4px_25px_rgba(168,85,247,0.3)] active:scale-95 cursor-pointer"
          >
            <span style={{ color: "#000000" }} className="text-black !text-black font-semibold">
              Get the app
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// TITANIUM PHONE FRAME WRAPPER (Solid & Opaque)
// ---------------------------------------------------------------------------
function PhoneFrame({
  children,
  isCenter = false,
}: {
  children: React.ReactNode;
  isCenter?: boolean;
}) {
  return (
    <div
      className={`relative w-full h-full rounded-[34px] sm:rounded-[40px] md:rounded-[44px] p-1.5 sm:p-2 bg-gradient-to-b from-[#3a3a46] via-[#1c1c24] to-[#0c0c12] border border-white/20 ${isCenter
          ? "shadow-[0_0_0_1px_rgba(255,255,255,0.2),_0_20px_60px_rgba(0,0,0,0.95)]"
          : "shadow-[0_15px_40px_rgba(0,0,0,0.85)] opacity-95 hover:opacity-100 transition-opacity"
        }`}
    >
      {/* Top Specular Edge Highlight */}
      <div className="absolute top-0 inset-x-8 sm:inset-x-10 h-[1.2px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />

      {/* Inner OLED Phone Screen (Fully Solid Black) */}
      <div className="relative w-full h-full rounded-[28px] sm:rounded-[34px] md:rounded-[37px] bg-[#000000] border border-white/10 overflow-hidden flex flex-col justify-between shadow-inner">
        {/* Dynamic Island & Status Bar */}
        <div className="relative z-40 w-full flex items-center justify-between text-white text-[8px] sm:text-[9px] font-medium tracking-tight px-3 pt-2 pb-0.5 shrink-0 select-none">
          <span className="font-semibold text-white/95 text-[8px] sm:text-[9px]">9:41</span>
          <div className="w-14 sm:w-17 h-3.5 sm:h-4 bg-black rounded-full flex items-center justify-between px-1.5 shadow-inner border border-white/5">
            <div className="w-1 h-1 rounded-full bg-[#111118] border border-white/10" />
            <div className="w-1 h-1 rounded-full bg-[#0a0a16] border border-white/10" />
          </div>
          <div className="flex items-center gap-0.5 text-white/90">
            <svg className="w-2 h-2 fill-current" viewBox="0 0 24 24">
              <rect x="2" y="14" width="3" height="8" rx="1" />
              <rect x="7" y="10" width="3" height="12" rx="1" />
              <rect x="12" y="6" width="3" height="16" rx="1" />
              <rect x="17" y="2" width="3" height="20" rx="1" />
            </svg>
            <div className="w-2.5 h-1.5 border border-white/80 rounded-[2px] p-[0.5px] flex items-center">
              <div className="h-full w-full bg-white rounded-[0.5px]" />
            </div>
          </div>
        </div>

        {/* Screen Content Body */}
        <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 1. CENTER SCREEN: Borderless Payments with Beige-to-Lilac 3D Torus Donut
// ---------------------------------------------------------------------------
function CenterPhoneHeroScreen() {
  return (
    <div className="relative w-full h-full pt-1.5 sm:pt-2 px-3 pb-3 flex flex-col justify-between select-none overflow-hidden bg-[#000000]">
      {/* Glowing Torus / Donut Ring */}
      <div className="relative mt-2 mb-auto flex items-center justify-center py-1 z-10">
        <div className="absolute w-36 sm:w-44 h-22 sm:h-28 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-400/15 to-amber-200/15 blur-xl pointer-events-none" />
        <div className="relative w-[130px] sm:w-[155px] h-[75px] sm:h-[90px] flex items-center justify-center">
          <svg
            viewBox="0 0 320 180"
            className="w-full h-full drop-shadow-[0_12px_28px_rgba(217,70,239,0.25)]"
          >
            <defs>
              <linearGradient id="centerTorusGrad" x1="0%" y1="20%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="28%" stopColor="#d8b4fe" />
                <stop offset="55%" stopColor="#eed9c4" />
                <stop offset="80%" stopColor="#d5b094" />
                <stop offset="100%" stopColor="#966d54" />
              </linearGradient>
              <radialGradient id="centerTorusShine" cx="30%" cy="25%" r="70%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
              </radialGradient>
            </defs>
            {/* Outer Torus Body */}
            <ellipse cx="160" cy="90" rx="140" ry="80" fill="url(#centerTorusGrad)" />
            {/* 3D Specular Highlight */}
            <ellipse
              cx="160"
              cy="90"
              rx="140"
              ry="80"
              fill="url(#centerTorusShine)"
              style={{ mixBlendMode: "overlay" }}
            />
            {/* Center Cutout Hole */}
            <ellipse cx="160" cy="90" rx="64" ry="38" fill="#000000" />
          </svg>
        </div>
      </div>

      {/* App Brand & Headline */}
      <div className="relative z-20 pb-1.5">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-3.5 h-3.5 rounded-[3.5px] bg-gradient-to-tr from-purple-500 via-pink-400 to-amber-200 p-[1px] shadow-sm">
            <div className="w-full h-full bg-[#000000] rounded-[2.5px] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-gradient-to-tr from-pink-400 to-amber-300" />
            </div>
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-white/90">Payer</span>
        </div>
        <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white leading-tight">
          Borderless <br />
          <span className="text-white/45">Payments</span>
        </h3>
        {/* Subtle bottom placeholder bar */}
        <div className="mt-1.5 w-full h-6 sm:h-7 rounded-xl bg-white/[0.04] border border-white/5" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. LEFT SCREEN: Haley Quick Actions Dashboard
// ---------------------------------------------------------------------------
function LeftPhoneDashboardScreen() {
  return (
    <div className="relative w-full h-full pt-1 px-2.5 pb-2 flex flex-col justify-between text-white select-none overflow-hidden">
      {/* Inner Screen Ambient Gradient Bottom Glow */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-purple-950/20 via-pink-950/10 to-transparent pointer-events-none rounded-b-[28px]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between pt-0.5">
        <div className="flex items-center gap-1.5">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
            alt="Haley"
            className="w-5 h-5 rounded-full object-cover ring-1 ring-white/20"
          />
          <div>
            <p className="text-[7px] text-slate-400 font-medium">How's it going</p>
            <p className="text-[9px] sm:text-[10px] font-bold text-white leading-tight">Haley</p>
          </div>
        </div>
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
          <Bell className="w-2.5 h-2.5" />
        </div>
      </div>

      {/* Add Your New Card Pill */}
      <div className="mt-0.5 bg-white/5 border border-white/10 rounded-md px-2 py-0.5 flex items-center justify-between text-[7.5px] sm:text-[8px] text-slate-300">
        <span className="font-medium text-slate-300">Add Your New Card</span>
        <div className="w-3 h-3 rounded-full bg-white/10 flex items-center justify-center">
          <Plus className="w-2 h-2 text-white" />
        </div>
      </div>

      {/* Visa Card Gradient Box */}
      <div className="mt-1 rounded-lg bg-gradient-to-r from-[#ffd3b6] via-[#f472b6] to-[#a5b4fc] p-2 text-black shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between text-[8px] font-bold">
          <span className="italic font-black text-[10px] tracking-tight">VISA</span>
          <div className="flex items-center gap-0.5 font-mono text-[7px] font-semibold tracking-wider">
            <span>**** 3241</span>
            <Eye className="w-2 h-2 text-black/70 ml-0.5" />
          </div>
        </div>
        <div className="mt-1.5">
          <p className="text-[6.5px] uppercase tracking-wider text-black/60 font-semibold">
            Total Balance
          </p>
          <p className="text-xs sm:text-sm font-extrabold tracking-tight text-black leading-tight">
            $214,453.00
          </p>
        </div>
      </div>

      {/* Action Icons 4 Grid */}
      <div className="grid grid-cols-4 gap-0.5 mt-1 text-center">
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white">
            <ArrowUp className="w-2.5 h-2.5" />
          </div>
          <span className="text-[6.5px] text-slate-300 font-medium">Transfer</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white">
            <Mail className="w-2.5 h-2.5" />
          </div>
          <span className="text-[6.5px] text-slate-300 font-medium">Request</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white">
            <Database className="w-2.5 h-2.5" />
          </div>
          <span className="text-[6.5px] text-slate-300 font-medium">Savings</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white">
            <Users className="w-2.5 h-2.5" />
          </div>
          <span className="text-[6.5px] text-slate-300 font-medium">Contact</span>
        </div>
      </div>

      {/* History Transaction */}
      <div className="mt-0.5">
        <div className="flex items-center justify-between text-[7.5px] font-semibold text-white/90 mb-0.5">
          <span>History</span>
          <span className="text-[6.5px] text-slate-400 font-normal">See All</span>
        </div>
        <div className="flex items-center justify-between bg-white/[0.03] border border-white/5 rounded-md p-1">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-[#001e36] text-[#38bdf8] flex items-center justify-center text-[7px] font-bold">
              Ps
            </div>
            <div>
              <p className="text-[7.5px] font-semibold text-white leading-tight">
                Adobe Photoshop
              </p>
              <p className="text-[6px] text-slate-400">Jan 21, 04:44 PM</p>
            </div>
          </div>
          <span className="text-[8px] font-bold text-white">$19</span>
        </div>
      </div>

      {/* Bottom Floating Nav */}
      <div className="mt-auto bg-[#13131a]/95 border border-white/10 rounded-full px-2 py-0.5 flex items-center justify-between shadow-lg">
        <Home className="w-2.5 h-2.5 text-white" />
        <CreditCard className="w-2.5 h-2.5 text-slate-400" />
        <div className="w-4 h-4 rounded-md bg-gradient-to-tr from-pink-400 to-purple-400 flex items-center justify-center text-black shadow-sm">
          <QrCode className="w-2 h-2 text-black" />
        </div>
        <Activity className="w-2.5 h-2.5 text-slate-400" />
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
          alt="Haley"
          className="w-3 h-3 rounded-full object-cover"
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. RIGHT SCREEN: Transfer Money ($44,000 Screen)
// ---------------------------------------------------------------------------
function RightPhoneTransferScreen() {
  return (
    <div className="w-full h-full pt-1 px-2.5 pb-2.5 flex flex-col justify-between text-white select-none">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pt-0.5">
          <div className="w-4.5 h-4.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
            <ChevronLeft className="w-2.5 h-2.5" />
          </div>
          <p className="text-[8.5px] sm:text-[9.5px] font-semibold text-white">
            Transfer Money
          </p>
          <div className="w-4.5" />
        </div>

        {/* Recipient Pill */}
        <div className="mt-1.5 bg-white/5 border border-white/10 rounded-lg p-1 px-1.5 flex items-center gap-1.5 mx-auto max-w-[140px]">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
            alt="Haley"
            className="w-4.5 h-4.5 rounded-full object-cover ring-1 ring-white/20"
          />
          <div className="text-left">
            <p className="text-[8px] font-bold text-white leading-tight">
              Haley Baylee
            </p>
            <p className="text-[6px] text-slate-400 font-mono">
              1234 - 5678 - 9012 - 3456
            </p>
          </div>
        </div>
      </div>

      {/* Big Center Amount */}
      <div className="my-auto text-center">
        <p className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight drop-shadow-md">
          $44,000
        </p>
      </div>

      {/* Bottom Gradient Glow and Note Input */}
      <div className="relative">
        <div className="absolute -top-8 inset-x-0 h-16 bg-gradient-to-t from-indigo-600/30 via-purple-600/20 to-transparent rounded-b-xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-1 bg-[#12121e] border border-white/10 rounded-full p-0.5 pl-2">
          <span className="text-[7px] sm:text-[8px] text-slate-400 flex-1">
            Add Note (Optional)
          </span>
          <button
            aria-label="Send"
            className="w-4.5 h-4.5 rounded-full bg-white text-black flex items-center justify-center shrink-0"
          >
            <Send className="w-2 h-2 fill-black text-black ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

