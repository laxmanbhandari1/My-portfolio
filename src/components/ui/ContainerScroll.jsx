"use client";
import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

// 3D scroll-tilt reveal: a card lies tilted back, then stands up to face
// you as you scroll. rotateX + scale + translateY all mapped to scroll.
export function ContainerScroll({ titleComponent, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.8, 1] : [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div className="tilt-scene" ref={ref}>
      <div className="tilt-perspective">
        <motion.div className="tilt-title" style={{ y: translate }}>
          {titleComponent}
        </motion.div>
        <motion.div className="tilt-card" style={{ rotateX: rotate, scale }}>
          <div className="tilt-inner">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
