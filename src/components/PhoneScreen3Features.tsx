import React from "react";
import { ArrowRight, Check, Bell } from "lucide-react";

interface PhoneScreen3FeaturesProps {
  compact?: boolean;
}

export function PhoneScreen3Features({ compact = false }: PhoneScreen3FeaturesProps) {
  return (
    <div
      className="relative w-full h-full flex flex-col justify-between select-none overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 85% 12%, rgba(192,132,252,0.22) 0%, transparent 50%), linear-gradient(180deg, #3d1a6c 0%, #2b124e 36%, #15092a 68%, #06040b 100%)",
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
        @keyframes tapPulse {
          0%   { transform: scale(1);   box-shadow: 0 0 0 0 rgba(168,85,247,0.55); }
          60%  { transform: scale(0.93);box-shadow: 0 0 0 12px rgba(168,85,247,0); }
          100% { transform: scale(1);   box-shadow: 0 0 0 0 rgba(168,85,247,0); }
        }
        @keyframes ripple {
          0%   { transform: scale(0.7); opacity: 0.7; }
          100% { transform: scale(2.0); opacity: 0; }
        }
        @keyframes checkPop {
          0%   { transform: scale(0) rotate(-15deg); opacity: 0; }
          60%  { transform: scale(1.2) rotate(4deg);  opacity: 1; }
          100% { transform: scale(1)   rotate(0deg);  opacity: 1; }
        }
        @keyframes bellShake {
          0%,100% { transform: rotate(0deg); }
          20%     { transform: rotate(14deg); }
          40%     { transform: rotate(-12deg); }
          60%     { transform: rotate(8deg); }
          80%     { transform: rotate(-6deg); }
        }
        @keyframes dotBlink {
          0%,100% { opacity: 1; }
          50%     { opacity: 0.2; }
        }
        .tap-btn-anim { animation: tapPulse 1.8s ease-in-out infinite; }
        .ripple-ring  { animation: ripple 1.8s ease-out infinite; }
        .check-anim   { animation: checkPop 0.55s cubic-bezier(.17,.67,.45,1.3) 0.8s both; }
        .bell-anim    { animation: bellShake 1.6s ease-in-out 0.5s infinite; }
        .dot-blink    { animation: dotBlink 1.4s ease-in-out infinite; }
      `}</style>

      {/* Safe Area Notch Clearance */}
      <div className={`${compact ? "h-6 xs:h-7" : "h-7 sm:h-8"} shrink-0 pointer-events-none`} />

      {/* Scrollable / Flexible Content Body with Zero Scrollbars */}
      <div
        className={`flex-1 overflow-hidden flex flex-col justify-between ${
          compact ? "px-2.5 pb-2.5" : "px-4 xs:px-5 sm:px-6 pb-4 sm:pb-6"
        }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Top Header */}
        <div className={`${compact ? "py-1.5" : "py-2 sm:py-3"} text-left`}>
          <p
            className={`${
              compact ? "text-[8px]" : "text-[9.5px] sm:text-[11px]"
            } font-bold tracking-[0.14em] text-white/50 uppercase mb-1`}
          >
            Built for Speed
          </p>
          <h2
            className={`${
              compact ? "text-[16px]" : "text-[20px] xs:text-[23px] sm:text-[26px]"
            } font-extrabold text-white font-['Poppins',sans-serif] leading-[1.18] m-0`}
          >
            Everything in<br />One Tap.
          </h2>
        </div>

        {/* ── FEATURE 1: One-Click Order ── */}
        <div className={`${compact ? "my-1" : "my-1.5 sm:my-2"}`}>
          <div className="mb-1.5 text-left">
            <p className={`${compact ? "text-[10px]" : "text-xs sm:text-[14px]"} font-bold text-white leading-tight`}>
              One-Click Order
            </p>
            <p className={`${compact ? "text-[7.5px]" : "text-[9.5px] sm:text-[11px]"} text-white/50 leading-tight mt-0.5`}>
              Saved address &amp; payment · order placed instantly.
            </p>
          </div>

          <div
            className={`flex items-center justify-between ${
              compact ? "p-2 rounded-xl" : "p-2.5 sm:p-3 rounded-2xl"
            } bg-white/[0.07] border border-white/10 shadow-md`}
          >
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div
                className={`${
                  compact ? "w-7 h-7 rounded-lg" : "w-9 h-9 sm:w-10 sm:h-10 rounded-xl"
                } overflow-hidden bg-[#09090b] border border-white/10 shrink-0`}
              >
                <img
                  src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=200&q=80"
                  alt="Designer Silk Dress"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 text-left">
                <p className={`${compact ? "text-[9px]" : "text-[11px] sm:text-[12.5px]"} font-bold text-white truncate leading-tight`}>
                  Designer Silk Dress
                </p>
                <p className={`${compact ? "text-[7.5px]" : "text-[9px] sm:text-[10.5px]"} text-white/50 mt-0.5 truncate`}>
                  ₹7,500 · Express Delivery
                </p>
              </div>
            </div>

            <div
              className={`relative ${
                compact ? "w-6 h-6" : "w-8 h-8 sm:w-9 sm:h-9"
              } shrink-0 flex items-center justify-center ml-2`}
            >
              <div className="ripple-ring absolute inset-0 rounded-full border border-white/40" />
              <button
                className={`tap-btn-anim ${
                  compact ? "w-6 h-6" : "w-8 h-8 sm:w-9 sm:h-9"
                } rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer border-none`}
              >
                <ArrowRight className={`${compact ? "w-3 h-3" : "w-3.5 h-3.5 sm:w-4 sm:h-4"} text-[#07070a] stroke-[2.4]`} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-1.5 pl-1 text-left">
            <div
              className={`check-anim ${
                compact ? "w-3 h-3" : "w-3.5 h-3.5 sm:w-4 sm:h-4"
              } rounded-full bg-white/20 flex items-center justify-center shrink-0`}
            >
              <Check className={`${compact ? "w-2 h-2" : "w-2.5 h-2.5"} text-white stroke-[2.5]`} />
            </div>
            <span className={`${compact ? "text-[7.5px]" : "text-[9px] sm:text-[10.5px]"} text-white/60 font-medium`}>
              Saved address · payment auto-applied
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/[0.07] my-1" />

        {/* ── FEATURE 2: One-Click Payment ── */}
        <div className={`${compact ? "my-1" : "my-1.5 sm:my-2"}`}>
          <div className="mb-1.5 text-left">
            <p className={`${compact ? "text-[10px]" : "text-xs sm:text-[14px]"} font-bold text-white leading-tight`}>
              One-Click Payment
            </p>
            <p className={`${compact ? "text-[7.5px]" : "text-[9.5px] sm:text-[11px]"} text-white/50 leading-tight mt-0.5`}>
              Pay any bill instantly · no OTPs, redirects, or waiting.
            </p>
          </div>

          <div
            className={`flex items-center justify-between ${
              compact ? "p-2 rounded-xl" : "p-2.5 sm:p-3 rounded-2xl"
            } bg-white/[0.07] border border-white/10 shadow-md`}
          >
            <div className="text-left">
              <p className={`${compact ? "text-[7px]" : "text-[8px] sm:text-[9px]"} text-white/45 uppercase tracking-wider font-semibold`}>
                HDFC Regalia · Bill Due
              </p>
              <p
                className={`${
                  compact ? "text-[13px]" : "text-[16px] xs:text-[18px] sm:text-[20px]"
                } font-extrabold text-white font-['Poppins',sans-serif] tracking-tight leading-none mt-0.5`}
              >
                ₹81,320
              </p>
            </div>

            <div className="relative">
              <div className="ripple-ring absolute -inset-1 rounded-xl border border-white/40" />
              <button
                className={`tap-btn-anim ${
                  compact ? "px-2.5 py-1 text-[8.5px] rounded-lg" : "px-3.5 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[11.5px] rounded-xl"
                } bg-white text-[#07070a] font-bold shadow-lg cursor-pointer border-none`}
              >
                Pay Now
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-1.5 pl-1 text-left">
            <div
              className={`check-anim ${
                compact ? "w-3 h-3" : "w-3.5 h-3.5 sm:w-4 sm:h-4"
              } rounded-full bg-white/20 flex items-center justify-center shrink-0`}
            >
              <Check className={`${compact ? "w-2 h-2" : "w-2.5 h-2.5"} text-white stroke-[2.5]`} />
            </div>
            <span className={`${compact ? "text-[7.5px]" : "text-[9px] sm:text-[10.5px]"} text-white/60 font-semibold`}>
              Payment processed · 0.3s
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/[0.07] my-1" />

        {/* ── FEATURE 3: Smart Reminders ── */}
        <div className={`${compact ? "my-1" : "my-1.5 sm:my-2"}`}>
          <div className="mb-1.5 text-left">
            <p className={`${compact ? "text-[10px]" : "text-xs sm:text-[14px]"} font-bold text-white leading-tight`}>
              Smart Reminders
            </p>
            <p className={`${compact ? "text-[7.5px]" : "text-[9.5px] sm:text-[11px]"} text-white/50 leading-tight mt-0.5`}>
              AI-timed alerts before due dates · never miss a payment.
            </p>
          </div>

          <div
            className={`flex items-start gap-2 sm:gap-2.5 ${
              compact ? "p-2 rounded-xl" : "p-2.5 sm:p-3 rounded-2xl"
            } bg-white/[0.07] border border-white/10 shadow-md text-left`}
          >
            <div
              className={`relative ${
                compact ? "w-7 h-7 rounded-lg" : "w-8 h-8 sm:w-9 sm:h-9 rounded-xl"
              } bg-white/10 flex items-center justify-center shrink-0`}
            >
              <Bell className={`bell-anim ${compact ? "w-3.5 h-3.5" : "w-4 h-4 sm:w-4.5 sm:h-4.5"} text-white stroke-[1.8]`} />
              <div
                className={`dot-blink absolute top-1 right-1 ${
                  compact ? "w-1.5 h-1.5" : "w-2 h-2"
                } rounded-full bg-white border border-[#07070a]`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className={`${compact ? "text-[9px]" : "text-[10.5px] sm:text-[12px]"} font-bold text-white leading-tight`}>
                  Bill due in 2 days
                </p>
                <span className={`${compact ? "text-[7px]" : "text-[8px] sm:text-[9px]"} text-white/40 font-medium`}>
                  Now
                </span>
              </div>
              <p className={`${compact ? "text-[8px]" : "text-[9px] sm:text-[10.5px]"} text-white/60 mb-2 leading-tight truncate`}>
                HDFC Regalia ₹81,320 · earn CI Points.
              </p>
              <div className="flex gap-1.5 flex-wrap">
                <button
                  className={`${
                    compact ? "px-2 py-0.5 text-[7.5px]" : "px-3 py-1 text-[9px] sm:text-[10px]"
                  } rounded-full bg-white text-[#07070a] font-bold shadow-md cursor-pointer border-none`}
                >
                  ✓ Pay &amp; Earn
                </button>
                <button
                  className={`${
                    compact ? "px-2 py-0.5 text-[7.5px]" : "px-3 py-1 text-[9px] sm:text-[10px]"
                  } rounded-full bg-white/10 border border-white/15 text-white/50 font-medium cursor-pointer`}
                >
                  Remind Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
