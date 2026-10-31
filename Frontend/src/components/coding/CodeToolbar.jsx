import Icon from "../common/Icon.jsx";
import CopyButton from "../messages/CopyButton.jsx";

export default function CodeToolbar({ lang, code, canRun, onRun }) {
  return (
    <div className="flex items-center justify-between border-b border-line px-3 py-1.5">
      <span className="text-xs text-mute">{lang || "code"}</span>
      <div className="flex items-center gap-1">
        {canRun && (
          <button onClick={onRun} className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-mute hover:bg-hover hover:text-ink">
            <Icon name="play" className="h-3.5 w-3.5" /> Run
          </button>
        )}
        <CopyButton text={code} label="Copy" />
      </div>
    </div>
  );
}
