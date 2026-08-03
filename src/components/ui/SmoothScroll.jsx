"use client";
import { useEffect } from "react";
import Lenis from "lenis";

// Buttery momentum scrolling for the whole page — the single biggest thing
// that makes a site feel like a polished, animated production.
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    // let in-page anchor links use Lenis
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id2 = a.getAttribute("href");
      if (id2 && id2.length > 1) {
        const el = document.querySelector(id2);
        if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -20 }); }
      }
    };
    document.addEventListener("click", onClick);
    return () => { cancelAnimationFrame(id); lenis.destroy(); document.removeEventListener("click", onClick); };
  }, []);
  return null;
}
