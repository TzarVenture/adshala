"use client";
import React from "react";
// import DiwaliDiya from "./DiwaliDiya";

export const DiwaliDecor: React.FC = () => {
  // Sparkles array with fixed randomized positions for hydration consistency
  const sparkles = [
    { top: "12%", left: "12%", size: 16, delay: "0s", duration: "3.2s" },
    { top: "18%", left: "84%", size: 20, delay: "0.8s", duration: "4s" },
    { top: "28%", left: "20%", size: 14, delay: "1.4s", duration: "3.5s" },
    { top: "35%", left: "76%", size: 18, delay: "2.1s", duration: "4.2s" },
    { top: "45%", left: "8%", size: 15, delay: "0.5s", duration: "3.8s" },
    { top: "52%", left: "90%", size: 22, delay: "1.7s", duration: "4.5s" },
    { top: "64%", left: "16%", size: 17, delay: "0.3s", duration: "3.6s" },
    { top: "72%", left: "82%", size: 19, delay: "2.4s", duration: "4.1s" },
    { top: "82%", left: "24%", size: 14, delay: "1.1s", duration: "3.4s" },
    { top: "88%", left: "72%", size: 16, delay: "1.9s", duration: "3.9s" },
  ];

  return (
    <div className="diwali-ambient-decor-wrapper" aria-hidden="true">
      {/* ── 1. Subtle Background Floating Sparkles ── */}
      <div className="diwali-sparkles-container">
        {sparkles.map((s, idx) => (
          <div
            key={idx}
            className="diwali-floating-sparkle"
            style={{
              top: s.top,
              left: s.left,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          >
            <svg
              width={s.size}
              height={s.size}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                fill="#FFD700"
                opacity="0.85"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* ── 2. Realistic Animated Diyas (Commented out per user request; code preserved in DiwaliDiya.tsx) ── */}
      {/*
      <div className="diwali-corner-diya diwali-corner-diya-left">
        <DiwaliDiya size={110} showRays={true} />
      </div>

      <div className="diwali-corner-diya diwali-corner-diya-right">
        <DiwaliDiya size={110} showRays={true} />
      </div>
      */}
    </div>
  );
};

export default DiwaliDecor;
