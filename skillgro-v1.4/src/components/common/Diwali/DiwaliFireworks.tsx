"use client";

import React, { useEffect, useRef } from "react";

// Dates are evaluated in IST so server and client agree. Overridable with NEXT_PUBLIC_FESTIVE=diwali / off.
export function istDate() {
  const d = new Date(Date.now() + (330 + new Date().getTimezoneOffset()) * 60000);
  return { y: d.getFullYear(), m: d.getMonth() + 1, day: d.getDate() };
}

function isFestiveActive() {
  const flag = process.env.NEXT_PUBLIC_FESTIVE;
  if (flag === "off") return false;
  if (flag === "diwali") return true;
  const { y, m, day } = istDate();
  const key = y * 10000 + m * 100 + day;
  return key >= 20261025 && key <= 20261111;
}

// Physics in px/s and px/s² at a 1000px-tall reference viewport; scaled to the real height
const GRAVITY = 520;
const AIR_DRAG = 1.6; // per-second exponential drag on sparks
const ROCKET_DRAG = 0.25;

const PALETTES = [
  ["#ffd36b", "#ffb300", "#fff3c4"], // gold
  ["#ff4d6d", "#ff8fa3", "#ffe0e6"], // red-pink
  ["#4dd2ff", "#a5f3ff", "#ffffff"], // ice blue
  ["#9b5cff", "#d0b3ff", "#ffffff"], // violet
  ["#6dff8a", "#c8ffd2", "#ffffff"], // green
  ["#ff8a00", "#ffc46b", "#fff1d6"], // saffron
];

type ShellKind = "peony" | "chrysanthemum" | "willow" | "ring" | "crackle";

interface Rocket {
  x: number; y: number; vx: number; vy: number;
  fuse: number; kind: ShellKind; palette: string[];
  trail: { x: number; y: number }[];
}

