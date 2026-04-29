import type { MetadataRoute } from "next";
import { listInsights } from "@/lib/insights/content";
import { getManualManifest, listManuals } from "@/lib/manuals/content";

const SITE_URL = "https://heymantle.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/compass`,             lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/compass/manuals`,     lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/compass/answers`,     lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${SITE_URL}/compass/insights`,    lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${SITE_URL}/compass/framework`,   lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/systems`,             lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/results`,             lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/use-cases`,           lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/use-cases/customers`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const manualSlugs = await listManuals();
  const manualEntries: MetadataRoute.Sitemap = [];
  for (const slug of manualSlugs) {
    const manifest = await getManualManifest(slug);
    if (!manifest) continue;
    manualEntries.push({
      url: `${SITE_URL}/manuals/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
    for (const section of manifest.sections) {
      if (!section.slug) continue;
      manualEntries.push({
        url: `${SITE_URL}/manuals/${slug}/${section.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  const insights = await listInsights();
  const insightEntries: MetadataRoute.Sitemap = insights.map((i) => ({
    url: `${SITE_URL}/compass/insights/${i.slug}`,
    lastModified: new Date(i.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticEntries, ...manualEntries, ...insightEntries];
}
