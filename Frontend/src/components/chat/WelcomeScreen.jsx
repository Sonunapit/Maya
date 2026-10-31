import { motion } from "framer-motion";
import { fadeUp } from "../../animations/motion.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useChat } from "../../hooks/useChat.js";
import { displayName } from "../../utils/helpers.js";

const SUGGESTIONS = ["Explain microservices simply", "Review my Express route", "Write a React debounce hook", "console.log ka JavaScript example do"];

export default function WelcomeScreen() {
  const { user } = useAuth();
  const { send, thinkingChat } = useChat();

  return (
    <div className="grid h-full place-items-center px-6 text-center">
      <motion.div variants={fadeUp} initial="hidden" animate="show">
        <p className="text-sm text-mute">Hi {displayName(user).split(" ")[0]}</p>
        <h2 className="mt-1 text-2xl font-bold sm:text-3xl">What can I help you with?</h2>
        <p className="mt-2 text-sm text-mute">Ask anything, or attach an image or PDF.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {SUGGESTIONS.map((s) => (
            <button key={s} disabled={thinkingChat !== null} onClick={() => send(s)} className="rounded-full border border-line px-4 py-2 text-sm text-mute hover:border-accent hover:text-ink disabled:opacity-40">
              {s}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
