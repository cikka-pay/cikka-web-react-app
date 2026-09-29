import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// =========================================================================
// ACCURATE BRAND LOGO ICONS FOR INNER & OUTER ORBITS
// =========================================================================

// --- INNER CIRCLE LOGOS (10 Brands) ---

function SwiggyIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#FC8019] flex items-center justify-center shadow-lg p-2.5">
      <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
        <path d="M50 12 C34 12 24 22 24 38 C24 53 36 65 42 74 C47 81 50 88 50 88 C50 88 53 81 58 74 C64 65 76 53 76 38 C76 22 66 12 50 12 Z M50 24 C57 24 62 29 62 36 C62 44 56 48 50 54 C46 50 42 46 42 40 C42 36 45 33 49 33 C53 33 55 35 55 38 L60 38 C60 33 56 29 50 29 C44 29 38 34 38 41 C38 48 44 53 49 57 C53 53 58 48 58 41 C58 36 54 32 50 32 C46 32 43 35 43 38 L38 38 C38 30 43 24 50 24 Z" />
      </svg>
    </div>
  );
}

function ZomatoIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#E23744] flex items-center justify-center shadow-lg p-1.5 select-none">
      <span className="text-white font-black text-xs xs:text-sm tracking-tighter italic font-sans">
        zomato
      </span>
    </div>
  );
}

function McDonaldsIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#DA291C] flex items-center justify-center shadow-lg p-2">
      <svg viewBox="0 0 100 100" className="w-full h-full fill-[#FFC72C]">
        <path d="M22 82 L22 52 C22 36 31 24 40 24 C48 24 50 34 50 42 C50 34 52 24 60 24 C69 24 78 36 78 52 L78 82 L70 82 L70 52 C70 40 64 32 58 32 C52 32 47 40 47 52 L47 82 L39 82 L39 52 C39 40 33 32 27 32 C21 32 16 40 16 52 L16 82 Z" />
      </svg>
    </div>
  );
}

function DominosIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#006491] flex items-center justify-center shadow-lg p-2">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g transform="rotate(45 50 50)">
          <rect x="25" y="15" width="50" height="34" rx="4" fill="#E31837" />
          <circle cx="50" cy="32" r="5" fill="white" />
          <rect x="25" y="51" width="50" height="34" rx="4" fill="#006491" />
          <circle cx="38" cy="68" r="4.5" fill="white" />
          <circle cx="62" cy="68" r="4.5" fill="white" />
        </g>
      </svg>
    </div>
  );
}

function StarbucksIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#006241] flex items-center justify-center shadow-lg p-1.5">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="44" fill="#006241" stroke="white" strokeWidth="3" />
        <circle cx="50" cy="50" r="30" fill="white" />
        <circle cx="50" cy="46" r="14" fill="#006241" />
        <path d="M38 64 C42 58 58 58 62 64 C60 74 40 74 38 64 Z" fill="#006241" />
        <polygon points="50,22 53,29 60,30 55,35 56,42 50,38 44,42 45,35 40,30 47,29" fill="white" />
      </svg>
    </div>
  );
}

function BookMyShowIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#C4242B] flex items-center justify-center shadow-lg p-1 select-none">
      <div className="flex flex-col items-center leading-none">
        <span className="text-white font-black text-[11px] xs:text-xs tracking-tight">book</span>
        <span className="text-white/90 font-bold text-[8px] tracking-wider uppercase">myshow</span>
      </div>
    </div>
  );
}

function NetflixIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#000000] border border-white/10 flex items-center justify-center shadow-lg p-2.5">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M28 15 L40 15 L40 85 L28 85 Z" fill="#B81D24" />
        <path d="M60 15 L72 15 L72 85 L60 85 Z" fill="#B81D24" />
        <path d="M28 15 L64 85 L72 85 L36 15 Z" fill="#E50914" />
      </svg>
    </div>
  );
}

function SpotifyIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#121212] border border-white/10 flex items-center justify-center shadow-lg p-2.5">
      <svg viewBox="0 0 100 100" className="w-full h-full fill-[#1ed760]">
        <circle cx="50" cy="50" r="44" fill="#1ed760" />
        <path d="M28 38 C42 34 62 35 74 42" stroke="#121212" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M31 50 C43 47 59 48 69 54" stroke="#121212" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M34 62 C43 59 56 60 64 65" stroke="#121212" strokeWidth="5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

function UberIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#000000] border border-white/15 flex items-center justify-center shadow-lg p-1.5 select-none">
      <span className="text-white font-sans font-bold text-xs xs:text-sm tracking-tight">Uber</span>
    </div>
  );
}

function MakeMyTripIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-gradient-to-br from-[#EA2330] to-[#0A2540] flex items-center justify-center shadow-lg p-1 select-none">
      <div className="flex flex-col items-center leading-none text-center">
        <span className="text-white font-black text-[10px] xs:text-[11px] tracking-tight">make</span>
        <span className="text-[#FFB81C] font-black text-[10px] xs:text-[11px] tracking-tight">mytrip</span>
      </div>
    </div>
  );
}

// --- OUTER CIRCLE LOGOS (17 Brands) ---

function KFCIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#E4002B] flex items-center justify-center shadow-lg p-1.5 select-none border border-white/10">
      <span className="text-white font-black text-[11px] xs:text-xs tracking-widest font-sans">KFC</span>
    </div>
  );
}

function PVRInoxIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#0a0f1d] border border-amber-500/40 flex items-center justify-center shadow-lg p-1 select-none">
      <div className="flex flex-col items-center leading-none">
        <span className="text-[#FFB81C] font-black text-[10px] xs:text-[11px] tracking-wider">PVR</span>
        <span className="text-white font-bold text-[8px] tracking-wider uppercase">INOX</span>
      </div>
    </div>
  );
}

function OYOIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#EE2E24] flex items-center justify-center shadow-lg p-1.5 select-none">
      <span className="text-white font-black text-xs xs:text-sm tracking-tighter font-sans">OYO</span>
    </div>
  );
}

function LenskartIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#000042] border border-cyan-400/30 flex items-center justify-center shadow-lg p-2">
      <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-white" strokeWidth="7">
        <circle cx="34" cy="50" r="16" />
        <circle cx="66" cy="50" r="16" />
        <line x1="48" y1="46" x2="52" y2="46" strokeWidth="5" />
      </svg>
    </div>
  );
}

function TanishqIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#5C061E] border border-amber-400/40 flex items-center justify-center shadow-lg p-1 select-none">
      <span className="text-[#FFD700] font-serif font-bold text-[9px] xs:text-[10px] tracking-wider">
        TANISHQ
      </span>
    </div>
  );
}

function CultfitIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#111111] border border-[#FF3278]/40 flex items-center justify-center shadow-lg p-1 select-none">
      <div className="flex flex-col items-center leading-none">
        <span className="text-[#FF3278] font-black text-xs xs:text-sm tracking-tighter">cult</span>
        <span className="text-white font-medium text-[8px] tracking-wider">.fit</span>
      </div>
    </div>
  );
}

function RapidoIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#F9D616] flex items-center justify-center shadow-lg p-1.5 select-none">
      <span className="text-[#1E293B] font-black text-[10px] xs:text-xs tracking-tight font-sans">
        rapido
      </span>
    </div>
  );
}

function YouTubePremiumIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#0f0f0f] border border-red-500/30 flex items-center justify-center shadow-lg p-2">
      <div className="w-6 h-4.5 bg-[#FF0000] rounded-sm flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-white ml-0.5">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </div>
    </div>
  );
}

function SonyLIVIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-gradient-to-br from-[#0c0d1e] to-[#1e1b4b] border border-blue-400/30 flex items-center justify-center shadow-lg p-1 select-none">
      <div className="flex flex-col items-center leading-none">
        <span className="text-white font-bold text-[8px] tracking-widest uppercase">SONY</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-fuchsia-400 font-black text-[10px] xs:text-xs tracking-wider">
          LIV
        </span>
      </div>
    </div>
  );
}

