"use client";
import { useEffect, useRef } from "react";

const COLS = 14, ROWS = 9;

// Hard glass-shatter transition: the screen cracks into a dense grid of
// shards that fly outward violently with heavy rotation, plus a sharp
// white impact flash at the moment of the break. Always plays — this is a
// core signature moment, not a decorative extra, so it ignores the OS
// "reduce motion" setting by design.
export function Shatter({ onDone }) {
  const wrapRef = useRef(null);
  const flashRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const w = window.innerWidth, h = window.innerHeight;
    const tw = w / COLS, th = h / ROWS;
    const frag = document.createDocumentFragment();
    const shards = [];
    const cx = COLS / 2, cy = ROWS / 2;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const shard = document.createElement("div");
        shard.className = "shard";
        shard.style.left = c * tw + "px";
        shard.style.top = r * th + "px";
        shard.style.width = tw + 1 + "px";
        shard.style.height = th + 1 + "px";
        wrap.appendChild(shard);
        shards.push({ el: shard, dx: c - cx, dy: r - cy });
      }
    }
    wrap.appendChild(frag);

    // impact flash — a bright hit at the instant of the break
    if (flashRef.current) {
      flashRef.current.style.opacity = "1";
      requestAnimationFrame(() => {
        flashRef.current.style.transition = "opacity .35s ease-out";
        flashRef.current.style.opacity = "0";
      });
    }

    requestAnimationFrame(() => {
      shards.forEach(({ el, dx, dy }) => {
        const dist = Math.hypot(dx, dy) || 1;
        const ang = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.4; // jitter for chaos
        const power = 1100 + Math.random() * 900; // hard, far throw
        const tx = Math.cos(ang) * power;
        const ty = Math.sin(ang) * power - 80;
        const rot = (Math.random() - 0.5) * 900; // violent spin
        const scale = 0.15 + Math.random() * 0.25;
        const delay = (dist / (COLS * 0.7)) * 55 + Math.random() * 40; // tight, snappy stagger
        el.style.transitionDelay = delay + "ms";
        el.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${scale})`;
        el.style.opacity = "0";
      });
    });

    const t = setTimeout(() => onDone && onDone(), 850);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="shatter-layer" ref={wrapRef} aria-hidden="true">
      <div className="shatter-flash" ref={flashRef} />
    </div>
  );
}
