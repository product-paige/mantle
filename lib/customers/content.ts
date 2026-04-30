import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content", "customers");

export type CustomerStat = {
  value: string;
  label: string;
};

export type CustomerFrontmatter = {
  slug: string;
  company: string;
  /** Hero headline. Supports inline html-safe text only. */
  title: string;
  /** Hero subheadline / dek. */
  summary: string;
  /** Short blurb used on the listing card; falls back to summary. */
  cardSummary?: string;
  /** Metadata chips shown above the hero (industry, region, products). */
  meta?: Array<{ label: string; value: string }>;
  /** Up-to-3 hero stats. */
  stats?: CustomerStat[];
  /** Optional logo path served from /public. */
  logo?: string;
  /** Optional hero image. */
  heroImage?: string;
  /** System slugs used by this customer (renders the "Built with Mantle" cards). */
  systems?: string[];
  published?: boolean;
};

export type CustomerMeta = CustomerFrontmatter & {
  file: string;
};

export type LoadedCustomer = {
  meta: CustomerMeta;
  source: string;
};

export async function listCustomers(): Promise<CustomerMeta[]> {
  let entries: string[];
  try {
    entries = await fs.readdir(CONTENT_ROOT);
  } catch {
    return [];
  }
  const files = entries.filter((f) => f.endsWith(".mdx"));
  const items: CustomerMeta[] = [];
  for (const file of files) {
    const raw = await fs.readFile(path.join(CONTENT_ROOT, file), "utf8");
    const { data } = matter(raw);
    const fm = data as CustomerFrontmatter;
    if (fm.published === false) continue;
    items.push({ ...fm, file });
  }
  items.sort((a, b) => a.company.localeCompare(b.company));
  return items;
}

export async function loadCustomer(
  slug: string
): Promise<LoadedCustomer | null> {
  const items = await listCustomers();
  const meta = items.find((i) => i.slug === slug);
  if (!meta) return null;
  const raw = await fs.readFile(path.join(CONTENT_ROOT, meta.file), "utf8");
  const parsed = matter(raw);
  return { meta, source: parsed.content };
}
