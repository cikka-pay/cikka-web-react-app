import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import headphones from "@/assets/mall-headphones.jpg";
import kettle from "@/assets/mall-kettle.jpg";

interface ProductItem {
  id: string;
  name: string;
  tabLabel: string;
  category: string;
  img?: string;
  is3D?: boolean;
  modelUrl?: string;
  retailPrice: number;
  cashbackINR: number;
  ciPoints: number;
  tagline: string;
  highlights: string[];
  optionsLabel: string;
  options: string[];
}

const PRODUCTS: ProductItem[] = [
  {
    id: "sneakers",
    name: "Blue Suede Edition Sneakers",
    tabLabel: "Sneakers",
    category: "Luxe Footwear",
    is3D: true,
    modelUrl: "/MaterialsVariantsShoe.glb",
    retailPrice: 4999,
    cashbackINR: 50,
    ciPoints: 1000,
    tagline: "Handcrafted suede low-top sneakers with ergonomic footbed and custom rubber sole.",
    highlights: ["100% Genuine Italian Suede", "Instant Cashback Clearance"],
    optionsLabel: "Select Size:",
    options: ["UK 7", "UK 8", "UK 9", "UK 10"],
  },
  {
    id: "headphones",
    name: "Sony WH-1000XM5 Headphones",
    tabLabel: "Headphones",
    category: "Audio Engineering",
    img: headphones,
    is3D: true,
    modelUrl: "/headphone.glb",
    retailPrice: 29990,
    cashbackINR: 350,
    ciPoints: 4500,
    tagline: "Industry-leading noise canceling with dual processors and 8 microphones.",
    highlights: ["30-Hour Battery Life", "4.5k Points Multiplier"],
    optionsLabel: "Color:",
    options: ["Midnight Black", "Silver", "Navy"],
  },
  {
    id: "cosmetics",
    name: "Baboski Blue Freesia Hand Cream",
    tabLabel: "Cosmetics",
    category: "Cosmetics",
    is3D: true,
    modelUrl: "/cosmetic.glb",
    retailPrice: 499,
    cashbackINR: 40,
    ciPoints: 600,
    tagline: "Enriched with Alpha Arbutin & Vitamin F for deeply hydrated, velvety soft hands.",
    highlights: ["Alpha Arbutin & Vitamin F", "Blue Freesia Fragrance"],
    optionsLabel: "Weight:",
    options: ["30g", "30g (Pack of 2)", "30g (Pack of 3)"],
  },
];

interface PartnerPerk {
  id: string;
  name: string;
  logo: string;
  perk: string;
  desc: string;
  code: string;
}

const PARTNER_OPTIONS: PartnerPerk[] = [
  {
    id: "swiggy",
    name: "Swiggy",
    logo: "/logo/swiggy.png",
    perk: "₹150 OFF",
    desc: "Free Delivery + ₹150 Voucher",
    code: "CIKKA-SWIGGY150",
  },
  {
    id: "boat",
    name: "boAt",
    logo: "/logo/Boat.jfif",
    perk: "₹500 OFF",
    desc: "Flat ₹500 on Audio Gear",
    code: "CIKKA-BOAT500",
  },
  {
    id: "spotify",
    name: "Spotify",
    logo: "/logo/spotify.svg",
    perk: "3 Mo Free",
    desc: "3 Months Spotify Premium Pass",
    code: "CIKKA-SPOTIFY3M",
  },
];

