"use client";
import { useEffect, useRef } from "react";
import { runSnakes } from "@/lib/snakeEngine";

// Drop into any position:relative section to add roaming snake(s) behind content.
export function SnakeLayer({ colors }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    return runSnakes(c, colors);
  }, [colors]);
  return <canvas className="snake-layer" ref={ref} aria-hidden="true" />;
}
