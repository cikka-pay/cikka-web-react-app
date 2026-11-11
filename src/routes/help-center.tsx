// @refresh reset
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Gift,
  LayoutGrid,
  Package,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  X,
} from "lucide-react";
import { Cikka3DLogo } from "../components/Cikka3DLogo";
import { Footer } from "../components/Footer";
import { ScrollTrigger } from "../lib/gsap";
import { SUPPORT_MATRIX_CATEGORIES, type SupportMatrixCategory } from "../data/helpCenterMatrix";

export const Route = createFileRoute("/help-center")({
  head: () => ({
    meta: [
      { title: "Help Center - Cikka" },
      {
        name: "description",
        content: "Cikka Help Center: frequently asked questions and support solutions.",
      },
    ],
  }),
  component: HelpCenterPage,
});

const CATEGORY_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  "auth-kyc-security": ShieldCheck,
  "cards-bbps": CreditCard,
  "upi-payments": Smartphone,
  "cikka-mall": ShoppingBag,
  "orders-returns": Package,
  "rewards-wallet": Gift,
  "alerts-escalation": Bell,
};

const TOTAL_TOPICS = SUPPORT_MATRIX_CATEGORIES.reduce(
  (sum, category) => sum + category.items.length,
  0,
);

interface SearchSuggestion {
  categoryId: string;
  question: string;
}

const POPULAR_SUGGESTIONS: SearchSuggestion[] = [
  { categoryId: "auth-kyc-security", question: "Where do I log in?" },
  {
    categoryId: "cards-bbps",
    question: "How can I fetch and check my live Credit Card or utility bill details?",
  },
  {
    categoryId: "upi-payments",
    question: "My UPI/card amount was debited, but status is Pending — how do I check?",
  },
  { categoryId: "orders-returns", question: "How do I track my Cikka Mall or Rewards order?" },
  { categoryId: "rewards-wallet", question: "How do I withdraw Cashback to my bank account?" },
];

interface QuickfindCardProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

