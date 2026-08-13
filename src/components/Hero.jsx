"use client";
import { useEffect, useRef } from "react";
import { profile } from "@/lib/data";
import { Icon } from "./ui/Icons";

const COLS = 16, ROWS = 9;

// `play` controls when the shatter-assembly actually fires. Building the
// scattered tiles can happen anytime, but the assemble animation must wait
// until this section is genuinely visible on screen — otherwise it finishes
// invisibly behind the intro overlay and looks like nothing happened.
export function Hero({ play = true }) {
  const stageRef = useRef(null);
  const mosaicRef = useRef(null);
  const assembleRef = useRef(() => {});
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const stage = stageRef.current;
    const mosaic = mosaicRef.current;
    if (!stage || !mosaic) return;
    let tiles = [];

    function build() {
      mosaic.innerHTML = "";
      const w = stage.clientWidth, h = stage.clientHeight;
      const tw = w / COLS, th = h / ROWS;
      const frag = document.createDocumentFragment();
      tiles = [];

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const tile = document.createElement("div");
          tile.className = "mosaic-tile";
          tile.style.left = c * tw + "px";
          tile.style.top = r * th + "px";
          tile.style.width = tw + 1 + "px";
          tile.style.height = th + 1 + "px";
          tile.style.backgroundImage = "url(/hero-photo.jpg)";
          tile.style.backgroundSize = w + "px " + h + "px";
          tile.style.backgroundPosition = `-${c * tw}px -${r * th}px`;

          // hard shatter throw — big distance, heavy spin
          const angle = Math.random() * Math.PI * 2;
          const dist = 520 + Math.random() * 760;
          const sx = Math.cos(angle) * dist;
          const sy = Math.sin(angle) * dist;
          const rot = (Math.random() - 0.5) * 760;
          const scale = 0.4 + Math.random() * 0.3;

          tile.style.transform = `translate(${sx}px, ${sy}px) rotate(${rot}deg) scale(${scale})`;
          tile.style.opacity = "0";
          frag.appendChild(tile);
          tiles.push(tile);
        }
      }
      mosaic.appendChild(frag);
    }

    function assemble() {
      const cx = COLS / 2, cy = ROWS / 2;
      tiles.forEach((tile, i) => {
        const r = Math.floor(i / COLS), c = i % COLS;
        const d = Math.hypot(c - cx, r - cy);
        const delay = 40 + d * 26 + Math.random() * 90; // snappy, shatter-style
        setTimeout(() => {
          tile.style.transform = "translate(0,0) rotate(0deg) scale(1)";
          tile.style.opacity = "1";
        }, delay);
      });
    }

    assembleRef.current = assemble;
    build();
    if (hasPlayedRef.current) assemble(); // e.g. after a resize once already playing

    let rt;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => { build(); if (hasPlayedRef.current) assemble(); }, 200);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (play && !hasPlayedRef.current) {
      hasPlayedRef.current = true;
      assembleRef.current();
    }
  }, [play]);

  return (
    <section className="hero2" id="top" ref={stageRef}>
      <div className="mosaic" ref={mosaicRef} aria-hidden="true" />
      <div className="hero2-scrim" aria-hidden="true" />

      <div className="hero2-copy">
        <div className="hero2-badge">
          <Icon name="code" /> Developer from Nepal 🇳🇵
        </div>
        <h1 className="hero2-headline">
          Turning Ideas Into<br />
          <span className="accent">Digital</span> Reality.
        </h1>
        <p className="hero2-sub">
          Crafting modern web experiences with clean code, creative design, and limitless curiosity.
        </p>
        <div className="hero2-cta-row">
          <a href="#work" className="hero2-btn-primary">
            View My Work <Icon name="arrow" />
          </a>
          <a href="#contact" className="hero2-btn-ghost">
            Let&apos;s Connect
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
          </a>
        </div>
      </div>

      <div className="hero2-float-panel">
        <span className="kw">while</span> (dream) {"{"}<br />
        &nbsp;&nbsp;<span className="fn">code</span>();<br />
        &nbsp;&nbsp;<span className="fn">learn</span>();<br />
        &nbsp;&nbsp;<span className="fn">improve</span>();<br />
        {"}"}
      </div>

      <div className="hero2-scroll-cue">
        <span className="dot-line"><span /></span>
        <span className="txt">Scroll</span>
      </div>

      <div className="hero2-quote">
        &quot;From the land of<br />Mountains, Building<br />for the World.&quot;
      </div>
    </section>
  );
}
