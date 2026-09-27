import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// =========================================================================
// ACCURATE APP ICONS MATCHING THE REFERENCE SCREENSHOT
// =========================================================================

function PinterestIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#E60023] flex items-center justify-center shadow-lg p-2.5">
      <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.987.026l.03-.026z" />
      </svg>
    </div>
  );
}

function SafariIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-white flex items-center justify-center shadow-lg p-1.5">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="46" fill="#007aff" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="12"
            x2="50"
            y2={i % 6 === 0 ? "17" : "14"}
            stroke="white"
            strokeWidth={i % 6 === 0 ? "2" : "1"}
            strokeOpacity={i % 6 === 0 ? "0.9" : "0.5"}
            transform={`rotate(${i * 15} 50 50)`}
          />
        ))}
        <polygon points="50,16 57,50 50,47" fill="#ff3b30" />
        <polygon points="50,16 43,50 50,47" fill="#ff453a" />
        <polygon points="50,84 57,50 50,53" fill="#ffffff" />
        <polygon points="50,84 43,50 50,53" fill="#e5e5ea" />
        <circle cx="50" cy="50" r="3" fill="white" />
        <circle cx="50" cy="50" r="1.5" fill="#1c1c1e" />
      </svg>
    </div>
  );
}

function PodcastsIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-gradient-to-br from-[#c084fc] via-[#9333ea] to-[#6b21a8] flex items-center justify-center shadow-lg p-2.5">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M22 45 A 32 32 0 0 1 78 45" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
        <path d="M32 50 A 20 20 0 0 1 68 50" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" opacity="0.95" />
        <circle cx="50" cy="46" r="8" fill="white" />
        <path d="M50 54 L 50 72" stroke="white" strokeWidth="6" strokeLinecap="round" />
        <path d="M40 74 L 60 74" stroke="white" strokeWidth="6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function TwitterIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#1DA1F2] flex items-center justify-center shadow-lg p-2.5">
      <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
      </svg>
    </div>
  );
}

function NotesPencilIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#1c1c1e] border border-white/10 flex items-center justify-center shadow-lg p-2">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g transform="rotate(45 50 50)">
          <rect x="44" y="14" width="12" height="10" rx="2" fill="#ff453a" />
          <rect x="43" y="24" width="14" height="6" fill="#8e8e93" />
          <rect x="44" y="30" width="12" height="38" fill="#ffd60a" />
          <line x1="48" y1="30" x2="48" y2="68" stroke="#e5b800" strokeWidth="1.5" />
          <line x1="52" y1="30" x2="52" y2="68" stroke="#e5b800" strokeWidth="1.5" />
          <polygon points="44,68 56,68 50,82" fill="#fcd34d" />
          <polygon points="48,77 52,77 50,82" fill="#1c1c1e" />
        </g>
      </svg>
    </div>
  );
}

function WikipediaIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#141416] border border-white/10 flex items-center justify-center shadow-lg p-2">
      <span className="text-white text-2xl font-serif font-bold leading-none">W</span>
    </div>
  );
}

function LabelsTag() {
  return (
    <div className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#16a34a] to-[#22c55e] flex items-center gap-1.5 shadow-[0_4px_18px_rgba(34,197,94,0.4)] border border-white/20 select-none">
      <div className="w-2 h-2 rounded-full bg-white/90" />
      <span className="text-white text-[11px] font-black tracking-widest uppercase font-mono">
        LABELS
      </span>
    </div>
  );
}

function ZIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#18181b] border border-white/10 flex items-center justify-center shadow-lg p-2">
      <span className="text-white text-2xl font-black font-sans leading-none">Z</span>
    </div>
  );
}

function SubstackIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#ff6719] flex items-center justify-center shadow-lg p-2.5">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="25" y="24" width="50" height="8" rx="2" fill="white" />
        <rect x="25" y="38" width="50" height="8" rx="2" fill="white" />
        <polygon points="25,52 75,52 75,76 50,62 25,76" fill="white" />
      </svg>
    </div>
  );
}

function ProductHuntIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#da552f] flex items-center justify-center shadow-lg p-2.5">
      <span className="text-white text-2xl font-black font-sans leading-none">P</span>
    </div>
  );
}

function CardMiniIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#f8fafc] border border-slate-200 flex items-center justify-center shadow-lg p-2">
      <div className="w-6 h-4.5 rounded-[3px] bg-amber-400 border border-amber-600 relative flex items-center justify-center">
        <div className="w-3 h-2 border-r border-amber-700" />
      </div>
    </div>
  );
}

function RedditIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#ff4500] flex items-center justify-center shadow-lg p-2">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="54" r="20" fill="white" />
        <circle cx="42" cy="52" r="3.5" fill="#ff4500" />
        <circle cx="58" cy="52" r="3.5" fill="#ff4500" />
        <path d="M44 63 Q 50 67 56 63" fill="none" stroke="#ff4500" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="68" cy="30" r="4" fill="white" />
        <path d="M50 34 L 56 26 L 66 30" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function BlueDiscordIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#5865F2] flex items-center justify-center shadow-lg p-2.5">
      <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
        <path d="M68 32 C62 29 57 28 57 28 L56 30 C63 32 66 35 66 35 C59 31 51 30 43 31 C36 32 30 35 30 35 C30 35 33 32 40 30 L39 28 C39 28 34 29 28 32 C21 43 19 54 20 65 C26 69 32 69 32 69 L35 65 C30 63 28 60 28 60 C28 60 30 61 33 63 C40 67 56 67 63 63 C66 61 68 60 68 60 C68 60 66 63 61 65 L64 69 C64 69 70 69 76 65 C77 52 74 41 68 32 Z M37 56 C33 56 31 52 31 48 C31 44 33 40 37 40 C41 40 43 44 43 48 C43 52 41 56 37 56 Z M59 56 C55 56 53 52 53 48 C53 44 55 40 59 40 C63 40 65 44 65 48 C65 52 63 56 59 56 Z" />
      </svg>
    </div>
  );
}

function NotionIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#1a1a1c] border border-white/10 flex items-center justify-center shadow-lg p-2">
      <span className="text-white text-2xl font-serif font-bold leading-none">N</span>
    </div>
  );
}

function LinearIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-gradient-to-br from-[#5e6ad2] to-[#3b4382] flex items-center justify-center shadow-lg p-2.5">
      <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
        <path d="M26 50 C26 36.7 36.7 26 50 26 C63.3 26 74 36.7 74 50 C74 63.3 63.3 74 50 74 C36.7 74 26 63.3 26 50 Z M46 36 L46 64 L60 50 Z" />
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

function FigmaIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#1e1e1e] border border-white/10 flex items-center justify-center shadow-lg p-2.5">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="25" y="16" width="25" height="23" rx="11.5" fill="#f24e1e" />
        <rect x="50" y="16" width="25" height="23" rx="11.5" fill="#ff7262" />
        <rect x="25" y="39" width="25" height="23" rx="11.5" fill="#a259ff" />
        <circle cx="61.5" cy="50.5" r="11.5" fill="#1abcfe" />
        <rect x="25" y="62" width="25" height="23" rx="11.5" fill="#0acf83" />
      </svg>
    </div>
  );
}

function ArcIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-gradient-to-br from-[#0c0a24] to-[#1e1b4b] border border-cyan-500/30 flex items-center justify-center shadow-lg p-2.5">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="34" fill="none" stroke="#38bdf8" strokeWidth="6" />
        <path d="M50 16 A 34 34 0 0 1 84 50" fill="none" stroke="#ec4899" strokeWidth="6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function SlackIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#1a1d21] border border-white/10 flex items-center justify-center shadow-lg p-2.5">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect x="22" y="38" width="22" height="9" rx="4.5" fill="#e01e5a" />
        <circle cx="52" cy="27" r="4.5" fill="#e01e5a" />
        <rect x="38" y="56" width="9" height="22" rx="4.5" fill="#36c5f0" />
        <circle cx="27" cy="48" r="4.5" fill="#36c5f0" />
        <rect x="56" y="53" width="22" height="9" rx="4.5" fill="#2eb67d" />
        <circle cx="48" cy="73" r="4.5" fill="#2eb67d" />
        <rect x="53" y="22" width="9" height="22" rx="4.5" fill="#ecb22e" />
        <circle cx="73" cy="52" r="4.5" fill="#ecb22e" />
      </svg>
    </div>
  );
}

