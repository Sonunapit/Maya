import { useEffect, useRef, useState } from "react";
import OutputConsole from "./OutputConsole.jsx";

// Code ek sandboxed iframe me chalta hai (allow-scripts only) — page ke cookies/localStorage tak nahi pahunch sakta
function buildDoc(code) {
  const safe = code.replace(/<\/script/gi, "<\\/script");
  return `<script>
const send = (type, args) => parent.postMessage({ __run: true, type, text: args.map(a => { try { return typeof a === "string" ? a : JSON.stringify(a, null, 2); } catch { return String(a); } }).join(" ") }, "*");
["log","info","warn","error"].forEach(k => console[k] = (...a) => send(k, a));
window.onerror = (m) => send("error", [m]);
window.addEventListener("unhandledrejection", e => send("error", [String(e.reason)]));
(async () => { try {
${safe}
} catch (e) { send("error", [String(e)]); } })();
<\/script>`;
}

export default function CodeRunner({ code, onClose }) {
  const frame = useRef(null);
  const [logs, setLogs] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const onMsg = (e) => {
      if (e.source !== frame.current?.contentWindow || !e.data?.__run) return;
      setLogs((l) => [...l, { type: e.data.type, text: e.data.text }].slice(-200));
    };
    window.addEventListener("message", onMsg);
    const t = setTimeout(() => setFinished(true), 1500);
    return () => { window.removeEventListener("message", onMsg); clearTimeout(t); };
  }, []);

  return (
    <>
      <iframe ref={frame} title="code runner" sandbox="allow-scripts" srcDoc={buildDoc(code)} style={{ display: "none" }} />
      <OutputConsole logs={logs} finished={finished} onClose={onClose} />
    </>
  );
}
