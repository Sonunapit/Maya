import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { createSocket } from "../services/api.js";
import * as chatService from "../services/chat.service.js";
import { useAuth } from "../hooks/useAuth.js";
import { toUi, uid } from "../utils/helpers.js";

export const ChatContext = createContext(null);

// backend array bheje ya { chats: [...] }, dono chalega; id/_id dono chalega
const asList = (d) => (Array.isArray(d) ? d : d?.chats ?? d?.data ?? []);
const idOf = (c) => c?._id ?? c?.id;
const norm = (c) => ({ ...c, _id: idOf(c) });

export function ChatProvider({ children }) {
  const { logout } = useAuth();

  const [chats, setChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(true);
  const [messages, setMessages] = useState({}); // { chatId: [msg, ...] }
  const [activeId, setActiveId] = useState(null);
  const [thinkingChat, setThinkingChat] = useState(null); // jis chat ka reply aa raha hai
  const [typingId, setTypingId] = useState(null); // jis AI message ka typing effect chal raha hai
  const [loadingChat, setLoadingChat] = useState(false);
  const [error, setError] = useState("");

  const socketRef = useRef(null);
  const activeRef = useRef(null);
  const messagesRef = useRef({});
  const skipRef = useRef({}); // Stop dabane ke baad kitne replies UI me nahi dikhane
  activeRef.current = activeId;
  messagesRef.current = messages;

  const handleError = useCallback(
    (e, fallback) => {
      if (e.response?.status === 401) return logout(); // token expire => login page
      setError(e.response?.data?.message || fallback);
    },
    [logout]
  );
  // effect me handleError dependency rakhne se (logout har render badalta ho to) history baar-baar fetch hoti thi
  const handleErrorRef = useRef(handleError);
  handleErrorRef.current = handleError;

  /* ---- socket ---- */
  useEffect(() => {
    const s = createSocket();
    socketRef.current = s;

    s.on("connect", () => setError(""));
    s.on("connect_error", (e) => setError(`Can't reach the server (${e.message}).`));

    s.on("ai-response", (p) => {
      const text = typeof p === "string" ? p : p?.content ?? p?.message ?? p?.response ?? "";
      const id = (typeof p === "object" && p?.chat) || activeRef.current;
      if (skipRef.current[id] > 0) { skipRef.current[id] -= 1; return; }

      const msg = { id: p?.messageId || uid(), role: "ai", text };
      setMessages((m) => ({ ...m, [id]: [...(m[id] || []), msg] }));
      setTypingId(msg.id);
      setThinkingChat(null);
    });

    s.on("ai-error", (p) => {
      skipRef.current = {};
      setError(p?.message || "The assistant couldn't respond. Try again.");
      setThinkingChat(null);
    });

    return () => s.disconnect();
  }, []);

  /* ---- sidebar history (sirf ek baar load) ---- */
  useEffect(() => {
    let alive = true;
    setLoadingChats(true);
    chatService
      .getChats()
      .then((d) => { if (alive) setChats(asList(d).map(norm)); })
      .catch((e) => {
        console.error("getChats failed:", e);
        if (alive) handleErrorRef.current(e, "Couldn't load your chats.");
      })
      .finally(() => { if (alive) setLoadingChats(false); });
    return () => { alive = false; };
  }, []);

  /* ---- actions ---- */
  const newChat = () => { setActiveId(null); setTypingId(null); setError(""); };

  async function openChat(id) {
    setActiveId(id);
    setTypingId(null);
    setError("");
    if (messagesRef.current[id]) return;
    setLoadingChat(true);
    try {
      const list = asList(await chatService.getMessages(id));
      setMessages((m) => ({ ...m, [id]: list.map(toUi) }));
    } catch (e) {
      handleError(e, "Couldn't load this chat.");
    } finally {
      setLoadingChat(false);
    }
  }

  async function send(text, files = []) {
    if (thinkingChat !== null) return;
    if (!text && !files.length) return;
    setError("");
    setTypingId(null);
    try {
      let id = activeId;
      if (!id) {
        const res = await chatService.createChat((text || files[0]?.name || "New chat").slice(0, 40));
        const chat = norm(res?.chat ?? res);
        id = chat._id;
        setChats((c) => [chat, ...c]);
        setActiveId(id);
        activeRef.current = id;
      }
      setMessages((m) => ({ ...m, [id]: [...(m[id] || []), { id: uid(), role: "user", text, files }] }));
      setThinkingChat(id);
      socketRef.current.emit("ai-message", { chat: id, message: text, attachments: files });
    } catch (e) {
      handleError(e, "Couldn't start the chat. Try again.");
    }
  }

  // Stop generating: typing effect turant poora dikha do, ya aane wala reply UI se hata do
  function stop() {
    if (typingId) setTypingId(null);
    if (thinkingChat) {
      skipRef.current[thinkingChat] = (skipRef.current[thinkingChat] || 0) + 1;
      setThinkingChat(null);
    }
  }

  const finishTyping = (id) => setTypingId((cur) => (cur === id ? null : cur));

  async function removeChat(id) {
    try {
      await chatService.deleteChat(id);
      setChats((c) => c.filter((x) => idOf(x) !== id));
      setMessages(({ [id]: _, ...rest }) => rest);
      if (activeId === id) setActiveId(null);
    } catch (e) {
      handleError(e, "Couldn't delete this chat.");
    }
  }

  const value = {
    chats, loadingChats, messages, activeId, thinkingChat, typingId, loadingChat, error,
    activeChat: chats.find((c) => idOf(c) === activeId) || null,
    setError, newChat, openChat, send, stop, finishTyping, removeChat,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}