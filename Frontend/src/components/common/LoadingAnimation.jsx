import { motion } from "framer-motion";

export default function LoadingAnimation({ label = "Thinking" }) {
  return (
    <div className="flex items-center gap-2 text-sm text-mute" role="status" aria-live="polite">
      <span className="flex gap-1" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-accent"
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </span>
      {label}
    </div>
  );
}
