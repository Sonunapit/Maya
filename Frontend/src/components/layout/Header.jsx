import { useLocation } from "react-router-dom";
import Icon from "../common/Icon.jsx";
import { InstallButton } from "../common/InstallPopup.jsx";
import { useChat } from "../../hooks/useChat.js";
import { useTheme } from "../../context/ThemeContext.jsx";

const TITLES = { "/settings": "Settings", "/profile": "Profile" };

export default function Header({ onMenu }) {
  const { pathname } = useLocation();
  const { activeChat } = useChat();
  const { theme, toggle } = useTheme();
  const title = TITLES[pathname] || activeChat?.title || "New chat";

  return (
    <header className="flex items-center gap-2 border-b border-line px-3 py-2.5">
      <button aria-label="Open chat history" onClick={onMenu} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-hover md:hidden">
        <Icon name="menu" />
      </button>
      <h1 className="min-w-0 flex-1 truncate text-sm font-semibold">{title}</h1>

      <div className="flex items-center gap-1">
        <InstallButton />
        <button aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} onClick={toggle} className="grid h-9 w-9 place-items-center rounded-lg text-mute hover:bg-hover hover:text-ink">
          <Icon name={theme === "dark" ? "sun" : "moon"} />
        </button>
      </div>
    </header>
  );
}