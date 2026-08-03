"use client";
import { motion } from "framer-motion";

// Splits text into words that blur + rise into place, staggered, when scrolled to.
const container = { hidden: {}, show: { transition: { staggerChildren: 0.035 } } };
const word = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
};

export function SplitReveal({ text, as = "div", className }) {
  const Tag = motion[as] || motion.div;
  const words = String(text).split(" ");
  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span key={i} aria-hidden="true" variants={word} style={{ display: "inline-block", willChange: "transform, filter" }}>
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
