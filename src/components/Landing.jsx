"use client";
import { useCallback } from "react";

// Premium gate: the real white-snake photo in the background, name over it.
export function Landing({ onEnter, onSkip }) {
  const handleEnter = useCallback(() => onEnter(), [onEnter]);
  return (
    <div className="landing-3d" aria-label="Intro">
      <div className="l3d-top">
        <div className="l3d-brand">LB<b>.</b></div>
        <button className="l3d-menu" onClick={onSkip} aria-label="Skip intro"><span /><span /></button>
      </div>

      <img src="/snake.png" alt="" className="l3d-snake-img" aria-hidden="true" />
      <div className="l3d-vignette" aria-hidden="true" />

      <h1 className="l3d-name">
        <span className="l3d-first">LAXMAN</span>
        <span className="l3d-last">BHANDARI<b>.</b></span>
      </h1>

      <button className="l3d-enter" onClick={handleEnter} aria-label="Enter the site">
        <span>ENTER</span>
        <span className="l3d-arrow">→</span>
      </button>
    </div>
  );
}