function ZEE5Icon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#8230C6] flex items-center justify-center shadow-lg p-1.5 select-none">
      <span className="text-white font-black text-[11px] xs:text-xs tracking-tight">ZEE5</span>
    </div>
  );
}

function TataPlayIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-gradient-to-br from-[#E00069] to-[#7B1FA2] flex items-center justify-center shadow-lg p-1 select-none">
      <div className="flex flex-col items-center leading-none text-center">
        <span className="text-white/90 text-[7px] font-bold tracking-widest uppercase">TATA</span>
        <span className="text-white font-black text-[10px] xs:text-[11px] tracking-tight">play</span>
      </div>
    </div>
  );
}

function IndiGoIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#001B94] flex items-center justify-center shadow-lg p-1.5 select-none border border-blue-400/20">
      <span className="text-white font-black text-[10px] xs:text-[11px] tracking-tight">IndiGo</span>
    </div>
  );
}

function AirIndiaIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#ED1B24] flex items-center justify-center shadow-lg p-1 select-none">
      <div className="flex flex-col items-center leading-none text-center">
        <span className="text-amber-300 font-serif font-black text-[8px] tracking-wider uppercase">AIR INDIA</span>
      </div>
    </div>
  );
}

function IRCTCIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#1E3A8A] flex items-center justify-center shadow-lg p-1.5 select-none border border-white/20">
      <span className="text-white font-black text-[10px] xs:text-xs tracking-wider font-mono">IRCTC</span>
    </div>
  );
}

function CleartripIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#F26722] flex items-center justify-center shadow-lg p-1 select-none">
      <span className="text-white font-bold text-[9px] xs:text-[10px] tracking-tight">cleartrip</span>
    </div>
  );
}

function YatraIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#EA2330] flex items-center justify-center shadow-lg p-1.5 select-none">
      <span className="text-white font-bold italic text-[11px] xs:text-xs tracking-tight font-sans">
        yatra
      </span>
    </div>
  );
}

function JioHotstarIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-gradient-to-br from-[#0c1638] via-[#023e8a] to-[#0077b6] border border-cyan-400/40 flex items-center justify-center shadow-lg p-1 select-none">
      <div className="flex flex-col items-center leading-none text-center">
        <span className="text-cyan-300 font-black text-[8px] tracking-wider uppercase">JIO</span>
        <span className="text-white font-black text-[10px] xs:text-[11px] tracking-tight">hotstar</span>
      </div>
    </div>
  );
}

// =========================================================================
// MATHEMATICALLY EXACT CIRCLE POSITION HELPER
// Guaranteed 100% precision: every item center lies EXACTLY on the circle circumference
// =========================================================================

function getExactCircleCoords(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const left = (50 + 50 * Math.cos(rad)).toFixed(4);
  const top = (50 + 50 * Math.sin(rad)).toFixed(4);
  return { left: `${left}%`, top: `${top}%` };
}

interface OrbitLogoDef {
  id: string;
  angle: number;
  tilt: number;
  opacity: number;
  component: React.ReactNode;
}

// 1. INNER CIRCLE (10 Brands): Locked onto inner circle track
const INNER_CIRCLE_LOGOS: OrbitLogoDef[] = [
  { id: "in-swiggy", angle: -90, tilt: 0, opacity: 0.98, component: <SwiggyIcon /> },
  { id: "in-zomato", angle: -90 + (360 / 10) * 1, tilt: 36, opacity: 0.98, component: <ZomatoIcon /> },
  { id: "in-mcdonalds", angle: -90 + (360 / 10) * 2, tilt: 72, opacity: 0.98, component: <McDonaldsIcon /> },
  { id: "in-dominos", angle: -90 + (360 / 10) * 3, tilt: 72, opacity: 0.98, component: <DominosIcon /> },
  { id: "in-starbucks", angle: -90 + (360 / 10) * 4, tilt: 36, opacity: 0.98, component: <StarbucksIcon /> },
  { id: "in-bookmyshow", angle: -90 + (360 / 10) * 5, tilt: 0, opacity: 0.98, component: <BookMyShowIcon /> },
  { id: "in-netflix", angle: -90 + (360 / 10) * 6, tilt: -36, opacity: 0.98, component: <NetflixIcon /> },
  { id: "in-spotify", angle: -90 + (360 / 10) * 7, tilt: -72, opacity: 0.98, component: <SpotifyIcon /> },
  { id: "in-uber", angle: -90 + (360 / 10) * 8, tilt: -72, opacity: 0.98, component: <UberIcon /> },
  { id: "in-makemytrip", angle: -90 + (360 / 10) * 9, tilt: -36, opacity: 0.98, component: <MakeMyTripIcon /> },
];

