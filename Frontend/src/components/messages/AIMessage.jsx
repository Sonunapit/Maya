import { motion } from "framer-motion";
import { fadeUp } from "../../animations/motion.js";
import { useChat } from "../../hooks/useChat.js";
import StreamingText, { Markdown } from "./StreamingText.jsx";
import MessageActions from "./MessageActions.jsx";

export default function AIMessage({ m }) {
  const { typingId, finishTyping } = useChat();
  const typing = typingId === m.id;

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="group flex gap-3">
      <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-onaccent">AI</div>
      <div className="min-w-0 flex-1">
        {typing ? <StreamingText text={m.text} onDone={() => finishTyping(m.id)} /> : <Markdown>{m.text}</Markdown>}
        {!typing && <MessageActions text={m.text} />}
      </div>
    </motion.div>
  );
}