interface Spark {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; color: string;
  size: number; drag: number; gravity: number;
  trail: boolean; crackle: boolean; px: number; py: number;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(arr: T[]) => arr[(Math.random() * arr.length) | 0];

/** Runs the fireworks simulation on a full-viewport canvas. `intensity` > 1 launches more often. Returns a stop function. */
export function startFireworks(canvas: HTMLCanvasElement, intensity = 1): () => void {
    const ctx = canvas.getContext("2d");
    if (!ctx) return () => {};

    let w = 0, h = 0, scale = 1, dpr = 1;
    const isMobile = () => w < 768;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      scale = h / 1000;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const rockets: Rocket[] = [];
    const sparks: Spark[] = [];

    // Launch from a random point along the bottom or lower sides, angled toward a random sky target
    const launch = () => {
      const side = Math.random();
      let x: number, y: number;
      if (side < 0.55) { x = rand(0.05, 0.95) * w; y = h + 10; }
      else if (side < 0.775) { x = -10; y = rand(0.55, 0.95) * h; }
      else { x = w + 10; y = rand(0.55, 0.95) * h; }

      const tx = rand(0.12, 0.88) * w;
      const ty = rand(0.1, 0.45) * h;
      const g = GRAVITY * scale;
      // Ballistic solve: pick flight time, derive launch velocity that reaches (tx, ty) at apex-ish
      const t = rand(0.75, 1.15);
      const vx = (tx - x) / t;
      const vy = (ty - y - 0.5 * g * t * t) / t;

      rockets.push({
        x, y, vx, vy,
        fuse: t * rand(0.92, 1.02),
        kind: pick<ShellKind>(["peony", "peony", "chrysanthemum", "willow", "ring", "crackle"]),
        palette: pick(PALETTES),
        trail: [],
      });
    };

    const explode = (r: Rocket) => {
      const base = isMobile() ? 0.55 : 1;
      const count = Math.round(
        base * ({ peony: 110, chrysanthemum: 140, willow: 90, ring: 70, crackle: 80 } as const)[r.kind]
      );
      const speed = rand(260, 380) * scale * (isMobile() ? 0.8 : 1);
      const tilt = rand(0, Math.PI);
      for (let i = 0; i < count; i++) {
        let vx: number, vy: number;
        if (r.kind === "ring") {
          const a = (i / count) * Math.PI * 2;
          vx = Math.cos(a) * speed;
          vy = Math.sin(a) * speed * Math.cos(tilt);
        } else {
          // Uniform sphere projected to 2D gives the dense-centre look of a real shell
          const a = Math.random() * Math.PI * 2;
          const u = Math.random() * 2 - 1;
          const s = Math.sqrt(1 - u * u) * speed * rand(0.85, 1.05);
          vx = Math.cos(a) * s;
          vy = Math.sin(a) * s;
        }
        const willow = r.kind === "willow";
        const life = willow ? rand(2.2, 3.0) : r.kind === "chrysanthemum" ? rand(1.4, 1.9) : rand(1.0, 1.5);
        sparks.push({
          x: r.x, y: r.y, px: r.x, py: r.y, vx: vx + r.vx * 0.15, vy: vy + r.vy * 0.15,
          life, maxLife: life,
          color: willow ? "#ffcf6b" : pick(r.palette),
          size: willow ? 1.4 : rand(1.4, 2.2),
          drag: willow ? AIR_DRAG * 1.9 : AIR_DRAG,
          gravity: willow ? GRAVITY * 0.55 : GRAVITY * 0.35,
          trail: r.kind === "chrysanthemum" || willow,
          crackle: r.kind === "crackle",
        });
      }
      // Bright flash at the burst point
      sparks.push({
        x: r.x, y: r.y, px: r.x, py: r.y, vx: 0, vy: 0, life: 0.12, maxLife: 0.12,
        color: "#ffffff", size: 26 * scale + 10, drag: 0, gravity: 0, trail: false, crackle: false,
      });
    };

    let raf = 0;
    let last = performance.now();
    let nextLaunch = 0.4;
    let running = true;

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const g = GRAVITY * scale;

      // Fade previous frame while keeping the canvas transparent over the page
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      nextLaunch -= dt;
      if (nextLaunch <= 0) {
        launch();
        if (Math.random() < 0.25) launch(); // occasional double
        nextLaunch = (isMobile() ? rand(1.6, 3.2) : rand(0.9, 2.2)) / intensity;
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        const d = Math.exp(-ROCKET_DRAG * dt);
        r.vx *= d;
        r.vy = r.vy * d + g * dt;
        r.x += r.vx * dt;
        r.y += r.vy * dt;
        r.fuse -= dt;
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 10) r.trail.shift();

        ctx.beginPath();
        r.trail.forEach((p, j) => (j ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
        ctx.strokeStyle = "rgba(255,210,140,0.75)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "#fff6dd";
        ctx.fillRect(r.x - 1.5, r.y - 1.5, 3, 3);

        // Burst at fuse end or once it starts falling
        if (r.fuse <= 0 || r.vy > 0) {
          explode(r);
          rockets.splice(i, 1);
        }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life -= dt;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }
        const d = Math.exp(-s.drag * dt);
        s.px = s.x; s.py = s.y;
        s.vx *= d;
        s.vy = s.vy * d + s.gravity * scale * dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;

        const k = s.life / s.maxLife;
        let alpha = k < 0.3 ? k / 0.3 : 1;
        if (s.crackle && k < 0.45) alpha *= Math.random() < 0.5 ? 1.4 : 0.1; // glitter flicker

        ctx.globalAlpha = Math.min(alpha, 1);
        if (s.size > 8) {
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size);
          grad.addColorStop(0, "rgba(255,255,255,0.9)");
          grad.addColorStop(1, "rgba(255,200,120,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = s.color;
          ctx.lineWidth = s.size * (0.6 + 0.4 * k);
          ctx.beginPath();
          ctx.moveTo(s.trail ? s.px - s.vx * dt * 2 : s.px, s.trail ? s.py - s.vy * dt * 2 : s.py);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      if (running) raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
}

export default function DiwaliFireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isFestiveActive()) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!canvasRef.current) return;
    return startFireworks(canvasRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 40 }}
    />
  );
}

