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
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.5 });
  const x = useTransform(smooth, [0, 1], ["0%", `-${(panelCount - 1) * 100}%`]);

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