// Helper to construct exact 3D Cosmetic Squeeze Tube Geometry & Materials
function createCosmeticTubeGroup(): THREE.Group {
  const group = new THREE.Group();

  const texLoader = new THREE.TextureLoader();
  const wrapTex = texLoader.load("/baboski_tube_3d_wrap.png");
  wrapTex.colorSpace = THREE.SRGBColorSpace;
  wrapTex.flipY = true;

  // 1. Lofted Squeeze Tube Body
  const segsY = 36;
  const segsRadial = 64;
  const height = 2.45;
  const minY = -0.95;
  const maxY = minY + height; // 1.5

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let iy = 0; iy <= segsY; iy++) {
    const v = iy / segsY;
    const y = minY + v * height;

    // Smooth parametric transition from round cylinder base (v=0) to flat crimp top (v=1)
    const rx = THREE.MathUtils.lerp(0.52, 0.82, Math.pow(v, 0.7));
    const rz = THREE.MathUtils.lerp(0.52, 0.05, Math.pow(v, 0.85));

    for (let ix = 0; ix <= segsRadial; ix++) {
      const u = ix / segsRadial;
      const theta = (u - 0.5) * Math.PI * 2;

      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);

      const x = rx * sinT;
      const z = rz * cosT;

      positions.push(x, y, z);
      uvs.push(u, v);
    }
  }

  for (let iy = 0; iy < segsY; iy++) {
    for (let ix = 0; ix < segsRadial; ix++) {
      const a = iy * (segsRadial + 1) + ix;
      const b = (iy + 1) * (segsRadial + 1) + ix;
      const c = (iy + 1) * (segsRadial + 1) + (ix + 1);
      const d = iy * (segsRadial + 1) + (ix + 1);
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const tubeGeom = new THREE.BufferGeometry();
  tubeGeom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  tubeGeom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  tubeGeom.setIndex(indices);
  tubeGeom.computeVertexNormals();

  const tubeMat = new THREE.MeshStandardMaterial({
    map: wrapTex,
    color: new THREE.Color("#ffffff"),
    roughness: 0.38,
    metalness: 0.04,
    side: THREE.DoubleSide,
  });

  const tubeMesh = new THREE.Mesh(tubeGeom, tubeMat);
  group.add(tubeMesh);

  // 2. Top Crimp Seal with ribs
  const crimpGeom = new THREE.BoxGeometry(1.66, 0.16, 0.08);
  const crimpMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#ba9df6"),
    roughness: 0.45,
    metalness: 0.02,
  });
  const crimpMesh = new THREE.Mesh(crimpGeom, crimpMat);
  crimpMesh.position.set(0, maxY + 0.07, 0);
  group.add(crimpMesh);

  // 3. Neck transition
  const neckGeom = new THREE.CylinderGeometry(0.24, 0.26, 0.16, 32);
  const neckMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#ffffff"),
    roughness: 0.3,
    metalness: 0.02,
  });
  const neckMesh = new THREE.Mesh(neckGeom, neckMat);
  neckMesh.position.set(0, minY - 0.08, 0);
  group.add(neckMesh);

  // 4. White Faceted / Octagonal Cap
  const capGeom = new THREE.CylinderGeometry(0.36, 0.39, 0.32, 8);
  const capMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#ffffff"),
    roughness: 0.25,
    metalness: 0.02,
  });
  const capMesh = new THREE.Mesh(capGeom, capMat);
  capMesh.position.set(0, minY - 0.31, 0);
  group.add(capMesh);

  // 5. Cap Base Ring Flange
  const ringGeom = new THREE.CylinderGeometry(0.42, 0.42, 0.06, 8);
  const ringMesh = new THREE.Mesh(ringGeom, capMat);
  ringMesh.position.set(0, minY - 0.46, 0);
  group.add(ringMesh);

  return group;
}

