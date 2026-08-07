"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Simple accessible modal for the full essay text.
export function StoryModal({ open, onClose, title, paragraphs }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="story-modal-backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }} onClick={onClose}
        >
          <motion.div
            className="story-modal"
            initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={title}
          >
            <button className="story-modal-close" onClick={onClose} aria-label="Close">✕</button>
            <h3 className="story-modal-title">{title}</h3>
            <div className="story-modal-body">
              {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
