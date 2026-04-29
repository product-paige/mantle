import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://heymantle.com/sitemap.xml",
    host: "https://heymantle.com",
  };
}
