import { useState } from "react";
import Icon from "../common/Icon.jsx";
import { copyText } from "../../utils/helpers.js";

export default function CopyButton({ text, label, className = "" }) {
  const [done, setDone] = useState(false);

  async function copy() {
    if (await copyText(text)) {
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    }
  }

  return (
    <button onClick={copy} aria-label={label || "Copy"} className={`flex items-center gap-1.5 rounded-lg p-1.5 text-xs text-mute hover:bg-hover hover:text-ink ${className}`}>
      <Icon name={done ? "check" : "copy"} className="h-4 w-4" />
      {label && <span>{done ? "Copied" : label}</span>}
    </button>
  );
}
