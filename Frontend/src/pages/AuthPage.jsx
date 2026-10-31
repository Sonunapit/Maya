import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/motion.js";
import Button from "../components/common/Button.jsx";
import { useAuth } from "../hooks/useAuth.js";

const field = "w-full rounded-xl border border-line bg-app px-4 py-3 text-sm placeholder:text-faint focus:border-accent focus:outline-none";

export default function AuthPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [f, setF] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      if (mode === "login") await login(f.email, f.password);
      else await register(f);
      // success par GuestOnly route khud "/" par bhej deta hai
    } catch (e) {
      setErr(e.response?.data?.message || "Something went wrong. Check your details and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-full place-items-center bg-app px-4 py-10 text-ink">
      <motion.form variants={fadeUp} initial="hidden" animate="show" onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-line bg-panel p-7">
        <h1 className="text-2xl font-bold">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
        <p className="mb-6 mt-1 text-sm text-mute">{mode === "login" ? "Log in to continue your chats." : "Start chatting in under a minute."}</p>

        <div className="space-y-3">
          {mode === "register" && (
            <div className="grid grid-cols-2 gap-3">
              <input className={field} placeholder="First name" aria-label="First name" value={f.firstName} onChange={set("firstName")} required />
              <input className={field} placeholder="Last name" aria-label="Last name" value={f.lastName} onChange={set("lastName")} required />
            </div>
          )}
          <input className={field} type="email" placeholder="Email" aria-label="Email" value={f.email} onChange={set("email")} required />
          <input className={field} type="password" placeholder="Password" aria-label="Password" value={f.password} onChange={set("password")} required minLength={4} />
        </div>

        {err && <p role="alert" className="mt-3 text-sm text-danger">{err}</p>}

        <Button type="submit" disabled={busy} className="mt-5 w-full">
          {busy ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
        </Button>

        <p className="mt-5 text-center text-sm text-mute">
          {mode === "login" ? "New here?" : "Already have an account?"}{" "}
          <button type="button" className="font-semibold text-accent hover:underline" onClick={() => { setErr(""); setMode(mode === "login" ? "register" : "login"); }}>
            {mode === "login" ? "Create an account" : "Log in"}
          </button>
        </p>
      </motion.form>
    </main>
  );
}
