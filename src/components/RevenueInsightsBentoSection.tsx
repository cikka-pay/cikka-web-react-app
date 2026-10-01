import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Package,
  Truck,
  RotateCcw,
  Wallet,
  Percent,
  Landmark,
} from "lucide-react";

type Timeframe = "today" | "7days" | "30days";

export function RevenueInsightsBentoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [ordersTimeframe, setOrdersTimeframe] = useState<Timeframe>("today");
  const [revenueTimeframe, setRevenueTimeframe] = useState<Timeframe>("today");
  const [productsTimeframe, setProductsTimeframe] = useState<Timeframe>("today");
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Direct sync with Lenis smooth scroll — zero spring lag or stutter
  const smoothProgress = scrollYProgress;

  const ribbonY = useTransform(smoothProgress, [0, 1], isMobile ? [0, 0] : [12, -12]);
  const ribbonRotate = useTransform(smoothProgress, [0, 1], isMobile ? [0, 0] : [-2, 3]);

  // ---------------------------------------------------------------------------
  // LOGICAL DATASETS BASED ON TIMEFRAME
  // ---------------------------------------------------------------------------
  const ordersData = {
    today: {
      stats: [
        { label: "Total Orders", value: "327", growth: "↑ 12%", positive: true, icon: ShoppingCart, bg: "bg-[#f3e8ff]", color: "text-[#7c3aed]" },
        { label: "Shipped", value: "298", growth: "↑ 8%", positive: true, icon: Package, bg: "bg-[#e0e7ff]", color: "text-[#4f46e5]" },
        { label: "In Transit", value: "18", growth: "↑ 20%", positive: true, icon: Truck, bg: "bg-[#eff6ff]", color: "text-[#2563eb]" },
        { label: "Returns", value: "11", growth: "↑ 5%", positive: false, icon: RotateCcw, bg: "bg-[#fee2e2]", color: "text-[#dc2626]" },
      ],
      bars: [
        { day: "Mon", shipped: 44, processing: 28 },
        { day: "Tue", shipped: 60, processing: 32 },
        { day: "Wed", shipped: 63, processing: 33 },
        { day: "Thu", shipped: 78, processing: 32 },
        { day: "Fri", shipped: 50, processing: 25 },
        { day: "Sat", shipped: 66, processing: 33 },
        { day: "Sun", shipped: 92, processing: 32 },
      ],
      maxVal: 150,
    },
    "7days": {
      stats: [
        { label: "Total Orders", value: "2,410", growth: "↑ 15%", positive: true, icon: ShoppingCart, bg: "bg-[#f3e8ff]", color: "text-[#7c3aed]" },
        { label: "Shipped", value: "2,180", growth: "↑ 14%", positive: true, icon: Package, bg: "bg-[#e0e7ff]", color: "text-[#4f46e5]" },
        { label: "In Transit", value: "154", growth: "↑ 18%", positive: true, icon: Truck, bg: "bg-[#eff6ff]", color: "text-[#2563eb]" },
        { label: "Returns", value: "76", growth: "↑ 3%", positive: false, icon: RotateCcw, bg: "bg-[#fee2e2]", color: "text-[#dc2626]" },
      ],
      bars: [
        { day: "Mon", shipped: 52, processing: 30 },
        { day: "Tue", shipped: 68, processing: 34 },
        { day: "Wed", shipped: 72, processing: 35 },
        { day: "Thu", shipped: 88, processing: 30 },
        { day: "Fri", shipped: 58, processing: 28 },
        { day: "Sat", shipped: 74, processing: 32 },
        { day: "Sun", shipped: 98, processing: 30 },
      ],
      maxVal: 150,
    },
    "30days": {
      stats: [
        { label: "Total Orders", value: "9,840", growth: "↑ 22%", positive: true, icon: ShoppingCart, bg: "bg-[#f3e8ff]", color: "text-[#7c3aed]" },
        { label: "Shipped", value: "9,120", growth: "↑ 20%", positive: true, icon: Package, bg: "bg-[#e0e7ff]", color: "text-[#4f46e5]" },
        { label: "In Transit", value: "520", growth: "↑ 25%", positive: true, icon: Truck, bg: "bg-[#eff6ff]", color: "text-[#2563eb]" },
        { label: "Returns", value: "200", growth: "↑ 4%", positive: false, icon: RotateCcw, bg: "bg-[#fee2e2]", color: "text-[#dc2626]" },
      ],
      bars: [
        { day: "Mon", shipped: 62, processing: 30 },
        { day: "Tue", shipped: 75, processing: 32 },
        { day: "Wed", shipped: 80, processing: 35 },
        { day: "Thu", shipped: 95, processing: 30 },
        { day: "Fri", shipped: 68, processing: 28 },
        { day: "Sat", shipped: 82, processing: 32 },
        { day: "Sun", shipped: 105, processing: 25 },
      ],
      maxVal: 150,
    },
  };

  const revenueData = {
    today: {
      stats: [
        { label: "Total Sales", value: "₹1,24,560", growth: "↑ 18%", icon: Wallet },
        { label: "Commission Earned", value: "₹19,930", growth: "↑ 12%", icon: Percent },
        { label: "Payout Amount", value: "₹70,380", growth: "↑ 16%", icon: Landmark },
      ],
      yLabels: ["₹120K", "₹60K", "0"],
      pathArea: "M 10 90 C 40 85, 55 75, 75 66 C 100 55, 115 36, 135 34 C 155 32, 175 42, 195 44 C 215 46, 235 56, 255 56 C 275 56, 295 40, 315 38 C 340 35, 365 18, 390 10 L 390 92 L 10 92 Z",
      pathLine: "M 10 90 C 40 85, 55 75, 75 66 C 100 55, 115 36, 135 34 C 155 32, 175 42, 195 44 C 215 46, 235 56, 255 56 C 275 56, 295 40, 315 38 C 340 35, 365 18, 390 10",
      points: [
        { cx: 10, cy: 90 },
        { cx: 75, cy: 66 },
        { cx: 135, cy: 34 },
        { cx: 195, cy: 44 },
        { cx: 255, cy: 56 },
        { cx: 315, cy: 38 },
        { cx: 390, cy: 10 },
      ],
      xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    "7days": {
      stats: [
        { label: "Total Sales", value: "₹8,92,400", growth: "↑ 24%", icon: Wallet },
        { label: "Commission Earned", value: "₹1,42,800", growth: "↑ 19%", icon: Percent },
        { label: "Payout Amount", value: "₹4,99,750", growth: "↑ 21%", icon: Landmark },
      ],
      yLabels: ["₹900K", "₹450K", "0"],
      pathArea: "M 10 80 C 50 70, 90 60, 130 50 C 170 40, 210 55, 250 35 C 290 20, 340 25, 390 8 L 390 92 L 10 92 Z",
      pathLine: "M 10 80 C 50 70, 90 60, 130 50 C 170 40, 210 55, 250 35 C 290 20, 340 25, 390 8",
      points: [
        { cx: 10, cy: 80 },
        { cx: 75, cy: 65 },
        { cx: 130, cy: 50 },
        { cx: 190, cy: 45 },
        { cx: 250, cy: 35 },
        { cx: 310, cy: 22 },
        { cx: 390, cy: 8 },
      ],
      xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    "30days": {
      stats: [
        { label: "Total Sales", value: "₹36,40,000", growth: "↑ 31%", icon: Wallet },
        { label: "Commission Earned", value: "₹5,82,400", growth: "↑ 28%", icon: Percent },
        { label: "Payout Amount", value: "₹20,38,400", growth: "↑ 27%", icon: Landmark },
      ],
      yLabels: ["₹3.6M", "₹1.8M", "0"],
      pathArea: "M 10 75 C 60 65, 110 55, 160 40 C 210 25, 260 30, 310 20 C 350 12, 375 10, 390 6 L 390 92 L 10 92 Z",
      pathLine: "M 10 75 C 60 65, 110 55, 160 40 C 210 25, 260 30, 310 20 C 350 12, 375 10, 390 6",
      points: [
        { cx: 10, cy: 75 },
        { cx: 110, cy: 55 },
        { cx: 210, cy: 25 },
        { cx: 310, cy: 20 },
        { cx: 390, cy: 6 },
      ],
      xLabels: ["Week 1", "Week 2", "Week 3", "Week 4", "Month End"],
    },
  };

  const productsData = {
    today: [
      {
        name: "Velvet Matte Lip Tint",
        cat: "Model V-01 · Lip Color",
        units: 142,
        revenue: "₹56,800",
        growth: "↑ 22%",
        image: "/products/lip_tint.jpg",
        bg: "bg-[#2d121e]",
      },
      {
        name: "Hydra Glow Serum",
        cat: "Model S-04 · Skincare",
        units: 98,
        revenue: "₹24,502",
        growth: "↑ 16%",
        image: "/products/serum.jpg",
        bg: "bg-[#0f241d]",
      },
      {
        name: "Luminous Matte Foundation",
        cat: "Model F-12 · Base Makeup",
        units: 76,
        revenue: "₹18,240",
        growth: "↑ 14%",
        image: "/products/foundation.jpg",
        bg: "bg-[#261c12]",
      },
      {
        name: "Night Repair Crème",
        cat: "Model N-08 · Treatment",
        units: 64,
        revenue: "₹16,000",
        growth: "↑ 28%",
        image: "/products/night_cream.jpg",
        bg: "bg-[#1f142e]",
      },
      {
        name: "Rose Dew Face Mist",
        cat: "Model M-02 · Face Mist",
        units: 52,
        revenue: "₹13,000",
        growth: "↑ 9%",
        image: "/products/face_mist.jpg",
        bg: "bg-[#2a131b]",
      },
    ],
    "7days": [
      {
        name: "Velvet Matte Lip Tint",
        cat: "Model V-01 · Lip Color",
        units: 890,
        revenue: "₹3,56,000",
        growth: "↑ 25%",
        image: "/products/lip_tint.jpg",
        bg: "bg-[#2d121e]",
      },
      {
        name: "Hydra Glow Serum",
        cat: "Model S-04 · Skincare",
        units: 640,
        revenue: "₹1,60,000",
        growth: "↑ 19%",
        image: "/products/serum.jpg",
        bg: "bg-[#0f241d]",
      },
      {
        name: "Luminous Matte Foundation",
        cat: "Model F-12 · Base Makeup",
        units: 510,
        revenue: "₹1,22,400",
        growth: "↑ 15%",
        image: "/products/foundation.jpg",
        bg: "bg-[#261c12]",
      },
      {
        name: "Night Repair Crème",
        cat: "Model N-08 · Treatment",
        units: 480,
        revenue: "₹1,20,000",
        growth: "↑ 32%",
        image: "/products/night_cream.jpg",
        bg: "bg-[#1f142e]",
      },
      {
        name: "Rose Dew Face Mist",
        cat: "Model M-02 · Face Mist",
        units: 390,
        revenue: "₹97,500",
        growth: "↑ 12%",
        image: "/products/face_mist.jpg",
        bg: "bg-[#2a131b]",
      },
    ],
    "30days": [
      {
        name: "Velvet Matte Lip Tint",
        cat: "Model V-01 · Lip Color",
        units: 3650,
        revenue: "₹14,60,000",
        growth: "↑ 30%",
        image: "/products/lip_tint.jpg",
        bg: "bg-[#2d121e]",
      },
      {
        name: "Hydra Glow Serum",
        cat: "Model S-04 · Skincare",
        units: 2540,
        revenue: "₹6,35,000",
        growth: "↑ 22%",
        image: "/products/serum.jpg",
        bg: "bg-[#0f241d]",
      },
      {
        name: "Luminous Matte Foundation",
        cat: "Model F-12 · Base Makeup",
        units: 2180,
        revenue: "₹5,23,200",
        growth: "↑ 18%",
        image: "/products/foundation.jpg",
        bg: "bg-[#261c12]",
      },
      {
        name: "Night Repair Crème",
        cat: "Model N-08 · Treatment",
        units: 1950,
        revenue: "₹4,87,500",
        growth: "↑ 35%",
        image: "/products/night_cream.jpg",
        bg: "bg-[#1f142e]",
      },
      {
        name: "Rose Dew Face Mist",
        cat: "Model M-02 · Face Mist",
        units: 1620,
        revenue: "₹4,05,000",
        growth: "↑ 14%",
        image: "/products/face_mist.jpg",
        bg: "bg-[#2a131b]",
      },
    ],
  };

  const currentOrders = ordersData[ordersTimeframe];
  const currentRevenue = revenueData[revenueTimeframe];
  const currentProducts = productsData[productsTimeframe];

  return (
    <div ref={sectionRef} className="pt-8 space-y-8">
      {/* 2x2 Bento Grid with Scroll Entrance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* ========================================================================= */}
        {/* ROW 1 - CARD 1: Left Violet Gradient Card (Finance / SELLERS) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="lg:col-span-5 rounded-[28px] xs:rounded-[32px] sm:rounded-[36px] p-6 xs:p-7 sm:p-9 bg-[linear-gradient(135deg,#5422cd_0%,#7333e6_35%,#9d67f1_68%,#ebdfff_100%)] text-white flex flex-col justify-between min-h-[360px] xs:min-h-[380px] sm:min-h-[400px] shadow-md relative overflow-hidden group"
        >
          {/* Geometric folded translucent polygon shape on bottom right */}
          <motion.div
            style={{ y: ribbonY, rotate: ribbonRotate }}
            className="absolute -bottom-5 -right-5 w-40 xs:w-48 h-40 xs:h-48 pointer-events-none opacity-90 select-none transition-opacity group-hover:opacity-100"
          >
            <svg
              viewBox="0 0 160 160"
              fill="none"
              className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.16)]"
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
              className="inline-block bg-white text-slate-950 font-extrabold text-[10px] xs:text-[11px] tracking-widest px-4 py-1.5 rounded-full uppercase shadow-xs cursor-default"
            >
              SELLERS
            </motion.span>
            <h3 className="text-2xl xs:text-3xl sm:text-[2.1rem] font-bold tracking-tight mt-5 sm:mt-6 leading-tight max-w-[280px]">
              Keep track of your income and payment
            </h3>
          </div>

          {/* Join now pill button */}
          <div className="mt-8 relative z-10">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 bg-black text-white pl-5 pr-1.5 py-1.5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:bg-neutral-900 transition-all group cursor-pointer"
            >
              <span>Join now</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#5422cd] flex items-center justify-center text-xs sm:text-sm font-extrabold transition-transform group-hover:rotate-45 shadow-xs">
                ↗
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 1 - CARD 2: Orders Overview (Right Light Card) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 rounded-[28px] xs:rounded-[32px] sm:rounded-[36px] p-6 xs:p-7 sm:p-8 bg-white border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[360px] xs:min-h-[380px] sm:min-h-[400px]"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <h3 className="text-2xl sm:text-[1.65rem] font-bold tracking-tight text-slate-950">
                Orders overview
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Track your orders, fulfillment and delivery performance
              </p>
            </div>
            {/* Interactive Time Filter Pills */}
            <div className="flex items-center bg-[#f1f3f6] p-1 rounded-full text-xs font-semibold self-start shrink-0">
              <button
                onClick={() => setOrdersTimeframe("today")}
                className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                  ordersTimeframe === "today"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setOrdersTimeframe("7days")}
                className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                  ordersTimeframe === "7days"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setOrdersTimeframe("30days")}
                className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                  ordersTimeframe === "30days"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                30 Days
              </button>
            </div>
          </div>

          {/* 4 Stat Metric Boxes with Exact Styling */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 my-4">
            {currentOrders.stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.18 + idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-[20px] p-3 sm:p-3.5 border border-slate-100/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:border-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 whitespace-nowrap leading-tight">
                        {stat.label}
                      </p>
                      <p className="text-sm sm:text-base md:text-lg font-bold text-slate-950 tracking-tight whitespace-nowrap">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2.5 flex justify-end">
                    <span
                      className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 ${
                        stat.positive
                          ? "text-[#16a34a] bg-[#dcfce7]"
                          : "text-[#dc2626] bg-[#fee2e2]"
                      }`}
                    >
                      {stat.growth}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Stacked Bar Chart Matching Exact Visual Graph */}
          <div className="mt-1 pt-3 border-t border-slate-100 flex items-start gap-4">
            {/* Chart Graphic Area */}
            <div className="flex-1 relative flex items-end h-32 sm:h-36 pt-2 pb-6">
              {/* Y Axis Numbers */}
              <div className="absolute inset-y-0 left-0 flex flex-col justify-between text-[11px] text-slate-400 font-semibold pointer-events-none pb-6">
                <span>150</span>
                <span>100</span>
                <span>50</span>
                <span>0</span>
              </div>

              {/* Main Bars Container with Gridlines */}
              <div className="w-full h-full pl-8 flex items-end justify-between gap-2 sm:gap-3 relative">
                {/* Horizontal Dashed Grid Lines */}
                <div className="absolute inset-x-8 top-0 border-b border-dashed border-slate-200/90 pointer-events-none" />
                <div className="absolute inset-x-8 top-1/3 border-b border-dashed border-slate-200/90 pointer-events-none" />
                <div className="absolute inset-x-8 top-2/3 border-b border-dashed border-slate-200/90 pointer-events-none" />
                <div className="absolute inset-x-8 bottom-6 border-b border-slate-200 pointer-events-none" />

                {/* Vertical Dotted Lines */}
                <div className="absolute inset-y-0 left-8 w-[1px] border-r border-dotted border-slate-200/80 pointer-events-none pb-6" />
                <div className="absolute inset-y-0 right-0 w-[1px] border-r border-dotted border-slate-200/80 pointer-events-none pb-6" />

                {currentOrders.bars.map((item, idx) => {
                  const maxVal = currentOrders.maxVal;
                  const chartHeight = 100;
                  const shippedPx = Math.round((item.shipped / maxVal) * chartHeight);
                  const processingPx = Math.round((item.processing / maxVal) * chartHeight);

                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center justify-end z-10 relative group h-[125px]"
                    >
                      {/* Column Vertical Divider Line */}
                      {idx > 0 && (
                        <div className="absolute inset-y-0 -left-1 sm:-left-1.5 w-[1px] border-r border-dotted border-slate-200/80 pointer-events-none pb-6" />
                      )}

                      {/* Stacked Bar with Solid Purple Bottom & Lavender Top */}
                      <div className="w-full max-w-[28px] sm:max-w-[36px] flex flex-col justify-end rounded-t-[5px] overflow-hidden transition-all duration-300 group-hover:scale-105 shadow-xs">
                        <motion.div
                          key={`proc-${ordersTimeframe}-${idx}`}
                          initial={{ height: 0 }}
                          whileInView={{ height: processingPx }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.55, delay: 0.25 + idx * 0.04, ease: "easeOut" }}
                          style={{ height: `${processingPx}px` }}
                          className="w-full bg-[#cfc5fa]"
                        />
                        <motion.div
                          key={`ship-${ordersTimeframe}-${idx}`}
                          initial={{ height: 0 }}
                          whileInView={{ height: shippedPx }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.55, delay: 0.25 + idx * 0.04, ease: "easeOut" }}
                          style={{ height: `${shippedPx}px` }}
                          className="w-full bg-[#5835e0]"
                        />
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium mt-2 shrink-0">
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right-Side Vertical Legend */}
            <div className="flex flex-col gap-2 pt-2 pr-1 shrink-0 select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#5835e0] shrink-0" />
                <span className="text-xs font-medium text-slate-700">Shipped</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#cfc5fa] shrink-0" />
                <span className="text-xs font-medium text-slate-700">Processing</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 2 - CARD 3: Revenue & Earnings (Bottom Left Light Card) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 rounded-[28px] xs:rounded-[32px] sm:rounded-[36px] p-6 xs:p-7 sm:p-8 bg-white border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[380px] xs:min-h-[400px]"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <h3 className="text-2xl sm:text-[1.65rem] font-bold tracking-tight text-slate-950">
                Revenue & earnings
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Track your sales, payouts and commission earnings in real time
              </p>
            </div>
            {/* Interactive Time Filter Pills */}
            <div className="flex items-center bg-[#f1f3f6] p-1 rounded-full text-xs font-semibold self-start shrink-0">
              <button
                onClick={() => setRevenueTimeframe("today")}
                className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                  revenueTimeframe === "today"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setRevenueTimeframe("7days")}
                className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                  revenueTimeframe === "7days"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setRevenueTimeframe("30days")}
                className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                  revenueTimeframe === "30days"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                30 Days
              </button>
            </div>
          </div>

          {/* 3 Stat Metric Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 my-4">
            {currentRevenue.stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 + idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-[20px] p-3 sm:p-3.5 border border-slate-100/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:border-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-[#ede9fe] text-[#6366f1] flex items-center justify-center shrink-0 shadow-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 whitespace-nowrap leading-tight">
                        {stat.label}
                      </p>
                      <p className="text-sm sm:text-[15px] lg:text-base font-bold text-slate-950 tracking-tight whitespace-nowrap">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2.5 flex justify-end">
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#16a34a] bg-[#dcfce7] px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      {stat.growth}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Sales Trend Line Area Chart */}
          <div className="mt-1 pt-2 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-800 mb-1">Sales trend</p>
            <div className="relative h-28 sm:h-32 pt-2">
              {/* Y Axis */}
              <div className="absolute inset-y-0 left-0 flex flex-col justify-between text-[10px] text-slate-400 font-semibold pointer-events-none pb-5">
                {currentRevenue.yLabels.map((lbl, idx) => (
                  <span key={idx}>{lbl}</span>
                ))}
              </div>

              <div className="w-full h-full pl-8 pb-5 relative flex flex-col justify-between">
                <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="salesGradInteractive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Subtle Grid Lines */}
                  <line x1="0" y1="8" x2="400" y2="8" stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1" />
                  <line x1="0" y1="50" x2="400" y2="50" stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1" />
                  <line x1="0" y1="92" x2="400" y2="92" stroke="#e2e8f0" strokeWidth="1" />

                  {/* Area Fill */}
                  <motion.path
                    key={`area-${revenueTimeframe}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    d={currentRevenue.pathArea}
                    fill="url(#salesGradInteractive)"
                  />
                  {/* Line */}
                  <motion.path
                    key={`line-${revenueTimeframe}`}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, delay: 0.25, ease: "easeOut" }}
                    d={currentRevenue.pathLine}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  {/* Coordinate dots */}
                  {currentRevenue.points.map((pt, i) => (
                    <motion.circle
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                      cx={pt.cx}
                      cy={pt.cy}
                      r="3.5"
                      fill="#6366f1"
                      stroke="white"
                      strokeWidth="1.8"
                    />
                  ))}
                </svg>

                {/* X Axis */}
                <div className="flex justify-between text-[10px] text-slate-500 font-medium px-1 mt-1">
                  {currentRevenue.xLabels.map((xlbl, idx) => (
                    <span key={idx}>{xlbl}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* ROW 2 - CARD 4: Top Performing Products (Bottom Right Dark Card) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 rounded-[28px] xs:rounded-[32px] sm:rounded-[36px] p-6 xs:p-7 sm:p-8 bg-[#0a0d14] border border-white/10 text-white shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[380px] xs:min-h-[400px]"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <h3 className="text-2xl sm:text-[1.65rem] font-bold tracking-tight text-white">
                Top performing products
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Your best selling products this period
              </p>
            </div>
            {/* Interactive Time Filter Pills */}
            <div className="flex items-center bg-white/10 p-1 rounded-full text-xs font-semibold self-start shrink-0">
              <button
                onClick={() => setProductsTimeframe("today")}
                className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                  productsTimeframe === "today"
                    ? "bg-white/20 text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setProductsTimeframe("7days")}
                className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                  productsTimeframe === "7days"
                    ? "bg-white/20 text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setProductsTimeframe("30days")}
                className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                  productsTimeframe === "30days"
                    ? "bg-white/20 text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                30 Days
              </button>
            </div>
          </div>

          {/* Product Rows with Staggered Entrance */}
          <div className="space-y-2.5 sm:space-y-3 my-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={productsTimeframe}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="space-y-2.5 sm:space-y-3"
              >
                {currentProducts.map((prod, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.32 + idx * 0.05, ease: "easeOut" }}
                    className="flex items-center justify-between gap-2.5 text-xs sm:text-sm py-1.5 px-2 rounded-xl hover:bg-white/[0.04] transition-colors"
                  >
                    {/* Left: Thumbnail & Name */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className={`w-9 h-9 rounded-xl ${prod.bg} flex items-center justify-center shrink-0 overflow-hidden border border-white/10 p-0.5`}
                      >
                        {prod.image ? (
                          <img
                            src={prod.image}
                            alt={prod.name}
                            loading="eager"
                            onError={(e) => {
                              // If image fails to load, gracefully hide broken icon
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Package className="w-4 h-4 text-purple-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-white truncate text-xs sm:text-[13px]">{prod.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{prod.cat}</p>
                      </div>
                    </div>

                    {/* Units Sold */}
                    <div className="text-right shrink-0 px-2">
                      <p className="text-[10px] text-slate-400 font-medium">Units Sold</p>
                      <p className="font-bold text-white text-xs sm:text-sm">{prod.units}</p>
                    </div>

                    {/* Revenue */}
                    <div className="text-right shrink-0 px-2 min-w-[70px]">
                      <p className="text-[10px] text-slate-400 font-medium">Revenue</p>
                      <p className="font-bold text-white text-xs sm:text-sm">{prod.revenue}</p>
                    </div>

                    {/* Growth Tag */}
                    <div className="shrink-0 text-right min-w-[54px]">
                      <span className="text-[10px] sm:text-[11px] font-bold text-[#22c55e] bg-[#22c55e]/15 px-2 py-0.5 rounded-md inline-block">
                        {prod.growth}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
