"use client";
import { useEffect, useRef } from "react";
import { Icon } from "./ui/Icons";

// Premium gate: the name sits crisp; a slim snake sweeps in UNDER it like a
// signature, and the name reveals above the snake as it draws left to right.
export function Landing({ onEnter, onSkip }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const NAME = "Laxman Bhandari.";
    const RED = "#cf1f16", LIGHT = "rgba(255,158,148,.6)";
    const SP = 7, HEADR = 12, MAXR = 9;
    let W = 0, H = 0, off, raf = 0, spine = [], head = { x: 0, y: 0 };
    let nameL = 0, nameR = 0, midY = 0, underY = 0, fs = 0, written = false, roamT = 0, to;

    const fit = () => {
      let s = Math.min(H * 0.42, W * 0.15);
      ctx.font = `800 ${s}px "Bricolage Grotesque"`;
      const max = W * 0.86, w = ctx.measureText(NAME).width;
      if (w > max) s *= max / w;
      return s;
    };
    function setup() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect(); W = r.width; H = r.height;
      if (!W || !H) { raf = requestAnimationFrame(setup); return false; }
      canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      off = document.createElement("canvas"); off.width = W * dpr; off.height = H * dpr;
      const octx = off.getContext("2d"); octx.scale(dpr, dpr);
      fs = fit();
      octx.fillStyle = "#141414"; octx.textAlign = "center"; octx.textBaseline = "middle";
      octx.font = `800 ${fs}px "Bricolage Grotesque"`;
      octx.fillText(NAME, W / 2, H / 2);
      ctx.font = `800 ${fs}px "Bricolage Grotesque"`;
      const tw = ctx.measureText(NAME).width;
      nameL = W / 2 - tw / 2; nameR = W / 2 + tw / 2; midY = H / 2; underY = midY + fs * 0.48;
      head = { x: reduce ? nameR + 60 : nameL - 60, y: underY };
      spine = []; for (let i = 0; i < 44; i++) spine.push({ x: head.x - i * SP, y: underY });
      written = reduce;
      return true;
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (!written) {
        head.x += 3.6; head.y = underY + Math.sin((head.x - nameL) * 0.04) * (fs * 0.05);
        if (head.x > nameR + 60) written = true;
      } else if (!reduce) {
        roamT += 0.008;
        head.x = W / 2 + Math.cos(roamT) * ((nameR - nameL) / 2) * 0.94;
        head.y = underY + Math.sin(roamT * 1.7) * (fs * 0.06);
      }
      spine[0].x = head.x; spine[0].y = head.y;
      for (let i = 1; i < spine.length; i++) {
        const dx = spine[i].x - spine[i - 1].x, dy = spine[i].y - spine[i - 1].y, d = Math.hypot(dx, dy) || 1;
        spine[i].x = spine[i - 1].x + (dx / d) * SP; spine[i].y = spine[i - 1].y + (dy / d) * SP;
      }
      // reveal the name above, synced to how far the snake has drawn
      if (written) ctx.drawImage(off, 0, 0, W, H);
      else { const rev = Math.max(0, Math.min(W, head.x + 10)); ctx.save(); ctx.beginPath(); ctx.rect(0, 0, rev, H); ctx.clip(); ctx.drawImage(off, 0, 0, W, H); ctx.restore(); }
      // the snake, drawn beneath the name
      for (let i = spine.length - 1; i >= 0; i--) {
        const u = i / (spine.length - 1);
        const r = u > 0.85 ? MAXR * (1 - (u - 0.85) / 0.15) : MAXR * (0.6 + 0.4 * Math.min(1, u / 0.06));
        ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(spine[i].x, spine[i].y, Math.max(0.4, r), 0, 7); ctx.fill();
        ctx.globalAlpha = 0.5; ctx.fillStyle = LIGHT; ctx.beginPath(); ctx.arc(spine[i].x - 1.5, spine[i].y - r * 0.4, Math.max(0.3, r * 0.45), 0, 7); ctx.fill(); ctx.globalAlpha = 1;
      }
      const a = Math.atan2(spine[0].y - spine[1].y, spine[0].x - spine[1].x);
      const fx = Math.cos(a), fy = Math.sin(a), sxx = -Math.sin(a), syy = Math.cos(a);
      ctx.save(); ctx.translate(head.x, head.y); ctx.rotate(a);
      ctx.fillStyle = RED; ctx.beginPath(); ctx.ellipse(HEADR * 0.2, 0, HEADR * 1.1, HEADR * 0.85, 0, 0, 7); ctx.fill(); ctx.restore();
      const eye = (ex, ey) => { ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(ex, ey, HEADR * 0.28, 0, 7); ctx.fill(); ctx.fillStyle = "#1a1a1a"; ctx.beginPath(); ctx.arc(ex + fx * HEADR * 0.1, ey + fy * HEADR * 0.1, HEADR * 0.14, 0, 7); ctx.fill(); };
      eye(head.x + fx * HEADR * 0.3 + sxx * HEADR * 0.45, head.y + fy * HEADR * 0.3 + syy * HEADR * 0.45);
      eye(head.x + fx * HEADR * 0.3 - sxx * HEADR * 0.45, head.y + fy * HEADR * 0.3 - syy * HEADR * 0.45);
      if (reduce) return;
      raf = requestAnimationFrame(draw);
    }
    let started = false;
    const go = () => { if (started) return; started = true; if (setup()) draw(); };
    const fontReady = document.fonts && document.fonts.load
      ? document.fonts.load('800 100px "Bricolage Grotesque"').then(() => document.fonts.ready).catch(() => {})
      : Promise.resolve();
    fontReady.then(go); to = setTimeout(go, 650);
    const onResize = () => { started = false; go(); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); clearTimeout(to); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <div className="landing landing-premium" aria-label="Intro">
      <div className="gate-top">
        <div className="gate-brand">Laxman<b>.</b></div>
        <div className="mono">Portfolio — 2026</div>
      </div>
      <div className="gate-canvas-wrap">
        <canvas ref={canvasRef} className="gate-name-canvas" aria-label="Laxman Bhandari" />
      </div>
      <div className="gate-bottom">
        <span className="mono gate-hint">Software Developer · London</span>
        <div className="gate-actions">
          <button className="enter-btn" onClick={onEnter} aria-label="Enter the site">
            Enter <span className="arrow"><Icon name="arrow" /></span>
          </button>
          <button className="skip" onClick={onSkip}>skip intro</button>
        </div>
      </div>
    </div>
  );
}
