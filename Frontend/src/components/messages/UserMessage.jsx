import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/motion.js";
import { useChat } from "../../hooks/useChat.js";
import Attachments from "../chat/Attachments.jsx";
import MessageActions from "./MessageActions.jsx";
import EditMessage from "./EditMessage.jsx";

export default function UserMessage({ m }) {
  const { send, thinkingChat } = useChat();
  const [editing, setEditing] = useState(false);

  if (editing)
    return (
      <div className="flex justify-end">
        <EditMessage initial={m.text} onCancel={() => setEditing(false)} onSave={(t) => { setEditing(false); send(t, m.files || []); }} />
      </div>
    );

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="group flex flex-col items-end">
      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-bubble px-4 py-3 sm:max-w-[75%]">
        <Attachments files={m.files} />
        {m.text && <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{m.text}</p>}
      </div>
      <MessageActions text={m.text} onEdit={thinkingChat === null && m.text ? () => setEditing(true) : undefined} />
    </motion.div>
  );
}
