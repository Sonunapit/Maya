import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Icon from "../common/Icon.jsx";
import Attachments from "./Attachments.jsx";
import EmojiPicker from "./EmojiPicker.jsx";
import StopGeneration from "../messages/StopGeneration.jsx";
import { useChat } from "../../hooks/useChat.js";
import { MAX_FILE, MAX_FILES, readFile } from "../../utils/helpers.js";

export default function MessageInput() {
  const { send, stop, thinkingChat, typingId } = useChat();
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [warn, setWarn] = useState("");
  const [emoji, setEmoji] = useState(false);
  const area = useRef(null);
  const picker = useRef(null);

  const busy = thinkingChat !== null;
  const canStop = busy || typingId !== null;

  useEffect(() => {
    const el = area.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [text]);

  async function addFiles(list) {
    setWarn("");
    const ok = [];
    for (const f of Array.from(list)) {
      if (f.size > MAX_FILE) { setWarn(`${f.name} is larger than 5 MB.`); continue; }
      ok.push(await readFile(f));
    }
    setFiles((p) => [...p, ...ok].slice(0, MAX_FILES));
  }

  function submit() {
    if (busy || (!text.trim() && !files.length)) return;
    send(text.trim(), files);
    setText("");
    setFiles([]);
  }

  return (
    <div className="px-3 pb-3 sm:px-6 sm:pb-5">
      <div className="mx-auto max-w-3xl">
        {canStop && <StopGeneration onStop={stop} />}

        <div className="relative rounded-2xl border border-line bg-panel p-2 focus-within:border-accent">
          <AnimatePresence>
            {emoji && <EmojiPicker onClose={() => setEmoji(false)} onPick={(e) => { setText((t) => t + e); area.current?.focus(); }} />}
          </AnimatePresence>

          {files.length > 0 && <div className="p-2"><Attachments files={files} onRemove={(i) => setFiles(files.filter((_, j) => j !== i))} /></div>}

          <div className="flex items-end gap-1">
            <button aria-label="Attach image or PDF" onClick={() => picker.current.click()} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-mute hover:bg-hover hover:text-ink">
              <Icon name="clip" />
            </button>
            <input ref={picker} type="file" hidden multiple accept="image/*,application/pdf" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
            <button aria-label="Insert emoji" aria-expanded={emoji} onClick={() => setEmoji((v) => !v)} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-mute hover:bg-hover hover:text-ink">
              <Icon name="smile" />
            </button>
            <textarea
              ref={area} rows={1} value={text} onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }}
              placeholder="Message the assistant" aria-label="Message"
              className="max-h-[200px] flex-1 resize-none bg-transparent px-2 py-2.5 text-[15px] placeholder:text-faint focus:outline-none"
            />
            <button aria-label="Send message" onClick={submit} disabled={busy || (!text.trim() && !files.length)} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-onaccent transition hover:bg-accent-hi disabled:opacity-30">
              <Icon name="send" />
            </button>
          </div>
        </div>
        {warn && <p className="mt-2 text-xs text-amber-400">{warn}</p>}
      </div>
    </div>
  );
}
