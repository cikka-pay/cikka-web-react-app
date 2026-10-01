import React, { useState, useEffect } from "react";
import { EyeOff, CreditCard, PlusSquare, Gift, Eye, Search, Bell } from "lucide-react";

interface PhoneScreen2PortfolioProps {
  compact?: boolean;
}

const dueSlides = [
  { label: "Your Total Due", amount: "₹2,90,000" },
  { label: "HDFC Regalia Gold", amount: "₹45,230" },
  { label: "Axis Bank Magnus", amount: "₹28,450" },
];

export function PhoneScreen2Portfolio({ compact = false }: PhoneScreen2PortfolioProps) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setSlideIdx((prev) => (prev + 1) % dueSlides.length);
        setFade(true);
      }, 250);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  const currentSlide = dueSlides[slideIdx] ?? dueSlides[0]!;

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between select-none overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 85% 12%, rgba(192,132,252,0.22) 0%, transparent 50%), linear-gradient(180deg, #3d1a6c 0%, #2b124e 36%, #15092a 68%, #06040b 100%)",
      }}
    >
      <style>{`
        @keyframes gaugeOrbSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .gauge-spin-arc {
          transform-origin: 120px 120px;
          animation: gaugeOrbSpin 8s linear infinite;
        }
      `}</style>

      {/* Safe Area Notch Clearance */}
      <div className="h-8 sm:h-9 shrink-0 pointer-events-none" />

      {/* Screen Flow Container */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        {/* ========================================================================= */}
        {/* UPPER PORTION (58% with spacious royal purple styling)                     */}
        {/* ========================================================================= */}
        <div className="flex-[0_0_58%] flex flex-col justify-between px-2.5 xs:px-3 sm:px-5 pb-1.5 sm:pb-2">
          {/* 1. User Header Bar */}
          <div className="flex items-center justify-between pt-0.5">
            {/* Avatar & Greeting */}
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <div
                className={`${
                  compact ? "w-5.5 h-5.5 text-[8px]" : "w-8 h-8 sm:w-9 sm:h-9 text-[11px] sm:text-[13px]"
                } rounded-full bg-[#09090b] border-[1.5px] border-white/20 shadow-md flex items-center justify-center font-bold text-white shrink-0`}
              >
                KS
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className={`${compact ? "text-[6.5px]" : "text-[9.5px] sm:text-[11px]"} text-white/60 leading-none`}>
                  Hello,
                </span>
                <span
                  className={`${
                    compact ? "text-[8.5px] tracking-tight" : "text-xs sm:text-[14px]"
                  } text-white font-bold leading-tight mt-0.5 whitespace-nowrap truncate`}
                >
                  Kunal Shah
                </span>
              </div>
            </div>

            {/* Header Right Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Search Glass Button */}
              <div
                className={`${
                  compact ? "w-5.5 h-5.5" : "w-7.5 h-7.5 sm:w-8.5 sm:h-8.5"
                } rounded-full bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center text-white`}
              >
                <Search className={`${compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5 sm:w-4 sm:h-4"}`} />
              </div>
              {/* Notification Glass Button with Badge */}
              <div
                className={`${
                  compact ? "w-5.5 h-5.5" : "w-7.5 h-7.5 sm:w-8.5 sm:h-8.5"
                } rounded-full bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center text-white relative`}
              >
                <Bell className={`${compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5 sm:w-4 sm:h-4"}`} />
                <div
                  className={`absolute -top-0.5 -right-0.5 ${
                    compact ? "w-2.5 h-2.5 text-[6px]" : "w-3.5 h-3.5 sm:w-4 sm:h-4 text-[8px] sm:text-[9px]"
                  } rounded-full bg-white text-[#07070a] font-black flex items-center justify-center shadow-md`}
                >
                  2
                </div>
              </div>
            </div>
          </div>

          {/* 2. Top Segment Switcher (Pay / Mall) */}
          <div className="mt-0.5 sm:mt-2">
            <div
              className={`${
                compact ? "h-6.5 p-0.5" : "h-9 sm:h-11 p-1"
              } rounded-full bg-white/15 backdrop-blur-md border border-white/10 flex items-center`}
            >
              <div
                className={`flex-1 h-full bg-white rounded-full text-[#07070a] font-bold ${
                  compact ? "text-[8.5px]" : "text-xs sm:text-[13px]"
                } flex items-center justify-center shadow-md`}
              >
                Pay
              </div>
              <div
                className={`flex-1 h-full text-white/75 font-medium ${
                  compact ? "text-[8.5px]" : "text-xs sm:text-[13px]"
                } flex items-center justify-center`}
              >
                Mall
              </div>
            </div>
            {/* Hide/Eye Icon */}
            <div className="flex items-center mt-0.5 ml-1 text-white/60">
              <EyeOff className={`${compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5 sm:w-4 sm:h-4"}`} />
            </div>
          </div>

          {/* 3. Hero Total Due Section with Continuous Carousel */}
          <div className="flex flex-col items-center justify-center text-center my-auto py-0.5">
            <span
              className={`${
                compact ? "text-[7.5px]" : "text-[10px] sm:text-[12px]"
              } font-medium text-white/60 mb-0.5 tracking-wide transition-opacity duration-300 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              {currentSlide.label}
            </span>
            <div className={`${compact ? "h-5 xs:h-6" : "h-7 sm:h-10"} flex items-center justify-center overflow-hidden`}>
              <span
                className={`${
                  compact ? "text-[17px] xs:text-[19px]" : "text-[26px] xs:text-[30px] sm:text-[36px]"
                } font-extrabold text-white font-['Poppins',sans-serif] tracking-tight leading-none transition-all duration-300 ${
                  fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                }`}
              >
                {currentSlide.amount}
              </span>
            </div>
            {/* Carousel Indicator Dots */}
            <div className="flex items-center gap-1 mt-0.5 sm:mt-1.5">
              {dueSlides.map((_, i) => (
                <div
                  key={i}
                  className={`transition-all duration-300 ${
                    i === slideIdx
                      ? `${compact ? "w-2.5 h-0.5" : "w-4 h-1.5"} rounded-full bg-white`
                      : `${compact ? "w-0.5 h-0.5" : "w-1.5 h-1.5"} rounded-full bg-white/30`
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 4. Quick Action Squircles Grid (Pay, Add new, Redeem, View) */}
          <div className="grid grid-cols-4 gap-1 sm:gap-2.5 mt-0.5 mb-0.5 sm:mb-2">
            {/* Pay */}
            <div className="flex flex-col items-center">
              <div
                className={`w-full ${
                  compact ? "h-7.5 rounded-lg" : "h-11 sm:h-13 rounded-[16px] sm:rounded-[20px]"
                } bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-md text-white`}
              >
                <CreditCard className={`${compact ? "w-3 h-3" : "w-4.5 h-4.5 sm:w-5 sm:h-5"}`} />
              </div>
              <span
                className={`${
                  compact ? "text-[6.5px] whitespace-nowrap" : "text-[9.5px] sm:text-[11px]"
                } font-medium text-white/85 mt-0.5`}
              >
                Pay
              </span>
            </div>

            {/* Add new */}
            <div className="flex flex-col items-center">
              <div
                className={`w-full ${
                  compact ? "h-7.5 rounded-lg" : "h-11 sm:h-13 rounded-[16px] sm:rounded-[20px]"
                } bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-md text-white`}
              >
                <PlusSquare className={`${compact ? "w-3 h-3" : "w-4.5 h-4.5 sm:w-5 sm:h-5"}`} />
              </div>
              <span
                className={`${
                  compact ? "text-[6.5px] whitespace-nowrap" : "text-[9.5px] sm:text-[11px]"
                } font-medium text-white/85 mt-0.5`}
              >
                Add new
              </span>
            </div>

            {/* Redeem */}
            <div className="flex flex-col items-center">
              <div
                className={`w-full ${
                  compact ? "h-7.5 rounded-lg" : "h-11 sm:h-13 rounded-[16px] sm:rounded-[20px]"
                } bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-md text-white`}
              >
                <Gift className={`${compact ? "w-3 h-3" : "w-4.5 h-4.5 sm:w-5 sm:h-5"}`} />
              </div>
              <span
                className={`${
                  compact ? "text-[6.5px] whitespace-nowrap" : "text-[9.5px] sm:text-[11px]"
                } font-medium text-white/85 mt-0.5`}
              >
                Redeem
              </span>
            </div>

            {/* View */}
            <div className="flex flex-col items-center">
              <div
                className={`w-full ${
                  compact ? "h-7.5 rounded-lg" : "h-11 sm:h-13 rounded-[16px] sm:rounded-[20px]"
                } bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-md text-white`}
              >
                <Eye className={`${compact ? "w-3 h-3" : "w-4.5 h-4.5 sm:w-5 sm:h-5"}`} />
              </div>
              <span
                className={`${
                  compact ? "text-[6.5px] whitespace-nowrap" : "text-[9.5px] sm:text-[11px]"
                } font-medium text-white/85 mt-0.5`}
              >
                View
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LOWER PORTION (42% Charcoal Glass Container with Rewards Gauge)          */}
        {/* ========================================================================= */}
        <div className="flex-[0_0_42%] rounded-t-[22px] sm:rounded-t-[32px] bg-gradient-to-b from-[#131317] to-[#09090b] border-t border-x border-white/10 px-2.5 xs:px-3 sm:px-5 pt-2 sm:pt-3.5 pb-1.5 flex flex-col justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Inner Tab Switcher (Product / Coupon) */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div
              className={`px-2 sm:px-4 py-0.5 sm:py-1.5 rounded-lg sm:rounded-2xl bg-white/15 text-white font-semibold ${
                compact ? "text-[7.5px]" : "text-[11px] sm:text-[13px]"
              } backdrop-blur-md`}
            >
              Product
            </div>
            <div
              className={`text-white/45 font-medium ${
                compact ? "text-[7.5px]" : "text-[11px] sm:text-[13px]"
              }`}
            >
              Coupon
            </div>
          </div>

          {/* Rewards Gauge Donut Chart with Continuous Spinning Energy Arc */}
          <div
            className={`relative ${
              compact ? "w-22 h-22" : "w-36 h-36 xs:w-40 xs:h-40 sm:w-48 sm:h-48"
            } mx-auto flex items-center justify-center my-auto`}
          >
            <svg viewBox="0 0 240 240" className="w-full h-full">
              {/* Background Ring Track */}
              <circle
                cx="120"
                cy="120"
                r="80"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="28"
                fill="none"
              />

              {/* Active White Arc */}
              <circle
                cx="120"
                cy="120"
                r="80"
                stroke="#ffffff"
                strokeWidth="28"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="240 263"
                transform="rotate(-110 120 120)"
                style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))" }}
              />

              {/* Rotating Energy Spark Dot */}
              <g className="gauge-spin-arc">
                <circle
                  cx="120"
                  cy="40"
                  r="6"
                  fill="#ffffff"
                  style={{
                    filter: "drop-shadow(0 0 8px #ffffff) drop-shadow(0 0 16px rgba(192,132,252,0.9))",
                  }}
                />
              </g>
            </svg>

            {/* Donut Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span
                className={`${
                  compact ? "text-[6px]" : "text-[8.5px] sm:text-[10px]"
                } font-semibold text-white/50 tracking-wider uppercase mb-0.5`}
              >
                AVG
              </span>
              <span
                className={`${
                  compact ? "text-[15px]" : "text-[24px] xs:text-[28px] sm:text-[34px]"
                } font-extrabold text-white font-['Poppins',sans-serif] leading-none`}
              >
                12%
              </span>
              <span
                className={`${
                  compact ? "text-[7px]" : "text-[9.5px] sm:text-[11px]"
                } font-semibold text-white/70 mt-0.5 tracking-wide`}
              >
                Rewards
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
