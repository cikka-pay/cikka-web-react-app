import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function RevenueInsightsBentoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  const ribbonY = useTransform(smoothProgress, [0, 1], [15, -15]);
  const ribbonRotate = useTransform(smoothProgress, [0, 1], [-2, 4]);

  return (
    <div ref={sectionRef} className="pt-12 space-y-16">
      {/* Centered Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto px-2"
      >
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-[2.85rem] font-bold tracking-tight text-black leading-tight">
          Gain weekly revenue insights for smarter business decisions
        </h2>
      </motion.div>

      {/* 2x2 Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7">
        {/* ROW 1 - CARD 1: Left Violet Gradient Card (Finance) */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="lg:col-span-5 rounded-[24px] xs:rounded-[30px] sm:rounded-[36px] p-5 xs:p-6 sm:p-9 bg-[linear-gradient(135deg,#5020c4_0%,#7535e6_32%,#9e6cf0_65%,#ede6ff_100%)] text-white flex flex-col justify-between min-h-[320px] xs:min-h-[350px] sm:min-h-[390px] shadow-lg relative overflow-hidden group"
        >
          {/* Geometric folded translucent ribbon shape on bottom right with parallax */}
          <motion.div
            style={{ y: ribbonY, rotate: ribbonRotate }}
            className="absolute -bottom-6 -right-6 w-36 xs:w-44 h-36 xs:h-44 pointer-events-none opacity-85 select-none transition-opacity group-hover:opacity-100"
          >
            <svg
              viewBox="0 0 160 160"
              fill="none"
              className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
            >
              <path
                d="M75,20 L135,20 L105,75 L45,75 Z"
                fill="white"
                fillOpacity="0.8"
              />
              <path
                d="M105,75 L165,75 L135,130 L75,130 Z"
                fill="white"
                fillOpacity="0.95"
              />
            </svg>
          </motion.div>

          <div>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-block bg-white text-slate-950 font-extrabold text-[10px] xs:text-[11px] tracking-widest px-3.5 xs:px-4 py-1 xs:py-1.5 rounded-full uppercase shadow-sm cursor-default"
            >
              FINANCE
            </motion.span>
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-extrabold tracking-tight mt-4 sm:mt-6 leading-tight max-w-[260px]">
              Keep track of your income and payment
            </h3>
          </div>

          {/* View more pill button */}
          <div className="mt-6 sm:mt-8 relative z-10">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 bg-black text-white pl-4 xs:pl-5 pr-1.5 py-1.5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:bg-neutral-900 transition-all group"
            >
              <span>View more</span>
              <span className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#5020c4] flex items-center justify-center text-xs sm:text-base font-extrabold transition-transform group-hover:rotate-45 shadow-sm">
                ↗
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* ROW 1 - CARD 2: Right Light Card (Daily Active Users Snapshot) */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="lg:col-span-7 rounded-[24px] xs:rounded-[30px] sm:rounded-[36px] p-5 xs:p-6 sm:p-9 bg-white border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[340px] xs:min-h-[360px] sm:min-h-[390px] group"
        >
          {/* Floating Notification Pill (Top Right Overlap) with spring entrance and floating hover */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.25,
            }}
            whileHover={{ y: -4, scale: 1.03 }}
            className="sm:absolute sm:top-5 sm:right-6 z-30 bg-[#111116] text-white py-2 xs:py-2.5 px-3 xs:px-4 rounded-xl xs:rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.25)] border border-white/10 flex items-center gap-2.5 xs:gap-3 select-none mb-3 sm:mb-0 w-max max-w-full cursor-pointer hover:border-white/30 transition-colors"
          >
            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                alt="Kevin"
                className="w-7 h-7 xs:w-8 xs:h-8 rounded-full object-cover border border-white/20"
              />
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-0.5 -right-0.5 w-3 xs:w-3.5 h-3 xs:h-3.5 bg-[#22c55e] rounded-full border-2 border-[#111116] flex items-center justify-center text-[7px] xs:text-[8px] font-bold text-black"
              >
                ✓
              </motion.div>
            </div>
            <div className="truncate">
              <p className="text-[9px] xs:text-[10px] font-medium text-slate-400">Payment Received</p>
              <p className="text-xs xs:text-sm font-bold text-white tracking-tight">
                $293.00 <span className="font-normal text-slate-400 text-[11px] xs:text-xs">from Kevin</span>
              </p>
            </div>
          </motion.div>

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
                <a
                  href="#download"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-950 hover:gap-2 transition-all"
                >
                  View more <span>↗</span>
                </a>
              </div>
            </div>

            {/* Right Column Dashboard Sub-Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="md:col-span-7 bg-[#fbfcfd] rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <span>📈</span>
                <span>Performance</span>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-100/70 p-1 rounded-xl text-xs font-semibold">
                <span className="bg-white text-slate-900 px-3 py-1 rounded-lg shadow-sm cursor-pointer">
                  New Users
                </span>
                <span className="text-slate-400 px-2.5 py-1 hover:text-slate-700 cursor-pointer transition-colors">
                  Old Users
                </span>
                <span className="text-slate-400 px-2.5 py-1 hover:text-slate-700 cursor-pointer transition-colors">
                  Daily Users
                </span>
              </div>

              {/* Top User Card */}
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-white rounded-xl p-3.5 border border-slate-100/80 shadow-sm flex items-center gap-4 cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                  alt="Zaire Carder"
                  className="w-14 h-14 rounded-full object-cover border border-slate-100 shadow-inner"
                />
                <div className="space-y-1">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Top Users
                    </p>
                    <p className="font-bold text-sm sm:text-base text-slate-950">
                      Zaire Carder
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Daily Transaction
                    </p>
                    <p className="font-extrabold text-sm sm:text-base text-slate-950">
                      $20,000.00
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* ROW 2 - CARD 3: Weekly Revenue Summary and Insights */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="lg:col-span-7 rounded-[24px] xs:rounded-[30px] sm:rounded-[36px] p-5 xs:p-6 sm:p-9 bg-white border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[320px] xs:min-h-[350px] group"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full">
            {/* Left Column Text */}
            <div className="md:col-span-5 flex flex-col justify-between h-full pt-1">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 leading-snug">
                  Weekly revenue summary and insights
                </h3>
                <div className="h-[1px] w-full bg-slate-100 my-4" />
              </div>

              <div className="mt-4 md:mt-12 space-y-3">
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[210px]">
                  Comprehensive weekly breakdowns to maximize profits
                </p>
                <a
                  href="#download"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-950 hover:gap-2 transition-all"
                >
                  View more <span>↗</span>
                </a>
              </div>
            </div>

            {/* Right Column Metric & Bar Chart */}
            <div className="md:col-span-7 space-y-3 xs:space-y-3.5">
              {/* Income & Expenses Metric Chips */}
              <div className="grid grid-cols-2 gap-2.5 xs:gap-3">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-[#fbfcfd] rounded-2xl p-2.5 xs:p-3.5 border border-slate-100/80 flex items-center gap-2 xs:gap-3 cursor-default"
                >
                  <motion.div
                    animate={{ y: [0, 2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-[#6366f1] text-white flex items-center justify-center text-xs xs:text-sm font-bold shadow-sm shrink-0"
                  >
                    ↓
                  </motion.div>
                  <div>
                    <p className="text-[9px] xs:text-[10px] uppercase font-semibold text-slate-400">
                      Income
                    </p>
                    <p className="text-sm xs:text-base sm:text-lg font-extrabold text-slate-950">
                      $48,000
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-[#fbfcfd] rounded-2xl p-2.5 xs:p-3.5 border border-slate-100/80 flex items-center gap-2 xs:gap-3 cursor-default"
                >
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-[#6366f1] text-white flex items-center justify-center text-xs xs:text-sm font-bold shadow-sm shrink-0"
                  >
                    ↑
                  </motion.div>
                  <div>
                    <p className="text-[9px] xs:text-[10px] uppercase font-semibold text-slate-400">
                      Expenses
                    </p>
                    <p className="text-sm xs:text-base sm:text-lg font-extrabold text-slate-950">
                      $2,356
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Metric Pill Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-3 xs:p-3.5 sm:p-4 border border-slate-100 shadow-md flex items-center justify-between cursor-default"
              >
                <div>
                  <p className="text-[10px] xs:text-[11px] text-slate-400 font-semibold">Weekly Revenue</p>
                  <p className="text-lg xs:text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                    $2,464 USD
                  </p>
                </div>
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="bg-[#10b981]/15 text-[#059669] font-bold text-[11px] xs:text-xs px-2.5 py-1 rounded-full flex items-center gap-1"
                >
                  +12%
                </motion.span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ROW 2 - CARD 4: Predictive Analytics for Smarter Investing */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="lg:col-span-5 rounded-[24px] xs:rounded-[30px] sm:rounded-[36px] p-5 xs:p-6 sm:p-9 bg-[#08080c] text-white border border-white/10 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[320px] xs:min-h-[350px] group"
        >
          {/* Ambient glowing purple nebula */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.2, 0.45, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-12 -right-12 w-64 h-64 bg-[#7c3aed]/25 rounded-full blur-3xl pointer-events-none"
          />

          <div>
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Predictive analytics for smarter investing
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-3 sm:mt-4 max-w-sm">
              Predictive analytics guides smarter investing with data insights
            </p>
          </div>

          {/* Visual Graph / Trend Indicator */}
          <div className="mt-5 sm:mt-6 pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
            <div className="space-y-1">
              <p className="text-[9px] xs:text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Projected Growth
              </p>
              <p className="text-lg xs:text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                +38.4%{" "}
                <motion.span
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-[10px] xs:text-xs font-bold text-[#22c55e] bg-[#22c55e]/15 px-2 py-0.5 rounded-full"
                >
                  AI High
                </motion.span>
              </p>
            </div>
            <motion.a
              href="#download"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 xs:gap-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white px-3.5 xs:px-4 py-1.5 xs:py-2 rounded-full text-[11px] xs:text-xs font-bold transition-all shadow-sm"
            >
              <span>Explore</span> <span>↗</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
