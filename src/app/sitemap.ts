import type { MetadataRoute } from "next";

// No request-specific data here, so this can always prerender once at build
// time — required for static export, and a free win on Vercel too.
export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourusername.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
