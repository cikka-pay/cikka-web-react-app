import { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, TrendingUp, ShoppingBag, Zap, ShieldCheck, X, Check } from "lucide-react";
import headphones from "@/assets/mall-headphones.jpg";
import kettle from "@/assets/mall-kettle.jpg";

interface ProductItem {
  id: string;
  name: string;
  category: string;
  img: string;
  retailPrice: number;
  cashbackINR: number;
  ciPoints: number;
  tagline: string;
  highlights: string[];
}

interface RewardItem {
  id: string;
  brand: string;
  category: "food" | "travel" | "luxe" | "tech";
  logoUrl?: string;
  title: string;
  discount: string;
  costPoints: number;
  description: string;
  tag: string;
  code: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: "sneakers",
    name: "Blue Suede Edition Sneakers",
    category: "Luxe Footwear",
    img: "/sneaker.png",
    retailPrice: 4999,
    cashbackINR: 50,
    ciPoints: 1000,
    tagline: "Handcrafted suede low-top sneakers with ergonomic footbed and custom rubber sole.",
    highlights: ["100% Genuine Italian Suede", "Instant Cashback Clearance"],
  },
  {
    id: "headphones",
    name: "Sony WH-1000XM5 Headphones",
    category: "Audio Engineering",
    img: headphones,
    retailPrice: 29990,
    cashbackINR: 350,
    ciPoints: 4500,
    tagline: "Industry-leading noise canceling with dual processors and 8 microphones.",
    highlights: ["30-Hour Battery Life", "4.5k Points Multiplier"],
  },
  {
    id: "fragrance",
    name: "Bella Vita Velvet Luxe Oud",
    category: "Artisanal Fragrance",
    img: kettle,
    retailPrice: 1899,
    cashbackINR: 30,
    ciPoints: 650,
    tagline: "Long-lasting luxury perfume crafted with rare notes of French amber and velvet oud.",
    highlights: ["Premium Eau de Parfum", "Direct Brand Cash"],
  },
];

const REWARDS_CATALOG: RewardItem[] = [
  {
    id: "zomato-200",
    brand: "Zomato",
    category: "food",
    logoUrl: "/brands/zomato.svg",
    title: "₹200 Gourmet Dining Voucher",
    discount: "₹200 OFF",
    costPoints: 500,
    description: "Valid on gourmet dining & food delivery orders above ₹499 across all major cities.",
    tag: "Food & Dining",
    code: "CIKKA-ZOMATO200",
  },
  {
    id: "swiggy-150",
    brand: "Swiggy",
    category: "food",
    logoUrl: "/brands/swiggy.svg",
    title: "Swiggy One VIP Access + ₹150 Voucher",
    discount: "₹150 OFF",
    costPoints: 350,
    description: "Free unlimited delivery + ₹150 cashback voucher credited directly to Swiggy Money.",
    tag: "Food & Instamart",
    code: "CIKKA-SWIGGY150",
  },
  {
    id: "mmt-flights",
    brand: "MakeMyTrip",
    category: "travel",
    logoUrl: "/brands/makemytrip.svg",
    title: "Flight & Holiday Voucher",
    discount: "₹1,500 OFF",
    costPoints: 1200,
    description: "Flat ₹1,500 discount on domestic & international flight tickets with zero convenience fee.",
    tag: "Flights & Travel",
    code: "CIKKA-FLY1500",
  },
  {
    id: "ixigo-trains",
    brand: "Ixigo / IRCTC",
    category: "travel",
    logoUrl: "/brands/ixigo.svg",
    title: "100% Zero Gateway Fee on Trains",
    discount: "ZERO FEE",
    costPoints: 250,
    description: "Complete waiving of payment gateway and service charges on all train ticket bookings.",
    tag: "Train Booking",
    code: "CIKKA-TRAINPASS",
  },
  {
    id: "cleartrip-hotels",
    brand: "Cleartrip",
    category: "travel",
    logoUrl: "/brands/cleartrip.svg",
    title: "Luxury Hotel & Staycation Discount",
    discount: "₹2,000 OFF",
    costPoints: 1500,
    description: "Instant discount on 5-star hotel bookings, resorts & boutique staycations worldwide.",
    tag: "Hotels & Stays",
    code: "CIKKA-STAY2000",
  },
  {
    id: "bellavita-oud",
    brand: "Bella Vita Luxury",
    category: "luxe",
    logoUrl: "/brands/bellavita.svg",
    title: "Free French Oud Perfume + ₹300 Credit",
    discount: "FREE OUD + ₹300",
    costPoints: 600,
    description: "Complimentary 20ml French Velvet Oud EDP bottle + ₹300 store credit voucher.",
    tag: "Fragrance & Luxe",
    code: "CIKKA-BELLAVITA",
  },
  {
    id: "ludic-sneakers",
    brand: "Ludic Footwear",
    category: "luxe",
    logoUrl: "/brands/ludic.svg",
    title: "Luxury Streetwear Voucher",
    discount: "₹1,000 OFF",
    costPoints: 800,
    description: "Flat ₹1,000 discount on Ludic handcrafted suede & leather sneaker collection.",
    tag: "Luxe Footwear",
    code: "CIKKA-LUDIC1000",
  },
  {
    id: "sony-tech",
    brand: "Sony Audio",
    category: "tech",
    logoUrl: "/brands/sony.svg",
    title: "Headphones & Speaker Privilege Voucher",
    discount: "₹2,500 OFF",
    costPoints: 2000,
    description: "Voucher valid on WH-1000XM5 noise-canceling headphones & BRAVIA soundbars.",
    tag: "Audio Tech",
    code: "CIKKA-SONY2500",
  },
  {
    id: "apple-acc",
    brand: "Apple Premium",
    category: "tech",
    logoUrl: "/brands/apple.svg",
    title: "Apple Ecosystem Voucher Card",
    discount: "₹3,000 OFF",
    costPoints: 2500,
    description: "Redeemable on MagSafe chargers, AirPods Pro, AppleCare+ and official cases.",
    tag: "Apple Tech",
    code: "CIKKA-APPLE3000",
  },
];

