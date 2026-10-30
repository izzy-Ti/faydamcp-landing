import { ArrowRight, ArrowUpRight, Bot, EyeOff, KeyRound, Layers, QrCode, UserCheck } from "lucide-react";
import { Brand, GitHubIcon } from "@/components/Brand";
import { CodeWindow, type CodeFile } from "@/components/CodeWindow";
import { CopyButton } from "@/components/CopyButton";
import { RevealObserver } from "@/components/Effects";
import { Faq } from "@/components/Faq";
import { HeroConsole } from "@/components/HeroConsole";
import { Nav } from "@/components/Nav";
import { Critter, Scene } from "@/components/Scene";
import { highlight, type Lang } from "@/lib/highlight";
import { INSTALL, links, snippets } from "@/lib/site";

const ext = { target: "_blank", rel: "noreferrer" } as const;
const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

function Install() {
  return (
    <div className="install">
      <span className="prompt" aria-hidden>$</span>
      <code>{INSTALL}</code>
      <CopyButton text={INSTALL} label="Copy install command" variant="text" />
    </div>
  );
}

const file = (name: string, lang: Lang, code: string, source: CodeFile["source"]): CodeFile => ({
  name, code, source, lines: code.split("\n").map((l) => highlight(l, lang)),
});

const files = [
  file("terminal", "bash", snippets.install, { label: "README", href: links.readme }),
  file("server.py", "python", snippets.server, { label: "examples/stdio_server.py", href: links.example("stdio_server") }),
  file("verify_qr.py", "python", snippets.qr, { label: "examples/qr_verification.py", href: links.example("qr_verification") }),
  file("claude_desktop_config.json", "json", snippets.client, { label: "src/fayda_mcp/cli.py", href: `${links.repo}/blob/main/src/fayda_mcp/cli.py` }),
];

const features = [
  { icon: Bot, t: "11 MCP tools", p: "Start, check, fetch and cancel verifications from any MCP client." },
  { icon: KeyRound, t: "eSignet OIDC", p: "Citizens sign in with Fayda. PKCE and private_key_jwt built in." },
  { icon: EyeOff, t: "Privacy-first results", p: "Agents get booleans like age_over_18, never names or birth dates." },
  { icon: QrCode, t: "Offline QR", p: "Checks a card's signature with no network. It can't prove the holder is present." },
  { icon: UserCheck, t: "Details matching", p: "Confirm what a customer told you, field by field, without seeing the values." },
  { icon: Layers, t: "Your stack", p: "Headless Python core with optional FastAPI, Redis and PostgreSQL extras." },
];

const steps = [
  { n: "01", t: "Install", cmd: "pip install fayda-mcp" },
  { n: "02", t: "Configure", cmd: "fayda-mcp check-config --env-file .env" },
  { n: "03", t: "Verify", cmd: "fayda-mcp run --env-file .env" },
];

const security = [
  { t: "Minimal predicates", p: "true, false or unavailable. Nothing more." },
  { t: "Data filtering", p: "Schemas reject extra fields. Stored details use AES-256-GCM." },
  { t: "Cryptographic checks", p: "PKCE S256, RFC 7523 assertions, JWKS and RS256 signatures." },
  { t: "Caller isolation", p: "Each tenant and principal sees only its own records." },
];

