import React, { useRef } from "react";
import { motion } from "framer-motion";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { EcommerceRewardsFilmCard } from "@/components/EcommerceRewardsFilmCard";

export function GeneralPaymentsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
          Rewards that redeem <br className="hidden sm:inline" />
          for real things, not filler
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-lg"
        >
          Discover brands, earn as you shop, and redeem for real products at
          zero cost — no discount gimmicks
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

        {/* Feature 1: Top brands you actually use */}
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
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
          </motion.div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#4f46e5] transition-colors">
              Pay credit card bills & shop 1000+ products
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md">
              Pay your credit card bills, shop across 1000+ products, and earn real
              rewards — redeemable for actual products and coupons, no discount gimmicks
            </p>
          </div>
        </motion.div>

        {/* Feature 2: Physical & digital perks */}
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
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </motion.div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#4f46e5] transition-colors">
              Tangible perks & zero filler
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md">
              Turn your everyday spending directly into headphones, subscriptions,
              and authentic perks that add true value.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Column: 3D Shoe E-Commerce Film Component from WebsiteCrafts.html */}
      <motion.div
        initial={{ opacity: 0, y: 45, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-6 flex justify-center w-full"
      >
        <EcommerceRewardsFilmCard />
      </motion.div>
    </div>
  );
}
