import { useState } from "react";
import NewChatButton from "../history/NewChatButton.jsx";
import ChatSearch from "../history/ChatSearch.jsx";
import ChatHistory from "../history/ChatHistory.jsx";
import ProfileDropdown from "../profile/ProfileDropdown.jsx";

export default function Sidebar({ onNavigate }) {
  const [query, setQuery] = useState("");
  return (
    <div className="flex h-full flex-col bg-side">
      <div className="space-y-2 p-3">
        <NewChatButton onDone={onNavigate} />
        <ChatSearch value={query} onChange={setQuery} />
      </div>
      <ChatHistory query={query} onSelect={onNavigate} />
      <ProfileDropdown onNavigate={onNavigate} />
    </div>
  );
}
