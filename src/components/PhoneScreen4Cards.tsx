import React, { useState, useEffect } from "react";

interface PhoneScreen4CardsProps {
  compact?: boolean;
}

const cardsData = [
  {
    name: "Regalia Gold",
    bank: "HDFC Bank",
    badge: "• Due in 2d",
    badgeColor: "#fca5a5",
    dotColor: "#ef4444",
    label: "Outstanding",
    amount: "₹45,230",
    number: "•••• •••• •••• 4821",
    exp: "Exp. 10/28",
    bg: "linear-gradient(145deg, #161326 0%, #291a3f 60%, #0c0a15 100%)",
    glow: "rgba(192, 132, 252, 0.18)",
    shadow: "rgba(22, 19, 38, 0.4)",
  },
  {
    name: "Magnus",
    bank: "Axis Bank",
    badge: "• Paid",
    badgeColor: "#86efac",
    dotColor: "#4ade80",
    label: "Last Paid",
    amount: "₹28,450",
    number: "•••• •••• •••• 7734",
    exp: "Exp. 06/27",
    bg: "linear-gradient(145deg, #0c1726 0%, #162a44 60%, #060c16 100%)",
    glow: "rgba(99, 102, 241, 0.18)",
    shadow: "rgba(12, 23, 38, 0.4)",
  },
  {
    name: "Elite",
    bank: "SBI Card",
    badge: "• Due in 12d",
    badgeColor: "#fcd34d",
    dotColor: "#fbbf24",
    label: "Upcoming",
    amount: "₹12,800",
    number: "•••• •••• •••• 2209",
    exp: "Exp. 12/29",
    bg: "linear-gradient(145deg, #141416 0%, #22242a 60%, #090a0c 100%)",
    glow: "rgba(251, 191, 36, 0.15)",
    shadow: "rgba(0, 0, 0, 0.3)",
  },
];

