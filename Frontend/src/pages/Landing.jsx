import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { InstallButton } from "../components/common/InstallPopup.jsx";

const FEATURES = [
  ["</>", "Coding Help", "Clean, readable aur optimized code likhwao, kisi bhi language mein."],
  ["🐞", "Debug & Fix", "Errors ko samjho aur seedha fix pao."],
  ["💡", "Simple Explanations", "Mushkil concepts ko aasaan bhasha mein samjho."],
  ["🌐", "Frontend + Backend", "React, Node, APIs: poora development stack."],
  ["🗄️", "Database & System Design", "Schema, queries, APIs aur architecture ki madad."],
  ["🎓", "Education & Career", "Padhai, interview prep, career aur roz ke kaam."],
];

const DEMO = "Namaste! Main MAYA hoon. Code likhna ho, bug dhoondhna ho ya kuch samajhna ho, bas poochho.";

/* ---------- Loading animation ---------- */
function Splash({ onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2300); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-app"
      exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.5 }}>
      <div className="relative grid h-36 w-36 place-items-center">
        <motion.span className="absolute inset-0 rounded-full border-2 border-accent/20 border-t-accent"
          animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }} />
        <motion.span className="absolute inset-4 rounded-full border-2 border-accent/20 border-b-accent"
          animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} />
        <motion.img src="/favicon.svg" alt="MAYA" className="h-16 w-16 rounded-2xl"
          initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: [0.9, 1.05, 0.9], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.8 }} />
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold tracking-[0.3em]">MAYA</p>
        <p className="mt-1 text-xs text-mute">My AI, Your Assistant</p>
      </div>
      <div className="h-1 w-48 overflow-hidden rounded-full bg-line">
        <motion.div className="h-full rounded-full bg-accent" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, ease: "easeInOut" }} />
      </div>
    </motion.div>
  );
}

function Typing({ text }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN((x) => (x >= text.length + 30 ? 0 : x + 1)), 45);
    return () => clearInterval(t);
  }, [text]);
  return <>{text.slice(0, n)}<span className="animate-pulse">|</span></>;
}

const fade = (d = 0) => ({ initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: d } });

export default function Landing() {
  const [loading, setLoading] = useState(() => { try { return !sessionStorage.getItem("maya_splash"); } catch { return true; } });
  const done = () => { try { sessionStorage.setItem("maya_splash", "1"); } catch {} setLoading(false); };

  return (
    <div className="relative min-h-full overflow-x-hidden bg-app text-ink">
      <AnimatePresence>{loading && <Splash onDone={done} />}</AnimatePresence>

      {/* background: grid + glowing orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-40"
          style={{ backgroundImage: "linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px)", backgroundSize: "48px 48px",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 20%, #000 20%, transparent 70%)", maskImage: "radial-gradient(ellipse at 50% 20%, #000 20%, transparent 70%)" }} />
        <motion.div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-accent/30 blur-3xl"
          animate={{ y: [0, 40, 0], x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }} />
        <motion.div className="absolute top-40 right-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
          animate={{ y: [0, -30, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        {/* navbar */}
        <nav className="flex items-center gap-3 py-4">
          <img src="/favicon.svg" alt="MAYA" className="h-9 w-9 rounded-xl" />
          <span className="text-lg font-bold tracking-wide">MAYA</span>
          <div className="flex-1" />
          <InstallButton />
          <Link to="/login" className="rounded-xl px-4 py-2 text-sm font-semibold text-ink hover:bg-hover">Login</Link>
          <Link to="/login?mode=register" className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-onaccent hover:bg-accent-hi">Register</Link>
        </nav>

        {/* hero */}
        <section className="grid items-center gap-10 py-14 md:grid-cols-2 md:py-24">
          <div>
            <motion.span {...fade()} className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 text-xs text-mute">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" /> Personal Intelligent AI Assistant
            </motion.span>
            <motion.h1 {...fade(0.1)} className="mt-5 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              My AI,<br /><span className="bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent">Your Assistant.</span>
            </motion.h1>
            <motion.p {...fade(0.2)} className="mt-5 max-w-md text-mute">
              MAYA ek smart AI assistant hai jo coding, debugging, padhai aur roz ke kaam mein aapki madad karta hai: seedhi, saaf aur aasaan bhasha mein.
            </motion.p>
            <motion.div {...fade(0.3)} className="mt-8 flex flex-wrap gap-3">
              <Link to="/login?mode=register" className="rounded-2xl bg-accent px-6 py-3 font-semibold text-onaccent shadow-lg hover:bg-accent-hi">Get Started, Free Register</Link>
              <Link to="/login" className="rounded-2xl border border-line bg-panel px-6 py-3 font-semibold hover:bg-hover">Login</Link>
            </motion.div>
          </div>

          {/* chat preview */}
          <motion.div {...fade(0.2)} className="relative">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="rounded-3xl border border-line bg-panel/80 p-5 shadow-2xl backdrop-blur">
              <div className="mb-4 flex items-center gap-3 border-b border-line pb-3">
                <img src="/favicon.svg" alt="" className="h-9 w-9 rounded-xl" />
                <div><p className="text-sm font-semibold">MAYA</p><p className="text-xs text-green-400">● Online</p></div>
              </div>
              <div className="ml-auto mb-3 w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-bubble px-4 py-2 text-sm">Mera React code error de raha hai 😅</div>
              <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-sm border border-line bg-sunk px-4 py-3 text-sm leading-relaxed"><Typing text={DEMO} /></div>
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-line bg-sunk px-3 py-2 text-sm text-faint">Kuch bhi poochho…</div>
            </motion.div>
          </motion.div>
        </section>

        {/* features */}
        <section className="pb-20">
          <motion.h2 {...fade()} className="text-center text-2xl font-bold sm:text-3xl">MAYA aapke liye kya kar sakti hai</motion.h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(([icon, title, desc], i) => (
              <motion.div key={title} {...fade(i * 0.08)} whileHover={{ y: -6 }}
                className="rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-accent">
                <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-active text-lg font-bold text-accent">{icon}</div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-mute">{desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade()} className="mt-14 rounded-3xl border border-line bg-panel p-8 text-center">
            <h3 className="text-2xl font-bold">Taiyaar ho? MAYA se baat shuru karo</h3>
            <p className="mt-2 text-mute">Register karo aur apna personal AI assistant paao.</p>
            <div className="mt-5 flex justify-center gap-3">
              <Link to="/login?mode=register" className="rounded-xl bg-accent px-6 py-2.5 font-semibold text-onaccent hover:bg-accent-hi">Register</Link>
              <Link to="/login" className="rounded-xl border border-line px-6 py-2.5 font-semibold hover:bg-hover">Login</Link>
            </div>
          </motion.div>
        </section>

        <footer className="border-t border-line py-6 text-center text-xs text-faint">
          MAYA, My AI, Your Assistant · Created by Sonu Kumar
        </footer>
      </div>
    </div>
  );
}