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
  const [activeCard, setActiveCard] = useState(2); // Start on SBI Elite or cycle smoothly

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cardsData.length);
    }, 3500);

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
      <div className={`${compact ? "h-3" : "h-5 sm:h-7"} shrink-0 pointer-events-none`} />

      {/* Main Content Area */}
      <div
        className={`flex-1 overflow-hidden flex flex-col justify-between relative z-10 ${
          compact ? "px-2.5 pb-2" : "px-4 xs:px-5 pb-3 sm:pb-4"
        }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pt-1">
          <div className="text-left">
            <p
              className={`${
                compact ? "text-[8px]" : "text-[10px] sm:text-[11px]"
              } font-bold tracking-[0.14em] text-[#09090b]/45 uppercase mb-0.5`}
            >
              Cikka Pay
            </p>
            <h2
              className={`${
                compact ? "text-[16px]" : "text-[20px] sm:text-[22px]"
              } font-extrabold text-[#09090b] font-['Poppins',sans-serif] leading-[1.18] m-0 tracking-tight`}
            >
              Your Cards &amp;<br />Bills
            </h2>
          </div>

          {/* Bell button with purple live notification indicator */}
          <div
            className={`relative ${
              compact ? "w-8 h-8 rounded-xl" : "w-10 h-10 rounded-[14px]"
            } bg-white border border-black/[0.06] shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-center`}
          >
            <svg
              className={`${compact ? "w-4 h-4" : "w-4.5 h-4.5"} text-[#09090b]`}
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
            <div
              className={`absolute top-2 right-2 ${
                compact ? "w-1.5 h-1.5" : "w-2 h-2"
              } rounded-full bg-[#7c3aed] border-[1.5px] border-white`}
            >
              <div className="ping-dot absolute inset-0 rounded-full bg-[#7c3aed]" />
            </div>
          </div>
        </div>

        {/* ── Single-Card Auto-Loop Carousel (Matching dummyscreens.html) ── */}
        <div className={`${compact ? "my-1" : "my-2"} relative`}>
          <div className="overflow-hidden rounded-[24px] sm:rounded-[28px] w-full shadow-[0_16px_38px_rgba(0,0,0,0.14)]">
            <div
              className="flex transition-transform duration-600 ease-[cubic-bezier(0.25,1,0.35,1)]"
              style={{
                transform: `translateX(-${activeCard * 100}%)`,
              }}
            >
              {cardsData.map((card, idx) => (
                <div key={idx} className="w-full shrink-0">
                  <div
                    className={`${
                      compact ? "h-[140px] p-3.5" : "h-[175px] xs:h-[188px] p-4 sm:p-5"
                    } rounded-[24px] sm:rounded-[28px] overflow-hidden relative flex flex-col justify-between text-white`}
                    style={{
                      background: card.bg,
                      boxShadow: `0 16px 36px ${card.shadow}`,
                    }}
                  >
                    {/* Shimmer overlay */}
                    <div className="card-shimmer absolute inset-0 rounded-[24px] sm:rounded-[28px] pointer-events-none" />

                    {/* Ambient orb glow */}
                    <div
                      className="absolute w-52 h-52 rounded-full -top-20 -right-12 blur-2xl pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${card.glow} 0%, transparent 70%)` }}
                    />

                    {/* Top Row: Card Title & Status */}
                    <div className="flex items-start justify-between relative z-10 text-left">
                      <div>
                        <p
                          className={`${
                            compact ? "text-[13px]" : "text-[16px] sm:text-[18px]"
                          } font-bold text-white tracking-tight font-['Poppins',sans-serif] m-0`}
                        >
                          {card.name}
                        </p>
                        <p
                          className={`${
                            compact ? "text-[8.5px]" : "text-[10px] sm:text-[11px]"
                          } font-medium text-white/50 m-0`}
                        >
                          {card.bank}
                        </p>
                      </div>
                      <div className="pt-0.5">
                        <span
                          className={`${
                            compact ? "text-[8.5px]" : "text-[10px] sm:text-[11px]"
                          } font-semibold`}
                          style={{ color: card.badgeColor }}
                        >
                          <span style={{ color: card.dotColor, marginRight: "4px" }}>•</span>
                          {card.badge.replace("• ", "")}
                        </span>
                      </div>
                    </div>

                    {/* Middle Row: Hero Amount */}
                    <div className="relative z-10 my-auto text-left">
                      <p
                        className={`${
                          compact ? "text-[8px]" : "text-[9.5px] sm:text-[11px]"
                        } text-white/50 mb-0.5`}
                      >
                        {card.label}
                      </p>
                      <p
                        className={`${
                          compact ? "text-[22px]" : "text-[28px] xs:text-[30px] sm:text-[34px]"
                        } font-extrabold text-white font-['Poppins',sans-serif] tracking-tight leading-none m-0`}
                      >
                        {card.amount}
                      </p>
                    </div>

                    {/* Bottom Row: Number & Expiry */}
                    <div className="flex items-center justify-between relative z-10">
                      <span
                        className={`${
                          compact ? "text-[9px] tracking-wider" : "text-[11px] sm:text-[12px] tracking-widest"
                        } text-white/55 font-mono font-medium`}
                      >
                        {card.number}
                      </span>
                      <span
                        className={`${
                          compact ? "text-[8px]" : "text-[9.5px] sm:text-[10.5px]"
                        } text-white/45 font-medium`}
                      >
                        {card.exp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-2.5 mb-1">
            {cardsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCard(idx)}
                aria-label={`Show card ${idx + 1}`}
                className={`transition-all duration-300 p-0 border-none cursor-pointer ${
                  idx === activeCard
                    ? "w-4.5 h-1.5 rounded-full bg-[#7c3aed]"
                    : "w-1.5 h-1.5 rounded-full bg-[#09090b]/20 hover:bg-[#09090b]/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Smart Alerts List ── */}
        <div className={`${compact ? "mt-0.5 mb-1" : "mt-1 mb-2"} text-left`}>
          <div className="flex items-center justify-between mb-2">
            <span
              className={`${
                compact ? "text-[11.5px]" : "text-[13.5px] sm:text-[15px]"
              } font-bold text-[#09090b] tracking-tight`}
            >
              Smart Alerts
            </span>
            <span
              className={`${
                compact ? "text-[9px]" : "text-[10.5px] sm:text-[11.5px]"
              } font-semibold text-[#7c3aed]`}
            >
              3 new
            </span>
          </div>

          <div className="space-y-2">
            {/* Alert 1 */}
            <div className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-black/[0.02] transition-colors cursor-pointer">
              <div
                className={`${
                  compact ? "w-7 h-7" : "w-9 h-9 sm:w-10 sm:h-10"
                } rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.06)] flex items-center justify-center shrink-0 border border-black/[0.03]`}
              >
                <svg
                  className={`${compact ? "w-3.5 h-3.5" : "w-4.5 h-4.5"} text-[#18181b]`}
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
                <p
                  className={`${
                    compact ? "text-[9.5px]" : "text-[11.5px] sm:text-[13px]"
                  } font-bold text-[#09090b] truncate leading-tight tracking-tight`}
                >
                  HDFC Regalia · due in 2 days
                </p>
                <p
                  className={`${
                    compact ? "text-[8px]" : "text-[9.5px] sm:text-[11px]"
                  } text-[#8e8e93] truncate leading-tight mt-0.5`}
                >
                  Pay now &amp; earn +5,428 CI Points
                </p>
              </div>
              <svg
                className={`${compact ? "w-3 h-3" : "w-3.5 h-3.5"} text-[#c7c7cc] shrink-0`}
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
            <div className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-black/[0.02] transition-colors cursor-pointer">
              <div
                className={`${
                  compact ? "w-7 h-7" : "w-9 h-9 sm:w-10 sm:h-10"
                } rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.06)] flex items-center justify-center shrink-0 border border-black/[0.03]`}
              >
                <svg
                  className={`${compact ? "w-3.5 h-3.5" : "w-4.5 h-4.5"} text-[#18181b]`}
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
                <p
                  className={`${
                    compact ? "text-[9.5px]" : "text-[11.5px] sm:text-[13px]"
                  } font-bold text-[#09090b] truncate leading-tight tracking-tight`}
                >
                  Rewards · Axis Magnus
                </p>
                <p
                  className={`${
                    compact ? "text-[8px]" : "text-[9.5px] sm:text-[11px]"
                  } text-[#8e8e93] truncate leading-tight mt-0.5`}
                >
                  +3,414 CI Points from ₹28,450
                </p>
              </div>
              <svg
                className={`${compact ? "w-3 h-3" : "w-3.5 h-3.5"} text-[#c7c7cc] shrink-0`}
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
            <div className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-black/[0.02] transition-colors cursor-pointer">
              <div
                className={`${
                  compact ? "w-7 h-7" : "w-9 h-9 sm:w-10 sm:h-10"
                } rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.06)] flex items-center justify-center shrink-0 border border-black/[0.03]`}
              >
                <svg
                  className={`${compact ? "w-3.5 h-3.5" : "w-4.5 h-4.5"} text-[#18181b]`}
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
                <p
                  className={`${
                    compact ? "text-[9.5px]" : "text-[11.5px] sm:text-[13px]"
                  } font-bold text-[#09090b] truncate leading-tight tracking-tight`}
                >
                  SBI Elite · due in 12 days
                </p>
                <p
                  className={`${
                    compact ? "text-[8px]" : "text-[9.5px] sm:text-[11px]"
                  } text-[#8e8e93] truncate leading-tight mt-0.5`}
                >
                  Auto-pay ₹12,800 or set reminder
                </p>
              </div>
              <svg
                className={`${compact ? "w-3 h-3" : "w-3.5 h-3.5"} text-[#c7c7cc] shrink-0`}
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

        {/* ── Bottom Floating Pay CTA Bar (Matching dummyscreens.html) ── */}
        <div
          className={`${
            compact ? "p-1.5 rounded-xl" : "p-2.5 sm:p-3 rounded-2xl"
          } bg-white shadow-[0_12px_32px_rgba(0,0,0,0.1)] border border-black/[0.05] flex items-center justify-between text-left mt-auto`}
        >
          <div className="min-w-0 pr-2">
            <p
              className={`${
                compact ? "text-[9.5px]" : "text-[11.5px] sm:text-[13px]"
              } font-extrabold text-[#09090b] font-['Poppins',sans-serif] truncate leading-tight m-0`}
            >
              Pay HDFC Regalia Now
            </p>
            <p
              className={`${
                compact ? "text-[7.5px]" : "text-[9px] sm:text-[10px]"
              } text-[#8e8e93] truncate leading-tight mt-0.5`}
            >
              1 tap · pay bill instantly
            </p>
          </div>

          <button
            className={`flex items-center gap-1.5 bg-[#09090b] text-white rounded-full ${
              compact ? "px-2.5 py-1 text-[8.5px]" : "px-3.5 py-1.5 text-[10.5px] sm:text-[12px]"
            } font-bold shadow-[0_4px_14px_rgba(9,9,11,0.2)] shrink-0 cursor-pointer border-none hover:bg-neutral-800 transition-colors`}
          >
            <span>Pay</span>
            <svg
              className={`${compact ? "w-2.5 h-2.5" : "w-3 h-3"}`}
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

