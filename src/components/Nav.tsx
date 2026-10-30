"use client";

import { ArrowUpRight, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Brand, GitHubIcon } from "./Brand";
import { links } from "@/lib/site";

const items = [
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#code", label: "Code" },
  { href: "#security", label: "Security" },
];

/** Transparent over the hero art (white type); becomes a sticky glass pill once the page scrolls. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => menu.current?.removeAttribute("open");

  return (
    <div className="nav-wrap" data-scrolled={scrolled}>
      <nav className="nav" aria-label="Primary">
        <Brand />
        <div className="nav-links">
          {items.map((i) => <a key={i.href} href={i.href}>{i.label}</a>)}
        </div>
        <div className="nav-cta">
          <a className="nav-docs" href={links.docs} target="_blank" rel="noreferrer">Docs</a>
          <details className="nav-menu" ref={menu}>
            <summary aria-label="Open menu"><Menu size={18} aria-hidden /></summary>
            <div className="menu-sheet">
              {items.map((i) => <a key={i.href} href={i.href} onClick={close}>{i.label}</a>)}
              <a href={links.docs} target="_blank" rel="noreferrer" onClick={close}>Docs ↗</a>
            </div>
          </details>
          <a className="btn btn-sheet btn-sm" href={links.repo} target="_blank" rel="noreferrer" aria-label="Star on GitHub (opens in a new tab)">
            <span className="star-label">Star on</span><GitHubIcon /><ArrowUpRight size={14} className="i i-ne" aria-hidden />
          </a>
        </div>
      </nav>
    </div>
  );
}