export function CikkaMall() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copiedCouponId, setCopiedCouponId] = useState<string | null>(null);

  const activeProduct = (PRODUCTS[selectedIndex] || PRODUCTS[0]) as (typeof PRODUCTS)[0];

  // Calculated Yield Values
  const totalRetail = activeProduct.retailPrice * quantity;
  const totalCashback = activeProduct.cashbackINR * quantity;
  const totalPoints = activeProduct.ciPoints * quantity;
  const netEffectivePrice = totalRetail - totalCashback;
  const estimatedYieldPct = Math.round(((totalCashback + (totalPoints * 0.75)) / totalRetail) * 100);

  const handleClaimCoupon = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCouponId(id);
    setTimeout(() => setCopiedCouponId(null), 2500);
  };

  const filteredRewards = activeCategory === "all"
    ? REWARDS_CATALOG
    : REWARDS_CATALOG.filter((item) => item.category === activeCategory);

  return (
    <section id="mall" className="relative py-16 sm:py-32 md:py-44 overflow-hidden w-full max-w-full bg-[#f4f5f8] text-black">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-[1.05]">
            Buy what you love.<br />
            <span className="text-slate-500 font-normal mt-2 block">Get paid every time.</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-sm xs:text-base sm:text-xl text-slate-500 font-light leading-relaxed max-w-2xl mx-auto">
            Every purchase on Cikka Mall returns direct cashback and high-value CI Points straight to your wallet.
          </p>
        </div>

        {/* Product Selector Pill Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 xs:gap-3 mb-10 sm:mb-14">
          {PRODUCTS.map((prod, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={prod.id}
                onClick={() => setSelectedIndex(idx)}
                className={`flex items-center gap-2 xs:gap-3.5 rounded-full px-4 xs:px-6 sm:px-7 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm font-medium transition-all duration-300 backdrop-blur-xl ${isActive
                    ? "border-transparent bg-[#7c3aed] text-white shadow-md shadow-purple-500/20"
                    : "border border-slate-200 bg-white text-slate-500 hover:border-purple-300 hover:text-purple-900"
                  }`}
              >
                <span>{prod.name}</span>
                <span className="font-mono text-[10px] xs:text-xs text-zinc-400">₹{prod.retailPrice.toLocaleString("en-IN")}</span>
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Authentic Glassmorphism Grid */}
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 items-stretch">
          {/* Left Column: Product Spotlight (7 Cols) */}
          <div className="lg:col-span-7 relative flex flex-col justify-between overflow-hidden rounded-[24px] xs:rounded-[30px] sm:rounded-[36px] bg-white bg-gradient-to-br from-white via-purple-50/50 to-purple-100/50 p-4 xs:p-6 sm:p-12 shadow-2xl shadow-black/5 border border-purple-100/50">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent" />
            <div>
              <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
                <span className="rounded-full border border-purple-200/60 bg-purple-50 px-3 xs:px-4 py-1 xs:py-1.5 text-[10px] xs:text-xs font-bold tracking-widest text-purple-900 uppercase shadow-sm">
                  {activeProduct.category}
                </span>
                <span className="text-[11px] xs:text-xs sm:text-sm font-mono text-purple-900/60">
                  Direct Settlement
                </span>
              </div>

              <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-2 sm:mb-3">
                {activeProduct.name}
              </h3>
              <p className="text-xs xs:text-sm sm:text-base text-slate-600 font-light leading-relaxed mb-6 sm:mb-8">
                {activeProduct.tagline}
              </p>

              {/* Product Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950/80">
                <img
                  src={activeProduct.img}
                  alt={activeProduct.name}
                  className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-102"
                />
                {/* Floating Glass Badges */}
                <div className="absolute bottom-2.5 xs:bottom-4 sm:bottom-5 left-2.5 xs:left-4 sm:left-5 right-2.5 xs:right-4 sm:right-5 flex flex-wrap items-center justify-between gap-2 z-10">
                  <div className="flex items-center gap-1.5 xs:gap-2.5 rounded-xl xs:rounded-2xl border border-white/60 bg-white/75 backdrop-blur-2xl px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2.5 sm:py-3 text-[11px] xs:text-xs sm:text-base font-mono font-medium text-slate-900 shadow-sm">
                    <span>₹{totalCashback} Cashback</span>
                  </div>
                  <div className="flex items-center gap-1.5 xs:gap-2.5 rounded-xl xs:rounded-2xl border border-white/60 bg-white/75 backdrop-blur-2xl px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2.5 sm:py-3 text-[11px] xs:text-xs sm:text-base font-mono font-medium text-slate-900 shadow-sm">
                    <span>+{totalPoints.toLocaleString("en-IN")} CI Points</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity Controller & Highlights */}
            <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-mono text-slate-500 uppercase tracking-widest mr-2">Quantity:</span>
                {[1, 2, 3].map((qty) => (
                  <button
                    key={qty}
                    onClick={() => setQuantity(qty)}
                    className={`h-11 w-11 rounded-xl text-sm font-mono font-semibold transition-all backdrop-blur-md ${quantity === qty
                        ? "border-transparent bg-[#7c3aed] text-white shadow-md shadow-purple-500/20"
                        : "border border-slate-200 bg-white text-slate-500 hover:border-purple-300 hover:text-purple-900"
                      }`}
                  >
                    {qty}x
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 font-mono">
                {activeProduct.highlights.map((h, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-300" />
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Reward Summary Breakdown (5 Cols) */}
          <div className="lg:col-span-5 relative flex flex-col justify-between overflow-hidden rounded-[24px] xs:rounded-[30px] sm:rounded-[36px] bg-gradient-to-br from-[#100720] to-[#0a0510] p-4 xs:p-6 sm:p-12 shadow-2xl border border-white/5">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent" />
            <div>
              <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 sm:mb-6">
                <span className="text-[11px] xs:text-xs sm:text-sm font-mono font-medium tracking-widest text-slate-400 uppercase">REWARD SUMMARY</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 xs:px-3.5 py-0.5 xs:py-1 text-[11px] xs:text-xs font-mono text-zinc-300 backdrop-blur-md">
                  {estimatedYieldPct}% Return
                </span>
              </div>

              <div className="space-y-3 xs:space-y-4 font-mono text-sm xs:text-base">
                <div className="flex items-center justify-between text-slate-400 py-1">
                  <span>Retail Price ({quantity}x)</span>
                  <span className="text-white font-semibold">₹{totalRetail.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl xs:rounded-2xl border border-white/10 bg-white/[0.03] p-3 xs:p-4 text-zinc-300 backdrop-blur-md">
                  <span className="text-xs xs:text-sm">Direct Cashback</span>
                  <span className="font-bold text-sm xs:text-base text-white">- ₹{totalCashback.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl xs:rounded-2xl border border-white/10 bg-white/[0.03] p-3 xs:p-4 text-zinc-300 backdrop-blur-md">
                  <span className="text-xs xs:text-sm">CI Points Credited</span>
                  <span className="font-bold text-sm xs:text-base text-white">+{totalPoints.toLocaleString("en-IN")} CI</span>
                </div>
              </div>

              <div className="mt-4 xs:mt-6 rounded-2xl xs:rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-4 xs:p-6 sm:p-7 backdrop-blur-2xl">
                <div className="text-[10px] xs:text-xs font-mono tracking-widest text-slate-400 uppercase mb-1.5 xs:mb-2">
                  NET EFFECTIVE COST
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-3xl xs:text-4xl sm:text-5xl font-bold text-white">
                    ₹{netEffectivePrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[11px] xs:text-xs sm:text-sm font-mono text-slate-500">
                    ₹{totalCashback} Saved
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 space-y-3 xs:space-y-4 text-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative flex items-center justify-between gap-3 w-full rounded-xl xs:rounded-2xl bg-white px-4 xs:px-6 py-3 xs:py-4 text-xs xs:text-sm font-mono font-semibold text-black transition-all duration-200 hover:bg-slate-200 shadow-xl cursor-pointer"
              >
                <span>Explore what you can buy with CI points</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <p className="text-center text-[11px] xs:text-xs sm:text-sm font-mono text-slate-400">
                Redeem accumulated CI Points for brand coupons, vouchers & exclusive rewards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Glassmorphism CI Points Reward Catalog Dialog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4 sm:p-6 bg-black/80 backdrop-blur-2xl transition-all duration-300 animate-in fade-in">
          {/* Backdrop Click Dismiss */}
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-5xl max-h-[88vh] xs:max-h-[84vh] overflow-hidden rounded-[24px] xs:rounded-[30px] sm:rounded-[36px] border border-white/20 bg-gradient-to-b from-white/15 via-[#13141f]/95 to-[#0a0b10]/98 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.35)] text-white flex flex-col transition-all duration-300 animate-in zoom-in-95">

            {/* Subtle Minimal Off-White & Soft Purple Sheen */}
            <div className="pointer-events-none absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/[0.16] via-purple-300/[0.03] to-transparent" />

            {/* Top Glass Specular Line */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

            {/* Modal Header */}
            <div className="p-4 xs:p-6 sm:p-8 pb-3 xs:pb-4 flex items-start justify-between border-b border-white/10 shrink-0">
              <div>
                <h3 className="text-xl xs:text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  Unlock Rewards with CI Points
                </h3>
                <p className="mt-1.5 xs:mt-2 text-xs sm:text-sm text-zinc-400 font-light max-w-2xl leading-relaxed">
                  Convert your CI Points into ₹200 Zomato vouchers, Swiggy privileges, ₹1,500 flight discounts, zero-fee train passes, and luxury perfumes.
                </p>
              </div>

              {/* Close Glass Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-8 w-8 xs:h-10 xs:w-10 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white flex items-center justify-center transition-all shrink-0 backdrop-blur-md cursor-pointer shadow-lg ml-2"
              >
                <X className="h-4 w-4 xs:h-5 xs:w-5" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 flex items-center gap-2 xs:gap-2.5 overflow-x-auto border-b border-white/10 shrink-0">
              {[
                { id: "all", label: "All Rewards" },
                { id: "food", label: "Food & Dining" },
                { id: "travel", label: "Travel & Flights" },
                { id: "luxe", label: "Luxe & Fashion" },
                { id: "tech", label: "Tech & Audio" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-[11px] xs:text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${activeCategory === cat.id
                      ? "bg-[#f4f5f8] text-black font-bold shadow-md"
                      : "bg-white/[0.04] text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Modal Body: Scrollable Rewards Grid */}
            <div className="flex-1 overflow-y-auto p-4 xs:p-6 sm:p-8 grid gap-4 xs:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredRewards.map((reward) => (
                <div
                  key={reward.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent p-5 sm:p-6 backdrop-blur-2xl transition-all duration-300 hover:border-white/30 hover:bg-white/[0.09] shadow-lg min-w-0"
                >
                  <div className="min-w-0">
                    {/* Header: Clean Large Brand Logo (No Box) + Tag */}
                    <div className="flex items-center justify-between gap-3 mb-4 min-w-0">
                      {reward.logoUrl ? (
                        <img
                          src={reward.logoUrl}
                          alt={reward.brand}
                          className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 object-contain drop-shadow-md"
                        />
                      ) : (
                        <span className="text-sm font-mono font-bold text-white text-center leading-none shrink-0">{reward.brand.slice(0, 3)}</span>
                      )}

                      <div className="text-right min-w-0 flex-1 pl-2">
                        <span className="block text-xs font-mono font-bold text-white tracking-wide truncate">{reward.brand}</span>
                        <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider truncate">{reward.tag}</span>
                      </div>
                    </div>

                    {/* Discount Value */}
                    <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-1.5 truncate">
                      {reward.discount}
                    </div>

                    <h4 className="text-xs sm:text-sm font-semibold text-zinc-200 mb-1.5 leading-snug line-clamp-1">
                      {reward.title}
                    </h4>

                    <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4 line-clamp-2">
                      {reward.description}
                    </p>
                  </div>

                  {/* Pricing & Claim Button */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 shrink-0 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-white shrink-0">
                      <Sparkles className="h-3.5 w-3.5 text-zinc-300 shrink-0" />
                      <span>{reward.costPoints} CI</span>
                    </div>

                    <button
                      onClick={() => handleClaimCoupon(reward.id, reward.code)}
                      className="px-3.5 py-1.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white text-white hover:text-black text-xs font-mono font-semibold transition-all duration-200 cursor-pointer shadow-sm shrink-0 whitespace-nowrap"
                    >
                      {copiedCouponId === reward.id ? "Copied!" : "Claim"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 sm:px-8 border-t border-white/10 bg-black/50 text-center shrink-0 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                CI Points credited instantly upon BBPS bill or Mall purchase.
              </span>
              <span className="text-zinc-500">Zero Expiration · Direct Redemption</span>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
