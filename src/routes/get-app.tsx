import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import * as QRCode from "qrcode";
import { Cikka3DLogo } from "../components/Cikka3DLogo";

export const Route = createFileRoute("/get-app")({
  head: () => ({
    meta: [
      { title: "Download Cikka - Super Money App" },
      {
        name: "description",
        content: "Scan the QR code to download Cikka for iOS and Android.",
      },
    ],
  }),
  component: GetAppPage,
});

export function GetAppPage() {
  const [qrSvg, setQrSvg] = useState<string>("");

  const playStoreUrl =
    "https://play.google.com/store/apps/details?id=com.cikka.app";
  const appStoreUrl =
    "https://apps.apple.com/app/cikka/idcom.cikka.app";
  const universalDownloadUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/get-app`
      : "https://cikka.club/get-app";

  useEffect(() => {
    QRCode.toString(
      universalDownloadUrl,
      {
        type: "svg",
        margin: 1,
        color: {
          dark: "#0b1324",
          light: "#ffffff",
        },
        errorCorrectionLevel: "M",
      },
      (err, svgString) => {
        if (!err && svgString) {
          setQrSvg(svgString);
        }
      }
    );
  }, [universalDownloadUrl]);

  return (
    <div className="min-h-screen w-full bg-[#f4f6fa] text-slate-900 flex flex-col justify-between selection:bg-purple-500/20 antialiased overflow-x-hidden select-none">
      {/* Top Bar with Cikka 3D Logo (matching landing page) */}
      <header className="w-full flex items-center px-6 sm:px-12 md:px-16 py-4 sm:py-5 z-20 shrink-0">
        <Link
          to="/"
          className="inline-flex items-center group transition-transform duration-200 hover:scale-105 cursor-pointer select-none"
          aria-label="Cikka home"
        >
          <Cikka3DLogo
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
          />
        </Link>
      </header>

      {/* Main Content Showcase: Phone Mockup on Left + QR & Store Badges on Right */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-10 py-6 sm:py-8 md:py-0 flex items-center justify-center">
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-24 xl:gap-28 my-auto">
          {/* ========================================================= */}
          {/* LEFT: Authentic Realistic Black Phone Frame  */}
          {/* ========================================================= */}
          <div className="relative flex-shrink-0 group">
            {/* Left Side Buttons: Action Button + Volume Up + Volume Down */}
            <div className="absolute -left-[3px] top-[90px] w-[3px] h-[22px] bg-[#272730] rounded-l-[2px] shadow-sm" />
            <div className="absolute -left-[3px] top-[125px] w-[3px] h-[38px] bg-[#272730] rounded-l-[2px] shadow-sm" />
            <div className="absolute -left-[3px] top-[172px] w-[3px] h-[38px] bg-[#272730] rounded-l-[2px] shadow-sm" />

            {/* Right Side Button: Power Button */}
            <div className="absolute -right-[3px] top-[135px] w-[3px] h-[55px] bg-[#272730] rounded-r-[2px] shadow-sm" />

            {/* Phone Outer Chassis in Titanium Black */}
            <div className="relative w-[220px] xs:w-[245px] sm:w-[270px] md:w-[285px] h-[440px] xs:h-[480px] sm:h-[520px] md:h-[550px] bg-gradient-to-b from-[#2e2e38] via-[#15151c] to-[#2e2e38] rounded-[44px] sm:rounded-[48px] p-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_25px_60px_-12px_rgba(0,0,0,0.45),0_12px_28px_-6px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-1">
              
              {/* Black Inner Bezel Ring */}
              <div className="relative w-full h-full bg-[#08080c] rounded-[41px] sm:rounded-[45px] p-[6px] sm:p-[7px] flex flex-col overflow-hidden">
                
                {/* Phone Screen Display */}
                <div className="relative w-full h-full bg-white rounded-[35px] sm:rounded-[39px] overflow-hidden flex flex-col justify-between shadow-[inset_0_0_8px_rgba(0,0,0,0.06)] border border-slate-200/50">
                  
                  {/* Top Status Bar & Dynamic Island */}
                  <div className="relative z-30 w-full flex items-center justify-between text-slate-800 text-[9px] sm:text-[10px] font-semibold px-4 pt-2.5 pb-1 select-none pointer-events-none">
                    {/* Time */}
                    <span className="font-semibold text-slate-900 tracking-tight">9:41</span>

                    {/* Dynamic Island with camera & sensors */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-2 w-16 sm:w-18 h-3.5 sm:h-4 bg-black rounded-full flex items-center justify-between px-2 shadow-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1c1c24] border border-white/10" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0c0c16] border border-white/10" />
                    </div>

                    {/* Status Icons: Signal, WiFi, Battery */}
                    <div className="flex items-center gap-1 text-slate-900">
                      {/* Signal Bars */}
                      <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                        <rect x="2" y="14" width="3" height="8" rx="1" />
                        <rect x="7" y="10" width="3" height="12" rx="1" />
                        <rect x="12" y="6" width="3" height="16" rx="1" />
                        <rect x="17" y="2" width="3" height="20" rx="1" />
                      </svg>
                      {/* WiFi */}
                      <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
                      </svg>
                      {/* Battery */}
                      <div className="w-3.5 h-2 border border-slate-900 rounded-[2px] p-[0.5px] flex items-center">
                        <div className="h-full w-2 bg-slate-900 rounded-[0.5px]" />
                      </div>
                    </div>
                  </div>

                  {/* Center Screen Content: Vibrant Purple Cikka Logo + Label */}
                  <div className="flex-1 flex flex-col items-center justify-center my-auto">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center transition-transform duration-300 hover:scale-105">
                      <img
                        src="/favicon.svg"
                        alt="Cikka Purple Logo"
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-sm select-none"
                      />
                    </div>
                    <span className="mt-4 sm:mt-5 text-[17px] sm:text-[19px] font-bold text-[#0c1a30] tracking-tight select-none">
                      Cikka
                    </span>
                  </div>

                  {/* Home Indicator Bar */}
                  <div className="w-full pb-2 flex justify-center pointer-events-none select-none">
                    <div className="w-24 sm:w-28 h-1 bg-slate-300 rounded-full" />
                  </div>

                  {/* Subtle Screen Glass Sheen */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 rounded-[35px] sm:rounded-[39px]" />
                </div>
              </div>
            </div>

            {/* Subtle Grounding Floor Shadow */}
            <div className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 w-[88%] h-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.28)_0%,transparent_70%)] blur-lg" />
          </div>

          {/* ========================================================= */}
          {/* RIGHT: Heading, QR Code, OR Divider, Store Badges */}
          {/* ========================================================= */}
          <div className="flex flex-col items-center text-center max-w-sm sm:max-w-md w-full select-none">
            {/* Headline: 2 lines */}
            <h1 className="text-2xl sm:text-[34px] lg:text-[38px] font-extrabold text-[#0c1a30] tracking-[-0.03em] leading-[1.18] sm:leading-[1.15]">
              Scan to download
              <br />
              the app
            </h1>

            {/* QR Code Card */}
            <div className="relative mt-6 sm:mt-7 p-3 sm:p-3.5 bg-white rounded-2xl shadow-[0_6px_24px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] border border-slate-100 flex items-center justify-center overflow-hidden">
              {qrSvg ? (
                <div
                  className="w-32 h-32 sm:w-40 sm:h-40 [&>svg]:w-full [&>svg]:h-full filter blur-[7px] opacity-40 select-none pointer-events-none"
                  dangerouslySetInnerHTML={{ __html: qrSvg }}
                />
              ) : (
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-slate-50 filter blur-[7px] rounded-lg" />
              )}

              {/* Overlay: Launching on this Diwali */}
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <span className="text-sm sm:text-[15px] font-bold text-black tracking-tight leading-snug">
                  Launching on this Diwali
                </span>
              </div>
            </div>

            {/* OR Divider Line */}
            <div className="w-full max-w-[260px] sm:max-w-[290px] flex items-center justify-center gap-3 my-5 sm:my-6">
              <div className="flex-1 h-[1px] bg-slate-200" />
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                OR
              </span>
              <div className="flex-1 h-[1px] bg-slate-200" />
            </div>

            {/* App Store & Google Play Download Buttons */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {/* Apple App Store Button */}
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-black hover:bg-neutral-900 active:scale-95 text-white rounded-lg sm:rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.18)] transition-all duration-200 cursor-pointer"
              >
                {/* Apple Icon */}
                <img
                  src="/apple logo.png"
                  alt="Apple Logo"
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain shrink-0"
                />
                <div className="flex flex-col text-left">
                  <span className="text-[9px] sm:text-[10px] leading-tight text-slate-300 font-normal">
                    Download on
                  </span>
                  <span className="text-[13px] sm:text-[14px] leading-none font-semibold text-white tracking-tight pt-0.5">
                    App Store
                  </span>
                </div>
              </a>

              {/* Google Play Store Button */}
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-black hover:bg-neutral-900 active:scale-95 text-white rounded-lg sm:rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.18)] transition-all duration-200 cursor-pointer"
              >
                {/* Google Play Store Icon */}
                <img
                  src="/playstore logo.png"
                  alt="Google Play Logo"
                  className="w-5 h-5 sm:w-5.5 sm:h-5.5 object-contain shrink-0"
                />
                <div className="flex flex-col text-left">
                  <span className="text-[9px] sm:text-[10px] leading-tight text-slate-300 font-normal">
                    Download on
                  </span>
                  <span className="text-[13px] sm:text-[14px] leading-none font-semibold text-white tracking-tight pt-0.5">
                    Google play
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Spacer to balance vertical alignment */}
      <div className="h-6 shrink-0" />
    </div>
  );
}
