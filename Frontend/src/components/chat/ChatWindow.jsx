import { useChat } from "../../hooks/useChat.js";
import Icon from "../common/Icon.jsx";
import LoadingAnimation from "../common/LoadingAnimation.jsx";
import WelcomeScreen from "./WelcomeScreen.jsx";
import MessageList from "./MessageList.jsx";
import MessageInput from "./MessageInput.jsx";

export default function ChatWindow() {
  const { activeId, messages, loadingChat, error, setError } = useChat();
  const list = messages[activeId] || [];

  return (
    <div className="flex h-full flex-col">
      {error && (
        <p role="alert" className="flex items-center justify-between gap-3 bg-danger/10 px-4 py-2 text-sm text-danger">
          <span>{error}</span>
          <button aria-label="Dismiss error" onClick={() => setError("")} className="shrink-0 hover:opacity-70"><Icon name="x" className="h-4 w-4" /></button>
        </p>
      )}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {loadingChat ? (
          <div className="grid h-full place-items-center"><LoadingAnimation label="Loading chat" /></div>
        ) : list.length === 0 ? (
          <WelcomeScreen />
        ) : (
          <MessageList list={list} />
        )}
      </div>
      <MessageInput />
    </div>
  );
}
