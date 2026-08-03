"use client";
import { useEffect, useRef } from "react";

// Custom cursor: a red dot that tracks precisely + a ring that lags behind
// and expands over anything interactive. Desktop / fine-pointer only.
export function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const dot = dotRef.current, ring = ringRef.current;
    const m = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const r = { x: m.x, y: m.y };

    const onMove = (e) => {
      m.x = e.clientX; m.y = e.clientY;
      dot.style.transform = `translate(${m.x}px, ${m.y}px)`;
    };
    let raf;
    const loop = () => {
      r.x += (m.x - r.x) * 0.18; r.y += (m.y - r.y) * 0.18;
      ring.style.transform = `translate(${r.x}px, ${r.y}px)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e) => { if (e.target.closest("a,button,[data-cursor]")) root.classList.add("cursor-hover"); };
    const out = (e) => { if (e.target.closest("a,button,[data-cursor]")) root.classList.remove("cursor-hover"); };
    const leave = () => root.classList.add("cursor-hidden");
    const enter = () => root.classList.remove("cursor-hidden");

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      root.classList.remove("has-cursor", "cursor-hover", "cursor-hidden");
    };
  }, []);
  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
