import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { pop } from "../../animations/motion.js";

const EMOJIS = ["😀","😂","🙂","😉","😍","🤔","😎","🥳","😅","🙏","👍","👏","🔥","💡","✅","❌","⚡","🚀","🎉","❤️","💻","🐛","📌","📎","📄","🖼️","🧠","🤖","⭐","👀"];

export default function EmojiPicker({ onPick, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const away = (e) => !ref.current?.contains(e.target) && onClose();
    const esc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", away); document.removeEventListener("keydown", esc); };
  }, [onClose]);

  return (
    <motion.div ref={ref} variants={pop} initial="hidden" animate="show" role="dialog" aria-label="Emoji picker" className="absolute bottom-full left-0 mb-2 grid w-64 grid-cols-6 gap-1 rounded-2xl border border-line bg-panel p-2 shadow-xl">
      {EMOJIS.map((e) => (
        <button key={e} onClick={() => onPick(e)} className="grid h-9 w-9 place-items-center rounded-lg text-xl hover:bg-hover">{e}</button>
      ))}
    </motion.div>
  );
}
