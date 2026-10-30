"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type CodeFile = { name: string; code: string; lines: ReactNode[]; source: { label: string; href: string } };

/** Editor-style code window: file tabs (WAI-ARIA tabs), line numbers, one-click copy. */
export function CodeWindow({ files }: { files: CodeFile[] }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const file = files[active];

  function onKey(e: KeyboardEvent) {
    const n = files.length;
    const next = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = (next + n) % n;
    setActive(i);
    refs.current[i]?.focus();
  }

  async function copy() {
    await navigator.clipboard.writeText(file.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="cw">
      <div className="cw-bar">
        <div className="cw-tabs" role="tablist" aria-label="Code examples" onKeyDown={onKey}>
          {files.map((f, i) => (
            <button
              key={f.name}
              ref={(el) => { refs.current[i] = el; }}
              type="button"
              role="tab"
              id={`cw-tab-${i}`}
              className="cw-tab"
              aria-selected={i === active}
              aria-controls={`cw-panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => { setActive(i); setCopied(false); }}
            >
              {f.name}
            </button>
          ))}
        </div>
        <button type="button" className="cw-copy" onClick={copy} data-copied={copied} aria-label={copied ? "Copied" : `Copy ${file.name}`}>
          {copied ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      {files.map((f, i) => (
        <div key={f.name} role="tabpanel" id={`cw-panel-${i}`} aria-labelledby={`cw-tab-${i}`} hidden={i !== active}>
          <pre tabIndex={0}><code>{f.lines.map((l, j) => <span className="l" key={j}>{l}{"\n"}</span>)}</code></pre>
          <div className="cw-foot">
            <span>Python 3.12+</span>
            <a href={f.source.href} target="_blank" rel="noreferrer">{f.source.label} ↗</a>
          </div>
        </div>
      ))}
    </div>
  );
}
