import { useNavigate } from "react-router-dom";
import Icon from "../common/Icon.jsx";
import { useChat } from "../../hooks/useChat.js";

export default function NewChatButton({ onDone }) {
  const { newChat } = useChat();
  const navigate = useNavigate();
  return (
    <button onClick={() => { newChat(); navigate("/"); onDone?.(); }} className="flex w-full items-center gap-2 rounded-xl border border-line px-3 py-2.5 text-sm font-semibold hover:bg-hover">
      <Icon name="plus" className="h-4 w-4" /> New chat
    </button>
  );
}
