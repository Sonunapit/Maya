import { useState } from "react";
import Button from "../common/Button.jsx";

export default function EditMessage({ initial, onSave, onCancel }) {
  const [text, setText] = useState(initial);
  return (
    <div className="w-full max-w-[85%] rounded-2xl border border-accent bg-panel p-3 sm:max-w-[75%]">
      <textarea
        autoFocus rows={3} value={text} onChange={(e) => setText(e.target.value)}
        aria-label="Edit your message"
        className="w-full resize-none bg-transparent text-[15px] focus:outline-none"
      />
      <div className="mt-2 flex justify-end gap-2">
        <Button variant="ghost" onClick={onCancel} className="!py-1.5">Cancel</Button>
        <Button onClick={() => text.trim() && onSave(text.trim())} className="!py-1.5">Send</Button>
      </div>
      <p className="mt-1 text-[11px] text-faint">Edit karke bhejne par yeh ek naya message ki tarah jayega.</p>
    </div>
  );
}
