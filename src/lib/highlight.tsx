import type { ReactNode } from "react";

export type Lang = "python" | "bash" | "json" | "env";

// shortcut: a tiny regex tokenizer that covers the few languages on this page; swap for Shiki if snippets grow.
const RULES: Record<Lang, RegExp> = {
  python: /(?<c>#.*)|(?<s>"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(?<k>\b(?:from|import|async|await|def|if|return|print|__name__)\b)|(?<b>\b(?:True|False|None)\b)|(?<f>\b[A-Za-z_]\w*(?=\())/g,
  bash: /(?<c>#.*)|(?<s>"[^"]*")|(?<f>^(?:pip|fayda-mcp|python)\b)|(?<k>\s--?[a-z][\w-]*)/gm,
  json: /(?<p>"[^"]*"(?=\s*:))|(?<s>"[^"]*")|(?<b>\b(?:true|false|null)\b)|(?<n>-?\b\d+\b)/g,
  env: /(?<c>#.*)|(?<p>^[A-Z_]+(?==))/gm,
};

export function highlight(code: string, lang: Lang): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of code.matchAll(RULES[lang])) {
    const kind = Object.entries(m.groups ?? {}).find(([, v]) => v !== undefined)?.[0];
    if (!kind) continue;
    if (m.index > last) out.push(code.slice(last, m.index));
    out.push(<span key={m.index} className={`tk-${kind}`}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  out.push(code.slice(last));
  return out;
}
