"use client";
import { useEffect, useRef, useState } from "react";
import { profile, roles } from "@/lib/data";
import { Icon } from "./ui/Icons";

const initials = profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

export function Hero() {
  const heroRef = useRef(null);
  const snakeRef = useRef(null);
  const tiltRef = useRef(null);
  const ctaRef = useRef(null);
  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      if (tiltRef.current) {
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        tiltRef.current.style.transform = `rotateY(${nx * 14}deg) rotateX(${-ny * 14}deg)`;
      }
      if (ctaRef.current) {
        const cr = ctaRef.current.getBoundingClientRect();
        const cx = e.clientX - (cr.left + cr.width / 2), cy = e.clientY - (cr.top + cr.height / 2);
        if (Math.abs(cx) < 160 && Math.abs(cy) < 120) ctaRef.current.style.transform = `translate(${cx * 0.18}px, ${cy * 0.32}px)`;
        else ctaRef.current.style.transform = "";
      }
    };
    const onLeave = () => {
      if (tiltRef.current) tiltRef.current.style.transform = "";
      if (ctaRef.current) ctaRef.current.style.transform = "";
    };
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // ── two snakes roaming the whole hero, opposite directions ──
  useEffect(() => {
    const canvas = snakeRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0, raf = 0, t = 0, phase = 0, snakes = [];

    const SP = 9, SPEED = 2.6, MAXTURN = 0.045, MAXLEN = 130;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const norm = (a) => { while (a > Math.PI) a -= Math.PI * 2; while (a < -Math.PI) a += Math.PI * 2; return a; };

    function newTarget(s) {
      let x, y, tries = 0;
      do { x = rnd(W * 0.08, W * 0.92); y = rnd(H * 0.1, H * 0.9); tries++; }
      while (Math.hypot(x - s.head.x, y - s.head.y) < W * 0.4 && tries < 12);
      s.target.x = x; s.target.y = y;
    }
    function createSnake(cfg) {
      const s = {
        head: { x: cfg.x, y: cfg.y, a: cfg.a }, spine: [], target: { x: 0, y: 0 },
        color: cfg.color, dark: cfg.dark, light: cfg.light, pellet: cfg.pellet,
        maxr: 22, headr: 28, pulse: 0,
      };
      for (let i = 0; i < 84; i++) s.spine.push({ x: cfg.x - Math.cos(cfg.a) * i * SP, y: cfg.y - Math.sin(cfg.a) * i * SP });
      newTarget(s);
      return s;
    }
    function init() {
      snakes = [
        createSnake({ x: W * 0.25, y: H * 0.35, a: 0.4, color: "#cf1f16", dark: "#8f110b", light: "rgba(255,158,148,0.55)", pellet: "#e5261f" }),
        createSnake({ x: W * 0.75, y: H * 0.68, a: Math.PI + 0.4, color: "#f0a500", dark: "#a86e00", light: "rgba(255,236,160,0.6)", pellet: "#f0a500" }),
      ];
    }
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      if (!W || !H) { requestAnimationFrame(resize); return; }
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!snakes.length) init();
      else snakes.forEach((s) => { if (s.target.x > W || s.target.y > H || s.target.x < 0 || s.target.y < 0) newTarget(s); });
    }

    function step(s) {
      const desired = Math.atan2(s.target.y - s.head.y, s.target.x - s.head.x);
      let diff = norm(desired - s.head.a);
      diff = Math.max(-MAXTURN, Math.min(MAXTURN, diff));
      s.head.a += diff;
      s.head.x += Math.cos(s.head.a) * SPEED;
      s.head.y += Math.sin(s.head.a) * SPEED;
      const m = 26;
      if (s.head.x < m || s.head.x > W - m || s.head.y < m || s.head.y > H - m) {
        const c = Math.atan2(H / 2 - s.head.y, W / 2 - s.head.x);
        s.head.a += norm(c - s.head.a) * 0.05;
      }
      s.spine[0].x = s.head.x; s.spine[0].y = s.head.y;
      for (let i = 1; i < s.spine.length; i++) {
        const dx = s.spine[i].x - s.spine[i - 1].x, dy = s.spine[i].y - s.spine[i - 1].y, d = Math.hypot(dx, dy) || 1;
        s.spine[i].x = s.spine[i - 1].x + (dx / d) * SP;
        s.spine[i].y = s.spine[i - 1].y + (dy / d) * SP;
      }
      if (Math.hypot(s.head.x - s.target.x, s.head.y - s.target.y) < 90) {
        newTarget(s);
        if (s.spine.length < MAXLEN) { const last = s.spine[s.spine.length - 1]; for (let k = 0; k < 4; k++) s.spine.push({ x: last.x, y: last.y }); }
      }
    }

    function drawSnake(s) {
      const N = s.spine.length, MAXR = s.maxr, HEADR = s.headr;
      const nx = [], ny = [];
      for (let i = 0; i < N; i++) {
        const p0 = s.spine[Math.max(0, i - 1)], p1 = s.spine[Math.min(N - 1, i + 1)];
        const dx = p1.x - p0.x, dy = p1.y - p0.y, d = Math.hypot(dx, dy) || 1;
        nx[i] = -dy / d; ny[i] = dx / d;
      }
      const cx = [], cy = [], left = [], right = [];
      for (let i = 0; i < N; i++) {
        const wave = Math.sin(phase - i * 0.28) * (MAXR * 0.5) * Math.min(1, i / 6);
        const CX = s.spine[i].x + nx[i] * wave, CY = s.spine[i].y + ny[i] * wave;
        const u = i / (N - 1);
        const r = u > 0.82 ? MAXR * (1 - (u - 0.82) / 0.18) : MAXR * (0.7 + 0.3 * Math.min(1, u / 0.08));
        cx[i] = CX; cy[i] = CY;
        left.push({ x: CX + nx[i] * r, y: CY + ny[i] * r });
        right.push({ x: CX - nx[i] * r, y: CY - ny[i] * r });
      }
      const smooth = (pts) => {
        for (let i = 1; i < pts.length - 1; i++) {
          const mx = (pts[i].x + pts[i + 1].x) / 2, my = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
        }
        const last = pts[pts.length - 1]; ctx.lineTo(last.x, last.y);
      };
      const outline = (fill, ox = 0, oy = 0) => {
        const rrev = right.slice().reverse();
        ctx.save(); ctx.translate(ox, oy);
        ctx.beginPath(); ctx.moveTo(left[0].x, left[0].y);
        smooth(left); ctx.lineTo(rrev[0].x, rrev[0].y); smooth(rrev); ctx.closePath();
        ctx.fillStyle = fill; ctx.fill(); ctx.restore();
      };
      // shadow
      ctx.save(); ctx.filter = "blur(7px)"; outline("rgba(0,0,0,0.11)", 3, MAXR * 0.7); ctx.restore();
      // body
      outline(s.color);
      // top sheen
      ctx.save(); ctx.strokeStyle = s.light; ctx.lineWidth = MAXR * 0.7; ctx.lineJoin = "round"; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(cx[0], cy[0]); for (let i = 1; i < N * 0.72; i++) ctx.lineTo(cx[i], cy[i]); ctx.stroke(); ctx.restore();

      // head
      const hx = cx[0], hy = cy[0], a = s.head.a, fx = Math.cos(a), fy = Math.sin(a), sx = -Math.sin(a), sy = Math.cos(a);
      ctx.save(); ctx.translate(hx, hy); ctx.rotate(a);
      ctx.fillStyle = s.color; ctx.beginPath(); ctx.ellipse(HEADR * 0.15, 0, HEADR * 1.15, HEADR * 0.9, 0, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 0.5; ctx.fillStyle = s.light; ctx.beginPath(); ctx.ellipse(HEADR * 0.15, -HEADR * 0.28, HEADR * 0.8, HEADR * 0.32, 0, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
      ctx.restore();
      // tongue
      const tg = Math.sin(t * 2.4 + (s.color === "#f0a500" ? 1.5 : 0));
      if (tg > 0.55) {
        const bx = hx + fx * HEADR * 1.5, by = hy + fy * HEADR * 1.5, ln = HEADR * 0.85 * tg;
        ctx.strokeStyle = "#e5261f"; ctx.lineWidth = 2; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(hx + fx * HEADR, hy + fy * HEADR); ctx.lineTo(bx, by);
        ctx.moveTo(bx, by); ctx.lineTo(bx + fx * ln + sx * ln * 0.5, by + fy * ln + sy * ln * 0.5);
        ctx.moveTo(bx, by); ctx.lineTo(bx + fx * ln - sx * ln * 0.5, by + fy * ln - sy * ln * 0.5); ctx.stroke();
      }
      // eyes
      const eye = (ex, ey) => {
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(ex, ey, HEADR * 0.26, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#1a1a1a"; ctx.beginPath(); ctx.arc(ex + fx * HEADR * 0.1, ey + fy * HEADR * 0.1, HEADR * 0.13, 0, Math.PI * 2); ctx.fill();
      };
      eye(hx + fx * HEADR * 0.35 + sx * HEADR * 0.5, hy + fy * HEADR * 0.35 + sy * HEADR * 0.5);
      eye(hx + fx * HEADR * 0.35 - sx * HEADR * 0.5, hy + fy * HEADR * 0.35 - sy * HEADR * 0.5);
    }

    function pellet(s) {
      s.pulse += 0.08;
      const pr = 6 + Math.sin(s.pulse) * 1.5;
      const g = ctx.createRadialGradient(s.target.x, s.target.y, 0, s.target.x, s.target.y, 26);
      const rgb = s.pellet === "#f0a500" ? "240,165,0" : "229,38,31";
      g.addColorStop(0, `rgba(${rgb},0.45)`); g.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(s.target.x, s.target.y, 26, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = s.pellet; ctx.beginPath(); ctx.arc(s.target.x, s.target.y, pr, 0, Math.PI * 2); ctx.fill();
    }

    function frame() {
      t += 0.016; phase += 0.16;
      ctx.clearRect(0, 0, W, H);
      snakes.forEach(step);
      snakes.forEach(pellet);
      snakes.forEach(drawSnake);
      raf = requestAnimationFrame(frame);
    }

    window.addEventListener("resize", resize);
    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-glow" aria-hidden="true" />
      <canvas className="float-layer" ref={snakeRef} aria-hidden="true" />

      <div className="center">
        <div className="avatar-pop">
          <div className="avatar-tilt" ref={tiltRef}>
            <div className="avatar" title="Drop your photo at public/me.png">
              {imgOk ? (
                <img src="/me.png" alt={profile.name} onError={() => setImgOk(false)} />
              ) : (
                <span className="ph">{initials}</span>
              )}
            </div>
          </div>
        </div>

        <div className="socials">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email"><Icon name="mail" /></a>
          <a href="#work" aria-label="Work"><Icon name="code" /></a>
        </div>

        <h1 className="name">{profile.name}<span className="dot">.</span></h1>
        <div className="name-underline" />

        <div className="roles">
          {roles.map((r) => (
            <div className="role" key={r.label}>
              <Icon name={r.icon} />
              <span><b>{r.label}</b> — {r.detail}</span>
            </div>
          ))}
        </div>

        <div className="hero-cta">
          <a href="#contact" ref={ctaRef}>
            <span>Let&apos;s Connect</span>
            <span className="arrow"><Icon name="arrow" /></span>
          </a>
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll down">
        <span>Scroll</span>
        <span className="scroll-cue-line"><span /></span>
      </a>
    </section>
  );
}
