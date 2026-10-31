import Icon from "../common/Icon.jsx";

const color = { log: "text-ink", info: "text-ink", warn: "text-amber-400", error: "text-danger" };

export default function OutputConsole({ logs, finished, onClose }) {
  return (
    <div className="border-t border-line bg-app">
      <div className="flex items-center justify-between px-4 py-1.5 text-xs text-mute">
        <span>Output</span>
        <button onClick={onClose} aria-label="Close output" className="rounded p-1 hover:bg-hover hover:text-ink">
          <Icon name="x" className="h-3.5 w-3.5" />
        </button>
      </div>
      <pre className="max-h-56 overflow-auto px-4 pb-3 text-[13px] leading-relaxed" aria-live="polite">
        {logs.length === 0 && <span className="text-faint">{finished ? "(no output)" : "Running…"}</span>}
        {logs.map((l, i) => (
          <div key={i} className={color[l.type] || "text-ink"}>{l.text}</div>
        ))}
      </pre>
    </div>
  );
}