// Interactive 3D Product Viewport Component (Supports Shoes, Headphones, Cosmetics)
function Product3DCanvas({ modelUrl, id }: { modelUrl: string; id: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 220;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0.02, 5.8);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.4);
    mainLight.position.set(5, 8, 6);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x818cf8, 0.7);
    fillLight.position.set(-6, 3, -4);
    scene.add(fillLight);

    const productPivot = new THREE.Group();
    scene.add(productPivot);

    if (id === "cosmetics") {
      // Build authentic 3D Squeeze Tube matching Baboski screenshot
      const tubeGroup = createCosmeticTubeGroup();
      productPivot.clear();
      productPivot.add(tubeGroup);
      productPivot.scale.set(0.92, 0.92, 0.92);
      productPivot.position.set(0, 0.02, 0);
      productPivot.rotation.set(
        THREE.MathUtils.degToRad(6),
        THREE.MathUtils.degToRad(-15),
        THREE.MathUtils.degToRad(0)
      );
      setIsLoaded(true);
    } else {
      const gltfLoader = new GLTFLoader();
      const initModel = (gltfScene: THREE.Group) => {
        // Remove any watermarks, badges, or promotional meshes embedded in models
        const toRemove: THREE.Object3D[] = [];
        gltfScene.traverse((child) => {
          const name = (child.name || "").toLowerCase();
          if (
            name.includes("supavoxel") ||
            name.includes("badge") ||
            name.includes("watermark") ||
            name === "object_11"
          ) {
            toRemove.push(child);
          }
        });
        toRemove.forEach((obj) => {
          if (obj.parent) {
            obj.parent.remove(obj);
          }
        });

        const box = new THREE.Box3().setFromObject(gltfScene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        gltfScene.position.set(-center.x, -center.y, -center.z);
        productPivot.clear();
        productPivot.add(gltfScene);

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = (id === "headphones" ? 2.85 : 2.75) / maxDim;
        productPivot.scale.set(targetScale, targetScale, targetScale);
        productPivot.position.set(0, 0.02, 0);

        if (id === "sneakers") {
          productPivot.rotation.set(
            THREE.MathUtils.degToRad(8),
            THREE.MathUtils.degToRad(-45),
            THREE.MathUtils.degToRad(-24)
          );
        } else if (id === "headphones") {
          productPivot.rotation.set(
            THREE.MathUtils.degToRad(6),
            THREE.MathUtils.degToRad(-30),
            THREE.MathUtils.degToRad(0)
          );
        }

        gltfScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
              const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
              mats.forEach((mat) => {
                if ("roughness" in mat) mat.roughness = 0.55;
                if ("metalness" in mat) mat.metalness = 0.15;
              });
            }
          }
        });

        setIsLoaded(true);
      };

      const cleanUrl = modelUrl.startsWith("/") ? modelUrl.slice(1) : modelUrl;
      gltfLoader.load(
        modelUrl,
        (gltf) => initModel(gltf.scene),
        undefined,
        () => {
          gltfLoader.load(cleanUrl, (gltf) => initModel(gltf.scene));
        }
      );
    }

    // Render loop with in-place horizontal rotation
    let animId: number;
    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      if (productPivot) {
        productPivot.rotation.y -= 0.008;
      }
      renderer.render(scene, camera);
    };
    renderLoop();

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, [modelUrl, id]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f8fafc]">
          <div className="w-7 h-7 border-2 border-slate-200 border-t-[#6366f1] rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

