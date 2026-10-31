import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";

/* iPhone ke liye guide (iOS me direct install prompt nahi hota) */
function IosHelp({ open, onClose, title = "iPhone par Install", children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl border border-line bg-panel p-6 text-center text-ink"
            initial={{ scale: 0.92, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}>
            <img src="/favicon.svg" alt="MAYA" className="mx-auto mb-3 h-16 w-16 rounded-2xl" />
            <h2 className="mb-1 text-xl font-bold">{title}</h2>
            <p className="mb-4 text-sm text-mute">{children || <>Safari mein <b>Share</b> ⬆ dabao → <b>Add to Home Screen</b> chuno.</>}</p>
            <button onClick={onClose} className="w-full rounded-xl bg-accent px-4 py-2.5 font-semibold text-onaccent hover:bg-accent-hi">Theek hai</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---- Header button: theme toggle ke bagal me lagao. Install ke baad apne aap gayab. ---- */
export function InstallButton({ className = "", showLabel = false }) {
  const { canInstall, installed, isIOS, install } = useInstallPrompt();
  const [help, setHelp] = useState(null); // null | "ios" | "manual"
  // pehli baar click hone tak highlight animation chalti rahegi
  const [seen, setSeen] = useState(() => { try { return localStorage.getItem("maya_btn_seen") === "1"; } catch { return false; } });
  if (installed) return null;

  const onClick = async () => {
    try { localStorage.setItem("maya_btn_seen", "1"); } catch {}
    setSeen(true);
    if (canInstall && !isIOS) { await install(); return; }
    setHelp(isIOS ? "ios" : "manual");
  };

  return (
    <>
      <span className="relative inline-flex">
        {!seen && <span aria-hidden="true" className="absolute inset-0 rounded-lg bg-accent opacity-60 motion-safe:animate-ping" />}
        <button onClick={onClick} title="Install MAYA app" aria-label="Install MAYA app"
          className={`relative grid h-9 place-items-center rounded-lg ${showLabel ? "grid-flow-col gap-2 px-3 text-sm font-semibold" : "w-9"} ${
            seen ? "text-mute hover:bg-hover hover:text-ink" : "bg-accent text-onaccent shadow-lg hover:bg-accent-hi"} ${className}`}>
          <svg viewBox="0 0 24 24" className={`h-[18px] w-[18px] ${seen ? "" : "motion-safe:animate-bounce"}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3v12" /><path d="m7 11 5 5 5-5" /><path d="M5 21h14" />
          </svg>
          {showLabel && <span>Install</span>}
        </button>
      </span>
      <IosHelp open={help === "ios"} onClose={() => setHelp(null)} />
      <IosHelp open={help === "manual"} onClose={() => setHelp(null)} title="MAYA App Install Karo">
        Chrome/Edge mein address bar ke right wala <b>Install</b> icon dabao, ya menu <b>⋮</b> → <b>Install app</b> / <b>Add to Home screen</b> chuno.
      </IosHelp>
    </>
  );
}

/* ---- Optional auto popup. Sirf button chahiye to App.jsx se <InstallPopup /> hata do ---- */
export default function InstallPopup() {
  const { shouldPrompt, install, snooze, later } = useInstallPrompt();
  const [ready, setReady] = useState(false);
  const [iosHelp, setIosHelp] = useState(false);

  useEffect(() => { const t = setTimeout(() => setReady(true), 1500); return () => clearTimeout(t); }, []);

  const onInstall = async () => { if ((await install()) === "ios") setIosHelp(true); };
  const open = ready && shouldPrompt;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div role="dialog" aria-modal="true"
              className="w-full max-w-sm rounded-3xl border border-line bg-panel p-6 text-center text-ink"
              initial={{ scale: 0.92, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}>
              <img src="/favicon.svg" alt="MAYA" className="mx-auto mb-3 h-20 w-20 rounded-2xl" />
              <h2 className="mb-1 text-xl font-bold">MAYA App Install Karo</h2>
              <p className="mb-4 text-sm text-mute">Home screen par MAYA lagao: fast, full-screen aur offline-ready.</p>
              <div className="flex flex-col gap-2">
                <button onClick={onInstall} className="rounded-xl bg-accent px-4 py-2.5 font-semibold text-onaccent hover:bg-accent-hi">⬇ Download Now</button>
                <button onClick={() => snooze(7)} className="rounded-xl bg-active px-4 py-2.5 font-semibold text-ink hover:bg-hover">Continue in Browser</button>
                <button onClick={later} className="rounded-xl px-4 py-2 text-sm font-medium text-mute hover:bg-hover">Later</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <IosHelp open={iosHelp} onClose={() => setIosHelp(false)} />
    </>
  );
}