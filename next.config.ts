import type { NextConfig } from "next";

// Clean-URL → static HTML map. Single source of truth for rewrites and
// the matching .html → clean-URL redirects below.
const CLEAN_URL_PAGES: Array<{ clean: string; file: string }> = [
  { clean: "/ops",                file: "/mantle-ops.html" },
  { clean: "/compare",            file: "/mantle-compare.html" },
  // `/compass` home migrated to a React route in `app/compass/page.tsx`.
  // `/compass/v2` deprecated — file kept on disk for reference,
  // rewrite removed.
  // Answers preserved: route + static page still live for now,
  // but removed from the primary section nav (replaced by
  // Templates). Re-add the nav link when Answers content is
  // ready to surface again.
  // `/compass/answers` migrated to a React route in
  // `app/compass/answers/page.tsx`.
  // `/compass/framework` (singular) and its `mantle-compass-framework.html`
  // file were retired when Frameworks became Methods. The file was
  // deleted; this comment is here so the absence is intentional.
  // `/compass/insights` migrated to a React route in
  // `app/compass/insights/page.tsx`.
  // `/compass/manuals` migrated to a React route in
  // `app/compass/manuals/page.tsx`. The static HTML file was the
  // legacy implementation; the rewrite is removed so the React
  // page resolves directly. `public/mantle-compass-manuals.html`
  // is kept as a reference for the SVG cover artwork but no
  // longer served — safe to delete in a follow-up cleanup.
  // `/compass/methods` migrated to a React route in
  // `app/compass/methods/page.tsx`. Static HTML at
  // `public/mantle-compass-frameworks.html` no longer served.
  // `/templates` migrated to a React route in `app/templates/page.tsx`.
  // Detail pages have always been React (`app/templates/[slug]/page.tsx`);
  // the index is now also React, so no rewrite needed.
  // `public/mantle-compass-templates.html` kept as a reference for the
  // legacy SVG / copy but no longer served — safe to delete in cleanup.
  { clean: "/systems",            file: "/mantle-core-systems.html" },
  { clean: "/results",            file: "/mantle-results.html" },
  { clean: "/features",           file: "/mantle-use-case-directory.html" },
];

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/mantle-homepage.html" },
        ...CLEAN_URL_PAGES.map(({ clean, file }) => ({
          source: clean,
          destination: file,
        })),
      ],
      afterFiles: [
        // Sub-pages still live under the /features prefix today; their
        // static HTML files happen to be authored under /use-cases/.
        { source: "/features/customers",            destination: "/use-cases/customers/index.html" },
        { source: "/features/customers/lifecycle",  destination: "/use-cases/customers/lifecycle/index.html" },
        { source: "/features/customers/profiles",   destination: "/use-cases/customers/profiles/index.html" },
        { source: "/features/customers/data",       destination: "/use-cases/customers/data/index.html" },
        { source: "/features/customers/segments",   destination: "/use-cases/customers/segments/index.html" },
        // The seven Compass manuals (reality, shape, build, launch,
        // monetize, grow, operate) and their chapters are MDX,
        // served by the dynamic /compass/[manual] and
        // /compass/[manual]/[section] routes.
      ],
      fallback: [],
    };
  },
  async redirects() {
    return [
      ...CLEAN_URL_PAGES.map(({ clean, file }) => ({
        source: file,
        destination: clean,
        permanent: true,
      })),
      // Old /use-cases URL retired in favor of /features.
      { source: "/use-cases",            destination: "/features",            permanent: true },
      { source: "/use-cases/:path*",     destination: "/features/:path*",     permanent: true },

      // Frameworks renamed to Methods. Old /compass/frameworks/* URLs
      // 301 to the new /compass/methods/* surface so external links
      // and search indexes carry over cleanly.
      { source: "/compass/frameworks",                    destination: "/compass/methods",         permanent: true },
      { source: "/compass/frameworks/:slug*",             destination: "/compass/methods/:slug*",  permanent: true },
      // Catch the old singular `/compass/framework` too — was a
      // separate static page (now deleted); fold it into Methods.
      { source: "/compass/framework",                     destination: "/compass/methods",         permanent: true },

      // Manuals moved under /compass/* with a new 7-manual structure.
      // The four old manuals map to the first four new manuals by
      // position (the old chapter slugs don't 1:1 with the new chapter
      // slugs, so chapter URLs redirect to the manual root rather
      // than a specific chapter that may not exist).
      { source: "/manuals/think-like-a-founder",          destination: "/compass/foundation", permanent: true },
      { source: "/manuals/think-like-a-founder/:path*",   destination: "/compass/foundation", permanent: true },

      // Reality renamed to Foundation. 308 the old route + every
      // chapter URL so external links keep working without a 404.
      { source: "/compass/reality",                       destination: "/compass/foundation",         permanent: true },
      { source: "/compass/reality/:slug*",                destination: "/compass/foundation/:slug*",  permanent: true },
      { source: "/manuals/get-to-real-demand",            destination: "/compass/shape",   permanent: true },
      { source: "/manuals/get-to-real-demand/:path*",     destination: "/compass/shape",   permanent: true },
      { source: "/manuals/build-your-first-mvp",          destination: "/compass/build",   permanent: true },
      { source: "/manuals/build-your-first-mvp/:path*",   destination: "/compass/build",   permanent: true },
      { source: "/manuals/polish-your-product",           destination: "/compass/launch",  permanent: true },
      { source: "/manuals/polish-your-product/:path*",    destination: "/compass/launch",  permanent: true },
      // Any other /manuals/* URL falls back to the Compass manuals
      // index. /manuals at root → /compass/manuals (the listing).
      { source: "/manuals",                               destination: "/compass/manuals", permanent: true },
      { source: "/manuals/:path*",                        destination: "/compass/manuals", permanent: true },
    ];
  },
};

export default nextConfig;
