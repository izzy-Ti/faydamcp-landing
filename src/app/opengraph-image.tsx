import { ImageResponse } from "next/og";

export const alt = "Fayda MCP: identity verification, built for AI agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pixel-stepped highland silhouette so the social card echoes the site's hero art.
const hills = Array.from({ length: 60 }, (_, i) => 150 + Math.round(Math.sin(i / 5) * 22 + Math.sin(i / 2.3) * 8) * 2);

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "linear-gradient(#3d86c6, #a9c9de 60%, #f7b77a)", padding: 20 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: 24, background: "#fffefa", padding: "64px 72px", position: "relative", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 700, color: "#183d32", letterSpacing: -1.5 }}>
            <svg viewBox="0 0 256 256" width="56" height="56"><rect width="256" height="256" rx="58" fill="#183d32" /><g transform="translate(128 128) scale(.72) translate(-128 -126)"><path d="M60 60A22 22 0 0 1 82 38H174A22 22 0 0 1 174 82H104V112H108A22 22 0 0 1 108 156H104V192A22 22 0 0 1 60 192Z" fill="#f7f9f5" /><circle cx="174" cy="134" r="22" fill="#ffe46b" /></g></svg>
            Fayda MCP
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, color: "#183d32" }}>
            <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -3, lineHeight: 1.04, maxWidth: 900 }}>Identity verification, built for AI agents.</div>
            <div style={{ fontSize: 28, color: "#53665d" }}>Privacy-first MCP toolkit for Fayda eSignet · pip install fayda-mcp</div>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 210, display: "flex", alignItems: "flex-end" }}>
            {hills.map((h, i) => <div key={i} style={{ width: 20, height: h / 5, background: i % 7 === 3 ? "#9fb24a" : "#d9d47a", opacity: 0.55 }} />)}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
