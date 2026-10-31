import Icon from "../common/Icon.jsx";

export default function ChatSearch({ value, onChange }) {
  return (
    <label className="flex items-center gap-2 rounded-xl border border-line bg-app px-3 py-2 focus-within:border-accent">
      <Icon name="search" className="h-4 w-4 text-faint" />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search chats" aria-label="Search chats" className="w-full bg-transparent text-sm placeholder:text-faint focus:outline-none" />
    </label>
  );
}
