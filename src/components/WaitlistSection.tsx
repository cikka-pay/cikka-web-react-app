import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// =========================================================================
// ACCURATE BRAND LOGO ICONS FOR INNER & OUTER ORBITS
// =========================================================================

// --- INNER CIRCLE LOGOS (10 Official Brand Logos) ---

function SwiggyIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-[#FC8019] flex items-center justify-center shadow-lg select-none">
      <img
        src="/logo/swiggy.png"
        alt="Swiggy"
        className="w-full h-full object-cover scale-[1.2] transform"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/logo/swiggy.jfif";
        }}
      />
    </div>
  );
}

function ZomatoIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-[#E23744] flex items-center justify-center shadow-lg select-none">
      <img
        src="/logo/zomato"
        alt="Zomato"
        className="w-full h-full object-cover scale-[1.3] transform"
      />
    </div>
  );
}

function McDonaldsIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-[#DA291C] flex items-center justify-center shadow-lg select-none">
      <img
        src="/logo/mcdonald"
        alt="McDonald's"
        className="w-full h-full object-cover scale-[1.22] transform"
      />
    </div>
  );
}

function DominosIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-[#006491] flex items-center justify-center shadow-lg select-none">
      <img
        src="/logo/dominons"
        alt="Domino's"
        className="w-full h-full object-cover scale-[1.25] transform"
      />
    </div>
  );
}

function StarbucksIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-[#006241] flex items-center justify-center shadow-lg select-none">
      <img
        src="/logo/Starbucks"
        alt="Starbucks"
        className="w-full h-full object-cover scale-[1.08] transform"
      />
    </div>
  );
}

function BookMyShowIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-[#E51837] flex items-center justify-center shadow-lg select-none">
      <img
        src="/logo/BookMyShow.svg"
        alt="BookMyShow"
        className="w-full h-full object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/logo/BookMyShow.jfif";
        }}
      />
    </div>
  );
}

function NetflixIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center shadow-lg select-none">
      <img
        src="/logo/Netflix"
        alt="Netflix"
        className="w-full h-full object-cover scale-[1.32] transform"
      />
    </div>
  );
}

function SpotifyIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-[#121212] flex items-center justify-center shadow-lg select-none">
      <img
        src="/logo/Spotify.jfif"
        alt="Spotify"
        className="w-full h-full object-cover scale-[1.04] transform"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/logo/spotify.svg";
        }}
      />
    </div>
  );
}

function UberIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center shadow-lg select-none">
      <img
        src="/logo/uber.jfif"
        alt="Uber"
        className="w-full h-full object-cover scale-[1.12] transform"
      />
    </div>
  );
}

function MakeMyTripIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center p-2 shadow-lg select-none">
      <img src="/logo/MakeMyTrip" alt="MakeMyTrip" className="w-full h-full object-contain" />
    </div>
  );
}

// --- OUTER CIRCLE LOGOS (17 Brands) ---

function KFCIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-[#E4002B] flex items-center justify-center shadow-lg select-none">
      <img
        src="/logo/kfc"
        alt="KFC"
        className="w-full h-full object-cover scale-[1.08] transform"
      />
    </div>
  );
}

function PVRInoxIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center shadow-lg select-none">
      <img
        src="/logo/pvr"
        alt="PVR INOX"
        className="w-full h-full object-cover scale-[1.05] transform"
      />
    </div>
  );
}

function OYOIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-[#EE2E24] flex items-center justify-center shadow-lg select-none">
      <img
        src="/logo/oyo.jfif"
        alt="OYO"
        className="w-full h-full object-cover scale-[1.08] transform"
      />
    </div>
  );
}

function LenskartIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-lg select-none">
      <img src="/logo/lenskart" alt="Lenskart" className="w-full h-full object-contain" />
    </div>
  );
}

function TanishqIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-[#4E1416] flex items-center justify-center shadow-lg select-none">
      <img
        src="/logo/Tanishq"
        alt="Tanishq"
        className="w-full h-full object-cover scale-[1.05] transform"
      />
    </div>
  );
}

function CultfitIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-lg select-none">
      <img src="/logo/Cult_fit" alt="Cult.fit" className="w-full h-full object-contain" />
    </div>
  );
}

function RapidoIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-[#F9D616] flex items-center justify-center shadow-lg p-1 select-none">
      <span className="text-[#1E293B] font-black text-[10px] xs:text-xs tracking-tight font-sans">
        rapido
      </span>
    </div>
  );
}

function YouTubePremiumIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-[#0f0f0f] border border-white/10 flex items-center justify-center shadow-lg p-2 select-none">
      <div className="w-6 h-4 bg-[#FF0000] rounded-[4px] flex items-center justify-center shadow">
        <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-white ml-0.5">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </div>
    </div>
  );
}

function SonyLIVIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center shadow-lg select-none">
      <img
        src="/logo/sonyliv"
        alt="SonyLIV"
        className="w-full h-full object-cover scale-[1.15] transform"
      />
    </div>
  );
}

function ZEE5Icon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-[#0c081e] flex items-center justify-center shadow-lg select-none">
      <img
        src="/logo/zee5"
        alt="ZEE5"
        className="w-full h-full object-cover scale-[1.15] transform"
      />
    </div>
  );
}

function TataPlayIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-lg select-none">
      <img src="/logo/tataplay" alt="Tata Play" className="w-full h-full object-contain" />
    </div>
  );
}

function IndiGoIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-lg select-none">
      <img src="/logo/IndiGo" alt="IndiGo" className="w-full h-full object-contain" />
    </div>
  );
}

function AirIndiaIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-lg select-none">
      <img src="/logo/Air India" alt="Air India" className="w-full h-full object-contain" />
    </div>
  );
}

function IRCTCIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-lg select-none">
      <img src="/logo/IRCTC" alt="IRCTC" className="w-full h-full object-contain" />
    </div>
  );
}

function CleartripIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-[#F26722] flex items-center justify-center shadow-lg select-none">
      <img
        src="/logo/Cleartrip"
        alt="Cleartrip"
        className="w-full h-full object-cover scale-[1.08] transform"
      />
    </div>
  );
}

function YatraIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-[#EA2330] flex items-center justify-center shadow-lg select-none">
      <img
        src="/logo/yatra"
        alt="Yatra"
        className="w-full h-full object-cover scale-[1.1] transform"
      />
    </div>
  );
}

