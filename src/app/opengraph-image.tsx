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
            <svg viewBox="0 0 26 26" width="52" height="52"><circle cx="13" cy="13" r="12" fill="#ffe46b" /><path d="M7.6 13.4l3.5 3.5 6.8-7" fill="none" stroke="#183d32" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="18.6" cy="9.2" r="2" fill="#183d32" /></svg>
            fayda
            <span style={{ fontSize: 22, background: "#183d32", color: "#ffe46b", padding: "6px 10px", borderRadius: 8 }}>mcp</span>
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
