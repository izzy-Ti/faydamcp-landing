# Fayda MCP — landing page

Marketing site for [fayda-mcp](https://github.com/izzy-Ti/fayda-mcp), an independent open-source Python toolkit
that connects MCP-compatible AI agents to Fayda eSignet identity verification.

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · lucide-react. Fully static; no backend.

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint && npx tsc --noEmit && npm run build
```

The site defaults to `https://fayda-mcp.byisrael.tech`. Set `NEXT_PUBLIC_SITE_URL` to override the production origin if needed.

## Where things live

- `src/app/page.tsx` — all sections (hero, how it works, features, code, security, FAQ, closing band, footer)
- `src/app/sitemap.ts` & `src/app/robots.ts` — automated sitemap and crawler discovery configs
- `src/app/manifest.ts` & `src/app/apple-icon.tsx` — Web App Manifest and Apple Touch icon
- `src/components/JsonLd.tsx` — Schema.org structured data (WebSite, SoftwareApplication, HowTo, FAQPage)
- `src/components/Faq.tsx` — accessible, crawlable FAQ accordion
- `src/lib/site.ts` — repository links, site metadata, tool list and every code snippet. Snippets mirror the repo's README,
  `examples/` and `src/fayda_mcp/cli.py`; re-check them when the library changes.
- `src/components/HeroConsole.tsx` — the simulated agent flow in "How it works" (synthetic data, clearly labelled)
- `src/components/CodeWindow.tsx` — editor-style code window with file tabs and copy
- `src/lib/pixel-scene.js` — procedural pixel-art scenes, vendored from the `pixel-meadow-ui` design skill

License: Apache-2.0 (matches the library's LICENSE file and PyPI metadata; the library README badge saying MIT is out of date).
