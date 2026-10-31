import { useChat } from "../../hooks/useChat.js";
import ChatHistoryItem from "./ChatHistoryItem.jsx";

// backend _id bheje ya id, dono chalega
export const chatId = (c) => c?._id ?? c?.id;

export default function ChatHistory({ query = "", onSelect }) {
  const { chats, activeId, loadingChats } = useChat();
  const list = Array.isArray(chats) ? chats : [];
  const q = query.trim().toLowerCase();
  const shown = q ? list.filter((c) => (c.title || "New chat").toLowerCase().includes(q)) : list;

  return (
    <nav aria-label="Chat history" className="flex-1 space-y-0.5 overflow-y-auto px-2">
      {loadingChats && list.length === 0 && <p className="px-3 py-4 text-sm text-faint">Loading chats…</p>}
      {!loadingChats && shown.length === 0 && (
        <p className="px-3 py-4 text-sm text-faint">{q ? "No chats match your search." : "Your chats will show up here."}</p>
      )}
      {shown.map((c, i) => (
        <ChatHistoryItem key={chatId(c) ?? i} chat={c} active={chatId(c) === activeId} onSelect={onSelect} />
      ))}
    </nav>
  );
}