import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { CustomerShell } from "@/components/customers/CustomerShell";
import { customerMdxComponents } from "@/components/customers/mdx-components";
import { listCustomers, loadCustomer } from "@/lib/customers/content";

type Params = { slug: string };

export async function generateStaticParams() {
  const items = await listCustomers();
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const loaded = await loadCustomer(slug);
  if (!loaded) return {};
  const path = `/customers/${slug}`;
  const description = loaded.meta.summary;
  return {
    title: `${loaded.meta.company} — Customer story`,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: `${loaded.meta.company} — Customer story`,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: `${loaded.meta.company} — Customer story`,
      description,
    },
  };
}

export default async function CustomerPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const loaded = await loadCustomer(slug);
  if (!loaded) notFound();

  return (
    <CustomerShell meta={loaded.meta}>
      <MDXRemote
        source={loaded.source}
        components={customerMdxComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </CustomerShell>
  );
}
