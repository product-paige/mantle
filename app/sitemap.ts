import type { MetadataRoute } from "next";
import { listFrameworks } from "@/compass/lib/methods/content";
import { listInsights } from "@/compass/lib/insights/content";
import { getManualManifest, listManuals } from "@/compass/lib/manuals/content";
import { listTemplates } from "@/compass/lib/templates/content";
import { SITE_ORIGIN } from "@/compass/lib/seo";

/**
 * Sitemap — every indexable Compass URL.
 *
 * Drops the legacy entries (`/compass/answers`, `/compass/framework`
 * singular, `/use-cases*`) which either no longer exist or redirect
 * elsewhere. Adds the renamed Methods listing (`/compass/methods`)
 * and every method detail page. Manual + insight + template detail
 * pages are enumerated dynamically from disk so new content shows
 * up without a sitemap edit.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_ORIGIN}/`,                  lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_ORIGIN}/compass`,           lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_ORIGIN}/compass/manuals`,   lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_ORIGIN}/compass/methods`,   lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_ORIGIN}/templates`,         lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_ORIGIN}/compass/insights`,  lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${SITE_ORIGIN}/systems`,           lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_ORIGIN}/results`,           lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_ORIGIN}/features`,          lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_ORIGIN}/features/customers`,lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const manualSlugs = await listManuals();
  const manualEntries: MetadataRoute.Sitemap = [];
  for (const slug of manualSlugs) {
    const manifest = await getManualManifest(slug);
    if (!manifest) continue;
    manualEntries.push({
      url: `${SITE_ORIGIN}/compass/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
    for (const section of manifest.sections) {
      if (!section.slug) continue;
      manualEntries.push({
        url: `${SITE_ORIGIN}/compass/${slug}/${section.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Method (formerly framework) detail pages — pulled dynamically
  // from disk so new methods land in the sitemap without an edit.
  const methods = await listFrameworks();
  const methodEntries: MetadataRoute.Sitemap = methods.map((m) => ({
    url: `${SITE_ORIGIN}/compass/methods/${m.slug}`,
    lastModified: m.lastUpdated ? new Date(m.lastUpdated) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const insights = await listInsights();
  const insightEntries: MetadataRoute.Sitemap = insights.map((i) => ({
    url: `${SITE_ORIGIN}/compass/insights/${i.slug}`,
    lastModified: new Date(i.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const templates = await listTemplates();
  const templateEntries: MetadataRoute.Sitemap = templates.map((t) => ({
    url: `${SITE_ORIGIN}/templates/${t.slug}`,
    lastModified: t.lastUpdated ? new Date(t.lastUpdated) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticEntries,
    ...manualEntries,
    ...methodEntries,
    ...insightEntries,
    ...templateEntries,
  ];
}
