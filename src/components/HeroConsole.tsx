"use client";

import { Bot, KeyRound, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BrandMark } from "./Brand";
import { highlight } from "@/lib/highlight";

const nodes = [
  { title: "AI agent", sub: "MCP client", icon: <Bot size={18} aria-hidden /> },
  { title: "Fayda MCP", sub: "typed tools", icon: <BrandMark size={20} /> },
  { title: "eSignet", sub: "OIDC + PKCE", icon: <KeyRound size={18} aria-hidden /> },
  { title: "Result", sub: "predicates only", icon: <ShieldCheck size={18} aria-hidden /> },
];

// Which flow node is active at each transcript step.
const NODE_AT_STEP = [0, 1, 2, 1, 3];
const LAST = NODE_AT_STEP.length - 1;

// Synthetic sample. Shape follows fayda_mcp.schemas.VerificationResult.
const RESULT = `{
  "request_id": "vr_8c21f0",
  "status": "verified",
  "checks": {
    "identity_verified": true,
    "age_over_18": true
  },
  "reasons": {}
}`;

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const prefersReducedMotion = () => window.matchMedia(MOTION_QUERY).matches;
const subscribeMotion = (cb: () => void) => {
  const mq = window.matchMedia(MOTION_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function HeroConsole() {
  const [step, setStep] = useState(0);
  const still = useSyncExternalStore(subscribeMotion, prefersReducedMotion, () => false);
  const root = useRef<HTMLElement>(null);
  const visible = useRef(true);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  const [wait, setWait] = useState(0);
  useEffect(() => {
    if (still) return;
    // Hold the final result longer before looping; pause while offscreen or in a background tab.
    const t = setTimeout(() => {
      if (visible.current && !document.hidden) setStep((s) => (s >= LAST ? 0 : s + 1));
      else setWait((w) => w + 1);
    }, step === LAST ? 4200 : 1700);
    return () => clearTimeout(t);
  }, [step, wait, still]);

  const shown = still ? LAST : step;

  const node = NODE_AT_STEP[shown];
  const reached = Math.max(...NODE_AT_STEP.slice(0, shown + 1));
  const on = (i: number) => shown >= i;

  return (
    <figure className="console" ref={root} aria-label="Simulated example of an AI agent verifying identity through Fayda MCP">
      <div className="console-bar">
        <div className="dots" aria-hidden><i /><i /><i /></div>
        <span className="mono-label">agent session · fayda-mcp</span>
        <span className="sim-tag">Simulated example</span>
      </div>

      <div className="flow" aria-hidden>
        <div className="flow-line">
          <span className="flow-signal" style={{ left: `calc(${(node / 3) * 100}% - 3.5px)` }} />
        </div>
        {nodes.map((n, i) => (
          <div key={n.title} className="flow-node" data-state={i === node ? "active" : i <= reached ? "done" : "idle"}>
            <div className="ico">{n.icon}</div>
            <b>{n.title}</b>
            <span>{n.sub}</span>
          </div>
        ))}
      </div>

      <div className="console-body">
        <ol className="transcript" aria-label="Tool call transcript">
          <li className="t-line" data-on={on(0)}>
            <span className="dir">→</span>
            <span><span className="fn">start_verification</span><span className="arg">(purpose=&quot;kyc&quot;, checks=[&quot;identity_verified&quot;, &quot;age_over_18&quot;], …)</span></span>
          </li>
          <li className="t-line" data-on={on(1)}>
            <span className="dir">←</span>
            <span className="arg">request_id <span className="ok">&quot;vr_8c21f0&quot;</span> · authorization_url <span className="ok">eSignet consent link</span></span>
          </li>
          <li className="t-line" data-on={on(2)}>
            <span className="dir">·</span>
            <span className="note">The citizen signs in and consents on eSignet, outside the agent conversation.</span>
          </li>
          <li className="t-line" data-on={on(3)}>
            <span className="dir">→</span>
            <span><span className="fn">get_verification_status</span><span className="arg">(&quot;vr_8c21f0&quot;) → </span><span className="ok">&quot;verified&quot;</span></span>
          </li>
          <li className="t-line" data-on={on(4)}>
            <span className="dir">→</span>
            <span><span className="fn">get_verification_result</span><span className="arg">(&quot;vr_8c21f0&quot;)</span></span>
          </li>
        </ol>

        <div className="result" data-show={shown === LAST}>
          <div className="result-head"><span>VerificationResult</span><span>synthetic</span></div>
          <div className="pending" aria-hidden>awaiting result…</div>
          <pre aria-label="Sample verification result">
            {RESULT.split("\n").map((line, i) => (
              <span key={i} className="j-line" style={{ "--i": i } as React.CSSProperties}>{highlight(line, "json")}{"\n"}</span>
            ))}
          </pre>
          <div className="result-foot"><b>No name, date of birth, photo or tokens</b> reach the agent.</div>
        </div>
      </div>

      <figcaption className="console-foot">
        <span>Illustration with synthetic data. Not a live verification.</span>
        <span>Tool names and result shape from the fayda-mcp source.</span>
      </figcaption>
    </figure>
  );
}
