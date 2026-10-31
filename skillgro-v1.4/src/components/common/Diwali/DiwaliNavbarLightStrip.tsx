import React from 'react';

export const DiwaliNavbarLightStrip: React.FC = () => {
  // Generate ~36 evenly distributed micro-light points along the navbar strip
  const lights = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    delay: `${((i * 0.17) % 2.4).toFixed(2)}s`,
    duration: `${(2.2 + ((i * 0.23) % 1.2)).toFixed(2)}s`,
  }));

  return (
    <div
      className="diwali-navbar-light-strip"
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        pointerEvents: 'none',
        zIndex: 99,
        overflow: 'visible',
      }}
    >
      {/* ── 1. Delicate Metallic Golden Wire along Navbar Bottom Edge ── */}
      <div className="diwali-strip-wire" />

      {/* ── 2. Subtle Downward Ambient Light Wash (Real diffuse glow, no circles) ── */}
      <div className="diwali-strip-light-wash" />

      {/* ── 3. Array of Micro Warm Golden Fairy Lights along the Strip ── */}
      <div className="diwali-strip-nodes-container">
        {lights.map((light) => (
          <div
            key={light.id}
            className="diwali-strip-node"
            style={{
              animationDelay: light.delay,
              animationDuration: light.duration,
            }}
          >
            {/* Tiny incandescent core */}
            <span className="diwali-strip-node-core" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiwaliNavbarLightStrip;
