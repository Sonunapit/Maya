import Icon from "../common/Icon.jsx";

export default function StopGeneration({ onStop }) {
  return (
    <div className="mb-2 flex justify-center">
      <button onClick={onStop} className="flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-1.5 text-sm hover:bg-hover">
        <Icon name="stop" className="h-4 w-4" /> Stop generating
      </button>
    </div>
  );
}
