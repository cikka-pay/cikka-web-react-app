import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

export function EcommerceRewardsFilmCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Film State: 'product' | 'bag' | 'rewards'
  const [stage, setStage] = useState<"product" | "bag" | "rewards">("product");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: "80%", y: "20%" });
  const [bagPriceVisible, setBagPriceVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [activeSpotlight, setActiveSpotlight] = useState<number | null>(null);
  const [cardsVisible, setCardsVisible] = useState({ center: false, left: false, right: false });

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const shoeGroupRef = useRef<THREE.Group | null>(null);
  const isAnimatingShoeMerge = useRef(false);

  // Build the Exact 3D Sneaker from WebsiteCrafts.html
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      35,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, -0.05, 8.4);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    // Professional Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 9, 7);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.7);
    fillLight.position.set(-6, 4, -4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.9);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    const bottomBounce = new THREE.DirectionalLight(0xffffff, 0.4);
    bottomBounce.position.set(0, -4, 3);
    scene.add(bottomBounce);

    // =========================================================================
    // ACCURATE 3D SNEAKER MODEL
    // Matches the vibrant cyan-blue body, white sculpted sole, dark saddle patches,
    // laces, black collar, and dual cyan pull tabs.
    // =========================================================================
    const shoeGroup = new THREE.Group();
    shoeGroupRef.current = shoeGroup;

    // Materials
    const soleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.35,
      metalness: 0.02,
    });

    const cyanMeshMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9, // Vibrant Electric Cyan Blue
      roughness: 0.6,
      metalness: 0.05,
    });

    const toeCyanMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8, // Lighter Cyan for toe highlight
      roughness: 0.55,
      metalness: 0.05,
    });

    const darkSaddleMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a, // Glossy Navy Midnight
      roughness: 0.18,
      metalness: 0.15,
    });

    const blackCollarMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.85,
    });

    const laceMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.8,
    });

    const tabMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      roughness: 0.4,
    });

    // 1. Outsole (Sculpted White Base with Front Rocker & Curved Heel)
    const soleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.35, 0.12, 0),
      new THREE.Vector3(-0.9, -0.32, 0),
      new THREE.Vector3(0, -0.38, 0),
      new THREE.Vector3(0.9, -0.32, 0),
      new THREE.Vector3(1.45, 0.18, 0),
    ]);
    const soleTubeGeo = new THREE.TubeGeometry(soleCurve, 32, 0.36, 16, false);
    soleTubeGeo.scale(1.0, 0.85, 1.4);
    const soleMesh = new THREE.Mesh(soleTubeGeo, soleMat);
    soleMesh.position.set(0, -0.15, 0);
    shoeGroup.add(soleMesh);

    // Sole Bottom Cap for Flat Solid Look
    const soleFillGeo = new THREE.BoxGeometry(2.4, 0.22, 0.85);
    const soleFill = new THREE.Mesh(soleFillGeo, soleMat);
    soleFill.position.set(0.05, -0.42, 0);
    shoeGroup.add(soleFill);

    // 2. Main Shoe Upper (Cyan Knit Body)
    const upperGeo = new THREE.SphereGeometry(0.92, 32, 24);
    upperGeo.scale(1.58, 0.78, 0.72);
    const upperMesh = new THREE.Mesh(upperGeo, cyanMeshMat);
    upperMesh.position.set(0.08, 0.08, 0);
    shoeGroup.add(upperMesh);

    // 3. Front Forefoot / Toe Cap
    const toeGeo = new THREE.SphereGeometry(0.72, 28, 20);
    toeGeo.scale(1.22, 0.58, 0.68);
    const toeMesh = new THREE.Mesh(toeGeo, toeCyanMat);
    toeMesh.position.set(0.92, -0.06, 0);
    shoeGroup.add(toeMesh);

    // 4. Heel Counter & Ankle Opening (Dark Black Collar)
    const heelCollarGeo = new THREE.TorusGeometry(0.48, 0.16, 16, 32);
    heelCollarGeo.rotateX(Math.PI / 2);
    heelCollarGeo.scale(0.85, 1.15, 0.85);
    const heelCollar = new THREE.Mesh(heelCollarGeo, blackCollarMat);
    heelCollar.position.set(-0.55, 0.42, 0);
    shoeGroup.add(heelCollar);

    const heelCapGeo = new THREE.SphereGeometry(0.68, 24, 18);
    heelCapGeo.scale(0.85, 0.95, 0.72);
    const heelCap = new THREE.Mesh(heelCapGeo, blackCollarMat);
    heelCap.position.set(-0.95, 0.15, 0);
    shoeGroup.add(heelCap);

    // 5. Glossy Midnight Blue Saddle Side Patches (Left and Right)
    // Patch 1 (Front/Middle)
    const patch1Geo = new THREE.BoxGeometry(0.24, 0.52, 0.78);
    patch1Geo.rotateZ(-0.32);
    const patch1 = new THREE.Mesh(patch1Geo, darkSaddleMat);
    patch1.position.set(0.18, 0.16, 0);
    shoeGroup.add(patch1);

    // Patch 2 (Rear)
    const patch2Geo = new THREE.BoxGeometry(0.24, 0.52, 0.78);
    patch2Geo.rotateZ(-0.32);
    const patch2 = new THREE.Mesh(patch2Geo, darkSaddleMat);
    patch2.position.set(-0.16, 0.16, 0);
    shoeGroup.add(patch2);

    // 6. Criss-Cross Black Laces
    for (let i = 0; i < 4; i++) {
      const laceX = 0.05 + i * 0.22;
      const laceY = 0.32 - i * 0.08;
      const laceGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.48, 12);
      laceGeo.rotateX(Math.PI / 2);
      laceGeo.rotateY(i % 2 === 0 ? 0.2 : -0.2);
      const laceMesh = new THREE.Mesh(laceGeo, laceMat);
      laceMesh.position.set(laceX, laceY, 0);
      shoeGroup.add(laceMesh);
    }

    // 7. Heel Cyan Pull Tab Loop
    const heelTabGeo = new THREE.TorusGeometry(0.16, 0.045, 12, 24);
    const heelTab = new THREE.Mesh(heelTabGeo, tabMat);
    heelTab.position.set(-1.18, 0.68, 0);
    heelTab.rotation.y = Math.PI / 2;
    heelTab.rotation.z = -0.3;
    shoeGroup.add(heelTab);

    // 8. Tongue Cyan Pull Tab Loop
    const tongueTabGeo = new THREE.TorusGeometry(0.14, 0.04, 12, 24);
    const tongueTab = new THREE.Mesh(tongueTabGeo, tabMat);
    tongueTab.position.set(0.08, 0.72, 0);
    tongueTab.rotation.y = Math.PI / 2;
    tongueTab.rotation.z = 0.25;
    shoeGroup.add(tongueTab);

    // Position, Scale and Characteristic -28 degree Tilt
    shoeGroup.scale.set(1.45, 1.45, 1.45);
    shoeGroup.position.set(0, -0.08, 0);
    shoeGroup.rotation.set(0, 0, THREE.MathUtils.degToRad(-28));

    scene.add(shoeGroup);

    // Resize listener
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Visibility Observer to pause RAF when off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? true;
      },
      { rootMargin: "150px" }
    );
    observer.observe(container);

    // Render loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      if (shoeGroupRef.current && !isAnimatingShoeMerge.current) {
        shoeGroupRef.current.rotation.y -= 0.007;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

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
      tSpotlight: NodeJS.Timeout,
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
      isAnimatingShoeMerge.current = false;

      if (shoeGroupRef.current) {
        shoeGroupRef.current.visible = true;
        shoeGroupRef.current.scale.set(1.45, 1.45, 1.45);
        shoeGroupRef.current.position.set(0, -0.08, 0);
        shoeGroupRef.current.rotation.set(0, 0, THREE.MathUtils.degToRad(-28));
      }

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
            isAnimatingShoeMerge.current = true;

            // 3D Shoe Floats UPWARDS first (35% phase), then merges DOWN into Bag
            if (shoeGroupRef.current) {
              const shoe = shoeGroupRef.current;
              const startTime = Date.now();
              const duration = 1800;
              const initScale = 1.45;

              const animateMerge = () => {
                const elapsed = Date.now() - startTime;
                const p = Math.min(elapsed / duration, 1);

                if (p < 0.35) {
                  const pUp = p / 0.35;
                  shoe.position.y = -0.08 + pUp * 0.38;
                  shoe.rotation.y -= 0.014;
                } else {
                  const pDown = (p - 0.35) / 0.65;
                  shoe.position.y = 0.30 - pDown * 0.72;
                  const scale = initScale * (1 - pDown * 0.78);
                  shoe.scale.set(scale, scale, scale);
                  shoe.rotation.y -= 0.014;
                }

                if (p < 1) {
                  requestAnimationFrame(animateMerge);
                }
              };
              animateMerge();
            }

            // Step 4: After shoe lands in bag (1.9s), the ₹4,299 price tag pops onto the bag
            t4 = setTimeout(() => {
              setBagPriceVisible(true);

              // Step 5: Stay on bag for 2.2s, then transition to Stage 3 (Rewards Tab)
              t5 = setTimeout(() => {
                setBagPriceVisible(false);
                if (shoeGroupRef.current) shoeGroupRef.current.visible = false;
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

                    // Staggered reveal of 3 obsidian fanned cards: Center -> Left -> Right
                    t6 = setTimeout(() => {
                      setCardsVisible((prev) => ({ ...prev, center: true }));
                      t7 = setTimeout(() => {
                        setCardsVisible((prev) => ({ ...prev, left: true }));
                        t8 = setTimeout(() => {
                          setCardsVisible((prev) => ({ ...prev, right: true }));

                          // Sequential Spotlight Showcase: BoAt (center=1) -> Swiggy (left=0) -> Spotify (right=2)
                          let spotlightStep = 0;
                          const spotlightOrder = [1, 0, 2];

                          const stepSpotlight = () => {
                            if (spotlightStep < spotlightOrder.length) {
                              setActiveSpotlight(spotlightOrder[spotlightStep]);
                              spotlightStep++;
                              tSpotlight = setTimeout(stepSpotlight, 2000);
                            } else {
                              // Hold all cards, then restart film from Frame 1
                              tLoop = setTimeout(() => {
                                runTimeline();
                              }, 2400);
                            }
                          };
                          tSpotlight = setTimeout(stepSpotlight, 700);
                        }, 350);
                      }, 350);
                    }, 250);
                  }
                }, 70);
              }, 2200);
            }, 1900);
          }, 500);
        }, 1100);
      }, 1400);
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
      clearTimeout(tSpotlight);
      clearTimeout(tLoop);
    };
  }, []);

  return (
    <div className="w-full max-w-[450px] mx-auto p-2.5 xs:p-3 sm:p-3.5 rounded-[36px] bg-gradient-to-b from-[#521ae5] via-[#6835f5] via-[42%] via-[#8e5cff] via-[68%] via-[#d8c8ff] via-[88%] to-[#f3edff] shadow-[0_30px_60px_-10px_rgba(104,53,245,0.28),0_15px_35px_rgba(216,200,255,0.5)] select-none">
      <div
        ref={containerRef}
        className="relative w-full h-[500px] xs:h-[540px] sm:h-[580px] rounded-[28px] bg-white overflow-hidden shadow-inner flex items-center justify-center"
      >
        {/* Three.js 3D Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        />

        {/* ========================================================================= */}
        {/* FRAME 1: Greyish Frosted Blurred Box Card + ₹4,299 + Buy Now */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {stage === "product" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="absolute w-[86%] h-[380px] xs:h-[400px] sm:h-[410px] rounded-[28px] bg-gradient-to-br from-[#cbd5e1]/60 to-[#94a3b8]/42 backdrop-blur-xl border-[1.5px] border-white/70 shadow-[inset_0_1.5px_2.5px_rgba(255,255,255,0.85),0_20px_40px_rgba(15,23,42,0.12)] p-4 sm:p-5 flex flex-col justify-end z-20 pointer-events-none"
            >
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
        {/* FRAME 2: Shopping Bag Container (Emerges from button) */}
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
              <svg
                viewBox="0 0 200 240"
                className="w-full h-full drop-shadow-[0_20px_30px_rgba(15,23,42,0.22)]"
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
                    className="absolute top-[64%] bg-[#6366f1] text-white text-sm font-extrabold px-4 py-1.5 rounded-xl shadow-[0_8px_24px_rgba(99,102,241,0.5)] border border-white/20 whitespace-nowrap"
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
                {/* 1. Box Left: SWIGGY */}
                <AnimatePresence>
                  {cardsVisible.left && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.1, y: 100, rotate: 0 }}
                      animate={{
                        opacity: 1,
                        x: activeSpotlight === 0 ? 0 : -72,
                        y: activeSpotlight === 0 ? -12 : 35,
                        rotate: activeSpotlight === 0 ? 0 : -14,
                        scale: activeSpotlight === 0 ? 1.08 : 0.9,
                        zIndex: activeSpotlight === 0 ? 25 : 1,
                      }}
                      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                      onClick={() => setActiveSpotlight(0)}
                      className={`absolute w-[195px] h-[195px] rounded-[24px] bg-gradient-to-br from-[#1c2130] to-[#10131c] border-[1.5px] p-4 flex flex-col justify-between shadow-[-10px_20px_40px_rgba(0,0,0,0.45)] overflow-hidden cursor-pointer transition-all ${
                        activeSpotlight === 0
                          ? "border-white/45 shadow-[0_30px_60px_rgba(0,0,0,0.65),0_0_30px_rgba(99,102,241,0.35)]"
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
                      <div className="flex items-center gap-1 z-10">
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
                          <span className="font-extrabold text-lg tracking-tight text-white font-sans">
                            SWIGGY
                          </span>
                        </div>
                      </div>

                      {/* Reward Tag */}
                      <div
                        className={`text-center text-[11px] font-bold text-white py-1.5 px-2.5 rounded-xl border border-white/18 bg-white/10 backdrop-blur-md transition-all ${
                          activeSpotlight === 0
                            ? "opacity-100 translate-y-0 shadow-[0_6px_18px_rgba(99,102,241,0.35)]"
                            : "opacity-0 translate-y-2"
                        }`}
                      >
                        Swiggy's 500 coupon
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 2. Box Center: BOAT */}
                <AnimatePresence>
                  {cardsVisible.center && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.1, y: 100, rotate: 0 }}
                      animate={{
                        opacity: 1,
                        x: activeSpotlight === 1 ? 0 : 0,
                        y: activeSpotlight === 1 ? -12 : 35,
                        rotate: activeSpotlight === 1 ? 0 : 0,
                        scale: activeSpotlight === 1 ? 1.08 : 0.92,
                        zIndex: activeSpotlight === 1 ? 25 : 2,
                      }}
                      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                      onClick={() => setActiveSpotlight(1)}
                      className={`absolute w-[195px] h-[195px] rounded-[24px] bg-gradient-to-br from-[#1c2130] to-[#10131c] border-[1.5px] p-4 flex flex-col justify-between shadow-[-10px_20px_40px_rgba(0,0,0,0.45)] overflow-hidden cursor-pointer transition-all ${
                        activeSpotlight === 1
                          ? "border-white/45 shadow-[0_30px_60px_rgba(0,0,0,0.65),0_0_30px_rgba(99,102,241,0.35)]"
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
                      <div className="flex items-center gap-1 z-10">
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
                          <span className="font-extrabold text-xl tracking-tight text-white font-sans lowercase">
                            bo<span className="text-[#e11d48]">At</span>
                          </span>
                        </div>
                      </div>

                      {/* Reward Tag */}
                      <div
                        className={`text-center text-[11px] font-bold text-white py-1.5 px-2.5 rounded-xl border border-white/18 bg-white/10 backdrop-blur-md transition-all ${
                          activeSpotlight === 1
                            ? "opacity-100 translate-y-0 shadow-[0_6px_18px_rgba(99,102,241,0.35)]"
                            : "opacity-0 translate-y-2"
                        }`}
                      >
                        BoAt Rockerz 430
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 3. Box Right: SPOTIFY */}
                <AnimatePresence>
                  {cardsVisible.right && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.1, y: 100, rotate: 0 }}
                      animate={{
                        opacity: 1,
                        x: activeSpotlight === 2 ? 0 : 72,
                        y: activeSpotlight === 2 ? -12 : 35,
                        rotate: activeSpotlight === 2 ? 0 : 14,
                        scale: activeSpotlight === 2 ? 1.08 : 0.9,
                        zIndex: activeSpotlight === 2 ? 25 : 1,
                      }}
                      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                      onClick={() => setActiveSpotlight(2)}
                      className={`absolute w-[195px] h-[195px] rounded-[24px] bg-gradient-to-br from-[#1c2130] to-[#10131c] border-[1.5px] p-4 flex flex-col justify-between shadow-[-10px_20px_40px_rgba(0,0,0,0.45)] overflow-hidden cursor-pointer transition-all ${
                        activeSpotlight === 2
                          ? "border-white/45 shadow-[0_30px_60px_rgba(0,0,0,0.65),0_0_30px_rgba(99,102,241,0.35)]"
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
                      <div className="flex items-center gap-1 z-10">
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
                          <span className="font-extrabold text-lg tracking-tight text-white font-sans">
                            Spotify
                          </span>
                        </div>
                      </div>

                      {/* Reward Tag */}
                      <div
                        className={`text-center text-[11px] font-bold text-white py-1.5 px-2 rounded-xl border border-white/18 bg-white/10 backdrop-blur-md transition-all ${
                          activeSpotlight === 2
                            ? "opacity-100 translate-y-0 shadow-[0_6px_18px_rgba(99,102,241,0.35)]"
                            : "opacity-0 translate-y-2"
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
