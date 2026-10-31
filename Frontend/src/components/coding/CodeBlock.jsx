import { useState } from "react";
import CodeToolbar from "./CodeToolbar.jsx";
import CodeRunner from "./CodeRunner.jsx";

const RUNNABLE = ["js", "javascript", "node"];

export default function CodeBlock({ code, lang }) {
  const [run, setRun] = useState(0); // 0 = band, har click par naya run

  return (
    <div className="my-3 overflow-hidden rounded-xl border border-line bg-sunk">
      <CodeToolbar lang={lang} code={code} canRun={RUNNABLE.includes(lang)} onRun={() => setRun((r) => r + 1)} />
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed"><code>{code}</code></pre>
      {run > 0 && <CodeRunner key={run} code={code} onClose={() => setRun(0)} />}
    </div>
  );
}
