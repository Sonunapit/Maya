import { useTheme } from "../context/ThemeContext.jsx";
import Icon from "../components/common/Icon.jsx";
import { BASE_URL } from "../services/api.js";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const opt = (value, icon, label) => (
    <button
      onClick={() => setTheme(value)} aria-pressed={theme === value}
      className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${theme === value ? "border-accent bg-active" : "border-line hover:bg-hover"}`}
    >
      <Icon name={icon} className="h-4 w-4" /> {label}
    </button>
  );

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-xl space-y-8 px-4 py-8 sm:px-6">
        <section>
          <h3 className="mb-3 text-sm font-semibold text-mute">Appearance</h3>
          <div className="flex gap-3">{opt("dark", "moon", "Dark")}{opt("light", "sun", "Light")}</div>
        </section>
        <section>
          <h3 className="mb-3 text-sm font-semibold text-mute">Connection</h3>
          <p className="rounded-xl border border-line bg-panel px-4 py-3 text-sm">Backend: <span className="text-mute">{BASE_URL}</span></p>
        </section>
      </div>
    </div>
  );
}
