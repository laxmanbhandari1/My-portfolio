"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/lib/data";

const GH = (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" /></svg>
);

const TILT = ["rotate(-2.4deg) translateY(12px)", "rotate(0deg) translateY(0)", "rotate(2.4deg) translateY(12px)", "rotate(-1.8deg) translateY(8px)"];
const SPEEDS = [0.04, 0.07, 0.05, 0.06];

function cardState(i, start, visible) {
  const rel = i - start;
  if (rel < 0 || rel >= visible) return "off";
  if (rel === 1) return "center";
  return "side";
}

export default function Projects() {
  const VISIBLE = 3;
  const maxStart = Math.max(0, projects.length - VISIBLE);
  const [start, setStart] = useState(0);
  const viewportRef = useRef(null);
  const touchRef = useRef({ x: 0, t: 0 });

  const go = useCallback((next) => {
    setStart((s) => Math.max(0, Math.min(maxStart, typeof next === "function" ? next(s) : next)));
  }, [maxStart]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest("input, textarea, select")) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); go((s) => s - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); go((s) => s + 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  function onTouchStart(e) {
    touchRef.current = { x: e.touches[0].clientX, t: Date.now() };
  }
  function onTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dt = Date.now() - touchRef.current.t;
    if (dt > 600 || Math.abs(dx) < 40) return;
    if (dx < 0) go((s) => s + 1);
    else go((s) => s - 1);
  }

  return (
    <section id="work" className="pj">
      <div className="sec-head" data-reveal>
        <div data-parallax data-speed="0.08">
          <span className="sec-eyebrow">Featured work</span>
          <h2 className="sec-title">Projects I&apos;ve <span>built</span>.</h2>
          <span className="sec-rule" />
        </div>
      </div>

      <div
        className="pj-viewport"
        ref={viewportRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="pj-track"
          style={{ transform: `translateX(calc(${-start} * ((100% - 44px) / 3 + 22px)))` }}
        >
          {projects.map((p, i) => {
            const state = cardState(i, start, VISIBLE);
            return (
              <div
                key={p.num}
                className="pj-card-wrap"
                data-parallax
                data-speed={SPEEDS[i % SPEEDS.length]}
              >
                <article
                  className={"pj-card pj-card--" + state}
                  data-state={state}
                  style={{
                    "--tilt": TILT[i % TILT.length],
                    background: `linear-gradient(165deg, ${p.c1}, ${p.c2})`,
                  }}
                >
                  <span className="pj-no">{p.num}</span>
                  <div className="pj-thumb"><img src={p.image} alt={p.name} /></div>
                  <h3 className="pj-cname">{p.name}</h3>
                  <div className="pj-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                  <p className="pj-desc">{p.desc}</p>
                  <div className="pj-foot">
                    <span className="pj-year">{p.year}</span>
                    <span className="pj-links">
                      <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${p.name}`}>↗</a>
                      {p.code && <a href={p.code} target="_blank" rel="noopener noreferrer" aria-label="Source code">{GH}</a>}
                    </span>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pj-controls">
        <span className="pj-count">{String(start + 1).padStart(2, "0")}–{String(start + VISIBLE).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
        <div className="pj-dots" role="tablist" aria-label="Project slides">
          {Array.from({ length: maxStart + 1 }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              className={"pj-dot" + (start === i ? " active" : "")}
              aria-selected={start === i}
              aria-label={`Show projects ${i + 1} to ${i + VISIBLE}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <div className="pj-arrows">
          <button className="pj-arrow" onClick={() => go((s) => s - 1)} disabled={start === 0} aria-label="Previous projects">←</button>
          <button className="pj-arrow" onClick={() => go((s) => s + 1)} disabled={start >= maxStart} aria-label="Next projects">→</button>
        </div>
      </div>
    </section>
  );
}
