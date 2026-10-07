import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { PhoneScreen4Cards } from "./PhoneScreen4Cards";

export function SimplifyPaySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouchOrTablet, setIsTouchOrTablet] = React.useState(false);

  React.useEffect(() => {
    const checkDevice = () => {
      const isTouch =
        "ontouchstart" in window ||
        (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0) ||
        window.innerWidth < 1024;
      setIsTouchOrTablet(isTouch);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice, { passive: true });
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Direct sync with scroll progress — zero spring lag or stutter
  const smoothProgress = scrollYProgress;

  // Gentle subtle parallax on large desktop only; static 120fps locked rendering on tablet/mobile
  const cardRotateY = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    isTouchOrTablet ? [0, 0, 0] : [-2, 0, 2],
  );
  const cardRotateX = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    isTouchOrTablet ? [0, 0, 0] : [2, 0, -2],
  );
  const phoneParallaxY = useTransform(smoothProgress, [0, 1], isTouchOrTablet ? [0, 0] : [15, -15]);
  const cushionsParallaxY = useTransform(
    smoothProgress,
    [0, 1],
    isTouchOrTablet ? [0, 0] : [-10, 10],
  );

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center transform-gpu"
    >
      {/* Left Visual: 3D Cushion Box with iPhone & Glass Banner */}
      <motion.div
        style={{
          rotateY: cardRotateY,
          rotateX: cardRotateX,
          transformPerspective: isTouchOrTablet ? undefined : 1000,
        }}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-6 relative rounded-[28px] xs:rounded-[32px] sm:rounded-[38px] bg-[#111116] p-4 xs:p-6 sm:p-8 flex items-center justify-center min-h-[520px] xs:min-h-[580px] sm:min-h-[660px] overflow-hidden shadow-2xl border border-slate-800 transform-gpu will-change-transform group"
      >
        {/* 3D Inflated Cushions / Pillows with subtle parallax drift */}
        <motion.div style={{ y: cushionsParallaxY }} className="absolute inset-0 transform-gpu">
          <SoftCushionsBackground />
        </motion.div>

        {/* Expenses iPhone Screen Mockup with layered inner parallax */}
        <motion.div
          style={{ y: phoneParallaxY }}
          className="relative z-10 transform-gpu will-change-transform"
        >
          <ExpensesPhoneMockup />
        </motion.div>

        {/* Bottom Frosted Glass Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4 right-3 xs:right-4 z-30 p-3 xs:p-3.5 sm:p-4 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-between text-white hover:bg-black/60 transition-colors transform-gpu"
        >
          <div>
            <p className="font-semibold text-[11px] xs:text-xs sm:text-sm text-white drop-shadow-sm leading-snug">
              Welcome to our finance
              <br />
              banking services
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 12 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open service details"
            className="w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-base shadow-md shrink-0 transition-colors cursor-pointer"
          >
            ↗
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Right Column Content */}
      <motion.div
        initial={{ opacity: 0, x: 25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-6 space-y-6 sm:space-y-8"
      >
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl xs:text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-black leading-[1.08]"
        >
          We simplify the way you pay our platform offers
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl"
        >
          We simplify the way you pay our platform offers secure transactions, tools, and a seamless
          experience for easy everyday payments
        </motion.p>

        {/* Luxury Pill CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <LiquidButton
            href="#download"
            text="Get started now"
            className="pl-8 pr-2.5 py-2.5"
            badgeBg="bg-[#e2e8f0] text-[#7c3aed]"
          />
        </motion.div>

        {/* 2-Column Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-slate-200"
        >
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="space-y-1.5 cursor-default group"
          >
            <p className="text-4xl sm:text-5xl font-bold text-black tracking-tight flex items-baseline">
              <span>767</span>
              <motion.span
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#6366f1] inline-block ml-1 text-3xl sm:text-4xl"
              >
                ms
              </motion.span>
            </p>
            <p className="text-sm font-bold text-slate-900 group-hover:text-[#6366f1] transition-colors">
              Bill fetch time
            </p>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              AVG bill fetch time we are taking to fetch bills.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="space-y-1.5 sm:border-l sm:border-slate-200 sm:pl-8 cursor-default group"
          >
            <p className="text-4xl sm:text-5xl font-bold text-black tracking-tight flex items-baseline">
              <span>700</span>
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="text-[#6366f1] inline-block ml-0.5"
              >
                +
              </motion.span>
            </p>
            <p className="text-sm font-bold text-slate-900 group-hover:text-[#6366f1] transition-colors">
              Brands
            </p>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Points that you can redeem for more than 700 brands
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// 3D Inflated Pillowy Cushions Background — hardware accelerated without software box-shadow repaints
export function SoftCushionsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[32px] sm:rounded-[38px] bg-[#121216] pointer-events-none select-none transform-gpu">
      {/* 3D Inflated Cushion 1 (Top Left) */}
      <div className="absolute -top-14 -left-14 w-72 h-72 rounded-[48%] bg-[radial-gradient(circle_at_35%_25%,#3a3a44_0%,#1e1e24_45%,#0d0d10_80%)] opacity-95 rotate-12 transform-gpu" />

      {/* 3D Inflated Cushion 2 (Top Right) */}
      <div className="absolute top-4 -right-16 w-80 h-80 rounded-[46%] bg-[radial-gradient(circle_at_40%_25%,#35353e_0%,#1a1a20_50%,#0a0a0d_85%)] opacity-95 -rotate-12 transform-gpu" />

      {/* 3D Inflated Cushion 3 (Bottom Left) */}
      <div className="absolute -bottom-16 -left-8 w-88 h-88 rounded-[44%] bg-[radial-gradient(circle_at_30%_30%,#383842_0%,#1c1c22_48%,#08080a_85%)] opacity-95 rotate-45 transform-gpu" />

      {/* 3D Inflated Cushion 4 (Bottom Right) */}
      <div className="absolute -bottom-12 -right-10 w-76 h-76 rounded-[50%] bg-[radial-gradient(circle_at_35%_25%,#3c3c46_0%,#1f1f26_45%,#0c0c0f_80%)] opacity-95 -rotate-20 transform-gpu" />

      {/* Center Deep Vignette Behind Mockup */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />
    </div>
  );
}

// Cards iPhone Screen Mockup with auto-loop carousel and live Smart Alerts
export function ExpensesPhoneMockup() {
  return (
    <div className="relative z-10 w-[260px] xs:w-[285px] sm:w-[315px] h-[520px] xs:h-[570px] sm:h-[620px] rounded-[38px] xs:rounded-[44px] sm:rounded-[48px] p-1 xs:p-1.5 sm:p-2 bg-[#000000] border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.9),_0_0_40px_rgba(0,0,0,0.6)] flex flex-col mb-14 xs:mb-12 select-none overflow-hidden">
      {/* Screen container */}
      <div className="relative w-full h-full rounded-[32px] xs:rounded-[38px] sm:rounded-[42px] overflow-hidden flex flex-col shadow-inner">
        {/* Dynamic Island Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 w-20 h-5 bg-black rounded-full pointer-events-none flex items-center justify-end pr-2">
          <div className="w-2 h-2 rounded-full bg-[#15151b] border border-[#262630]/60" />
        </div>
        <PhoneScreen4Cards />
      </div>
    </div>
  );
}