// 2. OUTER CIRCLE (17 Brands): Locked onto outer circle track
const OUTER_CIRCLE_LOGOS: OrbitLogoDef[] = [
  { id: "out-kfc", angle: -90, tilt: 0, opacity: 0.88, component: <KFCIcon /> },
  { id: "out-pvr", angle: -90 + (360 / 17) * 1, tilt: 21, opacity: 0.88, component: <PVRInoxIcon /> },
  { id: "out-oyo", angle: -90 + (360 / 17) * 2, tilt: 42, opacity: 0.88, component: <OYOIcon /> },
  { id: "out-lenskart", angle: -90 + (360 / 17) * 3, tilt: 63, opacity: 0.88, component: <LenskartIcon /> },
  { id: "out-tanishq", angle: -90 + (360 / 17) * 4, tilt: 84, opacity: 0.88, component: <TanishqIcon /> },
  { id: "out-cultfit", angle: -90 + (360 / 17) * 5, tilt: 84, opacity: 0.88, component: <CultfitIcon /> },
  { id: "out-rapido", angle: -90 + (360 / 17) * 6, tilt: 63, opacity: 0.88, component: <RapidoIcon /> },
  { id: "out-ytpremium", angle: -90 + (360 / 17) * 7, tilt: 42, opacity: 0.88, component: <YouTubePremiumIcon /> },
  { id: "out-sonyliv", angle: -90 + (360 / 17) * 8, tilt: 21, opacity: 0.88, component: <SonyLIVIcon /> },
  { id: "out-zee5", angle: -90 + (360 / 17) * 9, tilt: 0, opacity: 0.88, component: <ZEE5Icon /> },
  { id: "out-tataplay", angle: -90 + (360 / 17) * 10, tilt: -21, opacity: 0.88, component: <TataPlayIcon /> },
  { id: "out-indigo", angle: -90 + (360 / 17) * 11, tilt: -42, opacity: 0.88, component: <IndiGoIcon /> },
  { id: "out-airindia", angle: -90 + (360 / 17) * 12, tilt: -63, opacity: 0.88, component: <AirIndiaIcon /> },
  { id: "out-irctc", angle: -90 + (360 / 17) * 13, tilt: -84, opacity: 0.88, component: <IRCTCIcon /> },
  { id: "out-cleartrip", angle: -90 + (360 / 17) * 14, tilt: -84, opacity: 0.88, component: <CleartripIcon /> },
  { id: "out-yatra", angle: -90 + (360 / 17) * 15, tilt: -63, opacity: 0.88, component: <YatraIcon /> },
  { id: "out-jiohotstar", angle: -90 + (360 / 17) * 16, tilt: -42, opacity: 0.88, component: <JioHotstarIcon /> },
];

// =========================================================================
// MAIN PINNED WAITLIST SECTION COMPONENT (SCROLL-DRIVEN 3D ZOOM EXPERIENCE)
// =========================================================================

