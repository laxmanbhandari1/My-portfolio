"use client";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { Icon } from "./ui/Icons";

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 + i * 0.1, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

export function Landing({ onEnter, onSkip }) {
  return (
    <div className="landing" aria-label="Intro">
      <motion.div className="gate-top" variants={rise} custom={0} initial="hidden" animate="show">
        <div className="gate-brand">
          Laxman<b>.</b>
        </div>
        <div className="mono">Portfolio — 2026</div>
      </motion.div>

      <div className="gate-mid">
        <motion.div className="gate-eyebrow mono" variants={rise} custom={1} initial="hidden" animate="show">
          {profile.role} · {profile.location}
        </motion.div>
        <motion.h1 className="gate-name" variants={rise} custom={1} initial="hidden" animate="show">
          Laxman
          <br />
          Bhandari<span className="dot">.</span>
        </motion.h1>
        <motion.p className="gate-role" variants={rise} custom={2} initial="hidden" animate="show">
          Full-stack web, with a soft spot for game dev. I build things people actually use.
        </motion.p>
      </div>

      <motion.div className="gate-bottom" variants={rise} custom={3} initial="hidden" animate="show">
        <button className="enter-btn" onClick={onEnter} aria-label="Enter the site">
          Enter <span className="arrow"><Icon name="arrow" /></span>
        </button>
        <button className="skip" onClick={onSkip}>
          skip intro
        </button>
      </motion.div>
    </div>
  );
}
