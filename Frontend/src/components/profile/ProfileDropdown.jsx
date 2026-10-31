import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { pop } from "../../animations/motion.js";
import Icon from "../common/Icon.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { displayName, initials } from "../../utils/helpers.js";

export default function ProfileDropdown({ onNavigate }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const away = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const esc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", away); document.removeEventListener("keydown", esc); };
  }, [open]);

  const go = (path) => { setOpen(false); navigate(path); onNavigate?.(); };
  const item = "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-hover";

  return (
    <div ref={ref} className="relative border-t border-line p-2">
      <AnimatePresence>
        {open && (
          <motion.div variants={pop} initial="hidden" animate="show" exit="exit" role="menu" className="absolute inset-x-2 bottom-full mb-2 rounded-xl border border-line bg-panel p-1 shadow-xl">
            <button role="menuitem" className={item} onClick={() => go("/profile")}><Icon name="user" className="h-4 w-4" /> Profile</button>
            <button role="menuitem" className={item} onClick={() => go("/settings")}><Icon name="settings" className="h-4 w-4" /> Settings</button>
            <button role="menuitem" className={`${item} text-danger`} onClick={logout}><Icon name="logout" className="h-4 w-4" /> Log out</button>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setOpen((v) => !v)} aria-haspopup="menu" aria-expanded={open} className="flex w-full items-center gap-3 rounded-xl p-2 hover:bg-hover">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-onaccent">{initials(user)}</span>
        <span className="min-w-0 flex-1 text-left">
          <span className="block truncate text-sm font-semibold">{displayName(user)}</span>
          <span className="block truncate text-xs text-faint">{user.email}</span>
        </span>
        <Icon name="chevron" className="h-4 w-4 text-faint" />
      </button>
    </div>
  );
}
