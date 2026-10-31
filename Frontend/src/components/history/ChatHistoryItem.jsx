import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../common/Icon.jsx";
import Modal from "../common/Modal.jsx";
import Button from "../common/Button.jsx";
import { useChat } from "../../hooks/useChat.js";

export default function ChatHistoryItem({ chat, active, onSelect }) {
  const { openChat, removeChat } = useChat();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);

  const id = chat._id ?? chat.id;
  const title = chat.title?.trim() || "New chat";

  return (
    <>
      <div className={`group flex items-center rounded-xl ${active ? "bg-active" : "hover:bg-hover"}`}>
        <button
          onClick={() => { openChat(id); navigate("/"); onSelect?.(); }}
          aria-current={active ? "true" : undefined}
          className="min-w-0 flex-1 px-3 py-2 text-left"
        >
          <span className="block truncate text-sm">{title}</span>
          <span className="block truncate text-[11px] text-faint">ID {String(id ?? "").slice(-8)}</span>
        </button>
        <button
          aria-label={`Delete ${title}`}
          onClick={() => setConfirm(true)}
          className="mr-1 grid h-8 w-8 place-items-center rounded-lg text-faint hover:text-danger sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
        >
          <Icon name="trash" className="h-4 w-4" />
        </button>
      </div>

      <Modal open={confirm} onClose={() => setConfirm(false)} title="Delete this chat?">
        <p className="text-sm text-mute">“{title}” aur uske saare messages hamesha ke liye delete ho jayenge.</p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setConfirm(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => { setConfirm(false); removeChat(id); }}>Delete</Button>
        </div>
      </Modal>
    </>
  );
}