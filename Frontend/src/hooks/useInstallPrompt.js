import { useEffect, useReducer } from "react";

/* beforeinstallprompt React mount se pehle bhi fire ho sakta hai,
   isliye listener module level par hai taaki event miss na ho. */
let deferred = null;
const subs = new Set();
const notify = () => subs.forEach((f) => f());

const ls = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
};
const standalone = () =>
  typeof window !== "undefined" &&
  (matchMedia("(display-mode: standalone)").matches || navigator.standalone === true);

if (typeof window !== "undefined") {
  addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferred = e; notify(); });
  addEventListener("appinstalled", () => { ls.set("maya_installed", "1"); deferred = null; notify(); });
}

export function useInstallPrompt() {
  const [, force] = useReducer((x) => x + 1, 0);
  useEffect(() => { subs.add(force); return () => subs.delete(force); }, []);

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const installed = ls.get("maya_installed") === "1" || standalone();
  const snoozed = Date.now() < Number(ls.get("maya_snooze") || 0);
  const laterNow = !!sessionStorage.getItem("maya_later");

  // returns: "accepted" | "dismissed" | "ios" | "manual"
  const install = async () => {
    if (!deferred) return isIOS ? "ios" : "manual";
    deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") ls.set("maya_installed", "1");
    deferred = null; notify();
    return outcome;
  };
  const snooze = (days = 7) => { ls.set("maya_snooze", String(Date.now() + days * 864e5)); notify(); };
  const later = () => { sessionStorage.setItem("maya_later", "1"); notify(); };

  return {
    installed, isIOS, install, snooze, later,
    canInstall: !installed && (!!deferred || isIOS),
    shouldPrompt: !installed && (!!deferred || isIOS) && !snoozed && !laterNow,
  };
}