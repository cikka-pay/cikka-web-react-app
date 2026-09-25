import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { LiquidButton } from "@/components/ui/LiquidButton";

export function GeneralPaymentsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  const cardRotateX = useTransform(smoothProgress, [0, 0.5, 1], [3, 0, -3]);
  const cardRotateY = useTransform(smoothProgress, [0, 0.5, 1], [-2, 0, 2]);

  const monthlyData = [
    { month: "Jan", segments: 6, color: "gray", value: "$14,200" },
    { month: "Feb", segments: 12, color: "black", value: "$28,400" },
    { month: "Mar", segments: 14, color: "gray", value: "$32,100" },
    { month: "Apr", segments: 7, color: "black", value: "$16,800" },
    { month: "May", segments: 13, color: "gray", value: "$29,500" },
    { month: "Jun", segments: 17, color: "purple", value: "$41,200" },
    { month: "Jul", segments: 5, color: "gray", value: "$11,900" },
    { month: "Aug", segments: 9, color: "black", value: "$21,400" },
    { month: "Sep", segments: 13, color: "gray", value: "$30,800" },
    { month: "Oct", segments: 19, color: "black", value: "$46,300" },
    { month: "Nov", segments: 14, color: "gray", value: "$33,700" },
    { month: "Dec", segments: 17, color: "purple", value: "$47,928" },
  ];

  return (
    <div
      ref={sectionRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center pt-8"
    >
      {/* Left Column Text & Highlights */}
      <motion.div
        initial={{ opacity: 0, x: -35 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-6 space-y-7"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-[3.2rem] font-bold tracking-tight text-slate-900 leading-[1.12]"
        >
          Manage general payments <br className="hidden sm:inline" />
          with clear visual insights
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-lg"
        >
          Manage payments with clear insights, track spending easily, and make
          smarter financial decisions with simple, organized views
        </motion.p>

        {/* CTA Pill Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-1"
        >
          <LiquidButton
            href="#download"
            text="Get started now"
            className="pl-7 pr-2 py-2"
            badgeBg="bg-[#e2e8f0] text-[#4f46e5]"
          />
        </motion.div>

        {/* Feature 1: Effortless expense reporting and compliance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ x: 4 }}
          className="flex items-start gap-4 pt-2 group cursor-default transition-transform"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 6 }}
            className="w-12 h-12 rounded-2xl bg-[#eff0fe] text-[#4f46e5] flex items-center justify-center flex-shrink-0 shadow-sm"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 4V2H9v2" />
              <path d="M19 8c0-.6-.4-1-1-1H6c-.6 0-1 .4-1 1l-1.5 10c-.3 1.7.9 3.2 2.6 3.5.3 0 .6.5.9.5h10c1.7 0 3-1.3 3.3-3L20 8Z" />
              <path d="M12 11v5" />
              <path d="M10 12.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 0 3h-1a1.5 1.5 0 0 0 0 3h1.5a1.5 1.5 0 0 0 1.5-1.5" />
            </svg>
          </motion.div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#4f46e5] transition-colors">
              Effortless expense reporting and compliance
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md">
              Effortless expense reporting with compliance insights tracks
              spending, reduces errors, and keeps you audit ready
            </p>
          </div>
        </motion.div>

        {/* Dashed Separator */}
        <div className="border-t border-dashed border-slate-300 my-2" />

        {/* Feature 2: Set budget limits and receive alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ x: 4 }}
          className="flex items-start gap-4 group cursor-default transition-transform"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: -6 }}
            className="w-12 h-12 rounded-2xl bg-[#eff0fe] text-[#4f46e5] flex items-center justify-center flex-shrink-0 shadow-sm"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="14" width="3.5" height="7" rx="1" />
              <rect x="10.25" y="9" width="3.5" height="12" rx="1" />
              <rect x="16.5" y="4" width="3.5" height="17" rx="1" />
            </svg>
          </motion.div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#4f46e5] transition-colors">
              Set budget limits and receive alerts
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md">
              Set budget limits and get instant alerts to stay on track, control
              spending, and avoid overspending with ease
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Column: Violet-Framed General Payment Card */}
      <motion.div
        style={{
          rotateX: cardRotateX,
          rotateY: cardRotateY,
          transformPerspective: 1000,
        }}
        initial={{ opacity: 0, y: 45, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-6 p-3 sm:p-4 rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-[#5c24e5] via-[#7839ee] to-[#d8caff] shadow-[0_25px_60px_rgba(92,36,229,0.22)] will-change-transform group"
      >
        <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-7 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              General Payment
            </h3>
            <button className="text-slate-800 hover:text-slate-600 text-xl font-bold px-1 tracking-widest leading-none">
              ⋮
            </button>
          </div>

          {/* Big Balance Amount */}
          <div className="mt-4">
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight"
            >
              $47,928.00
            </motion.p>
            <div className="flex items-center gap-5 text-xs font-semibold text-slate-600 mt-2.5">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5] animate-pulse" />{" "}
                Payment Done
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#27272a]" /> Payment
                To Review
              </span>
            </div>
          </div>

          {/* Two Subscription Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6">
            {/* Finova Solutions Card */}
            <motion.div
              whileHover={{ y: -3 }}
              className="border border-slate-200/90 rounded-2xl p-3.5 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M7 6c2 3 2 9 0 12 2-3 8-3 11 0-2-3-2-9 0-12-3 3-9 3-11 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Finova Solutions
                    </p>
                    <p className="text-[11px] text-slate-400">Lorem Ipsum</p>
                  </div>
                </div>
                {/* Toggle Pill */}
                <div className="bg-[#eff1fe] rounded-full p-1 flex flex-col items-center gap-1 w-6">
                  <span className="text-[9px] text-slate-400 font-bold leading-none">
                    ✕
                  </span>
                  <span className="w-4 h-4 rounded-full bg-[#4f46e5] text-white flex items-center justify-center text-[9px] font-bold shadow-sm">
                    ✓
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-1">
                <span className="text-base font-extrabold text-slate-950">$36</span>
                <span className="text-xs text-slate-400 font-medium"> /Month</span>
              </div>
            </motion.div>

            {/* Sync Systems Card */}
            <motion.div
              whileHover={{ y: -3 }}
              className="border border-slate-200/90 rounded-2xl p-3.5 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <circle cx="12" cy="12" r="7" strokeDasharray="14 10" />
                      <line x1="8" y1="16" x2="16" y2="8" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Sync Systems
                    </p>
                    <p className="text-[11px] text-slate-400">Lorem Ipsum</p>
                  </div>
                </div>
                {/* Toggle Pill */}
                <div className="bg-[#f4f4f5] rounded-full p-1 flex flex-col items-center gap-1 w-6">
                  <span className="text-[9px] text-slate-400 font-bold leading-none">
                    ✕
                  </span>
                  <span className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center text-[9px] font-bold shadow-sm">
                    ✓
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-1">
                <span className="text-base font-extrabold text-slate-950">$46</span>
                <span className="text-xs text-slate-400 font-medium"> /Month</span>
              </div>
            </motion.div>
          </div>

          {/* 12-Month Stacked Segmented Bar Chart */}
          <div className="mt-8 pt-4 relative">
            {/* Hover Tooltip display */}
            {hoveredMonth && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-0 right-0 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-md z-20"
              >
                {hoveredMonth}:{" "}
                {monthlyData.find((m) => m.month === hoveredMonth)?.value}
              </motion.div>
            )}

            {/* Horizontal Dashed Guidelines */}
            <div className="absolute inset-x-0 top-4 bottom-8 flex flex-col justify-between pointer-events-none">
              <div className="border-b border-dashed border-slate-200/80 w-full" />
              <div className="border-b border-dashed border-slate-200/80 w-full" />
              <div className="border-b border-dashed border-slate-200/80 w-full" />
            </div>

            {/* Bar Columns Container with Staggered Cascading Animation */}
            <div className="relative z-10 h-44 sm:h-48 flex items-end justify-between gap-1.5 sm:gap-2">
              {monthlyData.map((item, idx) => (
                <div
                  key={item.month}
                  onMouseEnter={() => setHoveredMonth(item.month)}
                  onMouseLeave={() => setHoveredMonth(null)}
                  className="flex-1 flex flex-col items-center justify-end h-full cursor-pointer group/col py-1"
                >
                  {/* Stacked striped pill segments */}
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + idx * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ originY: 1 }}
                    className="flex flex-col-reverse gap-[2px] sm:gap-[2.5px] w-full max-w-[20px] items-center group-hover/col:scale-y-105 transition-transform"
                  >
                    {Array.from({ length: item.segments }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-full h-[4.5px] sm:h-[5.5px] rounded-full transition-colors ${
                          item.color === "purple"
                            ? "bg-[#4f46e5] group-hover/col:bg-[#6366f1]"
                            : item.color === "black"
                            ? "bg-[#09090b] group-hover/col:bg-slate-700"
                            : "bg-[#e2e8f0] group-hover/col:bg-slate-300"
                        }`}
                      />
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Month Labels */}
            <div className="flex justify-between gap-1.5 sm:gap-2 mt-2.5 pt-1">
              {monthlyData.map((item) => (
                <span
                  key={item.month}
                  className={`flex-1 text-center text-[10px] sm:text-[11px] font-medium transition-colors ${
                    hoveredMonth === item.month
                      ? "text-[#4f46e5] font-bold"
                      : "text-slate-500"
                  }`}
                >
                  {item.month}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
