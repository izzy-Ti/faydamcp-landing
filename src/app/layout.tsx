import type { Metadata, Viewport } from "next";
import { DM_Sans, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const serif = Instrument_Serif({ variable: "--font-instrument-serif", subsets: ["latin"], weight: "400", style: "italic" });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], weight: ["400", "500"] });

const title = "Fayda MCP · Identity verification, built for AI agents";
const description =
  "An open-source Python toolkit that connects AI agents and MCP clients to Ethiopia's Fayda identity verification through eSignet, returning privacy-preserving results instead of personal data.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: "Fayda MCP",
  keywords: ["Fayda", "eSignet", "MCP", "Model Context Protocol", "identity verification", "Ethiopia", "Python", "AI agents", "KYC"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "Fayda MCP", title, description },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { themeColor: "#3d86c6" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Reveal animations only hide content when JS is running. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
