import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL.replace(/\/$/, "");

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      images: [
        `${baseUrl}/opengraph-image`,
        `${baseUrl}/screenshots/desktop-full.png`,
        `${baseUrl}/screenshots/desktop-hero.png`,
      ],
    },
  ];
}
