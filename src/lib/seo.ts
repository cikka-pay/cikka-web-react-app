export const SITE_URL = "https://cikka.club";
export const SITE_NAME = "Cikka";
export const LEGAL_NAME = "Sorvantis Platforms Pvt Ltd";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.cikka.app";

export const SOCIAL_PROFILES = [
  "https://www.linkedin.com/company/cikkaclub/",
  "https://www.instagram.com/cikka.club/",
  "https://x.com/Cikkaclub",
  PLAY_STORE_URL,
] as const;

export const DEFAULT_OG_IMAGE = `${SITE_URL}/Cikka_Logo.png`;

/**
 * Central SEO configuration for all routes.
 * Update copy, keywords, or alternate names here without touching any UI components.
 */
export const SEO_CONFIG = {
  alternateNames: [
    "Cikka Club",
    "Cikka App",
    "Sikka",
    "Sikka Club",
    "Sikka App",
    "Sika",
    "Cika",
    "Sikka.club",
  ],
  founder: {
    name: "Sujal Choubisa",
    jobTitle: "Founder & CEO",
  },
  defaultKeywords:
    "Cikka, Cikka Club, Sikka, Sikka Club, Sika, Cika, Sikka.club, Sujal Choubisa, Founder of Cikka, CEO of Cikka, credit card platform, bill payment platform, rewarding credit card platform, most rewarding credit card platform, credit card bill payment, CIBIL score, travel credit card, shopping credit card, most cashback credit card, banks & credit cards, dine-in credit cards, BBPS bill pay, UPI payments, Cikka Mall, India fintech",
  routes: {
    home: {
      path: "/",
      title: "Cikka — Rewarding Credit Card & Bill Payment Platform in India",
      description:
        "Cikka (Cikka Club) by Sorvantis Platforms Pvt Ltd is a rewarding credit card and bill payment platform for managing credit cards, BBPS bills, UPI, shopping, travel, and dine-in cashback rewards.",
      keywords:
        "Cikka, Cikka Club, Sikka, Sikka Club, Sika, Cika, Sikka.club, Sujal Choubisa, credit card platform, bill payment platform, most rewarding credit card platform, rewarding credit card, most cashback credit card, travel credit card, shopping credit card, dine-in credit cards, banks & credit cards, CIBIL score, Cikka Mall",
    },
    getApp: {
      path: "/get-app",
      title: "Download Cikka App (Cikka Club) for Android & iOS | Cikka",
      description:
        "Download the official Cikka app on Google Play and Apple App Store. Manage credit cards, pay BBPS bills, track rewards, and earn cashback on shopping, travel, and dine-in.",
      keywords:
        "Download Cikka app, Cikka Club app, Sikka app download, Sikka Club app, credit card platform app, bill payment platform India",
    },
    helpCenter: {
      path: "/help-center",
      title: "Cikka Help Center — Is Cikka Safe? FAQs, KYC, Bills & Cashback",
      description:
        "Official Cikka Help Center: learn how Cikka keeps your account safe with PAN KYC, Device Lock & PIN, live BBPS credit card bill fetching, UPI status, and cashback withdrawals.",
      keywords:
        "Cikka help center, is Cikka safe, is Cikka Club safe, is Cikka trustable, Cikka support, Cikka FAQ, Cikka PAN KYC, Cikka cashback withdrawal",
    },
  },
} as const;

export function buildCanonicalUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? `${SITE_URL}/` : `${SITE_URL}${normalized}`;
}

export function buildRouteHeadMeta({
  path,
  title,
  description,
  keywords,
  ogType = "website",
}: {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
}) {
  const url = buildCanonicalUrl(path);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: keywords ?? SEO_CONFIG.defaultKeywords },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { property: "og:image:alt", content: `${SITE_NAME} logo` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Cikkaclub" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: [...SEO_CONFIG.alternateNames],
    legalName: LEGAL_NAME,
    founder: {
      "@type": "Person",
      name: SEO_CONFIG.founder.name,
      jobTitle: SEO_CONFIG.founder.jobTitle,
    },
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: DEFAULT_OG_IMAGE,
    },
    sameAs: [...SOCIAL_PROFILES],
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: [...SEO_CONFIG.alternateNames],
    url: `${SITE_URL}/`,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function buildSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#app`,
    name: SITE_NAME,
    alternateName: [...SEO_CONFIG.alternateNames],
    applicationCategory: "FinanceApplication",
    operatingSystem: "Android, iOS",
    url: `${SITE_URL}/get-app`,
    downloadUrl: PLAY_STORE_URL,
    installUrl: PLAY_STORE_URL,
    description: SEO_CONFIG.routes.home.description,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildCanonicalUrl(item.path),
    })),
  };
}
