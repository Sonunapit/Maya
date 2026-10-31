import { useEffect } from "react";
import { motion } from "framer-motion";
import { BRAND } from "../../utils/brand.js";

const SHOW_MS = 4400; // splash kitni der dikhe
const ROWS = [
  ["Name", BRAND.name],
  ["Full Form", BRAND.fullForm],
  ["Creator", BRAND.creator],
  ["Purpose", BRAND.purpose],
];

// Website khulte / refresh hote hi dikhne wali "Welcome to MAYA" intro
export default function SplashScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, SHOW_MS);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      role="status" aria-label={`Welcome to ${BRAND.name}`} onClick={onDone}
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-app px-6 py-8"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.4 } }}
    >
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="relative grid h-20 w-20 place-items-center rounded-[24px] bg-accent"
        >
          <motion.span
            className="absolute inset-0 rounded-[24px] bg-accent"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 1.7 }}
            transition={{ delay: 0.8, duration: 1.1, ease: "easeOut" }}
          />
          <svg viewBox="0 0 32 32" className="relative h-12 w-12" fill="none" stroke="var(--onaccent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <motion.path d="M9 22V10l7 8 7-8v12" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }} />
          </svg>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.5 }} className="mt-6 text-sm uppercase tracking-[0.3em] text-mute">
          Welcome to
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 12, letterSpacing: "0.1em" }} animate={{ opacity: 1, y: 0, letterSpacing: "0.35em" }} transition={{ delay: 1.4, duration: 0.7 }} className="mt-1 pl-[0.35em] text-5xl font-bold">
          {BRAND.name}
        </motion.h1>

        <dl className="mt-7 w-full space-y-2 rounded-2xl border border-line bg-panel p-4 text-left">
          {ROWS.map(([label, value], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2 + i * 0.4, duration: 0.4 }}
              className="grid grid-cols-[5.5rem_1fr] gap-3 text-sm"
            >
              <dt className="text-mute">{label}</dt>
              <dd className="font-semibold">{value}</dd>
            </motion.div>
          ))}
        </dl>

        <div className="mt-7 h-1 w-32 overflow-hidden rounded-full bg-line">
          <motion.div className="h-full w-full origin-left rounded-full bg-accent" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: SHOW_MS / 1000 - 0.3, ease: "easeInOut" }} />
        </div>
        <p className="mt-3 text-xs text-faint">Tap to skip</p>
      </div>
    </motion.div>
  );
}