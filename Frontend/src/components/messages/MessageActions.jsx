import Icon from "../common/Icon.jsx";
import CopyButton from "./CopyButton.jsx";

// hover par dikhta hai (mobile par hamesha)
export default function MessageActions({ text, onEdit }) {
  return (
    <div className="mt-1 flex items-center gap-0.5 opacity-100 transition focus-within:opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
      <CopyButton text={text} />
      {onEdit && (
        <button onClick={onEdit} aria-label="Edit message" className="rounded-lg p-1.5 text-mute hover:bg-hover hover:text-ink">
          <Icon name="edit" className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
