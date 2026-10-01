import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { PhoneScreen4Cards } from "./PhoneScreen4Cards";

export function SimplifyPaySection() {
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

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    mass: 0.16,
  });
  const smoothProgress = isMobile ? scrollYProgress : springProgress;

  // Parallax and 3D tilts for the visual showcase (disabled on mobile for 120fps hardware lock)
  const cardRotateY = useTransform(smoothProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [-3, 0, 3]);
  const cardRotateX = useTransform(smoothProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [3, 0, -3]);
  const phoneParallaxY = useTransform(smoothProgress, [0, 1], isMobile ? [0, 0] : [25, -25]);
  const cushionsParallaxY = useTransform(smoothProgress, [0, 1], isMobile ? [0, 0] : [-15, 15]);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center"
    >
      {/* Left Visual: 3D Cushion Box with iPhone & Glass Banner */}
      <motion.div
        style={{
          rotateY: cardRotateY,
          rotateX: cardRotateX,
          transformPerspective: 1000,
        }}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-6 relative rounded-[28px] xs:rounded-[32px] sm:rounded-[38px] bg-[#111116] p-4 xs:p-6 sm:p-8 flex items-center justify-center min-h-[520px] xs:min-h-[580px] sm:min-h-[660px] overflow-hidden shadow-2xl border border-slate-800 will-change-transform group"
      >
        {/* 3D Inflated Cushions / Pillows with subtle parallax drift */}
        <motion.div style={{ y: cushionsParallaxY }} className="absolute inset-0">
          <SoftCushionsBackground />
        </motion.div>

        {/* Expenses iPhone Screen Mockup with layered inner parallax */}
        <motion.div
          style={{ y: phoneParallaxY }}
          className="relative z-10 will-change-transform"
        >
          <ExpensesPhoneMockup />
        </motion.div>

        {/* Bottom Frosted Glass Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4 right-3 xs:right-4 z-30 p-3 xs:p-3.5 sm:p-4 rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/20 shadow-2xl flex items-center justify-between text-white hover:bg-black/50 transition-colors"
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
            className="w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-base shadow-md shrink-0 transition-colors"
          >
            ↗
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Right Column Content */}
      <motion.div
        initial={{ opacity: 0, x: 35 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-6 space-y-6 sm:space-y-8"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl xs:text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-black leading-[1.08]"
        >
          We simplify the way you pay our platform offers
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl"
        >
          We simplify the way you pay our platform offers secure transactions,
          tools, and a seamless experience for easy everyday payments
        </motion.p>

        {/* Luxury Pill CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
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
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
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

// 3D Inflated Pillowy Cushions Background
export function SoftCushionsBackground() {
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

