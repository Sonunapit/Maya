import { useEffect, useRef } from "react";
import UserMessage from "../messages/UserMessage.jsx";
import AIMessage from "../messages/AIMessage.jsx";
import LoadingAnimation from "../common/LoadingAnimation.jsx";
import { useChat } from "../../hooks/useChat.js";

export default function MessageList({ list }) {
  const { activeId, thinkingChat, typingId } = useChat();
  const end = useRef(null);
  const thinking = thinkingChat !== null && thinkingChat === activeId;

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [list.length, thinking, activeId]);

  // typing ke dauran neeche follow karo
  useEffect(() => {
    if (!typingId) return;
    const t = setInterval(() => end.current?.scrollIntoView({ block: "end" }), 250);
    return () => clearInterval(t);
  }, [typingId]);

  return (
    <div className="mx-auto max-w-3xl space-y-7 px-4 py-6 sm:px-6">
      {list.map((m) => (m.role === "user" ? <UserMessage key={m.id} m={m} /> : <AIMessage key={m.id} m={m} />))}
      {thinking && (
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-accent text-xs font-bold text-onaccent">AI</div>
          <LoadingAnimation />
        </div>
      )}
      <div ref={end} />
    </div>
  );
}
