import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://mantle-chi.vercel.app/sitemap.xml",
    host: "https://mantle-chi.vercel.app",
  };
}