export default function Home() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Nav />
      <RevealObserver />

      {/* ============ HERO ============ */}
      <header className="sky-hero" id="top">
        <Scene preset="highland" seed={7} sunX={0.15} sunY={0.36} />
        <div className="sky-shade" aria-hidden />
        <Critter name="bird" style={{ left: "7%", top: "47%" }} />
        <Critter name="butterfly" style={{ right: "8%", top: "50%" }} />

        <div className="sky-copy">
          <span className="eyebrow-chip"><b>Apache-2.0</b> Open-source MCP for Fayda eSignet</span>
          <h1 className="sky-title split">
            <span className="w" style={{ "--i": 0 } as React.CSSProperties}>Ask in chat.</span>
            <br />
            <span className="w" style={{ "--i": 2 } as React.CSSProperties}>Verify with Fayda.</span>
          </h1>
          <p className="sky-lede">
            Let Claude, Cursor or any MCP agent verify a citizen through Fayda eSignet and get back a simple yes or no,
            never their personal data.
          </p>
          <div className="sky-actions">
            <a className="btn btn-butter" href="#how">Get started <ArrowRight size={16} className="i" aria-hidden /></a>
            <a className="btn btn-sheet" href={links.repo} {...ext}><GitHubIcon /> View on GitHub <ArrowUpRight size={15} className="i i-ne" aria-hidden /></a>
          </div>
          <div className="sky-actions"><Install /></div>
          <p className="sky-fine">Free to self-host. Sandbox config included. Your signing key never leaves your server.</p>
        </div>
      </header>

      <main id="main">
        {/* ============ HOW IT WORKS ============ */}
        <section className="block" id="how" aria-labelledby="how-title">
          <div className="container">
            <h2 className="h2 center reveal" id="how-title">Three steps to a verified answer.</h2>
            <ol className="steps reveal" style={d(0.08)}>
              {steps.map((s) => (
                <li key={s.n}>
                  <span className="mono-label">{s.n} · {s.t}</span>
                  <div className="step-cmd">
                    <code>{s.cmd}</code>
                    <CopyButton text={s.cmd} label={`Copy ${s.cmd}`} />
                  </div>
                </li>
              ))}
            </ol>
            <div className="reveal" style={d(0.14)}><HeroConsole /></div>
          </div>
        </section>

        {/* ============ FEATURES ============ */}
        <section className="block tint" id="features" aria-labelledby="features-title">
          <div className="container">
            <h2 className="h2 center reveal" id="features-title">Verification as tools. Results as booleans.</h2>
            <ul className="grid6">
              {features.map(({ icon: Icon, t, p }, i) => (
                <li key={t} className="reveal" style={d(i * 0.05)}>
                  <span className="f-ico"><Icon size={17} aria-hidden /></span>
                  <h3>{t}</h3>
                  <p>{p}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ CODE ============ */}
        <section className="block" id="code" aria-labelledby="code-title">
          <div className="container narrow">
            <h2 className="h2 center reveal" id="code-title">A few lines of Python.</h2>
            <div className="reveal" style={d(0.08)}><CodeWindow files={files} /></div>
            <p className="code-links reveal">
              <a className="link" href={links.docs} {...ext}>Documentation <ArrowUpRight size={14} aria-hidden /></a>
              <a className="link" href={links.examples} {...ext}>Examples <ArrowUpRight size={14} aria-hidden /></a>
              <a className="link" href={links.pypi} {...ext}>PyPI <ArrowUpRight size={14} aria-hidden /></a>
            </p>
          </div>
        </section>

        {/* ============ SECURITY ============ */}
        <section className="block tint" id="security" aria-labelledby="security-title">
          <div className="container">
            <h2 className="h2 center reveal" id="security-title">Private by design.</h2>
            <ul className="grid4">
              {security.map((x, i) => (
                <li key={x.t} className="reveal" style={d(i * 0.05)}>
                  <h3>{x.t}</h3>
                  <p>{x.p}</p>
                </li>
              ))}
            </ul>
            <p className="disclaimer reveal">
              Independent open-source project. Not an official Fayda product or a compliance certification.{" "}
              <a className="link" href={links.doc("production_guide")} {...ext}>Production guide <ArrowUpRight size={13} aria-hidden /></a>
            </p>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <Faq />

        {/* ============ CLOSING BAND ============ */}
        <section className="final" aria-labelledby="final-title">
          <Scene preset="highland" seed={31} sky={["#2a1f4f", "#5b3f7a", "#c06c84", "#f6b26b"]} sunX={0.5} sunY={0.5} />
          <div className="reveal">
            <h2 id="final-title">Start building identity-aware agents.</h2>
            <div className="sky-actions">
              <a className="btn btn-butter" href="#how">Get started <ArrowRight size={16} className="i" aria-hidden /></a>
              <a className="btn btn-sheet" href={links.repo} {...ext}><GitHubIcon /> View on GitHub <ArrowUpRight size={15} className="i i-ne" aria-hidden /></a>
            </div>
            <div className="sky-actions"><Install /></div>
          </div>
        </section>
      </main>

      <footer className="site">
        <div className="container foot">
          <Brand />
          <nav aria-label="Footer">
            <a href="#faq">FAQ</a>
            <a href={links.repo} {...ext}>GitHub</a>
            <a href={links.pypi} {...ext}>PyPI</a>
            <a href={links.docs} {...ext}>Docs</a>
            <a href={links.examples} {...ext}>Examples</a>
            <a href={links.license} {...ext}>License</a>
          </nav>
        </div>
        <div className="container foot-bot">
          <span>© 2026 Fayda MCP Contributors · Apache-2.0</span>
          <span>Not affiliated with or endorsed by the National ID Program of Ethiopia.</span>
        </div>
      </footer>
    </>
  );
}
