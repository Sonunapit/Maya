import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fade, pop } from "../../animations/motion.js";

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div variants={fade} initial="hidden" animate="show" exit="exit" className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onMouseDown={onClose}>
          <motion.div
            variants={pop} initial="hidden" animate="show" exit="exit"
            role="dialog" aria-modal="true" aria-label={title}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-line bg-panel p-6"
          >
            <h2 className="text-lg font-bold">{title}</h2>
            <div className="mt-2">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
