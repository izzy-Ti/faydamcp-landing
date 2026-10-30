"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

type Props = { text: string; label?: string; variant?: "icon" | "text" };

export function CopyButton({ text, label = "Copy to clipboard", variant = "icon" }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API unavailable (insecure context / old browser): fall back to a hidden textarea.
      const ta = Object.assign(document.createElement("textarea"), { value: text });
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const icon = copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />;
  return (
    <button
      type="button"
      className={variant === "text" ? "copy-text" : "copy-btn"}
      onClick={copy}
      data-copied={copied}
      aria-label={copied ? "Copied" : label}
      title={copied ? "Copied" : label}
    >
      {variant === "text" ? (copied ? "Copied" : "Copy") : icon}
      <span className="sr-only" aria-live="polite">{copied ? "Copied to clipboard" : ""}</span>
    </button>
  );
}
