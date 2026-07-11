"use client";

import React, { useEffect, useRef, useState } from "react";
import "./why-choose-us.css";

// ─────────────────────────────────────────────────────────────────────────────
// Course-specific industry fact bullet points
// Keyed by the `overview` field from InnerCourseData.ts
// ─────────────────────────────────────────────────────────────────────────────

interface FactItem {
  icon: string;
  text: string;
  source: string;
}

const COURSE_FACTS: Record<string, FactItem[]> = {
  "certification-in-advanced-digital-marketing-&-ai": [
    {
      icon: "fas fa-chart-line",
      text: "Digital marketing jobs in India grew by 63% in 2023",
      source: "LinkedIn Workforce Report, 2023",
    },
    {
      icon: "fas fa-rupee-sign",
      text: "Average salary of a Digital Marketing Manager: ₹7–14 LPA",
      source: "Glassdoor India, 2024",
    },
    {
      icon: "fas fa-bullhorn",
      text: "93% of businesses globally use content marketing as a core strategy",
      source: "HubSpot State of Marketing, 2024",
    },
    {
      icon: "fas fa-globe",
      text: "India's digital ad market is projected to reach ₹50,000 Cr by 2026",
      source: "GroupM TYNY Report, 2024",
    },
  ],

  "certification-in-advanced-graphic-design-&-ai": [
    {
      icon: "fas fa-paint-brush",
      text: "India's creative economy employs 1.2 million designers, growing at 15% annually",
      source: "CII Creative Economy Report",
    },
    {
      icon: "fas fa-rupee-sign",
      text: "Graphic Designer salaries range ₹3–9 LPA; senior designers earn ₹12+ LPA",
      source: "Glassdoor India, 2024",
    },
    {
      icon: "fas fa-globe",
      text: "The global graphic design market is worth $45.8 billion, growing at 3.7% CAGR",
      source: "IBISWorld, 2024",
    },
    {
      icon: "fas fa-eye",
      text: "94% of first impressions of a brand or website are design-related",
      source: "ResearchGate University Study",
    },
  ],

  "mastery-in-social-media-management": [
    {
      icon: "fas fa-users",
      text: "India has 467 million social media users — one of the world's largest audiences",
      source: "Statista, 2024",
    },
    {
      icon: "fas fa-rupee-sign",
      text: "Social media managers earn ₹3.5–8 LPA; senior roles reach ₹12+ LPA",
      source: "Glassdoor India, 2024",
    },
    {
      icon: "fas fa-thumbs-up",
      text: "73% of marketers say social media marketing is highly effective for business growth",
      source: "Buffer State of Social, 2024",
    },
    {
      icon: "fas fa-shopping-bag",
      text: "80% of consumers research a brand on social media before making any purchase",
      source: "Sprout Social Index, 2024",
    },
  ],

  "marketplace-certification": [
    {
      icon: "fas fa-shopping-cart",
      text: "India's e-commerce market is projected to reach $350 billion by 2030",
      source: "IBEF E-commerce Report, 2024",
    },
    {
      icon: "fas fa-rupee-sign",
      text: "Marketplace managers earn ₹4–10 LPA; specialists can reach ₹12+ LPA",
      source: "Glassdoor India, 2024",
    },
    {
      icon: "fab fa-amazon",
      text: "Amazon India has 70,000+ active third-party sellers, growing at 40% YoY",
      source: "Amazon India Seller Report",
    },
    {
      icon: "fas fa-search",
      text: "64% of product searches in India begin on e-commerce platforms like Amazon & Flipkart",
      source: "Kantar Report, 2023",
    },
  ],

  "seo-certification": [
    {
      icon: "fas fa-rupee-sign",
      text: "SEO specialists earn ₹3.5–10 LPA; senior roles reach ₹12–18 LPA",
      source: "Glassdoor India, 2024",
    },
    {
      icon: "fab fa-google",
      text: "Google processes 8.5 billion searches per day — organic traffic is the #1 revenue driver",
      source: "Google, 2024",
    },
    {
      icon: "fas fa-chart-bar",
      text: "Businesses that invest in SEO see an average 12.2x return on investment",
      source: "Forrester Research, 2024",
    },
    {
      icon: "fas fa-mouse-pointer",
      text: "68% of all online experiences begin with a search engine query",
      source: "BrightEdge Research, 2024",
    },
  ],

  "certification-in-web-development": [
    {
      icon: "fas fa-rupee-sign",
      text: "Web developer salaries in India: ₹5–14 LPA; senior roles reach ₹18+ LPA",
      source: "Glassdoor India, 2024",
    },
    {
      icon: "fas fa-laptop-code",
      text: "India has 5 million+ registered websites and 35,000+ new websites launch daily",
      source: "InterNIC / Zscaler",
    },
    {
      icon: "fas fa-globe",
      text: "The global website builder & CMS market is projected to reach $22.7 billion by 2028",
      source: "MarketsandMarkets, 2024",
    },
    {
      icon: "fab fa-wordpress",
      text: "WordPress powers 43% of all websites — making it the most in-demand CMS skill",
      source: "W3Techs, 2024",
    },
  ],
};

