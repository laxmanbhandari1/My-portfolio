"use client";
import { motion } from "framer-motion";

// Wrap anything to make it glide + fade in as it scrolls into view.
export function Reveal({ children, y = 30, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