function JioHotstarIcon() {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-[#0c1638] flex items-center justify-center shadow-lg select-none">
      <img
        src="/logo/JioHotstar"
        alt="JioHotstar"
        className="w-full h-full object-cover scale-[1.12] transform"
      />
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
  {
    id: "in-zomato",
    angle: -90 + (360 / 10) * 1,
    tilt: 36,
    opacity: 0.98,
    component: <ZomatoIcon />,
  },
  {
    id: "in-mcdonalds",
    angle: -90 + (360 / 10) * 2,
    tilt: 72,
    opacity: 0.98,
    component: <McDonaldsIcon />,
  },
  {
    id: "in-dominos",
    angle: -90 + (360 / 10) * 3,
    tilt: 72,
    opacity: 0.98,
    component: <DominosIcon />,
  },
  {
    id: "in-starbucks",
    angle: -90 + (360 / 10) * 4,
    tilt: 36,
    opacity: 0.98,
    component: <StarbucksIcon />,
  },
  {
    id: "in-bookmyshow",
    angle: -90 + (360 / 10) * 5,
    tilt: 0,
    opacity: 0.98,
    component: <BookMyShowIcon />,
  },
  {
    id: "in-netflix",
    angle: -90 + (360 / 10) * 6,
    tilt: -36,
    opacity: 0.98,
    component: <NetflixIcon />,
  },
  {
    id: "in-spotify",
    angle: -90 + (360 / 10) * 7,
    tilt: -72,
    opacity: 0.98,
    component: <SpotifyIcon />,
  },
  { id: "in-uber", angle: -90 + (360 / 10) * 8, tilt: -72, opacity: 0.98, component: <UberIcon /> },
  {
    id: "in-makemytrip",
    angle: -90 + (360 / 10) * 9,
    tilt: -36,
    opacity: 0.98,
    component: <MakeMyTripIcon />,
  },
];

// 2. OUTER CIRCLE (17 Brands): Locked onto outer circle track
const OUTER_CIRCLE_LOGOS: OrbitLogoDef[] = [
  { id: "out-kfc", angle: -90, tilt: 0, opacity: 0.88, component: <KFCIcon /> },
  {
    id: "out-pvr",
    angle: -90 + (360 / 17) * 1,
    tilt: 21,
    opacity: 0.88,
    component: <PVRInoxIcon />,
  },
  { id: "out-oyo", angle: -90 + (360 / 17) * 2, tilt: 42, opacity: 0.88, component: <OYOIcon /> },
  {
    id: "out-lenskart",
    angle: -90 + (360 / 17) * 3,
    tilt: 63,
    opacity: 0.88,
    component: <LenskartIcon />,
  },
  {
    id: "out-tanishq",
    angle: -90 + (360 / 17) * 4,
    tilt: 84,
    opacity: 0.88,
    component: <TanishqIcon />,
  },
  {
    id: "out-cultfit",
    angle: -90 + (360 / 17) * 5,
    tilt: 84,
    opacity: 0.88,
    component: <CultfitIcon />,
  },
  {
    id: "out-rapido",
    angle: -90 + (360 / 17) * 6,
    tilt: 63,
    opacity: 0.88,
    component: <RapidoIcon />,
  },
  {
    id: "out-ytpremium",
    angle: -90 + (360 / 17) * 7,
    tilt: 42,
    opacity: 0.88,
    component: <YouTubePremiumIcon />,
  },
  {
    id: "out-sonyliv",
    angle: -90 + (360 / 17) * 8,
    tilt: 21,
    opacity: 0.88,
    component: <SonyLIVIcon />,
  },
  { id: "out-zee5", angle: -90 + (360 / 17) * 9, tilt: 0, opacity: 0.88, component: <ZEE5Icon /> },
  {
    id: "out-tataplay",
    angle: -90 + (360 / 17) * 10,
    tilt: -21,
    opacity: 0.88,
    component: <TataPlayIcon />,
  },
  {
    id: "out-indigo",
    angle: -90 + (360 / 17) * 11,
    tilt: -42,
    opacity: 0.88,
    component: <IndiGoIcon />,
  },
  {
    id: "out-airindia",
    angle: -90 + (360 / 17) * 12,
    tilt: -63,
    opacity: 0.88,
    component: <AirIndiaIcon />,
  },
  {
    id: "out-irctc",
    angle: -90 + (360 / 17) * 13,
    tilt: -84,
    opacity: 0.88,
    component: <IRCTCIcon />,
  },
  {
    id: "out-cleartrip",
    angle: -90 + (360 / 17) * 14,
    tilt: -84,
    opacity: 0.88,
    component: <CleartripIcon />,
  },
  {
    id: "out-yatra",
    angle: -90 + (360 / 17) * 15,
    tilt: -63,
    opacity: 0.88,
    component: <YatraIcon />,
  },
  {
    id: "out-jiohotstar",
    angle: -90 + (360 / 17) * 16,
    tilt: -42,
    opacity: 0.88,
    component: <JioHotstarIcon />,
  },
];

// =========================================================================
// MAIN PINNED WAITLIST SECTION COMPONENT (SCROLL-DRIVEN 3D ZOOM EXPERIENCE)
// =========================================================================

export function WaitlistSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track scroll progression across the multi-vh pinned track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Direct sync with Lenis smooth scroll — zero spring lag or freezing
  const smoothProgress = scrollYProgress;

  // 1. OUTER CIRCLE ZOOM-IN TRANSFORMS
  const outerScale = useTransform(smoothProgress, [0, 0.35, 0.7, 0.95], [0.8, 1.0, 1.8, 3.2]);
  const outerOpacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.55, 0.75, 1],
    [0.9, 1.0, 0.8, 0.0, 0.0],
  );
  const outerZ = useTransform(smoothProgress, [0, 0.75], isMobile ? [0, 0] : [0, 240]);

  // 2. INNER CIRCLE ZOOM-IN TRANSFORMS
  const innerScale = useTransform(smoothProgress, [0, 0.35, 0.7, 0.95], [0.85, 1.0, 1.6, 2.8]);
  const innerOpacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.55, 0.75, 1],
    [0.95, 1.0, 0.8, 0.0, 0.0],
  );
  const innerZ = useTransform(smoothProgress, [0, 0.75], isMobile ? [0, 0] : [0, 160]);

  // 3. CENTER CIKKA LOGO (STABLE DURING FIRST PHASE)
  const cikkaLogoOpacity = useTransform(smoothProgress, [0, 0.2, 0.55, 0.7], [1, 1, 0.8, 0]);
  const cikkaLogoScale = useTransform(smoothProgress, [0, 0.45, 0.7], [1.0, 1.05, 0.85]);

  // 4. CONVERTED TEXT: "Rewards that reshape the daily life" (POPPINS FONT)
  const textOpacity = useTransform(smoothProgress, [0.6, 0.78, 0.95, 1.0], [0, 1, 1, 0.92]);
  const textScale = useTransform(smoothProgress, [0.6, 0.78, 1.0], [0.92, 1.0, 1.0]);
  const textY = useTransform(smoothProgress, [0.6, 0.78, 1.0], [18, 0, 0]);

  // 5. AMBIENT ATMOSPHERIC GLOW DYNAMICS
  const glowScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1.25, 1.5]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.45, 0.8, 0.9]);

  // 6. CENTER CARD HERO ZOOM & PERSPECTIVE POP
  const cardScale = useTransform(smoothProgress, [0, 0.08, 0.92, 1], [0.98, 1.0, 1.0, 0.98]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#f4f5f8] select-none"
      style={{ height: isMobile ? "110vh" : "150vh" }}
    >
      {/* Sticky Viewport Pinned Viewport with Navbar Clearance */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center pt-[72px] sm:pt-[84px] pb-6 sm:pb-10 px-4 sm:px-8 md:px-12 overflow-hidden">
        {/* Outer Showcase Card positioned cleanly with slightly vertically bigger height */}
        <motion.section
          style={{
            scale: cardScale,
            perspective: isMobile ? undefined : 1200,
          }}
          className="relative w-full max-w-[1400px] rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-[#0c0d12] border border-white/10 overflow-hidden h-[calc(100vh-120px)] max-h-[720px] sm:max-h-[760px] min-h-[540px] sm:min-h-[600px] flex flex-col items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)] will-change-transform"
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
              <div className="animate-orbit-cw w-[360px] h-[360px] xs:w-[460px] xs:h-[460px] sm:w-[740px] sm:h-[740px] md:w-[840px] md:h-[840px] lg:w-[940px] lg:h-[940px] rounded-full relative pointer-events-none">
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
                        <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-12 sm:h-12 drop-shadow-xl">
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
              <div className="animate-orbit-ccw w-[240px] h-[240px] xs:w-[300px] xs:h-[300px] sm:w-[480px] sm:h-[480px] md:w-[560px] md:h-[560px] lg:w-[620px] lg:h-[620px] rounded-full relative pointer-events-none">
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
                        <div className="w-9 h-9 xs:w-11 xs:h-11 sm:w-13 sm:h-13 drop-shadow-xl">
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
