// CategoryConfig.ts
// ─────────────────────────────────────────────────────────
// Single source of truth for all Adshalaa course categories.
// Used by:
//   - Categories.tsx (carousel links)
//   - /app/[category]/page.tsx (dynamic SEO pages)
// ─────────────────────────────────────────────────────────

export interface CategoryConfigItem {
  id: number;
  /** URL slug — e.g. "advanced-digital-marketing" */
  slug: string;
  /** Flaticon class for the category icon */
  icon: string;
  /** Short display title shown in the carousel */
  title: string;
  /** Approximate course count shown in carousel (optional badge) */
  total: string;
  /** H1 heading shown on the category page */
  heading: string;
  /** Paragraph description shown on the category page */
  description: string;
  /** Broad category from InnerCourseData to show ALL related courses (e.g., "Marketing", "Development", "Design") */
  targetCategory: string;
  /** SEO metadata for the category page */
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

const category_config: CategoryConfigItem[] = [
  {
    id: 1,
    slug: "certification-in-advanced-digital-marketing-and-ai-in-mumbai",
    icon: "flaticon-investment",
    title: "Advanced Digital Marketing",
    total: "(22)",
    heading: "Certification in Advanced Digital Marketing & AI",
    description:
      "Master SEO, PPC, social media, email marketing, content strategy and AI-powered marketing tools. Graduate with an industry-recognised certification, real-world project experience and 100% placement assistance.",
    targetCategory: "Marketing",
    seo: {
      title: "Advanced Digital Marketing Course in Mumbai | Adshalaa",
      description:
        "Join Adshalaa's Certification in Advanced Digital Marketing & AI — a 3-month offline program in Andheri, Mumbai, followed by a 1-month paid internship. 100% placement assistance. Enroll today.",
      keywords:
        "digital marketing course Mumbai, advanced digital marketing certification, digital marketing with AI, online marketing course Andheri, digital marketing institute Mumbai",
    },
  },
  {
    id: 2,
    slug: "certification-in-advanced-graphic-design-and-ai-in-mumbai",
    icon: "flaticon-graphic-design",
    title: "Graphic Designing",
    total: "(41)",
    heading: "Certification in Advanced Graphic Design & AI",
    description:
      "Learn professional graphic design using Adobe Photoshop, Illustrator, InDesign and AI-powered design workflows. Build a job-ready portfolio, earn a recognised certification and launch your creative career.",
    targetCategory: "Design",
    seo: {
      title: "Graphic Design Course in Mumbai | Adshalaa",
      description:
        "Master graphic design with AI at Adshalaa, Andheri Mumbai. Professional certification, real portfolio projects, 1-month paid internship and 100% placement support.",
      keywords:
        "graphic design course Mumbai, graphic design certification, Adobe Photoshop course Andheri, graphic design with AI, design institute Mumbai",
    },
  },
  {
    id: 3,
    slug: "certification-in-web-development-in-mumbai",
    icon: "flaticon-coding",
    title: "Web Development",
    total: "(29)",
    heading: "Certification in Web Development",
    description:
      "Build modern, responsive websites using HTML, CSS, JavaScript, WordPress and Shopify. Graduate with live project experience, an industry certification and full placement support.",
    targetCategory: "Development",
    seo: {
      title: "Web Development Course in Mumbai | Adshalaa",
      description:
        "Learn web development at Adshalaa, Andheri Mumbai. Build real websites, earn certification and get placed. 3-month program + 1-month paid internship.",
      keywords:
        "web development course Mumbai, web design certification Andheri, WordPress course Mumbai, front end development course, web development institute Mumbai",
    },
  },
  {
    id: 4,
    slug: "mastery-in-social-media-management-in-mumbai",
    icon: "flaticon-email",
    title: "Social Media Management",
    total: "(31)",
    heading: "Mastery in Social Media Management",
    description:
      "Learn to plan, create and grow brand presence across Instagram, Facebook, LinkedIn and YouTube. Master content calendars, analytics, paid ads and influencer strategy with expert mentors.",
    targetCategory: "Marketing",
    seo: {
      title: "Social Media Management Course in Mumbai | Adshalaa",
      description:
        "Master social media marketing at Adshalaa, Mumbai. Learn content strategy, paid ads and brand management. Get certified and placed with 100% placement assistance.",
      keywords:
        "social media management course Mumbai, Instagram marketing course, Facebook ads training Andheri, social media certification, social media course Mumbai",
    },
  },
  {
    id: 5,
    slug: "marketplace-specialist-program-in-mumbai",
    icon: "flaticon-fashion",
    title: "Marketplace Certification",
    total: "(23)",
    heading: "Marketplace Specialist Program",
    description:
      "Become a certified marketplace specialist. Learn to sell on Amazon, Flipkart and Meesho — from product listings and catalogue management to sponsored ads and scaling strategies.",
    targetCategory: "Marketing",
    seo: {
      title: "Marketplace Certification Course in Mumbai | Adshalaa",
      description:
        "Get certified in marketplace selling (Amazon, Flipkart, Meesho) at Adshalaa Mumbai. Learn product listing, ads and scaling. 100% placement support.",
      keywords:
        "marketplace certification Mumbai, Amazon seller course, Flipkart seller training Andheri, e-commerce marketplace course, Amazon course Mumbai",
    },
  },
  {
    id: 6,
    slug: "advanced-seo-certification-in-mumbai",
    icon: "flaticon-interaction",
    title: "Advanced SEO Certification",
    total: "(19)",
    heading: "Advanced SEO Certification",
    description:
      "Master technical SEO, on-page and off-page optimisation, keyword research, link building and AI-powered SEO tools. Learn to rank websites and drive consistent organic traffic professionally.",
    targetCategory: "Marketing",
    seo: {
      title: "SEO Course in Mumbai | Advanced SEO Certification | Adshalaa",
      description:
        "Learn advanced SEO at Adshalaa, Andheri Mumbai. Technical SEO, keyword research, link building and AI tools. Get certified and placed. Enroll now.",
      keywords:
        "SEO course Mumbai, advanced SEO certification, search engine optimisation training Andheri, SEO with AI course, SEO institute Mumbai",
    },
  },
];

export default category_config;
