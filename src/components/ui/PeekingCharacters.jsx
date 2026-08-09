"use client";
import { useEffect, useRef, useState } from "react";

// Character trio: eyes reliably render (fixed px, not %) and track the real
// cursor anywhere on the page. Each character also idles with a gentle bob
// so there's always visible life, plus a spring lean toward whichever form
// field is focused. Hands can cover the eyes if wired to a password field.
export function PeekingCharacters({ focusField, passwordVisible }) {
  const wrapRef = useRef(null);
  const [eyes, setEyes] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const max = 4.5;
      setEyes({ x: (dx / dist) * Math.min(max, dist / 30), y: (dy / dist) * Math.min(max, dist / 30) });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const leanTo = ["name", "email", "message"].includes(focusField) ? focusField : null;
  const covering = focusField === "password" && passwordVisible;
  const pupilStyle = { transform: `translate(${eyes.x}px, ${eyes.y}px)` };

  return (
    <div className={`peek-wrap ${leanTo ? `lean-${leanTo}` : ""}`} ref={wrapRef} aria-hidden="true">
      <div className="peek-char peek-purple">
        <Eyes pupilStyle={pupilStyle} covering={covering} />
        <div className="peek-blush l" /><div className="peek-blush r" />
      </div>
      <div className="peek-char peek-white">
        <Eyes pupilStyle={pupilStyle} covering={covering} />
      </div>
      <div className="peek-char peek-orange">
        <Eyes pupilStyle={pupilStyle} covering={covering} />
        <div className="peek-mouth" />
        <div className="peek-blush l" /><div className="peek-blush r" />
      </div>
      <div className="peek-char peek-yellow">
        <Eyes pupilStyle={pupilStyle} covering={covering} small />
      </div>
      <div className="peek-shadow" />
    </div>
  );
}

function Eyes({ pupilStyle, covering, small }) {
  return (
    <div className={`peek-eyes ${small ? "small" : ""} ${covering ? "covering" : ""}`}>
      <span className="peek-eye"><span className="peek-pupil" style={pupilStyle} /></span>
      <span className="peek-eye"><span className="peek-pupil" style={pupilStyle} /></span>
      {covering && (
        <>
          <span className="peek-hand left" />
          <span className="peek-hand right" />
        </>
      )}
    </div>
  );
}
