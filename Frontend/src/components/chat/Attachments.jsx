import Icon from "../common/Icon.jsx";

// message me aur input ke upar dono jagah use hota hai (onRemove ho to cross button dikhta hai)
export default function Attachments({ files, onRemove }) {
  if (!files?.length) return null;
  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {files.map((f, i) => (
        <div key={i} className="relative">
          {f.type?.startsWith("image/") && f.data ? (
            <img src={f.data} alt={f.name} className="h-20 w-20 rounded-xl border border-line object-cover" />
          ) : (
            <span className="flex h-12 items-center gap-2 rounded-xl border border-line bg-app px-3 text-xs">
              <Icon name="file" className="h-4 w-4 text-accent" />
              <span className="max-w-[10rem] truncate">{f.name}</span>
            </span>
          )}
          {onRemove && (
            <button aria-label={`Remove ${f.name}`} onClick={() => onRemove(i)} className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-bubble hover:bg-active">
              <Icon name="x" className="h-3 w-3" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
