import React from "react";
import { ArrowRight, Check, Bell } from "lucide-react";

interface PhoneScreen3FeaturesProps {
  compact?: boolean;
}

export function PhoneScreen3Features({ compact = false }: PhoneScreen3FeaturesProps) {
  return (
    <div
      className="relative w-full h-full flex flex-col justify-start select-none overflow-hidden text-left"
      style={{
        background:
          "radial-gradient(circle at 80% 8%, rgba(192,132,252,0.25) 0%, transparent 55%), linear-gradient(180deg, #3d1a6c 0%, #29104c 32%, #140728 65%, #07030e 100%)",
      }}
    >
      <style>{`
        @keyframes tapPulse {
          0%   { transform: scale(1);   box-shadow: 0 0 0 0 rgba(168,85,247,0.55); }
          60%  { transform: scale(0.93);box-shadow: 0 0 0 10px rgba(168,85,247,0); }
          100% { transform: scale(1);   box-shadow: 0 0 0 0 rgba(168,85,247,0); }
        }
        @keyframes ripple {
          0%   { transform: scale(0.7); opacity: 0.7; }
          100% { transform: scale(1.9); opacity: 0; }
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

      {/* Safe Area Clearance */}
      <div className="h-8 sm:h-9 shrink-0 pointer-events-none" />

      {/* Content Container - Natural Compact Layout matching 2nd screenshot */}
      <div className="w-full px-3.5 sm:px-4.5 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="pt-0.5 pb-2 sm:pb-2.5">
          <p className="text-[9px] sm:text-[9.5px] font-bold tracking-[0.14em] text-white/50 uppercase mb-0.5">
            Built for Speed
          </p>
          <h2 className="text-[19px] sm:text-[21px] font-extrabold text-white font-['Poppins',sans-serif] leading-[1.15] m-0 tracking-tight">
            Everything in<br />One Tap.
          </h2>
        </div>

        {/* ── FEATURE 1: One-Click Order ── */}
        <div className="mb-1.5 sm:mb-2">
          <div className="mb-1">
            <p className="text-[11.5px] sm:text-[12.5px] font-bold text-white leading-tight m-0">
              One-Click Order
            </p>
            <p className="text-[8.5px] sm:text-[9.5px] text-white/50 leading-tight mt-0.5 m-0">
              Saved address &amp; payment · order placed instantly.
            </p>
          </div>

          <div className="flex items-center justify-between p-2 sm:p-2.5 bg-white/[0.06] border border-white/[0.08] rounded-[13px] sm:rounded-[15px] mb-1 shadow-sm">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-[8px] sm:rounded-[9px] overflow-hidden bg-[#09090b] border border-white/10 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=200&q=80"
                  alt="Designer Silk Dress"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[10.5px] sm:text-[11.5px] font-bold text-white truncate leading-tight m-0">
                  Designer Silk Dress
                </p>
                <p className="text-[8.5px] sm:text-[9.5px] text-white/50 mt-0.5 truncate m-0">
                  ₹7,500 · Express Delivery
                </p>
              </div>
            </div>

            <div className="relative w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 shrink-0 flex items-center justify-center ml-2">
              <div className="ripple-ring absolute inset-0 rounded-full border-[1.2px] border-white/40 pointer-events-none" />
              <button className="tap-btn-anim w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 rounded-full bg-white flex items-center justify-center shadow-[0_3px_8px_rgba(0,0,0,0.35)] cursor-pointer border-none p-0">
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#07070a] stroke-[2.4]" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pl-0.5">
            <div className="check-anim w-[12px] h-[12px] sm:w-[13px] sm:h-[13px] rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white stroke-[2.5]" />
            </div>
            <span className="text-[8.5px] sm:text-[9.5px] text-white/60 font-medium">
              Saved address · payment auto-applied
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/[0.06] my-1.5 sm:my-2" />

        {/* ── FEATURE 2: One-Click Payment ── */}
        <div className="mb-1.5 sm:mb-2">
          <div className="mb-1">
            <p className="text-[11.5px] sm:text-[12.5px] font-bold text-white leading-tight m-0">
              One-Click Payment
            </p>
            <p className="text-[8.5px] sm:text-[9.5px] text-white/50 leading-tight mt-0.5 m-0">
              Pay any bill instantly · no OTPs, redirects, or waiting.
            </p>
          </div>

          <div className="flex items-center justify-between p-2 sm:p-2.5 bg-white/[0.06] border border-white/[0.08] rounded-[13px] sm:rounded-[15px] mb-1 shadow-sm">
            <div>
              <p className="text-[7.5px] sm:text-[8px] text-white/45 uppercase tracking-[0.06em] font-semibold m-0">
                HDFC Regalia · Bill Due
              </p>
              <p className="text-[15px] sm:text-[16.5px] font-extrabold text-white font-['Poppins',sans-serif] tracking-[-0.3px] leading-tight mt-0.5 m-0">
                ₹81,320
              </p>
            </div>

            <div className="relative">
              <div className="ripple-ring absolute -inset-[2px] rounded-[9px] border-[1.2px] border-white/40 pointer-events-none" />
              <button className="tap-btn-anim px-3 sm:px-3.5 py-1.2 sm:py-1.5 rounded-[8px] sm:rounded-[9px] bg-white text-[#07070a] text-[9px] sm:text-[9.5px] font-bold tracking-[0.02em] shadow-[0_3px_8px_rgba(0,0,0,0.35)] cursor-pointer border-none">
                Pay Now
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pl-0.5">
            <div className="check-anim w-[12px] h-[12px] sm:w-[13px] sm:h-[13px] rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white stroke-[2.5]" />
            </div>
            <span className="text-[8.5px] sm:text-[9.5px] text-white/60 font-semibold">
              Payment processed · 0.3s
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/[0.06] my-1.5 sm:my-2" />

        {/* ── FEATURE 3: Smart Reminders ── */}
        <div>
          <div className="mb-1">
            <p className="text-[11.5px] sm:text-[12.5px] font-bold text-white leading-tight m-0">
              Smart Reminders
            </p>
            <p className="text-[8.5px] sm:text-[9.5px] text-white/50 leading-tight mt-0.5 m-0">
              AI-timed alerts before due dates · never miss a payment.
            </p>
          </div>

          <div className="flex items-start gap-2 p-2 sm:p-2.5 bg-white/[0.06] border border-white/[0.08] rounded-[13px] sm:rounded-[15px] shadow-sm">
            <div className="relative w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-[8px] sm:rounded-[9px] bg-white/[0.08] flex items-center justify-center shrink-0">
              <Bell className="bell-anim w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[1.8]" />
              <div className="dot-blink absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white border border-[#07070a]" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-[10px] sm:text-[10.5px] font-bold text-white leading-tight truncate m-0">
                  Bill due in 2 days
                </p>
                <span className="text-[7.5px] sm:text-[8px] text-white/40 font-medium shrink-0 ml-1">
                  Now
                </span>
              </div>
              <p className="text-[8.5px] sm:text-[9.5px] text-white/55 leading-tight mb-1.5 truncate m-0">
                HDFC Regalia ₹81,320 · earn CI Points.
              </p>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button className="px-2.5 sm:px-3 py-1 rounded-full bg-white text-[#07070a] text-[8px] sm:text-[8.5px] font-bold shadow-[0_3px_6px_rgba(0,0,0,0.3)] cursor-pointer border-none flex items-center gap-0.5">
                  <span>✓</span> Pay &amp; Earn
                </button>
                <button className="px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/45 text-[8px] sm:text-[8.5px] font-semibold cursor-pointer">
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
