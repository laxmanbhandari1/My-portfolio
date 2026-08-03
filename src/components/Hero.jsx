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

  // cursor tilt + magnetic CTA
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

  // ── slithering 3D-look snake background ──
  useEffect(() => {
    const canvas = snakeRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0, raf = 0, t = 0, phase = 0;

    const SP = 9;              // segment spacing
    const MAXR = 21;           // body radius
    const HEADR = 26;
    const SPEED = 2.5;
    const MAXTURN = 0.055;
    const MAXLEN = 120;
    const BASE = "#cf1f16", DARK = "#9c130c", LIGHT = "rgba(255,158,148,0.55)";

    const mouse = { x: 0, y: 0, on: false };
    let head = { x: 0, y: 0, a: 0 };
    let spine = [];
    let food = { x: 0, y: 0, pulse: 0 };
    let tongue = 0;

    const rnd = (a, b) => a + Math.random() * (b - a);
    const norm = (a) => { while (a > Math.PI) a -= Math.PI * 2; while (a < -Math.PI) a += Math.PI * 2; return a; };
    const placeFood = () => { food.x = rnd(W * 0.12, W * 0.88); food.y = rnd(H * 0.15, H * 0.85); };

    function init() {
      head = { x: W * 0.5, y: H * 0.5, a: rnd(0, Math.PI * 2) };
      spine = [];
      for (let i = 0; i < 74; i++) spine.push({ x: head.x - Math.cos(head.a) * i * SP, y: head.y - Math.sin(head.a) * i * SP });
      placeFood();
    }
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!spine.length) init();
    }

    function step() {
      // choose target: cursor if present, otherwise the food pellet
      const tx = mouse.on ? mouse.x : food.x;
      const ty = mouse.on ? mouse.y : food.y;
      let desired = Math.atan2(ty - head.y, tx - head.x);
      let diff = norm(desired - head.a);
      diff = Math.max(-MAXTURN, Math.min(MAXTURN, diff));
      head.a += diff + Math.sin(t * 1.7) * 0.006;
      head.x += Math.cos(head.a) * SPEED;
      head.y += Math.sin(head.a) * SPEED;
      // keep on screen
      const m = 40;
      if (head.x < m || head.x > W - m || head.y < m || head.y > H - m) {
        const toC = Math.atan2(H / 2 - head.y, W / 2 - head.x);
        head.a += norm(toC - head.a) * 0.03;
      }
      // follow-the-leader chain
      spine[0].x = head.x; spine[0].y = head.y;
      for (let i = 1; i < spine.length; i++) {
        const dx = spine[i].x - spine[i - 1].x, dy = spine[i].y - spine[i - 1].y;
        const d = Math.hypot(dx, dy) || 1;
        spine[i].x = spine[i - 1].x + (dx / d) * SP;
        spine[i].y = spine[i - 1].y + (dy / d) * SP;
      }
      // eat
      if (Math.hypot(head.x - food.x, head.y - food.y) < HEADR + 6) {
        placeFood();
        if (spine.length < MAXLEN) { const last = spine[spine.length - 1]; for (let k = 0; k < 5; k++) spine.push({ x: last.x, y: last.y }); }
      }
    }

    function normals() {
      const N = spine.length, nx = new Array(N), ny = new Array(N);
      for (let i = 0; i < N; i++) {
        const p0 = spine[Math.max(0, i - 1)], p1 = spine[Math.min(N - 1, i + 1)];
        const dx = p1.x - p0.x, dy = p1.y - p0.y, d = Math.hypot(dx, dy) || 1;
        nx[i] = -dy / d; ny[i] = dx / d;
      }
      return { nx, ny };
    }
    function radius(i, N) {
      const u = i / (N - 1);
      if (u > 0.82) return MAXR * (1 - (u - 0.82) / 0.18);
      return MAXR * (0.7 + 0.3 * Math.min(1, u / 0.08)); // slim neck → full body
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const N = spine.length;
      const { nx, ny } = normals();
      // undulating centreline (slither) + radii
      const cx = new Array(N), cy = new Array(N), r = new Array(N);
      for (let i = 0; i < N; i++) {
        const wave = Math.sin(phase - i * 0.28) * (MAXR * 0.55) * Math.min(1, i / 6);
        cx[i] = spine[i].x + nx[i] * wave;
        cy[i] = spine[i].y + ny[i] * wave;
        r[i] = radius(i, N);
      }
      const left = [], right = [];
      for (let i = 0; i < N; i++) {
        left.push({ x: cx[i] + nx[i] * r[i], y: cy[i] + ny[i] * r[i] });
        right.push({ x: cx[i] - nx[i] * r[i], y: cy[i] - ny[i] * r[i] });
      }
      const outline = (fill, ox = 0, oy = 0) => {
        ctx.beginPath();
        ctx.moveTo(left[0].x + ox, left[0].y + oy);
        for (let i = 1; i < N; i++) ctx.lineTo(left[i].x + ox, left[i].y + oy);
        for (let i = N - 1; i >= 0; i--) ctx.lineTo(right[i].x + ox, right[i].y + oy);
        ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
      };
      // soft ground shadow (3D lift)
      ctx.save(); ctx.filter = "blur(7px)"; outline("rgba(0,0,0,0.12)", 3, MAXR * 0.7); ctx.restore();
      // body
      outline(BASE);
      // belly shade along one side
      ctx.save(); ctx.globalAlpha = 0.25; ctx.strokeStyle = DARK; ctx.lineWidth = MAXR * 0.5; ctx.lineJoin = "round"; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(right[0].x, right[0].y); for (let i = 1; i < N * 0.85; i++) ctx.lineTo(right[i | 0].x, right[i | 0].y); ctx.stroke(); ctx.restore();
      // top highlight ridge (cylinder sheen)
      ctx.save(); ctx.strokeStyle = LIGHT; ctx.lineWidth = MAXR * 0.7; ctx.lineJoin = "round"; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(cx[0], cy[0]); for (let i = 1; i < N * 0.72; i++) ctx.lineTo(cx[i], cy[i]); ctx.stroke(); ctx.restore();

      // head
      const hx = cx[0], hy = cy[0], a = head.a;
      const fx = Math.cos(a), fy = Math.sin(a), sx = -Math.sin(a), sy = Math.cos(a);
      ctx.save(); ctx.translate(hx, hy); ctx.rotate(a);
      ctx.fillStyle = BASE; ctx.beginPath(); ctx.ellipse(HEADR * 0.15, 0, HEADR * 1.15, HEADR * 0.9, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = LIGHT; ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.ellipse(HEADR * 0.15, -HEADR * 0.28, HEADR * 0.8, HEADR * 0.35, 0, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
      ctx.restore();
      // tongue flick
      tongue = Math.max(0, Math.sin(t * 2.4)) ;
      if (tongue > 0.5) {
        const bx = hx + fx * HEADR * 1.5, by = hy + fy * HEADR * 1.5, ln = HEADR * 0.9 * tongue;
        ctx.strokeStyle = "#e5261f"; ctx.lineWidth = 2; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(hx + fx * HEADR, hy + fy * HEADR); ctx.lineTo(bx, by); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + fx * ln + sx * ln * 0.5, by + fy * ln + sy * ln * 0.5);
        ctx.moveTo(bx, by); ctx.lineTo(bx + fx * ln - sx * ln * 0.5, by + fy * ln - sy * ln * 0.5); ctx.stroke();
      }
      // eyes
      const drawEye = (ex, ey) => {
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(ex, ey, HEADR * 0.26, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#1a1a1a"; ctx.beginPath(); ctx.arc(ex + fx * HEADR * 0.1, ey + fy * HEADR * 0.1, HEADR * 0.13, 0, Math.PI * 2); ctx.fill();
      };
      drawEye(hx + fx * HEADR * 0.35 + sx * HEADR * 0.5, hy + fy * HEADR * 0.35 + sy * HEADR * 0.5);
      drawEye(hx + fx * HEADR * 0.35 - sx * HEADR * 0.5, hy + fy * HEADR * 0.35 - sy * HEADR * 0.5);

      // food pellet with glow
      if (!mouse.on) {
        food.pulse += 0.08;
        const pr = 6 + Math.sin(food.pulse) * 1.5;
        const g = ctx.createRadialGradient(food.x, food.y, 0, food.x, food.y, 26);
        g.addColorStop(0, "rgba(229,38,31,0.5)"); g.addColorStop(1, "rgba(229,38,31,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(food.x, food.y, 26, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#e5261f"; ctx.beginPath(); ctx.arc(food.x, food.y, pr, 0, Math.PI * 2); ctx.fill();
      }
    }

    function frame() { t += 0.016; phase += 0.16; step(); draw(); raf = requestAnimationFrame(frame); }

    const onMove = (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true; };
    const onLeave = () => (mouse.on = false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", resize);
    if (heroRef.current) heroRef.current.addEventListener("pointerleave", onLeave);
    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      if (heroRef.current) heroRef.current.removeEventListener("pointerleave", onLeave);
    };
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
