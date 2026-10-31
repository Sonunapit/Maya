import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import Button from "../common/Button.jsx";

const field = "w-full rounded-xl border border-line bg-app px-4 py-3 text-sm placeholder:text-faint focus:border-accent focus:outline-none";

export default function EditProfile() {
  const { user, updateUser } = useAuth();
  const [first, setFirst] = useState(user.fullName?.firstName || "");
  const [last, setLast] = useState(user.fullName?.lastName || "");
  const [saved, setSaved] = useState(false);

  function submit(e) {
    e.preventDefault();
    updateUser({ fullName: { firstName: first.trim(), lastName: last.trim() } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input className={field} value={first} onChange={(e) => setFirst(e.target.value)} placeholder="First name" aria-label="First name" required />
        <input className={field} value={last} onChange={(e) => setLast(e.target.value)} placeholder="Last name" aria-label="Last name" />
      </div>
      <input className={`${field} opacity-60`} value={user.email} disabled aria-label="Email" />
      <div className="flex items-center gap-3">
        <Button type="submit">Save changes</Button>
        {saved && <span role="status" className="text-sm text-mute">Saved</span>}
      </div>
    </form>
  );
}
