"use client";
import { useEffect, useRef } from "react";
import { runSnakes } from "@/lib/snakeEngine";

// A single yellow snake on a full-page fixed canvas that chases the cursor
// anywhere on the site.
const YELLOW_FOLLOW = [
  { color: "#f0a500", dark: "#a86e00", light: "rgba(255,236,160,.6)", pellet: "#f0a500", pr: "240,165,0", follow: true, maxr: 16, headr: 22, len: 64 },
];

export function CursorSnake() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    return runSnakes(c, YELLOW_FOLLOW);
  }, []);
  return <canvas className="cursor-snake" ref={ref} aria-hidden="true" />;
}