export function WaitlistSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progression across the multi-vh pinned track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Zero-lag spring synchronized with Lenis inertia
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 32,
    stiffness: 140,
    mass: 0.1,
  });

  // 1. OUTER CIRCLE ZOOM-IN TRANSFORMS
  const outerScale = useTransform(smoothProgress, [0, 0.25, 0.45, 0.55], [0.72, 1.0, 1.9, 3.4]);
  const outerOpacity = useTransform(smoothProgress, [0, 0.15, 0.38, 0.48, 1], [0.85, 1.0, 0.95, 0.0, 0.0]);
  const outerZ = useTransform(smoothProgress, [0, 0.55], [0, 280]);

  // 2. INNER CIRCLE ZOOM-IN TRANSFORMS
  const innerScale = useTransform(smoothProgress, [0, 0.25, 0.45, 0.55], [0.78, 1.0, 1.7, 3.0]);
  const innerOpacity = useTransform(smoothProgress, [0, 0.15, 0.38, 0.48, 1], [0.9, 1.0, 0.95, 0.0, 0.0]);
  const innerZ = useTransform(smoothProgress, [0, 0.55], [0, 180]);

  // 3. CENTER CIKKA LOGO (STABLE DURING FIRST PHASE)
  const cikkaLogoOpacity = useTransform(smoothProgress, [0, 0.1, 0.38, 0.48], [1, 1, 1, 0]);
  const cikkaLogoScale = useTransform(smoothProgress, [0, 0.35, 0.48], [1.0, 1.06, 0.82]);
  const cikkaLogoBlur = useTransform(smoothProgress, [0, 0.38, 0.48], ["blur(0px)", "blur(0px)", "blur(12px)"]);

  // 4. CONVERTED TEXT: "Rewards that reshape the daily life" (POPPINS FONT)
  const textOpacity = useTransform(smoothProgress, [0.46, 0.55, 0.92, 1.0], [0, 1, 1, 0.92]);
  const textScale = useTransform(smoothProgress, [0.46, 0.55, 0.92, 1.0], [0.88, 1.0, 1.03, 1.0]);
  const textY = useTransform(smoothProgress, [0.46, 0.55, 0.92, 1.0], [24, 0, 0, -8]);
  const textBlur = useTransform(smoothProgress, [0.46, 0.55, 0.92, 1.0], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(0px)"]);

  // 5. AMBIENT ATMOSPHERIC GLOW DYNAMICS
  const glowScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1.3, 1.6]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.45, 0.85, 0.95]);

  // 6. CENTER CARD HERO ZOOM & PERSPECTIVE POP
  const cardScale = useTransform(smoothProgress, [0, 0.08, 0.92, 1], [0.97, 1.0, 1.0, 0.97]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#f4f5f8] select-none"
      style={{ height: "360vh" }}
    >
      {/* Sticky Viewport Pinned Viewport with Navbar Clearance */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center pt-[72px] sm:pt-[84px] pb-10 sm:pb-16 px-4 sm:px-8 md:px-12 overflow-hidden">

        {/* Outer Showcase Card positioned cleanly with slightly vertically bigger height */}
        <motion.section
          style={{
            scale: cardScale,
            perspective: 1200,
          }}
          className="relative w-full max-w-[1400px] rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-[#0c0d12] border border-white/10 overflow-hidden h-[calc(100vh-120px)] max-h-[720px] sm:max-h-[760px] min-h-[540px] sm:min-h-[600px] flex flex-col items-center justify-center shadow-[0_30px_90px_rgba(0,0,0,0.95)] will-change-transform"
        >
          {/* Subtle Ambient Radial Glows expanding with scroll zoom */}
          <motion.div
            style={{
              scale: glowScale,
              opacity: glowOpacity,
            }}
            className="pointer-events-none absolute inset-0 z-0"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[950px] md:w-[1150px] h-[540px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.14)_0%,rgba(147,51,234,0.09)_40%,transparent_75%)] blur-[100px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#0c0d12_85%)]" />
          </motion.div>

          {/* ========================================================================= */}
          {/* DUAL COUNTER-ROTATING CIRCULAR ORBITS WITH SCROLL ZOOM-IN (GPU ACCELERATED) */}
          {/* ========================================================================= */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden flex items-center justify-center">

            {/* LINE 2: OUTER CIRCLE TRACK (1:1 Ratio) — ZOOM-IN + ROTATING RIGHT */}
            <motion.div
              style={{
                scale: outerScale,
                opacity: outerOpacity,
                z: outerZ,
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
            >
              <div className="animate-orbit-cw w-[290px] h-[290px] xs:w-[380px] xs:h-[380px] sm:w-[680px] sm:h-[680px] md:w-[800px] md:h-[800px] lg:w-[940px] lg:h-[940px] rounded-full relative pointer-events-none">
                {OUTER_CIRCLE_LOGOS.map((app) => {
                  const coords = getExactCircleCoords(app.angle);
                  return (
                    <div
                      key={app.id}
                      style={{
                        left: coords.left,
                        top: coords.top,
                        opacity: app.opacity,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 will-change-transform"
                    >
                      {/* Counter-rotation to keep logo upright with its tangent tilt */}
                      <div
                        style={{ transform: `rotate(${app.tilt}deg)` }}
                        className="animate-orbit-logo-ccw flex items-center justify-center pointer-events-auto hover:scale-115 transition-transform"
                      >
                        <div className="w-7 h-7 xs:w-8.5 xs:h-8.5 sm:w-11 sm:h-11 md:w-12 md:h-12 drop-shadow-xl">
                          {app.component}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* LINE 1: INNER CIRCLE TRACK (1:1 Ratio) — ZOOM-IN + ROTATING LEFT */}
            <motion.div
              style={{
                scale: innerScale,
                opacity: innerOpacity,
                z: innerZ,
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
            >
              <div className="animate-orbit-ccw w-[190px] h-[190px] xs:w-[250px] xs:h-[250px] sm:w-[440px] sm:h-[440px] md:w-[540px] md:h-[540px] lg:w-[620px] lg:h-[620px] rounded-full relative pointer-events-none">
                {INNER_CIRCLE_LOGOS.map((app) => {
                  const coords = getExactCircleCoords(app.angle);
                  return (
                    <div
                      key={app.id}
                      style={{
                        left: coords.left,
                        top: coords.top,
                        opacity: app.opacity,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 will-change-transform"
                    >
                      {/* Counter-rotation to keep logo upright with its tangent tilt */}
                      <div
                        style={{ transform: `rotate(${app.tilt}deg)` }}
                        className="animate-orbit-logo-cw flex items-center justify-center pointer-events-auto hover:scale-115 transition-transform"
                      >
                        <div className="w-7.5 h-7.5 xs:w-9 xs:h-9 sm:w-12 sm:h-12 md:w-13 md:h-13 drop-shadow-xl">
                          {app.component}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

          </div>

          {/* ========================================================================= */}
          {/* CENTER VOID: CIKKA LOGO (STABLE) -> MORPHS TO POPPINS TEXT */}
          {/* ========================================================================= */}
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">

            {/* 1. Cikka Logo in the center of the void */}
            <motion.div
              style={{
                opacity: cikkaLogoOpacity,
                scale: cikkaLogoScale,
                filter: cikkaLogoBlur,
              }}
              className="absolute flex flex-col items-center justify-center pointer-events-none select-none will-change-transform"
            >
              <img
                src="/Cikka_Logo.png"
                alt="Cikka Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]"
              />
            </motion.div>

            {/* 2. Converted Text: "Rewards that reshape the daily life" into Poppins font */}
            <motion.div
              style={{
                opacity: textOpacity,
                scale: textScale,
                y: textY,
                filter: textBlur,
              }}
              className="absolute flex flex-col items-center justify-center text-center px-4 sm:px-12 max-w-4xl pointer-events-none select-none will-change-transform"
            >
              <h2
                style={{ fontFamily: "'Poppins', sans-serif" }}
                className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold tracking-tight text-white leading-[1.12] drop-shadow-[0_16px_40px_rgba(0,0,0,0.9)]"
              >
                Rewards that reshape <br className="hidden sm:inline" />
                the daily life
              </h2>
            </motion.div>

          </div>
        </motion.section>
      </div>
    </div>
  );
}
