const REPO = "https://github.com/izzy-Ti/fayda-mcp";
const BLOB = `${REPO}/blob/main`;

// Canonical/OG base URL: set NEXT_PUBLIC_SITE_URL once a domain exists; Vercel supplies its production host automatically.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

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