export function CikkaMall() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("UK 9");
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [selectedPartner, setSelectedPartner] = useState<string>("swiggy");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const activeProduct: ProductItem = PRODUCTS[selectedIndex] || (PRODUCTS[0] as ProductItem);
  const activePartner = PARTNER_OPTIONS.find((p) => p.id === selectedPartner) || PARTNER_OPTIONS[0];

  // Set default option when product changes
  useEffect(() => {
    if (activeProduct?.options && activeProduct.options.length > 0) {
      setSelectedOption(activeProduct.options[0] || "UK 9");
    }
  }, [selectedIndex, activeProduct]);

  // Yield calculations
  const totalRetail = activeProduct.retailPrice;
  const totalCashback = activeProduct.cashbackINR;
  const totalPoints = activeProduct.ciPoints;
  const netEffectivePrice = totalRetail - totalCashback;
  const returnPercentage = Math.round(((totalCashback + totalPoints * 0.75) / totalRetail) * 100);

  const handleCategoryChange = (idx: number) => {
    setSelectedIndex(idx);
    setIsPaid(false);
    setCopiedCode(false);
  };

  const handlePay = () => {
    setIsPaid(true);
    setSelectedPartner("swiggy");
    setCopiedCode(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => {
      setCopiedCode(false);
      setIsPaid(false);
    }, 800);
  };

  return (
    <section
      id="mall"
      className="relative py-16 sm:py-28 md:py-36 overflow-hidden w-full max-w-full bg-[#f8fafc] text-black"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08]">
            Buy what you love.
            <br />
            <span className="text-slate-500 font-normal mt-1.5 block">Get paid every time.</span>
          </h2>
          <p className="mt-3.5 sm:mt-5 text-sm xs:text-base sm:text-lg text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
            Every purchase on Cikka Mall returns direct cashback and high-value CI Points straight
            to your wallet.
          </p>
        </div>

        {/* Minimal Product Selector Tabs */}
        <div className="flex items-center justify-center gap-2 xs:gap-3 mb-8 sm:mb-12">
          {PRODUCTS.map((prod, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={prod.id}
                onClick={() => handleCategoryChange(idx)}
                className={`rounded-full px-5 xs:px-6 py-2 xs:py-2.5 text-xs xs:text-sm font-semibold tracking-tight transition-all duration-300 cursor-pointer shadow-sm ${
                  isActive
                    ? "bg-[#0f172a] text-white border border-[#0f172a] shadow-md scale-105"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                {prod.tabLabel}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* HOLOGRAPHIC DUAL-CARD CONTAINER WITH CIKKA PURPLE GRADIENT FRAME */}
        {/* ========================================================================= */}
        <div className="w-full max-w-[880px] mx-auto p-2.5 xs:p-3 sm:p-3.5 rounded-[36px] bg-gradient-to-b from-[#521ae5] via-[#6835f5] via-[42%] via-[#8e5cff] via-[68%] via-[#d8c8ff] via-[88%] to-[#f3edff] shadow-[0_30px_70px_-15px_rgba(104,53,245,0.35),0_15px_35px_rgba(216,200,255,0.4)] select-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4.5 w-full items-stretch">
            {/* ------------------------------------------------------------- */}
            {/* LEFT CARD: LUXE PRODUCT SHOWCASE */}
            {/* ------------------------------------------------------------- */}
            <div className="bg-white rounded-[28px] p-5 xs:p-6 sm:p-7 flex flex-col justify-between shadow-sm border border-slate-200/90 relative overflow-hidden h-full">
              <div className="h-[105px] xs:h-[112px] flex flex-col justify-start">
                {/* Header Pills */}
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center text-[10.5px] xs:text-[11px] font-extrabold uppercase tracking-wider text-[#6366f1] bg-[#eff0fe] px-3 py-1 rounded-full border border-[#6366f1]/20">
                    {activeProduct.category}
                  </span>
                  <span className="text-[11px] xs:text-xs text-slate-400 font-semibold tracking-tight">
                    Direct Settlement
                  </span>
                </div>

                {/* Product Title & Tagline */}
                <h3 className="text-xl xs:text-[22px] sm:text-[24px] font-extrabold text-[#0f172a] leading-tight mt-2.5 tracking-tight line-clamp-1">
                  {activeProduct.name}
                </h3>
                <p className="text-xs xs:text-[13px] text-slate-500 leading-relaxed mt-1.5 font-normal line-clamp-2">
                  {activeProduct.tagline}
                </p>
              </div>

              {/* 3D Product Stage Box */}
              <div className="relative w-full h-[250px] xs:h-[265px] sm:h-[275px] rounded-2xl bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] border border-slate-200 my-4 flex items-center justify-center overflow-hidden shrink-0">
                {activeProduct.is3D ? (
                  <Product3DCanvas
                    key={activeProduct.id}
                    modelUrl={activeProduct.modelUrl || "/MaterialsVariantsShoe.glb"}
                    id={activeProduct.id}
                  />
                ) : (
                  <img
                    src={activeProduct.img}
                    alt={activeProduct.name}
                    className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
                  />
                )}

                {/* Floating Text Info */}
                <div className="absolute bottom-3 left-3 z-10 text-[11.5px] xs:text-xs font-bold text-slate-700">
                  ₹{totalCashback} Cashback
                </div>

                <div className="absolute bottom-3 right-3 z-10 text-[11.5px] xs:text-xs font-bold text-[#4f46e5]">
                  +{totalPoints.toLocaleString("en-IN")} CI Points
                </div>
              </div>

              {/* Option Selector (Size / Color) */}
              <div className="flex items-center justify-between pt-1 h-9">
                <span className="text-xs font-bold text-slate-700">{activeProduct.optionsLabel}</span>
                <div className="flex gap-1.5">
                  {activeProduct.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedOption(opt);
                        setIsPaid(false);
                      }}
                      className={`px-2.5 py-1 text-[11.5px] font-bold rounded-lg border transition-all cursor-pointer ${
                        selectedOption === opt
                          ? "bg-[#0f172a] text-white border-[#0f172a] shadow-sm"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* RIGHT CARD: SATIN SLATE-GRAY REWARD & DIGITAL RECEIPT */}
            {/* ------------------------------------------------------------- */}
            <div className="bg-gradient-to-b from-[#1c2230] via-[#151923] to-[#0e1118] rounded-[28px] p-5 xs:p-6 sm:p-7 flex flex-col justify-between shadow-2xl border border-slate-700/50 relative overflow-hidden text-white h-full">
              {/* Purple Ambient Background Flare */}
              <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#6366f1]/20 blur-3xl pointer-events-none" />

              {!isPaid ? (
                /* ----------------- PRE-PAYMENT STATE ----------------- */
                <div>
                  {/* Line Items */}
                  <div className="space-y-3 text-[14px] font-medium">
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-700/50 text-slate-300">
                      <span className="text-slate-400">Retail Price (1x)</span>
                      <span className="font-bold text-slate-100">
                        ₹{totalRetail.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-1 text-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Direct Cashback
                      </div>
                      <span className="text-emerald-400 font-bold">- ₹{totalCashback}</span>
                    </div>

                    <div className="flex justify-between items-center py-1 text-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#818cf8]" />
                        CI Points Credited
                      </div>
                      <span className="text-[#a5b4fc] font-bold">
                        +{totalPoints.toLocaleString("en-IN")} CI
                      </span>
                    </div>
                  </div>

                  {/* Net Effective Cost (Frameless & Boxless, without Saved badge) */}
                  <div className="mt-5 pt-3.5 border-t border-slate-700/50">
                    <span className="text-[10.5px] font-bold uppercase tracking-[1.2px] text-slate-400 block">
                      NET EFFECTIVE COST
                    </span>
                    <span className="text-3xl xs:text-[34px] font-extrabold text-white tracking-tight mt-0.5 block">
                      ₹{netEffectivePrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ) : (
                /* ----------------- POST-PAYMENT STATE (IN PLACE OF UPPER TEXT) ----------------- */
                <div className="animate-in fade-in duration-300 space-y-3.5">
                  {/* 3 Horizontal Clickable Options in Place of Text */}
                  <div className="grid grid-cols-3 gap-2">
                    {PARTNER_OPTIONS.map((partner) => {
                      const isSelected = selectedPartner === partner.id;
                      return (
                        <button
                          key={partner.id}
                          onClick={() => {
                            setSelectedPartner(partner.id);
                            setCopiedCode(false);
                          }}
                          className={`flex flex-col items-center justify-between p-3 rounded-2xl text-center transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-gradient-to-b from-[#6366f1]/40 to-[#8b5cf6]/25"
                              : "bg-slate-800/60 hover:bg-slate-800"
                          }`}
                        >
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="h-6 w-auto object-contain rounded-md mb-1.5"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                partner.id === "boat"
                                  ? "Boat.jfif"
                                  : partner.id === "swiggy"
                                  ? "Swiggy.png"
                                  : "spotify.svg";
                            }}
                          />
                          <span className="text-xs font-bold text-white leading-tight">
                            {partner.name}
                          </span>
                          <span className="text-[10.5px] font-extrabold text-emerald-400 mt-1">
                            {partner.perk}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Unlocked Digital Voucher Card */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        {activePartner.name} Voucher Unlocked
                      </span>
                      <span className="text-xs xs:text-sm font-bold text-white tracking-wider">
                        {activePartner.code}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(activePartner.code)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all cursor-pointer shadow-md active:scale-95 shrink-0"
                    >
                      {copiedCode ? "Copied!" : "Claim & Copy"}
                    </button>
                  </div>
                </div>
              )}

              {/* Action Footer */}
              {!isPaid && (
                <div className="mt-5 pt-3.5 border-t border-slate-700/50 flex flex-col gap-3">
                  {/* Instant Partner Perks */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Instant partner perks included:</span>
                    <div className="flex items-center gap-2">
                      <img
                        src="/logo/Boat.jfif"
                        alt="boAt"
                        className="h-5.5 w-auto rounded-md object-contain opacity-90"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "Boat.jfif";
                        }}
                      />
                      <img
                        src="/logo/swiggy.png"
                        alt="Swiggy"
                        className="h-5.5 w-auto rounded-md object-contain opacity-90"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "Swiggy.png";
                        }}
                      />
                      <img
                        src="/logo/spotify.svg"
                        alt="Spotify"
                        className="h-5.5 w-auto rounded-md object-contain opacity-90"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "spotify.svg";
                        }}
                      />
                    </div>
                  </div>

                  {/* Pay Button */}
                  <button
                    onClick={handlePay}
                    className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-98 bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#9333ea] hover:shadow-[#6366f1]/50 border border-white/20"
                  >
                    <span>Pay ₹{netEffectivePrice.toLocaleString("en-IN")} with Cikka</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
