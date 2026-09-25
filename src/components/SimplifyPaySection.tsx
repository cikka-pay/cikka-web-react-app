import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { LiquidButton } from "@/components/ui/LiquidButton";

export function SimplifyPaySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // Parallax and 3D tilts for the visual showcase
  const cardRotateY = useTransform(smoothProgress, [0, 0.5, 1], [-3, 0, 3]);
  const cardRotateX = useTransform(smoothProgress, [0, 0.5, 1], [3, 0, -3]);
  const phoneParallaxY = useTransform(smoothProgress, [0, 1], [25, -25]);
  const cushionsParallaxY = useTransform(smoothProgress, [0, 1], [-15, 15]);

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
        className="lg:col-span-6 relative rounded-[32px] sm:rounded-[38px] bg-[#111116] p-6 sm:p-8 flex items-center justify-center min-h-[580px] sm:min-h-[660px] overflow-hidden shadow-2xl border border-slate-800 will-change-transform group"
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
          className="absolute bottom-4 left-4 right-4 z-30 p-3.5 sm:p-4 rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/20 shadow-2xl flex items-center justify-between text-white hover:bg-black/50 transition-colors"
        >
          <div className="space-y-1">
            <div className="flex items-center -space-x-2">
              <motion.img
                whileHover={{ scale: 1.15, zIndex: 10 }}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white/80 object-cover shadow-sm transition-transform cursor-pointer"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="avatar1"
              />
              <motion.img
                whileHover={{ scale: 1.15, zIndex: 10 }}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white/80 object-cover shadow-sm transition-transform cursor-pointer"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="avatar2"
              />
              <motion.img
                whileHover={{ scale: 1.15, zIndex: 10 }}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white/80 object-cover shadow-sm transition-transform cursor-pointer"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                alt="avatar3"
              />
            </div>
            <p className="font-semibold text-xs sm:text-sm text-white drop-shadow-sm leading-snug">
              Welcome to our finance
              <br />
              banking services
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 12 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open service details"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-base shadow-md shrink-0 transition-colors"
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
        className="lg:col-span-6 space-y-8"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-black leading-[1.08]"
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
              <span>20</span>
              <motion.span
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#6366f1] inline-block ml-0.5"
              >
                m
              </motion.span>
            </p>
            <p className="text-sm font-bold text-slate-900 group-hover:text-[#6366f1] transition-colors">
              Active users
            </p>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Active users engaging regularly on platform
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="space-y-1.5 sm:border-l sm:border-slate-200 sm:pl-8 cursor-default group"
          >
            <p className="text-4xl sm:text-5xl font-bold text-black tracking-tight flex items-baseline">
              <span>100</span>
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="text-[#6366f1] inline-block ml-0.5"
              >
                +
              </motion.span>
            </p>
            <p className="text-sm font-bold text-slate-900 group-hover:text-[#6366f1] transition-colors">
              Team member
            </p>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Skilled team driving success together
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

// Expenses iPhone Screen Mockup with animated progress and hover physics
export function ExpensesPhoneMockup() {
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
          <span className="w-6 h-6 rounded-full bg-slate-200/70 flex items-center justify-center text-xs text-slate-800 cursor-pointer hover:bg-slate-300 transition-colors">
            ‹
          </span>
          <div className="flex items-center gap-1 font-bold text-xs sm:text-sm text-slate-900">
            Expenses <span className="text-[9px] text-slate-500">▾</span>
          </div>
          <span className="w-6 h-6 rounded-full bg-slate-200/70 flex items-center justify-center text-xs text-slate-800 cursor-pointer hover:bg-slate-300 transition-colors">
            +
          </span>
        </div>

        {/* Month Selector */}
        <div className="text-center text-[11px] font-semibold text-slate-400 mt-0.5 flex items-center justify-center gap-1">
          September 2020 <span className="text-[8px]">▾</span>
        </div>

        {/* Big Amount */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center font-extrabold text-3xl sm:text-4xl text-slate-950 tracking-tight my-1.5"
        >
          $1,812
        </motion.div>

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

          {/* Segmented Bar with animated entry */}
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-0.5">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "28%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="h-full bg-[#f97316] rounded-full"
            />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "18%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="h-full bg-[#06b6d4] rounded-full"
            />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "32%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="h-full bg-[#8b5cf6] rounded-full"
            />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "22%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="h-full bg-slate-200 rounded-full"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2 mt-1.5">
          {/* Category 1 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl p-2.5 shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 text-xs">
                  🚙
                </div>
                <p className="font-bold text-[11px] text-slate-900">
                  Auto &amp; transport
                </p>
              </div>
              <p className="font-bold text-[11px] text-slate-900">$700</p>
            </div>

            <div className="space-y-1 pt-1 border-t border-slate-50">
              <div className="flex justify-between text-[9px]">
                <span className="text-slate-500 font-medium">Auto &amp; transport</span>
                <span className="font-bold text-slate-800">
                  $350 <span className="text-[8px] text-slate-400 font-normal">Left $186</span>
                </span>
              </div>
              <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "66%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
                  className="h-full bg-[#7c3aed] rounded-full"
                />
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[9px]">
                <span className="text-slate-500 font-medium">Auto insurance</span>
                <span className="font-bold text-slate-800">
                  $250 <span className="text-[8px] text-slate-400 font-normal">Left $120</span>
                </span>
              </div>
              <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "50%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
                  className="h-full bg-[#7c3aed] rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Category 2 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="bg-white rounded-2xl p-2.5 shadow-sm border border-slate-100 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 text-xs">
                🧾
              </div>
              <p className="font-bold text-[11px] text-slate-900">
                Bill &amp; Utilities
              </p>
            </div>
            <p className="font-bold text-[11px] text-slate-900">$320</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
