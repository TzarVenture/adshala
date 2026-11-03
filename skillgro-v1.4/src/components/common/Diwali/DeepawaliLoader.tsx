"use client";

import React, { useEffect, useRef, useState } from "react";
import { Rozha_One, Yatra_One } from "next/font/google";
import { istDate, startFireworks } from "./DiwaliFireworks";

// Devanagari-inspired Latin letterforms (shirorekha-style strokes) for the English greeting
// Samarkan comes from the cdnfonts CDN; Rozha One / Yatra One are fallbacks.
// The stylesheet is rendered in both branches (React hoists it to <head>) so the font is
// already loading during the boot cover, before the title zooms in.
const SAMARKAN_CSS = "https://fonts.cdnfonts.com/css/samarkan";
const rozha = Rozha_One({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-rozha" });
const yatra = Yatra_One({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-yatra" });
const FORCE = process.env.NEXT_PUBLIC_FESTIVE_LOADER === "on";

const SEEN_KEY = "tzar-deepawali-loader-seen";
const DURATION_MS = 15000;
const FADE_MS = 900;

// Only on Diwali itself: 8 & 9 Nov 2026 (IST). NEXT_PUBLIC_FESTIVE_LOADER=on forces it for testing.
function isLoaderDay() {
  if (FORCE) return true;
  const { y, m, day } = istDate();
  return y === 2026 && m === 11 && (day === 8 || day === 9);
}

// Fixed star field so server and client markup match
const STARS = Array.from({ length: 90 }, (_, i) => {
  const r = (n: number) => Math.round((((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1) + 1) % 1 * 100) / 100;
  return { left: r(1) * 100, top: r(2) * 75, size: r(3) * 1.8 + 0.6, delay: r(4) * 4 };
});

// Deterministic pseudo-random so SSR and client agree
const prng = (i: number, n: number) =>
  Math.round(((((Math.sin(i * 91.17 + n * 47.31) * 24634.6345) % 1) + 1) % 1) * 1000) / 1000;

// Rising sky lanterns (aakash kandil)
const LANTERNS = Array.from({ length: 9 }, (_, i) => ({
  left: 4 + prng(i, 1) * 92,
  delay: -prng(i, 2) * 14,
  dur: 12 + prng(i, 3) * 8,
  scale: 0.5 + prng(i, 4) * 0.7,
}));

// City skyline silhouette with lit windows along the horizon
const BUILDINGS = Array.from({ length: 48 }, (_, i) => ({ w: 20 + prng(i, 5) * 22, h: 40 + prng(i, 6) * 120 }));
let cx = 0;
const SKYLINE =
  "M0 180 " +
  BUILDINGS.map((b) => {
    const seg = `L${cx.toFixed(1)} ${(180 - b.h).toFixed(1)} L${(cx + b.w).toFixed(1)} ${(180 - b.h).toFixed(1)} `;
    cx += b.w;
    return seg;
  }).join("") +
  "L1440 180 Z";
const WINDOWS = (() => {
  const out: { x: number; y: number; o: number }[] = [];
  let x = 0;
  BUILDINGS.forEach((b, i) => {
    for (let k = 0; k < 6; k++) {
      if (prng(i * 7 + k, 8) > 0.45) continue;
      out.push({
        x: Math.round(x + 4 + prng(i * 7 + k, 9) * (b.w - 10)),
        y: Math.round(180 - b.h + 8 + prng(i * 7 + k, 10) * (b.h - 16)),
        o: 0.5 + prng(i * 7 + k, 11) * 0.5,
      });
    }
    x += b.w;
  });
  return out;
})();

export default function DeepawaliLoader() {
  // The homepage is statically built, so the date is checked on the client; a tiny inline
  // script (below) paints the night sky before hydration so the page never flashes first.
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    // With the test flag on it plays on every load so it can be reviewed locally
    if (isLoaderDay() && (FORCE || !seen)) setVisible(true);
    else document.getElementById("deepawali-boot")?.remove();
  }, []);

  useEffect(() => {
    if (!visible) return;
    document.getElementById("deepawali-boot")?.remove();

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stop = canvasRef.current && !reduced ? startFireworks(canvasRef.current, 2.4) : () => {};

    const fade = setTimeout(() => setLeaving(true), DURATION_MS);
    const done = setTimeout(() => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      setVisible(false);
    }, DURATION_MS + FADE_MS);

    return () => {
      stop();
      clearTimeout(fade);
      clearTimeout(done);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [visible]);

  if (!visible) {
    return (
      <>
        <div
          id="deepawali-boot"
          // the inline boot script flips display before hydration, by design
          suppressHydrationWarning
          style={{ display: "none", position: "fixed", inset: 0, zIndex: 10000, background: "#070b24" }}
        />
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        <link rel="stylesheet" href={SAMARKAN_CSS} precedence="default" />
      </>
    );
  }

  const skip = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    setLeaving(true);
    setTimeout(() => setVisible(false), FADE_MS);
  };

  return (
    <div className={`deepawali-loader ${rozha.variable} ${yatra.variable}${leaving ? " is-leaving" : ""}`} role="dialog" aria-label="Happy Diwali">
      <style>{CSS}</style>
      <link rel="stylesheet" href={SAMARKAN_CSS} precedence="default" />
      <div className="deepawali-loader__stars" aria-hidden="true">
        {STARS.map((s, i) => (
          <span
            key={i}
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
          />
        ))}
      </div>
      <div className="deepawali-loader__haze" aria-hidden="true" />
      <canvas ref={canvasRef} className="deepawali-loader__canvas" aria-hidden="true" />
      {LANTERNS.map((l, i) => (
        <span
          key={i}
          className="deepawali-loader__lantern"
          aria-hidden="true"
          style={{ left: `${l.left}%`, animationDelay: `${l.delay}s`, animationDuration: `${l.dur}s`, transform: `scale(${l.scale})` }}
        />
      ))}
      <svg className="deepawali-loader__city" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true">
        <path d={SKYLINE} fill="#04050f" />
        {WINDOWS.map((w, i) => (
          <rect key={i} x={w.x} y={w.y} width="3" height="4" fill="#ffc46b" opacity={w.o} />
        ))}
      </svg>

      <div className="deepawali-loader__content">
        <h2 className="deepawali-loader__title">happy diwali</h2>
        <p className="deepawali-loader__quote">
          May the glow of a thousand diyas light up your home with joy, prosperity and success.
        </p>
        <p className="deepawali-loader__from">— Team Tzar Digital Agency</p>
      </div>

      <button type="button" className="deepawali-loader__skip" onClick={skip}>
        Skip
      </button>
    </div>
  );
}

// Mirrors isLoaderDay() + the seen flag, run synchronously during HTML parse
const BOOT_SCRIPT = `(function(){try{
var f=${JSON.stringify(process.env.NEXT_PUBLIC_FESTIVE_LOADER === "on")};
var d=new Date(Date.now()+(330+new Date().getTimezoneOffset())*60000);
var day=d.getFullYear()===2026&&d.getMonth()===10&&(d.getDate()===8||d.getDate()===9);
if(f||(day&&sessionStorage.getItem("${SEEN_KEY}")!=="1")){var b=document.getElementById("deepawali-boot");if(b)b.style.display="block";}
}catch(e){}})();`;

const CSS = `
.deepawali-loader {
  position: fixed; inset: 0; z-index: 10000;
  display: flex; align-items: center; justify-content: center;
  /* Amavasya night: no moon, deep indigo overhead warming to a saffron city glow at the horizon */
  background:
    radial-gradient(ellipse 90% 45% at 50% 105%, rgba(255,150,50,0.35), transparent 70%),
    radial-gradient(ellipse 60% 30% at 15% 100%, rgba(255,90,60,0.18), transparent 70%),
    radial-gradient(ellipse 60% 30% at 85% 100%, rgba(255,120,40,0.18), transparent 70%),
    radial-gradient(ellipse 70% 50% at 50% 0%, rgba(60,40,140,0.35), transparent 70%),
    linear-gradient(180deg, #01020a 0%, #050a26 38%, #120f3a 66%, #2a1340 86%, #4a1c35 100%);
  overflow: hidden;
  transition: opacity ${FADE_MS}ms ease, visibility ${FADE_MS}ms ease;
}
.deepawali-loader.is-leaving { opacity: 0; visibility: hidden; }
.deepawali-loader__stars { position: absolute; inset: 0; }
.deepawali-loader__stars span {
  position: absolute; border-radius: 50%; background: #fff;
  animation: deepawali-twinkle 3.2s ease-in-out infinite;
}
.deepawali-loader__canvas { position: absolute; inset: 0; }
/* faint milky-way band + drifting firework smoke */
.deepawali-loader__haze {
  position: absolute; inset: -20%;
  background:
    linear-gradient(120deg, transparent 35%, rgba(170,160,255,0.07) 45%, rgba(255,220,200,0.06) 50%, transparent 62%),
    radial-gradient(ellipse 40% 20% at 30% 60%, rgba(255,200,170,0.06), transparent 70%),
    radial-gradient(ellipse 35% 18% at 72% 55%, rgba(200,180,255,0.06), transparent 70%);
  animation: deepawali-drift 26s ease-in-out infinite alternate;
}
.deepawali-loader__lantern {
  position: absolute; bottom: -40px; width: 14px; height: 18px;
  border-radius: 40% 40% 30% 30%;
  background: radial-gradient(circle at 50% 70%, #fff3c4 0%, #ffb347 45%, #e2531c 100%);
  box-shadow: 0 0 14px 4px rgba(255,150,50,0.55);
  opacity: 0;
  animation-name: deepawali-rise-lantern; animation-timing-function: linear; animation-iteration-count: infinite;
}
.deepawali-loader__city { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 18vh; min-height: 90px; }
.deepawali-loader__content {
  position: relative; z-index: 1; text-align: center; padding: 0 20px; max-width: 900px;
}
.deepawali-loader__title {
  margin: 0; font-weight: 400; line-height: 1.3;
  /* Samarkan's swashes overhang the glyph box; background-clip:text cuts anything outside the
     padding box, so pad right/bottom (and pull back with negative margin to keep it centred) */
  display: inline-block;
  padding: 0.08em 0.3em 0.22em 0.3em;
  margin: 0 -0.3em;
  /* !important: globals.css forces Manrope on every element with !important */
  font-family: "Samarkan", var(--font-rozha), var(--font-yatra), cursive, serif !important;
  font-size: clamp(46px, 10vw, 128px);
  letter-spacing: 0.02em;
  /* saffron-to-vermilion like the reference lettering */
  background: linear-gradient(180deg, #ffb13d 0%, #ff7a12 45%, #e5470f 75%, #c8300a 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  filter: drop-shadow(0 0 22px rgba(255,180,40,0.45));
  opacity: 0;
  will-change: transform, filter, opacity;
  animation:
    deepawali-zoom-in 2.4s cubic-bezier(.16,1,.3,1) 0.3s forwards,
    deepawali-breathe 4s ease-in-out 2.9s infinite;
}
.deepawali-loader__quote {
  margin: 18px auto 0; max-width: 620px;
  color: #ffe9b8; font-size: clamp(15px, 2.1vw, 21px); line-height: 1.55;
  opacity: 0; animation: deepawali-soft-in 1.4s ease-out 2.4s forwards;
}
.deepawali-loader__from {
  margin-top: 12px; color: rgba(255,233,184,0.7); font-size: 14px; letter-spacing: 0.12em;
  opacity: 0; animation: deepawali-soft-in 1.4s ease-out 3.1s forwards;
}
.deepawali-loader__skip {
  position: absolute; top: 20px; right: 20px; z-index: 2;
  padding: 8px 18px; border-radius: 999px; cursor: pointer;
  color: #ffe9b8; background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,220,150,0.35); font-size: 14px;
}
.deepawali-loader__skip:hover { background: rgba(255,255,255,0.16); }
@keyframes deepawali-twinkle { 0%,100% { opacity: .25; } 50% { opacity: 1; } }
/* comes in from deep in the screen: tiny + blurred -> full size + sharp */
@keyframes deepawali-zoom-in {
  0% { opacity: 0; transform: scale(0.15); filter: blur(28px) drop-shadow(0 0 0 rgba(255,180,40,0)); }
  35% { opacity: 1; }
  85% { transform: scale(1.04); }
  100% { opacity: 1; transform: scale(1); filter: blur(0) drop-shadow(0 0 22px rgba(255,180,40,0.45)); }
}
@keyframes deepawali-breathe {
  0%, 100% { opacity: 1; transform: scale(1); filter: blur(0) drop-shadow(0 0 22px rgba(255,180,40,0.45)); }
  50% { opacity: 1; transform: scale(1.035); filter: blur(0.6px) drop-shadow(0 0 34px rgba(255,190,60,0.7)); }
}
@keyframes deepawali-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes deepawali-soft-in { from { opacity: 0; filter: blur(8px); transform: translateY(10px); } to { opacity: 1; filter: blur(0); transform: none; } }
@keyframes deepawali-drift { from { transform: translate3d(-3%, 0, 0); } to { transform: translate3d(3%, -2%, 0); } }
@keyframes deepawali-rise-lantern {
  0% { opacity: 0; translate: 0 0; }
  10% { opacity: 0.9; }
  50% { translate: 18px -50vh; }
  85% { opacity: 0.7; }
  100% { opacity: 0; translate: -10px -105vh; }
}
@media (prefers-reduced-motion: reduce) {
  .deepawali-loader *, .deepawali-loader { animation-duration: 0.01ms !important; animation-delay: 0s !important; }
}
`;

