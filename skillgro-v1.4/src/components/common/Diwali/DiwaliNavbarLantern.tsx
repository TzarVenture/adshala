import React from 'react';

interface DiwaliNavbarLanternProps {
  side: 'left' | 'right';
  className?: string;
}

export const DiwaliNavbarLantern: React.FC<DiwaliNavbarLanternProps> = ({
  side,
  className = '',
}) => {
  return (
    <div
      className={`diwali-navbar-lantern diwali-navbar-lantern-${side} ${className}`}
      style={{
        position: 'absolute',
        top: '100%',
        [side]: side === 'left' ? '18px' : '18px',
        width: '42px',
        height: '96px',
        pointerEvents: 'none',
        zIndex: 101,
        overflow: 'visible',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 70 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="diwali-lantern-svg"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'visible',
          transformOrigin: '35px 0px',
        }}
      >
        <defs>
          {/* Subtle Diffuse Soft Glow Filter (No sharp edges) */}
          <filter id={`diffuseGlow-${side}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Golden Metallic Chain & Frame Gradient */}
          <linearGradient id={`goldMetallic-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="25%" stopColor="#FFD54F" />
            <stop offset="50%" stopColor="#FFA000" />
            <stop offset="75%" stopColor="#FFD54F" />
            <stop offset="100%" stopColor="#8D5B00" />
          </linearGradient>

          {/* Radiant Lantern Core Light */}
          <radialGradient id={`lanternLight-${side}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FFF9C4" />
            <stop offset="55%" stopColor="#FFD54F" />
            <stop offset="85%" stopColor="#FF6D00" />
            <stop offset="100%" stopColor="#E65100" />
          </radialGradient>

          {/* Faceted Lantern Panel Gradient */}
          <linearGradient id={`panelGrad-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF8F00" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#FFD54F" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FF6D00" stopOpacity="0.85" />
          </linearGradient>

          {/* Silk Tassel Gradient */}
          <linearGradient id={`tasselGrad-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD54F" />
            <stop offset="50%" stopColor="#FF1744" />
            <stop offset="100%" stopColor="#D50000" />
          </linearGradient>
        </defs>

        {/* ── 1. DELICATE HANGING GOLDEN CHAIN & TOP RING ── */}
        <circle cx="35" cy="4" r="3.5" fill="none" stroke={`url(#goldMetallic-${side})`} strokeWidth="1.8" />
        
        <g stroke={`url(#goldMetallic-${side})`} strokeWidth="1.6" fill="none">
          <line x1="35" y1="7.5" x2="35" y2="14" />
          <ellipse cx="35" cy="18" rx="2.5" ry="4" />
          <line x1="35" y1="22" x2="35" y2="28" />
          <ellipse cx="35" cy="32" rx="2.5" ry="4" />
        </g>

        {/* ── 2. LANTERN TOP ORNAMENTAL CAP ── */}
        <path
          d="M 22 38 L 35 34 L 48 38 L 44 42 L 26 42 Z"
          fill={`url(#goldMetallic-${side})`}
          stroke="#7A4F00"
          strokeWidth="0.8"
        />
        <circle cx="35" cy="34" r="2.2" fill="#FFE082" />

        {/* ── 3. TRADITIONAL AKASH KANDIL / DIAMOND LANTERN BODY ── */}
        {/* NO HARD CIRCLE GLOW: Pure organic diffuse glow via SVG filter and drop-shadow */}
        <g filter={`url(#diffuseGlow-${side})`}>
          {/* Main Diamond Central Body */}
          <polygon
            points="35,42 56,66 49,94 21,94 14,66"
            fill={`url(#lanternLight-${side})`}
            stroke={`url(#goldMetallic-${side})`}
            strokeWidth="1.6"
            className="diwali-lantern-glow-body"
          />

          {/* Left & Right Faceted Wing Panels */}
          <polygon
            points="35,42 14,66 21,94 35,74"
            fill={`url(#panelGrad-${side})`}
            opacity="0.85"
          />
          <polygon
            points="35,42 56,66 49,94 35,74"
            fill={`url(#panelGrad-${side})`}
            opacity="0.75"
          />

          {/* Traditional Jali / Star Cutout in Center */}
          <path
            d="M 35 58 L 38 67 L 46 67 L 40 72 L 42 80 L 35 75 L 28 80 L 30 72 L 24 67 L 32 67 Z"
            fill="#FFFFFF"
            opacity="0.95"
            className="diwali-lantern-inner-star"
          />

          {/* Intricate Filigree Grid / Lattice lines */}
          <line x1="21" y1="66" x2="49" y2="66" stroke="#FFE082" strokeWidth="0.8" strokeOpacity="0.8" />
          <line x1="28" y1="54" x2="42" y2="54" stroke="#FFE082" strokeWidth="0.8" strokeOpacity="0.8" />
          <line x1="25" y1="82" x2="45" y2="82" stroke="#FFE082" strokeWidth="0.8" strokeOpacity="0.8" />
        </g>

        {/* ── 4. BOTTOM BRASS RIM & BEAD BASE ── */}
        <rect
          x="20"
          y="93"
          width="30"
          height="4"
          rx="1"
          fill={`url(#goldMetallic-${side})`}
          stroke="#7A4F00"
          strokeWidth="0.8"
        />

        {/* Golden Beads along Bottom Rim */}
        <circle cx="23" cy="98" r="1.8" fill="#FFE082" />
        <circle cx="29" cy="98" r="1.8" fill="#FFE082" />
        <circle cx="35" cy="98" r="2.2" fill="#FFF9C4" />
        <circle cx="41" cy="98" r="1.8" fill="#FFE082" />
        <circle cx="47" cy="98" r="1.8" fill="#FFE082" />

        {/* ── 5. HANGING SILK TASSELS & SPARKLING BEADS ── */}
        {/* Center Main Tassel (Longer) */}
        <g className="diwali-tassel-center">
          <line x1="35" y1="98" x2="35" y2="114" stroke="#FFD54F" strokeWidth="1.2" />
          <circle cx="35" cy="114" r="2.4" fill="#FF1744" />
          <path
            d="M 32 116 L 38 116 L 40 148 L 30 148 Z"
            fill={`url(#tasselGrad-${side})`}
            opacity="0.95"
          />
          <circle cx="35" cy="151" r="1.6" fill="#FFD54F" />
        </g>

        {/* Left Side Tassel */}
        <g className="diwali-tassel-left">
          <line x1="25" y1="98" x2="24" y2="110" stroke="#FFD54F" strokeWidth="1" />
          <circle cx="24" cy="110" r="1.8" fill="#00E676" />
          <path
            d="M 22 112 L 26 112 L 28 136 L 20 136 Z"
            fill={`url(#tasselGrad-${side})`}
            opacity="0.88"
          />
          <circle cx="24" cy="138" r="1.4" fill="#FFD54F" />
        </g>

        {/* Right Side Tassel */}
        <g className="diwali-tassel-right">
          <line x1="45" y1="98" x2="46" y2="110" stroke="#FFD54F" strokeWidth="1" />
          <circle cx="46" cy="110" r="1.8" fill="#00E676" />
          <path
            d="M 44 112 L 48 112 L 50 136 L 42 136 Z"
            fill={`url(#tasselGrad-${side})`}
            opacity="0.88"
          />
          <circle cx="46" cy="138" r="1.4" fill="#FFD54F" />
        </g>
      </svg>
    </div>
  );
};

export default DiwaliNavbarLantern;
