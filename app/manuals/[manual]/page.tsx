import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ManualShell } from "@/compass/components/manuals/ManualShell";
import { mdxComponents } from "@/compass/components/manuals/mdx-components";
import { listManuals, loadSection } from "@/compass/lib/manuals/content";

type Params = { manual: string };

export async function generateStaticParams() {
  const slugs = await listManuals();
  return slugs.map((manual) => ({ manual }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { manual } = await params;
  const loaded = await loadSection(manual, "");
  if (!loaded) return {};
  const fm = loaded.frontmatter as { summary?: string; description?: string };
  const description =
    fm.description ??
    fm.summary ??
    `${loaded.manifest.title} — a Mantle Compass manual.`;
  const title = loaded.manifest.title;
  const path = `/manuals/${manual}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "article", title, description, url: path },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ManualIntroPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { manual } = await params;
  const loaded = await loadSection(manual, "");
  if (!loaded) notFound();

  return (
    <ManualShell
      manifest={loaded.manifest}
      current={loaded.section}
      currentIndex={loaded.index}
      prev={loaded.prev}
      next={loaded.next}
      introBody={(loaded.frontmatter as { introBody?: string }).introBody}
    >
      <MDXRemote
        source={loaded.source}
        components={mdxComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </ManualShell>
  );
}