function MonogramDarkIcon() {
  return (
    <div className="w-full h-full rounded-[18px] bg-[#18181b] border border-white/10 flex items-center justify-center shadow-lg p-2">
      <span className="text-white/80 text-xl font-mono font-bold">ت</span>
    </div>
  );
}

// =========================================================================
// MATHEMATICALLY EXACT CIRCLE POSITION HELPER
// Guaranteed 100% precision: every item center lies EXACTLY on the circle circumference
// =========================================================================

function getExactCircleCoords(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  // 50% center + 50% radius reaches exactly the 100% outer boundary / circle line
  const left = 50 + 50 * Math.cos(rad);
  const top = 50 + 50 * Math.sin(rad);
  return { left: `${left}%`, top: `${top}%` };
}

interface OrbitLogoDef {
  id: string;
  angle: number;
  tilt: number;
  blur: string;
  opacity: number;
  size: string;
  component: React.ReactNode;
}

// 1. INNER CIRCLE (10 Logos): Locked 100% onto the inner circle track
const INNER_CIRCLE_LOGOS: OrbitLogoDef[] = [
  { id: "in-safari", angle: -90, tilt: 0, blur: "blur-none", opacity: 0.98, size: "w-13 h-13", component: <SafariIcon /> },
  { id: "in-twitter", angle: -54, tilt: 36, blur: "blur-none", opacity: 0.95, size: "w-13 h-13", component: <TwitterIcon /> },
  { id: "in-wiki", angle: -18, tilt: 72, blur: "blur-none", opacity: 0.98, size: "w-13.5 h-13.5", component: <WikipediaIcon /> },
  { id: "in-substack", angle: 18, tilt: 72, blur: "blur-none", opacity: 0.98, size: "w-13.5 h-13.5", component: <SubstackIcon /> },
  { id: "in-producthunt", angle: 54, tilt: 36, blur: "blur-[0.5px]", opacity: 0.92, size: "w-13 h-13", component: <ProductHuntIcon /> },
  { id: "in-linear", angle: 90, tilt: 0, blur: "blur-[0.5px]", opacity: 0.9, size: "w-13 h-13", component: <LinearIcon /> },
  { id: "in-monogram", angle: 126, tilt: -36, blur: "blur-[0.5px]", opacity: 0.92, size: "w-13 h-13", component: <MonogramDarkIcon /> },
  { id: "in-zapier", angle: 162, tilt: -72, blur: "blur-none", opacity: 0.95, size: "w-13.5 h-13.5", component: <ZIcon /> },
  { id: "in-labels", angle: -162, tilt: -72, blur: "blur-none", opacity: 1.0, size: "w-auto h-auto", component: <LabelsTag /> },
  { id: "in-pinterest", angle: -126, tilt: -36, blur: "blur-none", opacity: 0.98, size: "w-13.5 h-13.5", component: <PinterestIcon /> },
];

