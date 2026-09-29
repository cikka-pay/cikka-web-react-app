import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function EcommerceRewardsFilmCard() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Film State: 'product' | 'bag' | 'rewards'
  const [stage, setStage] = useState<"product" | "bag" | "rewards">("product");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: "80%", y: "20%" });
  const [bagPriceVisible, setBagPriceVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [activeSpotlight, setActiveSpotlight] = useState<number | null>(null);
  const [cardsVisible, setCardsVisible] = useState({ center: false, left: false, right: false });

  // Interactive 3D tilt on mouse move
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ x: x * 14, y: -y * 14 });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  // Main Film Timeline Loop (Exact timing & sequence from WebsiteCrafts.html)
  useEffect(() => {
    let t1: NodeJS.Timeout,
      t2: NodeJS.Timeout,
      t3: NodeJS.Timeout,
      t4: NodeJS.Timeout,
      t5: NodeJS.Timeout,
      t6: NodeJS.Timeout,
      t7: NodeJS.Timeout,
      t8: NodeJS.Timeout,
      tLoop: NodeJS.Timeout;

    const runTimeline = () => {
      // Stage 1: Product Showcase
      setStage("product");
      setIsButtonClicked(false);
      setCursorVisible(false);
      setBagPriceVisible(false);
      setTypedText("");
      setActiveSpotlight(null);
      setCardsVisible({ center: false, left: false, right: false });

      // Step 1: Wait 1.4s, then move virtual cursor from top-right towards Buy Now
      t1 = setTimeout(() => {
        setCursorPos({ x: "62%", y: "83%" });
        setCursorVisible(true);

        // Step 2: Auto Click at Buy Now button after 1.1s glide
        t2 = setTimeout(() => {
          setIsButtonClicked(true);
          setCursorVisible(false);

          // Step 3: Transition to Stage 2 (Shopping Bag)
          t3 = setTimeout(() => {
            setStage("bag");

            // Step 4: After shoe lands in bag (1.9s), the ₹4,299 price tag pops onto the bag
            t4 = setTimeout(() => {
              setBagPriceVisible(true);

              // Step 5: Stay on bag for 2.2s, then transition to Stage 3 (Rewards Tab)
              t5 = setTimeout(() => {
                setBagPriceVisible(false);
                setStage("rewards");

                // Typewriter Heading: "Get Rewards like"
                const fullText = "Get Rewards like";
                let charIndex = 0;
                setTypedText("");
                const typeInterval = setInterval(() => {
                  if (charIndex <= fullText.length) {
                    setTypedText(fullText.slice(0, charIndex));
                    charIndex++;
                  } else {
                    clearInterval(typeInterval);

                    // Staggered reveal of cards: Immediately fan out with boAt in center spotlight
                    t6 = setTimeout(() => {
                      setCardsVisible({ center: true, left: true, right: true });
                      setActiveSpotlight(0); // 0 = boAt (Center)

                      // Step 1: Hold boAt for 2.2s, then transition to Swiggy
                      t7 = setTimeout(() => {
                        setActiveSpotlight(1); // 1 = Swiggy (Left moves to Center)

                        // Step 2: Hold Swiggy for 2.2s, then transition to Spotify
                        t8 = setTimeout(() => {
                          setActiveSpotlight(2); // 2 = Spotify (Right moves to Center)

                          // Step 3: Hold Spotify for 2.4s, then restart timeline smoothly
                          tLoop = setTimeout(() => {
                            runTimeline();
                          }, 2500);
                        }, 2200);
                      }, 2200);
                    }, 300);
                  }
                }, 60);
              }, 2000);
            }, 1800);
          }, 450);
        }, 1000);
      }, 1300);
    };

    runTimeline();

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(t8);
      clearTimeout(tLoop);
    };
  }, []);

  return (
    <div className="w-full max-w-[450px] mx-auto p-2.5 xs:p-3 sm:p-3.5 rounded-[36px] bg-gradient-to-b from-[#521ae5] via-[#6835f5] via-[42%] via-[#8e5cff] via-[68%] via-[#d8c8ff] via-[88%] to-[#f3edff] shadow-[0_30px_60px_-10px_rgba(104,53,245,0.28),0_15px_35px_rgba(216,200,255,0.5)] select-none">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[500px] xs:h-[540px] sm:h-[580px] rounded-[28px] bg-white overflow-hidden shadow-inner flex items-center justify-center"
      >
        {/* ========================================================================= */}
        {/* FRAME 1: EXACT 3D SNEAKER PRODUCT SHOWCASE */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {stage === "product" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="absolute w-[86%] h-[380px] xs:h-[400px] sm:h-[410px] rounded-[28px] bg-gradient-to-br from-[#cbd5e1]/60 to-[#94a3b8]/42 backdrop-blur-xl border-[1.5px] border-white/70 shadow-[inset_0_1.5px_2.5px_rgba(255,255,255,0.85),0_20px_40px_rgba(15,23,42,0.12)] p-4 sm:p-5 flex flex-col justify-between z-20 pointer-events-none"
            >
              {/* Product Top Header Badge */}
              <div className="flex items-center justify-between w-full relative z-30">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700 bg-white/70 px-3 py-1 rounded-full border border-white/60 shadow-sm">
                  Exclusive Edition
                </span>
                <span className="text-[11px] font-bold text-slate-600 bg-white/50 px-2.5 py-1 rounded-full">
                  UK 9
                </span>
              </div>

              {/* Exact 3D Blue Sneaker Floating Model matching Screenshot 2 */}
              <motion.div
                style={{
                  rotateX: mouseTilt.y,
                  rotateY: mouseTilt.x,
                  transformPerspective: 1000,
                }}
                className="relative my-auto flex items-center justify-center w-full h-[220px] pointer-events-auto cursor-grab active:cursor-grabbing"
              >
                {/* Dynamic Ambient Drop Shadow */}
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.28, 0.18, 0.28],
                    x: [8, -8, 8],
                  }}
                  transition={{
                    duration: 3.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-2 w-[220px] h-[32px] rounded-full bg-slate-900/60 blur-xl pointer-events-none"
                />

                {/* The Exact Blue Suede Sneaker matching Screenshot 2 with right-to-left 3D rotation */}
                <motion.img
                  src="/sneaker.png"
                  alt="Blue Suede Sneaker"
                  style={{
                    transformPerspective: 1200,
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    y: [-6, 6, -6],
                    rotateY: [16, -16, 16],
                    rotateZ: [-1.5, 1.5, -1.5],
                  }}
                  transition={{
                    duration: 3.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-[260px] xs:w-[280px] sm:w-[310px] h-auto object-contain drop-shadow-[0_20px_30px_rgba(14,165,233,0.28)] filter contrast-[1.03] select-none pointer-events-none"
                />
              </motion.div>

              {/* Bottom Price Tag + Buy Now Button */}
              <div className="flex items-center justify-center gap-3 w-full relative z-30 pointer-events-auto">
                <div className="bg-[#0f172a]/85 backdrop-blur-md text-white text-[13.5px] font-extrabold tracking-[0.2px] px-4.5 py-2.5 rounded-full border border-white/16 shadow-[0_6px_18px_rgba(15,23,42,0.18)]">
                  ₹4,299
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  className={`px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all flex items-center gap-1.5 cursor-pointer ${
                    isButtonClicked
                      ? "bg-[#0f172a] text-white border-[1.5px] border-[#0f172a] scale-92"
                      : "bg-white text-[#0f172a] border-[1.5px] border-[#cbd5e1] hover:bg-[#0f172a] hover:text-white"
                  }`}
                >
                  Buy Now
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Virtual Cursor for Auto-Click */}
        {cursorVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              left: cursorPos.x,
              top: cursorPos.y,
            }}
            transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
            className="absolute z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-[#0f172a] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
              fill="currentColor"
            >
              <path d="M3 3l7 18 3-7 7-3L3 3z" />
            </svg>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* FRAME 2: Shopping Bag Container (Shoe drops & merges in) */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {stage === "bag" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.1, y: 120 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.4, y: -40 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute z-30 flex flex-col items-center justify-center w-[165px] h-[205px] pointer-events-none"
            >
              {/* Sneaker dropping into bag animation */}
              <motion.img
                src="/sneaker.png"
                alt="Blue Suede Sneaker"
                initial={{ y: -75, scale: 0.85, opacity: 1, rotateY: 0, rotateZ: 0 }}
                animate={{ y: 20, scale: 0.26, opacity: 0, rotateY: -15, rotateZ: 6 }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
                className="absolute w-[180px] h-auto object-contain z-10 pointer-events-none"
              />

              <svg
                viewBox="0 0 200 240"
                className="w-full h-full drop-shadow-[0_20px_30px_rgba(15,23,42,0.22)] relative z-20"
                fill="none"
              >
                {/* Handles */}
                <path
                  d="M65 80 C65 25, 135 25, 135 80"
                  stroke="#1e293b"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Bag Body */}
                <path d="M25 85 L175 85 L190 230 L10 230 Z" fill="#1e293b" />
                <path d="M175 85 L190 230 L160 230 L150 85 Z" fill="#0f172a" />
              </svg>

              {/* Price Tag attached to Shopping Bag */}
              <AnimatePresence>
                {bagPriceVisible && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.4 }}
                    transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                    className="absolute top-[64%] z-30 bg-[#6366f1] text-white text-sm font-extrabold px-4 py-1.5 rounded-xl shadow-[0_8px_24px_rgba(99,102,241,0.5)] border border-white/20 whitespace-nowrap"
                  >
                    ₹4,299
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* FRAME 3: Fanned-Out Dark Obsidian Square Boxes Spread */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {stage === "rewards" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4"
            >
              {/* Typewriter Heading */}
              <div className="absolute top-[55px] text-center w-full px-5">
                <span className="text-[21px] font-extrabold tracking-[-0.4px] bg-gradient-to-r from-[#0f172a] to-[#334155] bg-clip-text text-transparent">
                  {typedText}
                </span>
                <span className="text-[21px] font-bold text-[#6366f1] animate-pulse ml-0.5">
                  |
                </span>
              </div>

              {/* Square Boxes Spread Container */}
              <div className="relative w-full h-[290px] flex items-center justify-center mt-10">
                {/* 1. Box boAt (Index 0) */}
                <AnimatePresence>
                  {cardsVisible.center && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.2, y: 80 }}
                      animate={{
                        opacity: 1,
                        x: activeSpotlight === 0 ? 0 : activeSpotlight === 1 ? 74 : -74,
                        y: activeSpotlight === 0 ? -14 : 35,
                        rotate: activeSpotlight === 0 ? 0 : activeSpotlight === 1 ? 14 : -14,
                        scale: activeSpotlight === 0 ? 1.08 : 0.90,
                        zIndex: activeSpotlight === 0 ? 30 : 10,
                      }}
                      transition={{ type: "spring", stiffness: 160, damping: 22, mass: 0.85 }}
                      onClick={() => setActiveSpotlight(0)}
                      className={`absolute w-[195px] h-[195px] rounded-[24px] bg-gradient-to-br from-[#1c2130] to-[#10131c] border-[1.5px] p-4 flex flex-col justify-between shadow-[-10px_20px_40px_rgba(0,0,0,0.45)] overflow-hidden cursor-pointer transition-colors duration-300 ${
                        activeSpotlight === 0
                          ? "border-white/45 shadow-[0_30px_60px_rgba(0,0,0,0.65),0_0_35px_rgba(99,102,241,0.35)]"
                          : "border-white/16"
                      }`}
                    >
                      {/* Wave BG */}
                      <svg className="absolute inset-0 w-full h-full opacity-18 pointer-events-none" viewBox="0 0 200 200" fill="none">
                        <path d="M-20 50 Q 60 10, 140 50 T 260 50" stroke="white" strokeWidth="1.5" />
                        <path d="M-20 90 Q 60 50, 140 90 T 260 90" stroke="white" strokeWidth="1.5" />
                        <path d="M-20 130 Q 60 90, 140 130 T 260 130" stroke="white" strokeWidth="1.5" />
                        <path d="M-20 170 Q 60 130, 140 170 T 260 170" stroke="white" strokeWidth="1.5" />
                      </svg>

                      {/* Header Dots */}
                      <div className="flex items-center gap-1.5 z-10">
                        <span className="w-2 h-2 rounded-full bg-white/30" />
                        <span className="w-2 h-2 rounded-full bg-[#6366f1]" />
                        <span className="w-2 h-2 rounded-full bg-white/30" />
                      </div>

                      {/* Brand Logo: boAt */}
                      <div className="my-auto flex items-center justify-center z-10">
                        <div className="flex items-center gap-1.5">
                          <svg
                            viewBox="0 0 32 32"
                            className="w-8 h-8 text-[#e11d48]"
                            fill="currentColor"
                          >
                            <path d="M16 4L6 22h20L16 4zm0 6l6 10H10l6-10z" />
                          </svg>
                          <span className="font-extrabold text-2xl tracking-tight text-white font-sans lowercase">
                            bo<span className="text-[#e11d48]">At</span>
                          </span>
                        </div>
                      </div>

                      {/* Reward Tag */}
                      <div
                        className={`text-center text-[12px] font-bold text-white py-2 px-2.5 rounded-xl border border-white/16 bg-[#232734]/90 backdrop-blur-md transition-all duration-300 ${
                          activeSpotlight === 0
                            ? "opacity-100 translate-y-0 shadow-[0_6px_20px_rgba(0,0,0,0.4)]"
                            : "opacity-0 translate-y-2 pointer-events-none"
                        }`}
                      >
                        BoAt Rockerz 430
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 2. Box Swiggy (Index 1) */}
                <AnimatePresence>
                  {cardsVisible.left && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.2, y: 80 }}
                      animate={{
                        opacity: 1,
                        x: activeSpotlight === 1 ? 0 : activeSpotlight === 0 ? -74 : 74,
                        y: activeSpotlight === 1 ? -14 : 35,
                        rotate: activeSpotlight === 1 ? 0 : activeSpotlight === 0 ? -14 : 14,
                        scale: activeSpotlight === 1 ? 1.08 : 0.90,
                        zIndex: activeSpotlight === 1 ? 30 : 10,
                      }}
                      transition={{ type: "spring", stiffness: 160, damping: 22, mass: 0.85 }}
                      onClick={() => setActiveSpotlight(1)}
                      className={`absolute w-[195px] h-[195px] rounded-[24px] bg-gradient-to-br from-[#1c2130] to-[#10131c] border-[1.5px] p-4 flex flex-col justify-between shadow-[-10px_20px_40px_rgba(0,0,0,0.45)] overflow-hidden cursor-pointer transition-colors duration-300 ${
                        activeSpotlight === 1
                          ? "border-white/45 shadow-[0_30px_60px_rgba(0,0,0,0.65),0_0_35px_rgba(99,102,241,0.35)]"
                          : "border-white/16"
                      }`}
                    >
                      {/* Wave BG */}
                      <svg className="absolute inset-0 w-full h-full opacity-18 pointer-events-none" viewBox="0 0 200 200" fill="none">
                        <path d="M-20 60 Q 60 20, 140 60 T 260 60" stroke="white" strokeWidth="1.2" />
                        <path d="M-20 100 Q 60 60, 140 100 T 260 100" stroke="white" strokeWidth="1.2" />
                        <path d="M-20 140 Q 60 100, 140 140 T 260 140" stroke="white" strokeWidth="1.2" />
                      </svg>

                      {/* Header Dots */}
                      <div className="flex items-center gap-1.5 z-10">
                        <span className="w-2 h-2 rounded-full bg-[#6366f1]" />
                        <span className="w-2 h-2 rounded-full bg-white/30" />
                        <span className="w-2 h-2 rounded-full bg-white/30" />
                      </div>

                      {/* Brand Logo: Swiggy */}
                      <div className="my-auto flex items-center justify-center z-10">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-full bg-[#fc8019] flex items-center justify-center text-white font-bold text-base shadow-md">
                            S
                          </div>
                          <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                            SWIGGY
                          </span>
                        </div>
                      </div>

                      {/* Reward Tag */}
                      <div
                        className={`text-center text-[12px] font-bold text-white py-2 px-2.5 rounded-xl border border-white/16 bg-[#232734]/90 backdrop-blur-md transition-all duration-300 ${
                          activeSpotlight === 1
                            ? "opacity-100 translate-y-0 shadow-[0_6px_20px_rgba(0,0,0,0.4)]"
                            : "opacity-0 translate-y-2 pointer-events-none"
                        }`}
                      >
                        Swiggy's 500 coupon
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 3. Box Spotify (Index 2) */}
                <AnimatePresence>
                  {cardsVisible.right && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.2, y: 80 }}
                      animate={{
                        opacity: 1,
                        x: activeSpotlight === 2 ? 0 : activeSpotlight === 1 ? -74 : 74,
                        y: activeSpotlight === 2 ? -14 : 35,
                        rotate: activeSpotlight === 2 ? 0 : activeSpotlight === 1 ? -14 : 14,
                        scale: activeSpotlight === 2 ? 1.08 : 0.90,
                        zIndex: activeSpotlight === 2 ? 30 : 10,
                      }}
                      transition={{ type: "spring", stiffness: 160, damping: 22, mass: 0.85 }}
                      onClick={() => setActiveSpotlight(2)}
                      className={`absolute w-[195px] h-[195px] rounded-[24px] bg-gradient-to-br from-[#1c2130] to-[#10131c] border-[1.5px] p-4 flex flex-col justify-between shadow-[-10px_20px_40px_rgba(0,0,0,0.45)] overflow-hidden cursor-pointer transition-colors duration-300 ${
                        activeSpotlight === 2
                          ? "border-white/45 shadow-[0_30px_60px_rgba(0,0,0,0.65),0_0_35px_rgba(99,102,241,0.35)]"
                          : "border-white/16"
                      }`}
                    >
                      {/* Wave BG */}
                      <svg className="absolute inset-0 w-full h-full opacity-18 pointer-events-none" viewBox="0 0 200 200" fill="none">
                        <path d="M-20 60 Q 60 20, 140 60 T 260 60" stroke="white" strokeWidth="1.2" />
                        <path d="M-20 100 Q 60 60, 140 100 T 260 100" stroke="white" strokeWidth="1.2" />
                        <path d="M-20 140 Q 60 100, 140 140 T 260 140" stroke="white" strokeWidth="1.2" />
                      </svg>

                      {/* Header Dots */}
                      <div className="flex items-center gap-1.5 z-10">
                        <span className="w-2 h-2 rounded-full bg-white/30" />
                        <span className="w-2 h-2 rounded-full bg-white/30" />
                        <span className="w-2 h-2 rounded-full bg-[#6366f1]" />
                      </div>

                      {/* Brand Logo: Spotify */}
                      <div className="my-auto flex items-center justify-center z-10">
                        <div className="flex items-center gap-1.5">
                          <svg
                            viewBox="0 0 24 24"
                            className="w-8 h-8 text-[#1db954]"
                            fill="currentColor"
                          >
                            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.963a.625.625 0 01-.28-1.218c3.808-.872 7.076-.498 9.715 1.117.293.18.387.564.207.857zm1.224-2.719a.78.78 0 01-1.073.257c-2.687-1.652-6.785-2.131-9.965-1.166a.781.781 0 01-.462-1.492c3.632-1.102 8.147-.568 11.243 1.328a.78.78 0 01.257 1.073zm.105-2.835C14.692 8.93 9.385 8.755 6.29 9.695a.936.936 0 01-.555-1.79c3.555-1.079 9.42-.875 13.14 1.334a.936.936 0 01-1.002 1.631z" />
                          </svg>
                          <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                            Spotify
                          </span>
                        </div>
                      </div>

                      {/* Reward Tag */}
                      <div
                        className={`text-center text-[12px] font-bold text-white py-2 px-2.5 rounded-xl border border-white/16 bg-[#232734]/90 backdrop-blur-md transition-all duration-300 ${
                          activeSpotlight === 2
                            ? "opacity-100 translate-y-0 shadow-[0_6px_20px_rgba(0,0,0,0.4)]"
                            : "opacity-0 translate-y-2 pointer-events-none"
                        }`}
                      >
                        Spotify's 3 months of subscription
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
