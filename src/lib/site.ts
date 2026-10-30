const REPO = "https://github.com/izzy-Ti/fayda-mcp";
const BLOB = `${REPO}/blob/main`;

// Canonical/OG base URL: defaults to production custom domain, or uses environment variables if provided.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://fayda-mcp.byisrael.tech");

export const links = {
  repo: REPO,
  pypi: "https://pypi.org/project/fayda-mcp/",
  readme: `${REPO}#readme`,
  docs: `${REPO}/tree/main/docs`,
  examples: `${REPO}/tree/main/examples`,
  license: `${BLOB}/LICENSE`,
  issues: `${REPO}/issues`,
  doc: (name: string) => `${BLOB}/docs/${name}.md`,
  example: (name: string) => `${BLOB}/examples/${name}.py`,
};

export const SITE_NAME = "Fayda MCP";
export const SITE_TITLE = "Fayda MCP · Identity Verification, Built for AI Agents";
export const SITE_DESCRIPTION =
  "Open-source Python Model Context Protocol (MCP) server connecting AI agents to Ethiopia's Fayda national digital identity via eSignet. Verify citizen claims with privacy-preserving boolean predicates, PKCE OIDC, and offline QR verification.";

export const SITE_KEYWORDS = [
  "Fayda",
  "Fayda MCP",
  "Model Context Protocol",
  "MCP server",
  "Ethiopia Digital ID",
  "Fayda eSignet",
  "National ID Program Ethiopia",
  "NIDP Ethiopia",
  "AI agent KYC",
  "Claude Desktop MCP",
  "Cursor MCP",
  "Identity verification AI",
  "Privacy-preserving identity",
  "Zero-knowledge identity predicates",
  "Offline QR verification",
  "eSignet OIDC",
  "PKCE S256",
  "MOSIP",
  "Python MCP",
  "FastAPI MCP",
  "Agentic identity",
];

export const faqItems = [
  {
    q: "What is Fayda MCP?",
    a: "Fayda MCP is an open-source Python toolkit and Model Context Protocol (MCP) server that connects AI assistants and agents (such as Claude Desktop, Cursor, and custom multi-agent systems) to Ethiopia's Fayda national digital ID platform via eSignet.",
  },
  {
    q: "How does privacy-preserving identity verification protect citizen data?",
    a: "LLM context windows should never hold unnecessary personally identifiable information (PII). Fayda MCP evaluates identity claims on the server and returns minimal boolean predicates (such as age_over_18: true) rather than raw personal details like names, dates of birth, or identification numbers.",
  },
  {
    q: "Which AI agents and MCP clients are compatible?",
    a: "Any AI tool or framework supporting Anthropic's Model Context Protocol can use Fayda MCP out of the box via stdio or HTTP/SSE transports. Supported environments include Claude Desktop, Cursor, Continue, LangChain, LlamaIndex, and custom agent runtimes.",
  },
  {
    q: "How does offline Fayda QR code verification work?",
    a: "Fayda MCP can cryptographically verify the digital signature embedded inside an Ethiopian Fayda QR code without contacting a network server. It validates the issuer signature against public certificates and confirms data integrity instantly.",
  },
  {
    q: "What architecture and backend adapters does Fayda MCP support?",
    a: "Built in modern Python (3.10+), Fayda MCP provides a headless core along with optional production adapters for FastAPI (REST/webhooks), Redis (fast distributed session storage), and PostgreSQL (AES-256-GCM encrypted persistence).",
  },
  {
    q: "Is Fayda MCP officially affiliated with the National ID Program of Ethiopia?",
    a: "No. Fayda MCP is an independent open-source community project distributed under the Apache-2.0 license. It integrates with standard Fayda and eSignet protocol specifications, but is not officially endorsed by NIDP.",
  },
];

export const INSTALL = "pip install fayda-mcp";

/* All snippets mirror the repository's README, examples/ and CLI (src/fayda_mcp/cli.py). */
export const snippets = {
  install: `# Core: MCP tools, eSignet OIDC, offline QR
pip install fayda-mcp

# Optional FastAPI, Redis and PostgreSQL adapters
pip install "fayda-mcp[fastapi,redis,postgres]"`,

  server: `from fayda_mcp import FaydaConfig, FaydaVerificationService
from fayda_mcp.mcp.factory import create_mcp_server
from fayda_mcp.storage.memory import MemoryResultRepository, MemorySessionStore

service = FaydaVerificationService(
    config=FaydaConfig.from_env(),  # FAYDA_* variables
    sessions=MemorySessionStore(),
    results=MemoryResultRepository(),
)

server = create_mcp_server(service=service)

if __name__ == "__main__":
    server.run(transport="stdio")`,

  qr: `result = await service.submit_qr_verification(
    qr_text="<raw_scanner_text>",
    purpose="kyc",
    checks=["credential_signature_valid", "age_over_18"],
)

result.checks                # {'credential_signature_valid': True, 'age_over_18': True}
result.holder_authenticated  # False: a scan can't prove the holder is present`,

  client: `{
  "mcpServers": {
    "fayda": {
      "command": "fayda-mcp",
      "args": ["run", "--transport", "stdio", "--env-file", "/path/to/.env"]
    }
  }
}`,
};