// 2. OUTER CIRCLE (14 Logos): Locked 100% onto the outer circle track
const OUTER_CIRCLE_LOGOS: OrbitLogoDef[] = [
  { id: "out-podcasts", angle: -90, tilt: 0, blur: "blur-[2px]", opacity: 0.82, size: "w-13 h-13", component: <PodcastsIcon /> },
  { id: "out-reddit", angle: -90 + (360 / 14) * 1, tilt: 26, blur: "blur-[2.5px]", opacity: 0.75, size: "w-13 h-13", component: <RedditIcon /> },
  { id: "out-discord", angle: -90 + (360 / 14) * 2, tilt: 51, blur: "blur-[3px]", opacity: 0.75, size: "w-13 h-13", component: <BlueDiscordIcon /> },
  { id: "out-figma", angle: -90 + (360 / 14) * 3, tilt: 77, blur: "blur-[2.5px]", opacity: 0.75, size: "w-13 h-13", component: <FigmaIcon /> },
  { id: "out-arc", angle: -90 + (360 / 14) * 4, tilt: 77, blur: "blur-[2.5px]", opacity: 0.75, size: "w-13 h-13", component: <ArcIcon /> },
  { id: "out-slack", angle: -90 + (360 / 14) * 5, tilt: 51, blur: "blur-[3px]", opacity: 0.72, size: "w-13 h-13", component: <SlackIcon /> },
  { id: "out-spotify", angle: -90 + (360 / 14) * 6, tilt: 26, blur: "blur-[3.5px]", opacity: 0.68, size: "w-13 h-13", component: <SpotifyIcon /> },
  { id: "out-notion", angle: -90 + (360 / 14) * 7, tilt: 0, blur: "blur-[3.5px]", opacity: 0.65, size: "w-13 h-13", component: <NotionIcon /> },
  { id: "out-monogram2", angle: -90 + (360 / 14) * 8, tilt: -26, blur: "blur-[3.5px]", opacity: 0.68, size: "w-13 h-13", component: <MonogramDarkIcon /> },
  { id: "out-cardchip", angle: -90 + (360 / 14) * 9, tilt: -51, blur: "blur-[3px]", opacity: 0.72, size: "w-13 h-13", component: <CardMiniIcon /> },
  { id: "out-linear2", angle: -90 + (360 / 14) * 10, tilt: -77, blur: "blur-[2.5px]", opacity: 0.75, size: "w-13 h-13", component: <LinearIcon /> },
  { id: "out-zapier2", angle: -90 + (360 / 14) * 11, tilt: -77, blur: "blur-[2.5px]", opacity: 0.75, size: "w-13 h-13", component: <ZIcon /> },
  { id: "out-pinterest2", angle: -90 + (360 / 14) * 12, tilt: -51, blur: "blur-[3px]", opacity: 0.75, size: "w-13 h-13", component: <PinterestIcon /> },
  { id: "out-pencil", angle: -90 + (360 / 14) * 13, tilt: -26, blur: "blur-[2px]", opacity: 0.82, size: "w-13 h-13", component: <NotesPencilIcon /> },
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
      className="relative w-full bg-[#f4f5f8] select-none will-change-transform"
      style={{ height: "360vh" }}
    >
      {/* Sticky Viewport Pinned Viewport with Navbar Clearance */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center pt-[88px] sm:pt-[96px] pb-16 sm:pb-24 md:pb-32 px-4 sm:px-8 md:px-12 overflow-hidden">

        {/* Outer Showcase Card positioned cleanly with generous spacing */}
        <motion.section
          style={{
            scale: cardScale,
            perspective: 1200,
          }}
          className="relative w-full max-w-[1380px] rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-[#0c0d12] border border-white/10 overflow-hidden h-[calc(100vh-170px)] max-h-[580px] sm:max-h-[610px] min-h-[460px] sm:min-h-[500px] flex flex-col items-center justify-center shadow-[0_30px_90px_rgba(0,0,0,0.95)] will-change-transform"
        >
          {/* Subtle Ambient Radial Glows expanding with scroll zoom */}
          <motion.div
            style={{
              scale: glowScale,
              opacity: glowOpacity,
            }}
            className="pointer-events-none absolute inset-0 z-0"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[950px] md:w-[1150px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12)_0%,rgba(147,51,234,0.08)_40%,transparent_75%)] blur-[100px]" />
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
              <div className="animate-orbit-cw w-[340px] h-[340px] xs:w-[440px] xs:h-[440px] sm:w-[700px] sm:h-[700px] md:w-[780px] md:h-[780px] lg:w-[860px] lg:h-[860px] rounded-full relative pointer-events-none">
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
                        <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-13 sm:h-13 drop-shadow-xl">
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
              <div className="animate-orbit-ccw w-[220px] h-[220px] xs:w-[280px] xs:h-[280px] sm:w-[480px] sm:h-[480px] md:w-[540px] md:h-[540px] lg:w-[600px] lg:h-[600px] rounded-full relative pointer-events-none">
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
                        <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-13 sm:h-13 drop-shadow-xl">
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

