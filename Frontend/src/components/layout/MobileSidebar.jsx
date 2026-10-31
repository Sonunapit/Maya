import { AnimatePresence, motion } from "framer-motion";
import { fade, slideLeft } from "../../animations/motion.js";
import Sidebar from "./Sidebar.jsx";

export default function MobileSidebar({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <motion.div variants={fade} initial="hidden" animate="show" exit="exit" className="absolute inset-0 bg-black/60" onClick={onClose} />
          <motion.div variants={slideLeft} initial="hidden" animate="show" exit="exit" className="absolute inset-y-0 left-0 w-72 max-w-[85%] border-r border-line">
            <Sidebar onNavigate={onClose} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
