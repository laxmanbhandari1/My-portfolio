"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Counts up from 0 to the target when it scrolls into view.
export function Counter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);
  const num = parseInt(value, 10) || 0;
  const suffix = String(value).replace(/[0-9]/g, "");
  useEffect(() => {
    if (!inView) return;
    let raf; const start = performance.now(); const dur = 1300;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(num * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, num]);
  return <span ref={ref}>{n}{suffix}</span>;
}
