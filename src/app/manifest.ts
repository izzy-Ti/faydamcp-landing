import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fayda MCP · Identity Verification for AI Agents",
    short_name: "Fayda MCP",
    description:
      "Open-source Model Context Protocol (MCP) server connecting AI agents to Ethiopia's Fayda national digital identity via eSignet.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffefa",
    theme_color: "#3d86c6",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
