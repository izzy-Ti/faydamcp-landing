import { faqItems, links, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export function JsonLd() {
  const baseUrl = SITE_URL.replace(/\/$/, "");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${baseUrl}/#software`,
        name: SITE_NAME,
        url: baseUrl,
        description: SITE_DESCRIPTION,
        applicationCategory: "SecurityApplication",
        applicationSubCategory: "DeveloperApplication",
        operatingSystem: "Cross-platform (Linux, macOS, Windows)",
        programmingLanguage: "Python",
        downloadUrl: links.pypi,
        codeRepository: links.repo,
        license: links.license,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Organization",
          name: "Fayda MCP Contributors",
          url: links.repo,
        },
      },
      {
        "@type": "HowTo",
        "@id": `${baseUrl}/#howto`,
        name: "How to connect AI agents to Fayda eSignet via Fayda MCP",
        description: "Three-step guide to installing, configuring, and running Fayda MCP for AI agent identity verification.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Install",
            text: "Install Fayda MCP core package via pip.",
            itemListElement: [{ "@type": "HowToDirection", text: "pip install fayda-mcp" }],
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Configure",
            text: "Validate environment variables, keys, and eSignet configuration.",
            itemListElement: [{ "@type": "HowToDirection", text: "fayda-mcp check-config --env-file .env" }],
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Verify",
            text: "Run the MCP server to start processing identity verification tools for AI agents.",
            itemListElement: [{ "@type": "HowToDirection", text: "fayda-mcp run --env-file .env" }],
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