export function PhoneScreen4Cards({ compact = false }: PhoneScreen4CardsProps) {
  const [activeCard, setActiveCard] = useState(2); // Start on SBI Elite matching screenshot

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cardsData.length);
    }, 3800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between select-none overflow-hidden text-[#09090b]"
      style={{
        background: "linear-gradient(180deg, #f8f9fc 0%, #eef1f7 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        * {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        *::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        @keyframes sPing {
          0% { transform: scale(1); opacity: 0.8; }
          70% { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes shlS {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .ping-dot { animation: sPing 2s ease-out infinite; }
        .card-shimmer {
          background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%);
          background-size: 200% auto;
          animation: shlS 2.4s linear infinite;
        }
      `}</style>

      {/* Subtle background ambient light bloom */}
      <div
        className="absolute w-64 h-64 rounded-full pointer-events-none -top-10 -right-8 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)" }}
      />

      {/* Safe Area Notch Clearance */}
      <div className="h-8 sm:h-9 shrink-0 pointer-events-none" />

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col justify-between relative z-10 px-3.5 sm:px-4.5 pb-3 sm:pb-3.5">
        {/* Header */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="text-left">
            <p className="text-[9px] sm:text-[9.5px] font-bold tracking-[0.14em] text-[#09090b]/45 uppercase mb-0.5">
              Cikka Pay
            </p>
            <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#09090b] font-['Poppins',sans-serif] leading-[1.15] m-0 tracking-tight">
              Your Cards &amp;<br />Bills
            </h2>
          </div>

          {/* Bell button with purple live notification indicator */}
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-[11px] sm:rounded-[12px] bg-white border border-black/[0.06] shadow-[0_3px_10px_rgba(0,0,0,0.04)] flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#09090b]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#7c3aed] border-[1px] border-white">
              <div className="ping-dot absolute inset-0 rounded-full bg-[#7c3aed]" />
            </div>
          </div>
        </div>

        {/* ── Single-Card Auto-Loop Carousel ── */}
        <div className="my-1.5 relative">
          <div className="overflow-hidden rounded-[20px] sm:rounded-[22px] w-full shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
            <div
              className="flex transition-transform duration-600 ease-[cubic-bezier(0.25,1,0.35,1)]"
              style={{
                transform: `translateX(-${activeCard * 100}%)`,
              }}
            >
              {cardsData.map((card, idx) => (
                <div key={idx} className="w-full shrink-0">
                  <div
                    className="h-[142px] sm:h-[152px] p-3 sm:p-3.5 rounded-[20px] sm:rounded-[22px] overflow-hidden relative flex flex-col justify-between text-white"
                    style={{
                      background: card.bg,
                      boxShadow: `0 12px 28px ${card.shadow}`,
                    }}
                  >
                    {/* Shimmer overlay */}
                    <div className="card-shimmer absolute inset-0 rounded-[20px] sm:rounded-[22px] pointer-events-none" />

                    {/* Ambient orb glow */}
                    <div
                      className="absolute w-44 h-44 rounded-full -top-16 -right-10 blur-2xl pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${card.glow} 0%, transparent 70%)` }}
                    />

                    {/* Top Row: Card Title & Status */}
                    <div className="flex items-start justify-between relative z-10 text-left">
                      <div>
                        <p className="text-[14px] sm:text-[15px] font-bold text-white tracking-tight font-['Poppins',sans-serif] m-0 leading-tight">
                          {card.name}
                        </p>
                        <p className="text-[9px] sm:text-[9.5px] font-medium text-white/50 m-0 leading-tight mt-0.5">
                          {card.bank}
                        </p>
                      </div>
                      <div className="pt-0.5">
                        <span
                          className="text-[9px] sm:text-[9.5px] font-semibold"
                          style={{ color: card.badgeColor }}
                        >
                          <span style={{ color: card.dotColor, marginRight: "3px" }}>•</span>
                          {card.badge.replace("• ", "")}
                        </span>
                      </div>
                    </div>

                    {/* Middle Row: Hero Amount */}
                    <div className="relative z-10 text-left my-0.5">
                      <p className="text-[8px] sm:text-[8.5px] text-white/50 mb-0.5 leading-none">
                        {card.label}
                      </p>
                      <p className="text-[22px] sm:text-[25px] font-extrabold text-white font-['Poppins',sans-serif] tracking-tight leading-none m-0">
                        {card.amount}
                      </p>
                    </div>

                    {/* Bottom Row: Number & Expiry */}
                    <div className="flex items-center justify-between relative z-10">
                      <span className="text-[9.5px] sm:text-[10.5px] text-white/55 font-mono font-medium tracking-wider">
                        {card.number}
                      </span>
                      <span className="text-[8px] sm:text-[8.5px] text-white/45 font-medium">
                        {card.exp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-1.5 mb-0.5">
            {cardsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCard(idx)}
                aria-label={`Show card ${idx + 1}`}
                className={`transition-all duration-300 p-0 border-none cursor-pointer ${
                  idx === activeCard
                    ? "w-4 h-1.5 rounded-full bg-[#7c3aed]"
                    : "w-1.5 h-1.5 rounded-full bg-[#09090b]/20 hover:bg-[#09090b]/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Smart Alerts List ── */}
        <div className="my-0.5 text-left">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[12px] sm:text-[13px] font-bold text-[#09090b] tracking-tight">
              Smart Alerts
            </span>
            <span className="text-[9px] sm:text-[9.5px] font-semibold text-[#7c3aed]">
              3 new
            </span>
          </div>

          <div className="space-y-1.5">
            {/* Alert 1 */}
            <div className="flex items-center gap-2 p-0.5 rounded-lg hover:bg-black/[0.02] transition-colors cursor-pointer">
              <div className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex items-center justify-center shrink-0 border border-black/[0.03]">
                <svg
                  className="w-3.5 h-3.5 text-[#18181b]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10.5px] sm:text-[11.5px] font-bold text-[#09090b] truncate leading-tight tracking-tight m-0">
                  HDFC Regalia · due in 2 days
                </p>
                <p className="text-[8.5px] sm:text-[9.5px] text-[#8e8e93] truncate leading-tight mt-0.5 m-0">
                  Pay now &amp; earn +5,428 CI Points
                </p>
              </div>
              <svg
                className="w-3 h-3 text-[#c7c7cc] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>

            {/* Alert 2 */}
            <div className="flex items-center gap-2 p-0.5 rounded-lg hover:bg-black/[0.02] transition-colors cursor-pointer">
              <div className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex items-center justify-center shrink-0 border border-black/[0.03]">
                <svg
                  className="w-3.5 h-3.5 text-[#18181b]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10.5px] sm:text-[11.5px] font-bold text-[#09090b] truncate leading-tight tracking-tight m-0">
                  Rewards · Axis Magnus
                </p>
                <p className="text-[8.5px] sm:text-[9.5px] text-[#8e8e93] truncate leading-tight mt-0.5 m-0">
                  +3,414 CI Points from ₹28,450
                </p>
              </div>
              <svg
                className="w-3 h-3 text-[#c7c7cc] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>

            {/* Alert 3 */}
            <div className="flex items-center gap-2 p-0.5 rounded-lg hover:bg-black/[0.02] transition-colors cursor-pointer">
              <div className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex items-center justify-center shrink-0 border border-black/[0.03]">
                <svg
                  className="w-3.5 h-3.5 text-[#18181b]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10.5px] sm:text-[11.5px] font-bold text-[#09090b] truncate leading-tight tracking-tight m-0">
                  SBI Elite · due in 12 days
                </p>
                <p className="text-[8.5px] sm:text-[9.5px] text-[#8e8e93] truncate leading-tight mt-0.5 m-0">
                  Auto-pay ₹12,800 or set reminder
                </p>
              </div>
              <svg
                className="w-3 h-3 text-[#c7c7cc] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── Bottom Floating Pay CTA Bar ── */}
        <div className="p-2 sm:p-2.5 rounded-[16px] sm:rounded-[18px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-black/[0.05] flex items-center justify-between text-left mt-auto">
          <div className="min-w-0 pr-2">
            <p className="text-[10.5px] sm:text-[11.5px] font-extrabold text-[#09090b] font-['Poppins',sans-serif] truncate leading-tight m-0">
              Pay HDFC Regalia Now
            </p>
            <p className="text-[8px] sm:text-[8.5px] text-[#8e8e93] truncate leading-tight mt-0.5 m-0">
              1 tap · pay bill instantly
            </p>
          </div>

          <button className="flex items-center gap-1 bg-[#09090b] text-white rounded-full px-3 py-1.2 sm:px-3.5 sm:py-1.5 text-[9.5px] sm:text-[10px] font-bold shadow-[0_3px_10px_rgba(9,9,11,0.2)] shrink-0 cursor-pointer border-none hover:bg-neutral-800 transition-colors">
            <span>Pay</span>
            <svg
              className="w-2.5 h-2.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