function QuickfindCard({
  icon: Icon,
  title,
  description,
  isSelected,
  onClick,
}: QuickfindCardProps) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={onClick}
      className="flex flex-col items-center text-center rounded-2xl border border-white/[0.08] bg-[#09090e] p-6 cursor-pointer"
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${isSelected ? "bg-white text-black" : "text-slate-200"
          }`}
      >
        <Icon className="w-5.5 h-5.5 stroke-[1.75]" />
      </div>
      <h3 className="text-sm font-semibold text-white leading-snug mb-1.5">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
    </button>
  );
}

function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [collapsedQuestions, setCollapsedQuestions] = useState<Set<string>>(() => new Set());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = (
      window as unknown as {
        lenis?: { scrollTo: (pos: number, opts?: { immediate?: boolean }) => void };
      }
    ).lenis;

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
        setActiveSuggestionIndex(-1);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const searchSuggestions = useMemo<SearchSuggestion[]>(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return POPULAR_SUGGESTIONS;

    const questionMatches: SearchSuggestion[] = [];
    const secondaryMatches: SearchSuggestion[] = [];

    for (const category of SUPPORT_MATRIX_CATEGORIES) {
      for (const item of category.items) {
        const suggestion = { categoryId: category.id, question: item.question };
        if (item.question.toLowerCase().includes(query)) {
          questionMatches.push(suggestion);
        } else if (
          item.solution.toLowerCase().includes(query) ||
          category.title.toLowerCase().includes(query) ||
          (item.notes?.some((note) => note.toLowerCase().includes(query)) ?? false)
        ) {
          secondaryMatches.push(suggestion);
        }
      }
    }

    return [...questionMatches, ...secondaryMatches].slice(0, 6);
  }, [searchQuery]);

  const scrollToFaqs = () => {
    const el = document.getElementById("faqs");
    if (!el) return;
    const lenis = (
      window as unknown as {
        lenis?: { scrollTo: (target: HTMLElement, opts?: { offset?: number }) => void };
      }
    ).lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -24 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    const itemKey = `${suggestion.categoryId}::${suggestion.question}`;
    setSearchQuery(suggestion.question);
    setSelectedCategoryId("all");
    setCollapsedQuestions((prev) => {
      if (!prev.has(itemKey)) return prev;
      const next = new Set(prev);
      next.delete(itemKey);
      return next;
    });
    setIsSearchOpen(false);
    setActiveSuggestionIndex(-1);
    requestAnimationFrame(scrollToFaqs);
  };

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (activeSuggestionIndex >= 0 && searchSuggestions[activeSuggestionIndex]) {
      handleSelectSuggestion(searchSuggestions[activeSuggestionIndex]);
      return;
    }
    setIsSearchOpen(false);
    setActiveSuggestionIndex(-1);
    scrollToFaqs();
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsSearchOpen(false);
      setActiveSuggestionIndex(-1);
      return;
    }

    if (!isSearchOpen && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      setIsSearchOpen(true);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveSuggestionIndex((prev) =>
        searchSuggestions.length === 0 ? -1 : (prev + 1) % searchSuggestions.length,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveSuggestionIndex((prev) => {
        if (searchSuggestions.length === 0) return -1;
        return prev <= 0 ? searchSuggestions.length - 1 : prev - 1;
      });
    }
  };

  const filteredCategories = useMemo<SupportMatrixCategory[]>(() => {
    const query = searchQuery.trim().toLowerCase();

    return SUPPORT_MATRIX_CATEGORIES.filter(
      (category) => selectedCategoryId === "all" || category.id === selectedCategoryId,
    )
      .map((category) => {
        if (!query) return category;

        const categoryMatches =
          category.title.toLowerCase().includes(query) ||
          category.shortTitle.toLowerCase().includes(query) ||
          category.cardDescription.toLowerCase().includes(query);

        if (categoryMatches) return category;

        const matchingItems = category.items.filter(
          (item) =>
            item.question.toLowerCase().includes(query) ||
            item.solution.toLowerCase().includes(query) ||
            (item.notes?.some((note) => note.toLowerCase().includes(query)) ?? false),
        );

        return {
          ...category,
          items: matchingItems,
        };
      })
      .filter((category) => category.items.length > 0);
  }, [searchQuery, selectedCategoryId]);

  const visibleTopicKeys = useMemo(
    () =>
      filteredCategories.flatMap((category) =>
        category.items.map((item) => `${category.id}::${item.question}`),
      ),
    [filteredCategories],
  );

  const visibleTopicCount = visibleTopicKeys.length;
  const allCollapsed =
    visibleTopicCount > 0 && visibleTopicKeys.every((key) => collapsedQuestions.has(key));

  const toggleQuestion = (key: string) => {
    setCollapsedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const toggleAllVisible = () => {
    setCollapsedQuestions((prev) => {
      const next = new Set(prev);
      if (allCollapsed) {
        visibleTopicKeys.forEach((key) => next.delete(key));
      } else {
        visibleTopicKeys.forEach((key) => next.add(key));
      }
      return next;
    });
  };

  const handleSelectQuickfind = (categoryId: string) => {
    setSelectedCategoryId((prev) => (prev === categoryId ? "all" : categoryId));
  };

  return (
    <div className="min-h-screen w-full bg-[#000000] text-white flex flex-col selection:bg-purple-500/30 antialiased overflow-x-hidden">
      {/* Top Bar Outside Hero Box */}
      <header className="w-full h-[72px] sm:h-[80px] flex items-center justify-between px-4 sm:px-6 md:px-10 shrink-0">
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 sm:gap-3 group transition-transform duration-200 hover:scale-105 cursor-pointer select-none"
          aria-label="Cikka home"
        >
          <Cikka3DLogo className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14" />
          <span className="font-sans font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-purple-300 transition-colors">
            Cikka
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-3.5">
          <a
            href="https://seller.cikka.club/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#ffffff" }}
            className="inline-flex items-center justify-center font-medium text-[13px] px-4 sm:px-4.5 py-2 rounded-full border bg-[#15151c]/90 hover:bg-[#22222c] text-white border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 active:scale-95 cursor-pointer select-none"
          >
            <span className="font-medium">Sign in</span>
          </a>
          <Link
            to="/get-app"
            style={{ color: "#000000" }}
            className="inline-flex items-center justify-center font-semibold text-[13px] px-5 sm:px-5.5 py-2 rounded-full border bg-white hover:bg-neutral-100 text-black border-black/10 shadow-[0_2px_14px_rgba(0,0,0,0.25)] transition-all duration-300 active:scale-95 cursor-pointer select-none"
          >
            <span className="font-semibold text-black">Get app</span>
          </Link>
        </div>
      </header>

      {/* Top Rounded Hero Banner */}
      <div className="w-full px-4 sm:px-6 md:px-10 pt-2 sm:pt-3">
        <section className="relative z-30 rounded-[22px] sm:rounded-[30px] border border-white/[0.12] bg-[#19142b] shadow-[0_24px_80px_rgba(0,0,0,0.75)]">
          {/* Clipped Silky Lavender / Violet Wave Mesh Backdrop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px] sm:rounded-[30px]"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(110% 90% at 15% 15%, rgba(167, 139, 250, 0.36) 0%, transparent 55%), radial-gradient(95% 85% at 85% 20%, rgba(192, 132, 252, 0.30) 0%, transparent 52%), radial-gradient(120% 100% at 55% 95%, rgba(139, 92, 246, 0.38) 0%, rgba(30, 22, 56, 0.92) 60%, #120e20 100%)",
              }}
            />
            <svg
              viewBox="0 0 1200 420"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full opacity-55 mix-blend-screen"
            >
              <defs>
                <linearGradient id="silkWaveA" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0.28" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.24" />
                </linearGradient>
                <linearGradient id="silkWaveB" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f5d0fe" stopOpacity="0.24" />
                  <stop offset="55%" stopColor="#7c3aed" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path
                d="M-60,310 C220,170 430,360 720,210 C940,95 1090,155 1260,80 L1260,440 L-60,440 Z"
                fill="url(#silkWaveA)"
              />
              <path
                d="M-60,90 C190,220 470,40 770,180 C970,275 1120,210 1260,290 L1260,440 L-60,440 Z"
                fill="url(#silkWaveB)"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
          </div>

          {/* Centered Hero Heading & Search Bar with Suggestions */}
          <div className="relative z-10 px-5 sm:px-10 py-14 sm:py-20 md:py-24 text-center">
            <h1 className="font-sans font-bold tracking-[-0.03em] leading-[1.12] text-3xl sm:text-4xl md:text-[44px] text-white max-w-3xl mx-auto">
              Cikka Help Center
            </h1>

            {/* Search Input + Right Search Button + Suggestions Dropdown */}
            <div ref={searchContainerRef} className="relative mt-7 sm:mt-8 max-w-xl mx-auto">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-stretch rounded-xl border border-white/25 bg-[#0e0c18]/85 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.35)] focus-within:border-purple-300/75 focus-within:ring-2 focus-within:ring-purple-400/25 transition-all overflow-hidden"
              >
                <input
                  type="text"
                  role="combobox"
                  aria-expanded={isSearchOpen}
                  aria-controls="help-center-suggestions"
                  aria-autocomplete="list"
                  aria-label="How can we help?"
                  value={searchQuery}
                  onFocus={() => setIsSearchOpen(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                    setActiveSuggestionIndex(-1);
                  }}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="How can we help?"
                  className="flex-1 min-w-0 bg-transparent px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveSuggestionIndex(-1);
                      setIsSearchOpen(true);
                    }}
                    aria-label="Clear search"
                    className="px-2.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : null}
                <button
                  type="submit"
                  aria-label="Search help center"
                  className="px-4 border-l border-white/15 bg-white/[0.06] hover:bg-white/[0.14] text-slate-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>

              {isSearchOpen ? (
                <div
                  id="help-center-suggestions"
                  role="listbox"
                  className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xl border border-white/15 bg-[#0e0e16]/98 backdrop-blur-xl shadow-[0_24px_64px_rgba(0,0,0,0.85)] overflow-hidden text-left"
                >
                  {searchSuggestions.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-slate-400">
                      No matching help topics found.
                    </div>
                  ) : (
                    <ul className="divide-y divide-white/[0.06]">
                      {searchSuggestions.map((suggestion, index) => {
                        const isActive = index === activeSuggestionIndex;
                        return (
                          <li key={`${suggestion.categoryId}::${suggestion.question}`}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={isActive}
                              onClick={() => handleSelectSuggestion(suggestion)}
                              className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors cursor-pointer ${isActive
                                  ? "bg-white/[0.1] text-white"
                                  : "text-slate-200 hover:bg-white/[0.06] hover:text-white"
                                }`}
                            >
                              <Search
                                className="h-3.5 w-3.5 shrink-0 text-slate-400"
                                aria-hidden="true"
                              />
                              <span className="line-clamp-1">{suggestion.question}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>

      {/* Main Content Area on Pure Black Background */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pt-12 sm:pt-16 pb-20 sm:pb-28">
        {/* Quickfind Answers Section (4-Column Icon Card Grid) */}
        <section id="quickfind" aria-labelledby="quickfind-heading">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-7">
            <h2
              id="quickfind-heading"
              className="font-sans text-lg sm:text-xl font-bold tracking-tight text-white"
            >
              Quickfind answers
            </h2>
            {selectedCategoryId !== "all" ? (
              <button
                type="button"
                onClick={() => setSelectedCategoryId("all")}
                className="text-xs font-medium text-purple-300 hover:text-purple-200 transition-colors cursor-pointer"
              >
                Show all domains
              </button>
            ) : null}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {SUPPORT_MATRIX_CATEGORIES.map((category) => (
              <QuickfindCard
                key={category.id}
                icon={CATEGORY_ICONS[category.id] ?? ShieldCheck}
                title={`${category.number}. ${category.shortTitle}`}
                description={category.cardDescription}
                isSelected={selectedCategoryId === category.id}
                onClick={() => handleSelectQuickfind(category.id)}
              />
            ))}

            <QuickfindCard
              icon={LayoutGrid}
              title="All Support Topics"
              description={`View all ${TOTAL_TOPICS} questions and solutions across all 7 Cikka domains.`}
              isSelected={selectedCategoryId === "all" && !searchQuery}
              onClick={() => {
                setSelectedCategoryId("all");
                setSearchQuery("");
                setCollapsedQuestions(new Set());
              }}
            />
          </div>
        </section>

        {/* General FAQs / Domain-Structured Accordion Matrix */}
        <section id="faqs" aria-labelledby="faqs-heading" className="pt-14 sm:pt-18">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h2
                id="faqs-heading"
                className="font-sans text-lg sm:text-xl font-bold tracking-tight text-white"
              >
                General FAQs
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Showing <span className="font-semibold text-white">{visibleTopicCount}</span> of{" "}
                {TOTAL_TOPICS} topics
              </p>
            </div>

            {visibleTopicCount > 0 ? (
              <button
                type="button"
                onClick={toggleAllVisible}
                className="rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] px-3.5 py-1.5 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
              >
                {allCollapsed ? "Expand all" : "Collapse all"}
              </button>
            ) : null}
          </div>

          {filteredCategories.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#09090e] px-6 py-12 text-center space-y-3">
              <p className="text-base font-medium text-white">No matching help topics found</p>
              <p className="text-sm text-slate-400">
                Try a different keyword or reset your filters to view all 7 domains.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategoryId("all");
                }}
                className="mt-2 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white hover:bg-white/15 transition-colors cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="space-y-10 sm:space-y-12">
              {filteredCategories.map((category) => (
                <div key={category.id} id={category.id}>
                  <div className="flex items-center justify-between gap-3 pb-3">
                    <h3 className="font-sans text-base sm:text-lg font-semibold text-purple-200">
                      {category.number}. {category.title}
                    </h3>
                    <span className="text-xs text-slate-500">
                      {category.items.length} {category.items.length === 1 ? "topic" : "topics"}
                    </span>
                  </div>

                  <div className="border-t border-b border-white/[0.1] divide-y divide-white/[0.1]">
                    {category.items.map((item) => {
                      const itemKey = `${category.id}::${item.question}`;
                      const isExpanded = !collapsedQuestions.has(itemKey);

                      return (
                        <div key={itemKey}>
                          <button
                            type="button"
                            onClick={() => toggleQuestion(itemKey)}
                            aria-expanded={isExpanded}
                            className="flex w-full items-start justify-between gap-4 py-5 text-left cursor-pointer group"
                          >
                            <span className="text-[15px] sm:text-base font-semibold text-white group-hover:text-purple-200 transition-colors leading-snug">
                              {item.question}
                            </span>
                            {isExpanded ? (
                              <ChevronUp
                                className="w-4 h-4 shrink-0 mt-1 text-slate-400 group-hover:text-white transition-colors"
                                aria-hidden="true"
                              />
                            ) : (
                              <ChevronDown
                                className="w-4 h-4 shrink-0 mt-1 text-slate-400 group-hover:text-white transition-colors"
                                aria-hidden="true"
                              />
                            )}
                          </button>

                          {isExpanded ? (
                            <div className="pb-5 pr-8 space-y-2.5 max-w-3xl">
                              {item.notes ? (
                                <ul className="space-y-1 text-xs sm:text-sm text-slate-300">
                                  {item.notes.map((note) => (
                                    <li key={note} className="flex items-start gap-2.5">
                                      <span
                                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-purple-400"
                                        aria-hidden="true"
                                      />
                                      <span>{note}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                              <p className="text-sm text-slate-400 leading-relaxed">
                                {item.solution}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
