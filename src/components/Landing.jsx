"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./ui/Icons";

const REAL_AGE = 21; // 2026 - 2005

// Age counts down fast from 100 to the real age, then zooms/fades away to
// reveal a minimal name screen with an Enter button.
export function Landing({ onEnter, onSkip }) {
  const [stage, setStage] = useState("count"); // count -> zoom -> name
  const [age, setAge] = useState(100);
  const numRef = useRef(null);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const dur = 1400;
    const from = 100;
    const to = REAL_AGE;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic — fast start, settles near the end
      const val = Math.round(from - (from - to) * eased);
      setAge(val);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setAge(to);
        setTimeout(() => setStage("zoom"), 260);
        setTimeout(() => setStage("name"), 700);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="landing-3d" aria-label="Intro">
      {stage !== "name" && (
        <div className={`age-stage ${stage === "zoom" ? "zoom" : ""}`}>
          <div className="age-number" ref={numRef}>{age}</div>
          <div className="age-label">Years of building</div>
        </div>
      )}
      <div className={`name-stage ${stage === "name" ? "show" : ""}`}>
        <div className="name-mark">Laxman Bhandari<span className="dot">.</span></div>
        <div className="name-role">Software Developer · London</div>
        <button className="name-enter" onClick={onEnter} aria-label="Enter the site">
          Enter <Icon name="arrow" />
        </button>
        <button className="skip" onClick={onSkip} style={{ marginTop: 14 }}>skip intro</button>
      </div>
    </div>
  );
}
