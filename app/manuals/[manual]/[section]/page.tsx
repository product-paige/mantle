import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ManualShell } from "@/components/manuals/ManualShell";
import { mdxComponents } from "@/components/manuals/mdx-components";
import {
  getManualManifest,
  listManuals,
  loadSection,
} from "@/lib/manuals/content";

type Params = { manual: string; section: string };

export async function generateStaticParams() {
  const slugs = await listManuals();
  const all: Params[] = [];
  for (const manual of slugs) {
    const manifest = await getManualManifest(manual);
    if (!manifest) continue;
    for (const s of manifest.sections) {
      if (!s.slug) continue; // intro is handled by /[manual]/page.tsx (TODO)
      all.push({ manual, section: s.slug });
    }
  }
  return all;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { manual, section } = await params;
  const loaded = await loadSection(manual, section);
  if (!loaded) return {};
  const fm = loaded.frontmatter as { summary?: string; description?: string };
  const description =
    fm.description ??
    fm.summary ??
    `${loaded.section.title} — part of the ${loaded.manifest.title} manual from Mantle Compass.`;
  const title = `${loaded.manifest.title} — ${loaded.section.title}`;
  const path = `/manuals/${manual}/${section}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ManualSectionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { manual, section } = await params;
  const loaded = await loadSection(manual, section);
  if (!loaded) notFound();

  const fm = loaded.frontmatter as { summary?: string; description?: string };
  const description = fm.description ?? fm.summary ?? "";
  const url = `https://mantle-chi.vercel.app/manuals/${manual}/${section}`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${loaded.manifest.title} — ${loaded.section.title}`,
    description,
    isPartOf: {
      "@type": "Book",
      name: loaded.manifest.title,
      url: `https://mantle-chi.vercel.app/manuals/${manual}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Mantle",
      url: "https://mantle-chi.vercel.app",
    },
    mainEntityOfPage: url,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Mantle Compass", item: "https://mantle-chi.vercel.app/compass" },
      { "@type": "ListItem", position: 2, name: "Manuals", item: "https://mantle-chi.vercel.app/compass/manuals" },
      { "@type": "ListItem", position: 3, name: loaded.manifest.title, item: `https://mantle-chi.vercel.app/manuals/${manual}` },
      { "@type": "ListItem", position: 4, name: loaded.section.title, item: url },
    ],
  };

  return (
    <ManualShell
      manifest={loaded.manifest}
      current={loaded.section}
      currentIndex={loaded.index}
      prev={loaded.prev}
      next={loaded.next}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <MDXRemote
        source={loaded.source}
        components={mdxComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </ManualShell>
  );
}
