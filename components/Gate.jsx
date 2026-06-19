"use client";

import { useState } from "react";
import { profile } from "@/lib/data";

const PANELS = 7;
const REVEAL_MS = 1250;

export default function Gate({ onDone, onShatterStart }) {
  const [phase, setPhase] = useState("idle");

  function enter() {
    if (phase !== "idle") return;
    setPhase("shatter");
    onShatterStart?.();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(onDone, reduced ? 350 : REVEAL_MS);
  }

  return (
    <div className={"gate " + phase} role="dialog" aria-label="Enter portfolio">
      <div className="gate-bg" />

      {phase === "shatter" && (
        <div className="reveal-panels" aria-hidden="true">
          {Array.from({ length: PANELS }).map((_, i) => (
            <span className="rpanel" key={i} style={{ animationDelay: `${i * 0.06}s` }} />
          ))}
        </div>
      )}

      <div className="gate-inner">
        <span className="gate-eyebrow">Portfolio · {new Date().getFullYear()}</span>
        <div className="gate-sign">{profile.name}</div>
        <span className="gate-line" aria-hidden="true" />
        <span className="gate-sub">{profile.role} · London</span>
        <button className="gate-enter" onClick={enter}>
          Enter <span aria-hidden="true">↗</span>
        </button>
        <button className="gate-skip" onClick={enter}>skip intro</button>
      </div>
    </div>
  );
}
