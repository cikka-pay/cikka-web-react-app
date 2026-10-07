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
import { PhoneScreen1Canvas } from "./PhoneScreen1Canvas";
import { PhoneScreen2Portfolio } from "./PhoneScreen2Portfolio";
import { PhoneScreen3Features } from "./PhoneScreen3Features";

export function GetTheAppSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Direct sync with Lenis smooth scroll — zero spring lag
  const smoothProgress = scrollYProgress;

  // Parallax shifts for the 3 phones
  const leftPhoneY = useTransform(smoothProgress, [0, 1], isMobile ? [12, -8] : [40, -25]);
  const leftPhoneRotate = useTransform(smoothProgress, [0, 0.5, 1], isMobile ? [-15, -14, -13] : [-15, -13, -11]);
  const leftPhoneX = useTransform(smoothProgress, [0, 0.5, 1], isMobile ? [-8, 0, 4] : [-20, 0, 10]);

  const centerPhoneY = useTransform(smoothProgress, [0, 1], isMobile ? [8, -8] : [25, -25]);
  const centerPhoneScale = useTransform(smoothProgress, [0, 0.5, 1], [0.97, 1.0, 0.98]);

  const rightPhoneY = useTransform(smoothProgress, [0, 1], isMobile ? [12, -8] : [40, -25]);
  const rightPhoneRotate = useTransform(smoothProgress, [0, 0.5, 1], isMobile ? [15, 14, 13] : [15, 13, 11]);
  const rightPhoneX = useTransform(smoothProgress, [0, 0.5, 1], isMobile ? [8, 0, -4] : [20, 0, -10]);

  const glowScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1.15, 0.95]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.35, 0.65, 0.4]);

  return (
    <section
      id="get-app-section"
      ref={containerRef}
      className="relative w-full bg-[#f4f5f8] text-slate-900 pt-10 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-14 px-3 sm:px-6 overflow-hidden flex flex-col items-center justify-center select-none"
    >
      {/* Balanced Soft Purple Ambient Radial Glow on White */}
      <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] md:w-[1150px] h-[340px] sm:h-[420px] bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.10)_0%,rgba(147,51,234,0.04)_38%,transparent_75%)] blur-[95px] z-0" />
      <div className="pointer-events-none absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 w-[380px] sm:w-[540px] h-[180px] bg-[radial-gradient(ellipse_at_center,rgba(192,132,252,0.08)_0%,transparent_65%)] blur-[70px] z-0" />

      {/* ------------------------------------------------------------- */}
      {/* 3-PHONE TRIPTYCH SHOWCASE (Solid, Opaque & Widely Spread with Black Shadow Fade) */}
      {/* ------------------------------------------------------------- */}
      <div
        className="relative w-full max-w-4xl h-[310px] xs:h-[360px] sm:h-[460px] md:h-[510px] mt-2 sm:mt-4 mb-4 sm:mb-6 flex items-center justify-center pointer-events-none"
      >
        {/* LEFT PHONE: Quick Actions Dashboard */}
        <motion.div
          style={{
            y: leftPhoneY,
            x: leftPhoneX,
            rotateZ: leftPhoneRotate,
          }}
          className="absolute left-1/2 -translate-x-[calc(50%+78px)] xs:-translate-x-[calc(50%+98px)] sm:-translate-x-[calc(50%+122px)] md:-translate-x-[calc(50%+145px)] z-10 w-[114px] xs:w-[148px] sm:w-[195px] md:w-[220px] h-[238px] xs:h-[308px] sm:h-[395px] md:h-[440px] pointer-events-auto origin-bottom will-change-transform"
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
          className="absolute left-1/2 translate-x-[calc(-50%+78px)] xs:translate-x-[calc(-50%+98px)] sm:translate-x-[calc(-50%+122px)] md:translate-x-[calc(-50%+145px)] z-10 w-[114px] xs:w-[148px] sm:w-[195px] md:w-[220px] h-[238px] xs:h-[308px] sm:h-[395px] md:h-[440px] pointer-events-auto origin-bottom will-change-transform"
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
          className="relative z-20 w-[126px] xs:w-[162px] sm:w-[210px] md:w-[238px] h-[260px] xs:h-[332px] sm:h-[425px] md:h-[475px] pointer-events-auto shadow-[0_25px_60px_rgba(0,0,0,0.85)] rounded-[26px] xs:rounded-[34px] sm:rounded-[42px] will-change-transform"
        >
          <PhoneFrame isCenter>
            <CenterPhoneHeroScreen />
          </PhoneFrame>
        </motion.div>

        {/* Soft, Natural Diffused Shadow Grounding the Base (Zero Sharp Edges) */}
        <div className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] h-24 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.15)_45%,transparent_75%)] blur-2xl z-10" />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM HEADLINE, SUBTITLE & CTA BUTTON */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 text-center flex flex-col items-center max-w-2xl px-4 pointer-events-auto"
      >
        <h2 className="font-sans font-bold tracking-tight text-3xl xs:text-4xl sm:text-6xl md:text-[4.4rem] text-slate-950 leading-none">
          Get the App.
        </h2>

        <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed max-w-md text-center">
          Fast, secure, and borderless payments—
          <br className="hidden sm:inline" />
          powered by Cikka.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="mt-6 sm:mt-8 mb-2 sm:mb-4"
        >
          <a
            href="#download"
            style={{ color: "#ffffff", backgroundColor: "#000000" }}
            className="inline-flex items-center justify-center bg-black hover:bg-neutral-800 text-white !text-white font-semibold text-xs sm:text-sm px-8 sm:px-10 py-3 rounded-full transition-all shadow-[0_6px_20px_rgba(0,0,0,0.22)] active:scale-95 cursor-pointer"
          >
            <span style={{ color: "#ffffff" }} className="text-white !text-white font-semibold">
              Get the app
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// SCALED SCREEN WRAPPER (Proportionally scales full standard layout)
// ---------------------------------------------------------------------------
function ScaledScreen({
  children,
  baseWidth = 300,
  baseHeight = 640,
}: {
  children: React.ReactNode;
  baseWidth?: number;
  baseHeight?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(0.5);

  React.useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        if (width > 0 && height > 0) {
          const sX = width / baseWidth;
          const sY = height / baseHeight;
          setScale(Math.min(sX, sY));
        }
      }
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", updateScale);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, [baseWidth, baseHeight]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden flex items-start justify-center select-none"
    >
      <div
        style={{
          width: `${baseWidth}px`,
          height: `${baseHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          flexShrink: 0,
        }}
        className="relative overflow-hidden flex flex-col justify-between"
      >
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TITANIUM PHONE FRAME WRAPPER (Slim Obsidian Black)
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
      className={`relative w-full h-full rounded-[30px] sm:rounded-[36px] md:rounded-[40px] p-1 sm:p-1.5 bg-[#000000] border border-white/[0.08] ${isCenter
          ? "shadow-[0_0_0_1px_rgba(255,255,255,0.12),_0_20px_60px_rgba(0,0,0,0.95)]"
          : "shadow-[0_15px_40px_rgba(0,0,0,0.85)] opacity-95 hover:opacity-100 transition-opacity"
        }`}
    >
      {/* Inner Phone Screen Container (Borderless Screen) */}
      <div className="relative w-full h-full rounded-[25px] sm:rounded-[31px] md:rounded-[35px] border border-white/[0.06] overflow-hidden shadow-inner">
        {/* Screen Content Body - fills 100% full height */}
        <div className="absolute inset-0 w-full h-full overflow-hidden flex flex-col">
          {children}
        </div>

        {/* Dynamic Island & Status Bar - floating seamlessly on top */}
        <div className="absolute top-0 inset-x-0 z-40 w-full flex items-center justify-between text-white text-[8px] sm:text-[9px] font-medium tracking-tight px-3 pt-2 pb-0.5 pointer-events-none select-none">
          <span className="font-semibold text-white/95 text-[8px] sm:text-[9px]">9:41</span>
          <div className="w-13 sm:w-16 h-3 sm:h-3.5 bg-black/95 rounded-full flex items-center justify-between px-1.5 shadow-md border border-white/10">
            <div className="w-1 h-1 rounded-full bg-[#151520] border border-white/10" />
            <div className="w-1 h-1 rounded-full bg-[#0d0d1a] border border-white/10" />
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
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 1. CENTER SCREEN: 3D Cikka Logo + India's Most Rewarding Platform
// ---------------------------------------------------------------------------
function CenterPhoneHeroScreen() {
  return (
    <ScaledScreen baseWidth={300} baseHeight={640}>
      <div className="relative w-full h-full flex flex-col justify-between select-none overflow-hidden bg-[#050508]">
        {/* 3D Cikka Logo Canvas */}
        <PhoneScreen1Canvas />

        {/* Safe area clearance */}
        <div className="w-full h-7 shrink-0 pointer-events-none" />

        {/* Bottom Tagline Overlay (India's Most Rewarding Platform) */}
        <div className="relative z-10 px-4 pb-6 flex flex-col items-start mt-auto pointer-events-none">
          <h2 className="text-[17px] font-extrabold font-['Poppins','Inter',sans-serif] leading-[1.15] tracking-[-0.03em] bg-gradient-to-br from-white via-[#e9d5ff] to-[#c084fc] bg-clip-text text-transparent m-0 select-none">
            <span className="block whitespace-nowrap">India's Most</span>
            <span className="block whitespace-nowrap">Rewarding Platform</span>
          </h2>
        </div>
      </div>
    </ScaledScreen>
  );
}

// ---------------------------------------------------------------------------
// 2. LEFT SCREEN: Financial Portfolio Showcase (Scaled Full UI)
// ---------------------------------------------------------------------------
function LeftPhoneDashboardScreen() {
  return (
    <ScaledScreen baseWidth={300} baseHeight={640}>
      <PhoneScreen2Portfolio />
    </ScaledScreen>
  );
}

// ---------------------------------------------------------------------------
// 3. RIGHT SCREEN: Smart Features Showcase (Scaled Full UI)
// ---------------------------------------------------------------------------
function RightPhoneTransferScreen() {
  return (
    <ScaledScreen baseWidth={300} baseHeight={640}>
      <PhoneScreen3Features />
    </ScaledScreen>
  );
}