// Shared Adshalaa stats counters
interface StatCounter {
  icon: string;
  target: number;
  suffix: string;
  label: string;
}

const ADSHALAA_STATS: StatCounter[] = [
  { icon: "fas fa-user-graduate", target: 1000, suffix: "+", label: "Students Trained" },
  { icon: "fas fa-briefcase",     target: 95,   suffix: "%", label: "Placement Rate" },
  { icon: "fas fa-building",      target: 50,   suffix: "+", label: "Hiring Partners" },
  { icon: "fas fa-star",          target: 4.8,  suffix: "★", label: "Avg. Rating" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Animated counter hook
// ─────────────────────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const isDecimal = target % 1 !== 0;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const val = eased * target;
      setCount(isDecimal ? Math.round(val * 10) / 10 : Math.floor(val));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ─────────────────────────────────────────────────────────────────────────────
// Single animated stat card
// ─────────────────────────────────────────────────────────────────────────────
function StatCard({ stat, animate }: { stat: StatCounter; animate: boolean }) {
  const count = useCountUp(stat.target, 1800, animate);
  return (
    <div className="wcu__stat-card">
      <div className="wcu__stat-icon">
        <i className={stat.icon}></i>
      </div>
      <div className="wcu__stat-number">
        {count}{stat.suffix}
      </div>
      <div className="wcu__stat-label">{stat.label}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main WhyChooseUs Component
// ─────────────────────────────────────────────────────────────────────────────
interface WhyChooseUsProps {
  courseOverviewKey?: string;
}

export default function WhyChooseUs({ courseOverviewKey }: WhyChooseUsProps) {
  const facts = courseOverviewKey
    ? (COURSE_FACTS[courseOverviewKey] ?? Object.values(COURSE_FACTS)[0])
    : Object.values(COURSE_FACTS)[0];

  // Intersection observer to trigger counter animation
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="wcu__section" ref={sectionRef}>
      <div className="wcu__wrapper">

        {/* ── Left: Why Adshalaa + industry facts ── */}
        <div className="wcu__left">
          <div className="section__title mb-40">
            <span className="sub-title">Industry Insights</span>
            <h2 className="title">
              Why Choose Adshalaa?
            </h2>
            <p className="desc" style={{ marginTop: '10px' }}>
              Our courses are built around what employers actually hire for — backed by real market data.
            </p>
          </div>

          <ul className="wcu__facts">
            {facts.map((fact, i) => (
              <li className="wcu__fact-item" key={i}>
                <div className="wcu__fact-icon">
                  <i className={fact.icon}></i>
                </div>
                <div className="wcu__fact-text">
                  {fact.text}{" "}
                  <span className="wcu__fact-source">({fact.source})</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right: Animated stat counters ── */}
        <div className="wcu__right">
          <div className="wcu__stats-grid">
            {ADSHALAA_STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} animate={animate} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
