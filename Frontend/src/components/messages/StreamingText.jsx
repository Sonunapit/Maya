import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../coding/CodeBlock.jsx";

const components = {
  pre: ({ children }) => <>{children}</>,
  a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer">{children}</a>,
  code({ className, children }) {
    const code = String(children).replace(/\n$/, "");
    const lang = /language-(\w+)/.exec(className || "")?.[1];
    if (lang || code.includes("\n")) return <CodeBlock code={code} lang={lang} />;
    return <code className="rounded-md bg-hover px-1.5 py-0.5 text-[0.9em]">{children}</code>;
  },
};

export function Markdown({ children }) {
  return <div className="md"><ReactMarkdown components={components}>{children}</ReactMarkdown></div>;
}

// AI reply ko dheere dheere type karke dikhata hai (GPT jaisa feel)
export default function StreamingText({ text, onDone }) {
  const [n, setN] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (n >= text.length) { doneRef.current?.(); return; }
    const step = Math.max(2, Math.ceil(text.length / 160));
    const t = setTimeout(() => setN((v) => Math.min(text.length, v + step)), 16);
    return () => clearTimeout(t);
  }, [n, text]);

  return <Markdown>{text.slice(0, n)}</Markdown>;
}
