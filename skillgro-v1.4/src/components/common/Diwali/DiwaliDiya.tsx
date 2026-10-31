import React, { useId } from 'react';

interface DiwaliDiyaProps {
  size?: number;
  className?: string;
  showRays?: boolean;
}

export const DiwaliDiya: React.FC<DiwaliDiyaProps> = ({
  size = 120,
  className = '',
  showRays = true,
}) => {
  const uid = useId().replace(/:/g, '');

  return (
    <div
      className={`diwali-diya-wrapper ${className}`}
      style={{
        width: size,
        height: size * 0.9,
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    >
      <svg
        viewBox="0 0 240 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
        aria-label="Realistic Traditional Diwali Diya"
      >
        <defs>
          {/* Flame Deep Glow Blur Filter */}
          <filter id={`flameGlow-${uid}`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Ambient Warm Floor Glow Filter */}
          <radialGradient id={`ambientFloorGlow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFA000" stopOpacity="0.75" />
            <stop offset="35%" stopColor="#FF6D00" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#FF3D00" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#FF3D00" stopOpacity="0" />
          </radialGradient>

          {/* Realistic Clay / Terracotta 3D Body Gradient */}
          <radialGradient id={`clayBodyGrad-${uid}`} cx="50%" cy="65%" r="55%">
            <stop offset="0%" stopColor="#D97A2E" />
            <stop offset="35%" stopColor="#A84C10" />
            <stop offset="75%" stopColor="#6E2C06" />
            <stop offset="100%" stopColor="#3E1602" />
          </radialGradient>

          {/* Front Golden Clay Highlight (catches flame reflection) */}
          <linearGradient id={`clayHighlightGrad-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFB300" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#D97A2E" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6E2C06" stopOpacity="0" />
          </linearGradient>

          {/* Metallic Gold Rim & Snout Gradient */}
          <linearGradient id={`goldRimGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD54F" />
            <stop offset="25%" stopColor="#FFF8E1" />
            <stop offset="50%" stopColor="#FFC107" />
            <stop offset="75%" stopColor="#FF8F00" />
            <stop offset="100%" stopColor="#FFE082" />
          </linearGradient>

          {/* Diya Inner Cavity / Bowl Shadow */}
          <radialGradient id={`innerBowlGrad-${uid}`} cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#5E2204" />
            <stop offset="65%" stopColor="#320F00" />
            <stop offset="100%" stopColor="#1A0700" />
          </radialGradient>

          {/* Golden Ghee / Oil Surface with Warm Refraction */}
          <radialGradient id={`oilSurfaceGrad-${uid}`} cx="50%" cy="30%" r="55%">
            <stop offset="0%" stopColor="#FFF59D" />
            <stop offset="25%" stopColor="#FFCA28" />
            <stop offset="60%" stopColor="#E65100" />
            <stop offset="100%" stopColor="#4A1800" />
          </radialGradient>

          {/* Outer Flame Gradient (Saffron-Amber) */}
          <linearGradient id={`flameOuterGrad-${uid}`} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#FF2600" />
            <stop offset="30%" stopColor="#FF6D00" />
            <stop offset="65%" stopColor="#FFA000" />
            <stop offset="90%" stopColor="#FFD54F" />
            <stop offset="100%" stopColor="#FFF9C4" />
          </linearGradient>

          {/* Middle Flame Gradient (Luminous Gold) */}
          <linearGradient id={`flameMidGrad-${uid}`} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#FF6D00" />
            <stop offset="35%" stopColor="#FFB300" />
            <stop offset="70%" stopColor="#FFF176" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Inner Flame Core (Incandescent White) */}
          <linearGradient id={`flameCoreGrad-${uid}`} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#FFF59D" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Blue Flame Base (Characteristic of real candle/oil lamp flames) */}
          <linearGradient id={`flameBlueGrad-${uid}`} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#00B0FF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#2979FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2979FF" stopOpacity="0" />
          </linearGradient>

          {/* Diya Ground Soft Shadow */}
          <radialGradient id={`groundShadow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.45)" />
            <stop offset="60%" stopColor="rgba(0,0,0,0.2)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* ── 1. AMBIENT RADIANT LIGHT CAST ON GROUND ── */}
        {showRays && (
          <ellipse
            cx="120"
            cy="165"
            rx="95"
            ry="24"
            fill={`url(#ambientFloorGlow-${uid})`}
            className="diwali-real-floor-glow"
          />
        )}

        {/* ── 2. REALISTIC DIAPHRAGM GROUND CONTACT SHADOW ── */}
        <ellipse
          cx="120"
          cy="166"
          rx="75"
          ry="15"
          fill={`url(#groundShadow-${uid})`}
        />

        {/* ── 3. TERRACOTTA / CLAY DIYA MAIN BODY ── */}
        {/* Rear Lip Profile (inner bowl edge) */}
        <ellipse
          cx="120"
          cy="116"
          rx="82"
          ry="20"
          fill={`url(#innerBowlGrad-${uid})`}
          stroke="#421601"
          strokeWidth="1.5"
        />

        {/* Diya 3D Volumetric Outer Base (Traditional pinched snout lamp) */}
        <path
          d="M 38 116 
             C 40 148, 76 172, 120 172 
             C 164 172, 200 148, 202 116 
             C 182 128, 154 135, 120 135 
             C 86 135, 58 128, 38 116 Z"
          fill={`url(#clayBodyGrad-${uid})`}
          stroke="#381300"
          strokeWidth="1.5"
        />

        {/* Front Highlight Catcher (Flame Reflection on Terra Cotta) */}
        <path
          d="M 52 124 
             C 72 152, 102 165, 120 165 
             C 138 165, 168 152, 188 124 
             C 168 133, 145 137, 120 137 
             C 95 137, 72 133, 52 124 Z"
          fill={`url(#clayHighlightGrad-${uid})`}
          opacity="0.9"
        />

        {/* Traditional Embossed Indian Carvings / Petal Patterns */}
        <g stroke="#FFD54F" strokeWidth="1.2" strokeOpacity="0.75" fill="none">
          <path d="M 68 136 Q 84 154 120 154 Q 156 154 172 136" />
          <path d="M 82 144 Q 120 160 158 144" strokeWidth="1" />
          {/* Subtle Carved Dots */}
          <circle cx="120" cy="148" r="2.5" fill="#FFE082" />
          <circle cx="102" cy="144" r="2" fill="#FFE082" />
          <circle cx="138" cy="144" r="2" fill="#FFE082" />
          <circle cx="86" cy="138" r="1.6" fill="#FFE082" />
          <circle cx="154" cy="138" r="1.6" fill="#FFE082" />
        </g>

        {/* ── 4. POOL OF LIQUID OIL / GHEE ── */}
        <ellipse
          cx="120"
          cy="117"
          rx="76"
          ry="17"
          fill={`url(#oilSurfaceGrad-${uid})`}
        />

        {/* Oil Shimmer & Surface Tension Highlight Ring */}
        <ellipse
          cx="120"
          cy="116"
          rx="68"
          ry="13"
          fill="none"
          stroke="#FFE082"
          strokeWidth="1.2"
          strokeOpacity="0.6"
        />

        {/* Diya Gold Rim with Embossed Pearls */}
        <ellipse
          cx="120"
          cy="115"
          rx="82"
          ry="19"
          fill="none"
          stroke={`url(#goldRimGrad-${uid})`}
          strokeWidth="2.8"
        />

        {/* Fine Decorative Gold Pearls along Rim */}
        <g fill="#FFF9C4" opacity="0.95">
          <circle cx="48" cy="116" r="1.8" />
          <circle cx="62" cy="122" r="2.1" />
          <circle cx="82" cy="127" r="2.4" />
          <circle cx="104" cy="130" r="2.6" />
          <circle cx="120" cy="130.5" r="2.8" />
          <circle cx="136" cy="130" r="2.6" />
          <circle cx="158" cy="127" r="2.4" />
          <circle cx="178" cy="122" r="2.1" />
          <circle cx="192" cy="116" r="1.8" />
        </g>

        {/* ── 5. COTTON WICK (BAATI) & GLOWING EMBER ── */}
        {/* Twisted Cotton Baati emerging from oil */}
        <path
          d="M 116 117 C 117 102, 118 90, 120 84"
          stroke="#421D09"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 117 114 C 118 102, 119 92, 120 85"
          stroke="#E0D2C7"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.8"
        />
        {/* Incandescent Red-Hot Ember Tip at base of flame */}
        <circle cx="120" cy="84" r="3.2" fill="#FF3D00" />
        <circle cx="120" cy="84" r="1.6" fill="#FFF59D" />

        {/* ── 6. REALISTIC MULTI-TIER FLAME GROUP (Pure organic flame glow, no circle disk) ── */}
        {/* Wavering Flickering Flame Layers */}
        <g className="diwali-realistic-flame-wrapper" filter={`url(#flameGlow-${uid})`}>
          {/* Blue Flame Base (Crucial for realism) */}
          <path
            d="M 113 85 C 113 78, 127 78, 127 85 C 127 88, 113 88, 113 85 Z"
            fill={`url(#flameBlueGrad-${uid})`}
            className="diwali-flame-blue-base"
          />

          {/* Tier 1: Outer Saffron / Orange Flame Mantle */}
          <path
            d="M 120 83 
               C 104 69, 100 44, 118 14 
               C 123 25, 139 42, 139 63 
               C 139 77, 132 83, 120 83 Z"
            fill={`url(#flameOuterGrad-${uid})`}
            className="diwali-flame-layer-outer"
          />

          {/* Tier 2: Mid Golden-Yellow Luminous Flame */}
          <path
            d="M 120 81 
               C 109 69, 107 48, 119 26 
               C 123 35, 134 48, 134 65 
               C 134 76, 128 81, 120 81 Z"
            fill={`url(#flameMidGrad-${uid})`}
            className="diwali-flame-layer-mid"
          />

          {/* Tier 3: White-Hot Incandescent Teardrop Core */}
          <path
            d="M 120 78 
               C 114 69, 113 55, 120 38 
               C 123 46, 128 55, 128 68 
               C 128 75, 124 78, 120 78 Z"
            fill={`url(#flameCoreGrad-${uid})`}
            className="diwali-flame-layer-core"
          />
        </g>

        {/* ── 7. NATURAL RISING SPARKS / EMBERS ── */}
        <circle cx="118" cy="18" r="1.6" fill="#FFF9C4" className="diwali-spark-rising spark-a" />
        <circle cx="124" cy="8" r="1.3" fill="#FFE082" className="diwali-spark-rising spark-b" />
        <circle cx="119" cy="-2" r="1.5" fill="#FFD54F" className="diwali-spark-rising spark-c" />
      </svg>
    </div>
  );
};

export default DiwaliDiya;
