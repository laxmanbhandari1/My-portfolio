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
import { Shatter } from "./ui/Shatter";

// phases: "gate" (age counter → name → Enter) → "shatter" (glass-break
// transition) → "home"
export function Experience() {
  const [phase, setPhase] = useState("gate");

  const enter = useCallback(() => setPhase("shatter"), []);
  const skip = useCallback(() => setPhase("home"), []);
  const onShatterDone = useCallback(() => setPhase("home"), []);

  const gateVisible = phase === "gate";
  const shattering = phase === "shatter";
  const homeVisible = phase === "shatter" || phase === "home";

  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />

      <motion.main
        id="site"
        initial={false}
        animate={{ opacity: homeVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: phase === "home" ? "auto" : "none" }}
      >
        <Nav />
        <Hero play={homeVisible} />
        <StackStatement />
        <Marquee />
        <About />
        <Projects />
        <SolarSkills />
        <Reveal><Blog /></Reveal>
        <Reveal><Contact /></Reveal>
        <Footer />
      </motion.main>

      {phase === "home" && <ChatWidget />}

      <AnimatePresence>
        {gateVisible && (
          <motion.div key="gate" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <Landing onEnter={enter} onSkip={skip} />
          </motion.div>
        )}
      </AnimatePresence>

      {shattering && <Shatter onDone={onShatterDone} />}
    </>
  );
}
