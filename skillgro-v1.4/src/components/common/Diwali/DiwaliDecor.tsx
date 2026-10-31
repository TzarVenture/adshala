"use client";
import React, { useEffect, useRef } from "react";
import DiwaliDiya from "./DiwaliDiya";

export const DiwaliDecor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  // ── Realistic Canvas Fireworks Physics Engine ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    interface FireworkParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
      decay: number;
      size: number;
      trail: { x: number; y: number }[];
      gravity: number;
      flicker: boolean;
    }

    interface FireworkRocket {
      x: number;
      y: number;
      targetY: number;
      vy: number;
      color: string;
      trail: { x: number; y: number }[];
    }

    const particles: FireworkParticle[] = [];
    const rockets: FireworkRocket[] = [];

    // Authentic festive colors: Gold kamuro, saffron willow, crimson peony, emerald star, electric cyan
    const COLOR_PALETTES = [
      ["#FFD700", "#FFE082", "#FFF9C4"], // Golden Willow / Kamuro
      ["#FF6D00", "#FFB300", "#FFD54F"], // Royal Saffron
      ["#FF1744", "#FF5252", "#FF8A80"], // Ruby Crimson
      ["#00E676", "#69F0AE", "#B9F6CA"], // Emerald Palm
      ["#00E5FF", "#40C4FF", "#80D8FF"], // Cyan Starburst
      ["#E040FB", "#EA80FC", "#FFFFFF"], // Festive Violet & White
    ];

    const createExplosion = (x: number, y: number) => {
      const palette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
      const count = 50 + Math.floor(Math.random() * 30);
      const isWillow = Math.random() > 0.4;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.35;
        const speed = Math.random() * 3.8 + 1.2;
        const color = palette[Math.floor(Math.random() * palette.length)];

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          alpha: 1.0,
          decay: isWillow ? 0.009 + Math.random() * 0.006 : 0.014 + Math.random() * 0.008,
          size: Math.random() * 1.8 + 1.1,
          trail: [],
          gravity: isWillow ? 0.045 : 0.035,
          flicker: Math.random() > 0.35,
        });
      }
    };

    const launchRocket = () => {
      const x = width * 0.18 + Math.random() * (width * 0.64);
      const targetY = height * 0.08 + Math.random() * (height * 0.28);
      const palette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
      rockets.push({
        x,
        y: height * 0.85,
        targetY,
        vy: -(Math.random() * 3.5 + 8.5),
        color: palette[0],
        trail: [],
      });
    };

    // Auto-launch intervals every 3.8s
    let lastLaunch = performance.now();
    setTimeout(() => launchRocket(), 600); // Immediate gentle first rocket

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Launch rocket periodically
      if (time - lastLaunch > 3800) {
        launchRocket();
        lastLaunch = time;
      }

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 5) r.trail.shift();

        // Draw ascending spark trail
        ctx.beginPath();
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = 0.85;
        for (let j = 0; j < r.trail.length; j++) {
          const pt = r.trail[j];
          if (j === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // Burst at target altitude
        if (r.y <= r.targetY || r.vy >= -1) {
          createExplosion(r.x, r.y);
          rockets.splice(i, 1);
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 4) p.trail.shift();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.975;
        p.vy *= 0.975;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const currentAlpha = p.flicker && p.alpha < 0.45
          ? Math.max(0, p.alpha + (Math.random() * 0.25 - 0.12))
          : p.alpha;

        // Draw realistic spark trail
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size * 0.8;
          ctx.globalAlpha = currentAlpha * 0.55;
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let j = 1; j < p.trail.length; j++) {
            ctx.lineTo(p.trail[j].x, p.trail[j].y);
          }
          ctx.stroke();
        }

        // Draw spark luminous head
        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

      {/* ── 2. Realistic Canvas Aerial Fireworks ── */}
      <canvas
        ref={canvasRef}
        className="diwali-fireworks-canvas"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 8,
        }}
      />

      {/* ── 3. Realistic Animated Diyas (Bottom Corners, No Upper Circle Disk) ── */}
      <div className="diwali-corner-diya diwali-corner-diya-left">
        <DiwaliDiya size={110} showRays={true} />
      </div>

      <div className="diwali-corner-diya diwali-corner-diya-right">
        <DiwaliDiya size={110} showRays={true} />
      </div>
    </div>
  );
};

export default DiwaliDecor;
