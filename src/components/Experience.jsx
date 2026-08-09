"use client";
import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Landing } from "./Landing";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { StackStatement } from "./StackStatement";
import { About } from "./About";
import { Projects } from "./Projects";
import { SolarSkills } from "./SolarSkills";
import { Blog } from "./Blog";
import { Contact, Footer } from "./Contact";
import { SmoothScroll } from "./ui/SmoothScroll";
import { ScrollProgress } from "./ui/ScrollProgress";
import { Cursor } from "./ui/Cursor";
import { ChatWidget } from "./ChatWidget";
import { Marquee } from "./ui/Marquee";
import { Reveal } from "./ui/Reveal";

// phases: "gate" → "cover" → "reveal" → "home"
export function Experience() {
  const [phase, setPhase] = useState("gate");

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const enter = useCallback(() => {
    if (reduce) return setPhase("home");
    setPhase("cover");
    setTimeout(() => setPhase("reveal"), 560);
    setTimeout(() => setPhase("home"), 1260);
  }, [reduce]);

  const skip = useCallback(() => setPhase("home"), []);

  const gateVisible = phase === "gate" || phase === "cover";
  const homeVisible = phase === "reveal" || phase === "home";
  const wipeY = phase === "cover" ? "0%" : homeVisible ? "-100%" : "100%";

  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />

      <motion.main
        id="site"
        initial={false}
        animate={{ opacity: homeVisible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ pointerEvents: homeVisible ? "auto" : "none" }}
      >
        <Nav />
        <Hero />
        <StackStatement />
        <Marquee />
        <About />
        <Projects />
        <SolarSkills />
        <Reveal><Blog /></Reveal>
        <Reveal><Contact /></Reveal>
        <Footer />
      </motion.main>

      {homeVisible && <ChatWidget />}

      <AnimatePresence>
        {gateVisible && (
          <motion.div key="gate" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <Landing onEnter={enter} onSkip={skip} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="wipe"
        aria-hidden="true"
        initial={{ y: "100%" }}
        animate={{ y: wipeY }}
        transition={{ duration: phase === "cover" ? 0.55 : 0.6, ease: [0.7, 0, 0.3, 1] }}
      >
        <motion.span
          className="wipe-mark"
          animate={{ opacity: phase === "cover" ? 1 : 0 }}
          transition={{ duration: 0.25, delay: phase === "cover" ? 0.2 : 0 }}
        >
          LB.
        </motion.span>
      </motion.div>
    </>
  );
}
