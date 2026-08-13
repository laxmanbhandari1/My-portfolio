"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Converts vertical scroll into horizontal movement. The track is pinned
// (sticky) while scrolling through `panelCount` full-width panels.
export function HorizontalScroll({ children, panelCount = 3 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  // translateX("%") is relative to the TRACK's own width, which is
  // panelCount * 100vw — not the viewport. To land exactly on the last
  // panel (not overshoot past it into blank space), the end value must be
  // -(panelCount - 1) / panelCount * 100%, not -(panelCount - 1) * 100%.
  const end = ((panelCount - 1) / panelCount) * 100;
  const x = useTransform(smooth, [0, 1], ["0%", `-${end}%`], { clamp: true });

  return (
    <section ref={ref} className="h-scroll" style={{ height: `${panelCount * 100}vh` }}>
      <div className="h-sticky">
        <motion.div className="h-track" style={{ x }}>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
