import type { NextConfig } from "next";

// Clean-URL → static HTML map. Single source of truth for rewrites and
// the matching .html → clean-URL redirects below.
const CLEAN_URL_PAGES: Array<{ clean: string; file: string }> = [
  { clean: "/ops",                file: "/mantle-ops.html" },
  { clean: "/compare",            file: "/mantle-compare.html" },
  { clean: "/compass",            file: "/mantle-compass.html" },
  { clean: "/compass/v2",         file: "/mantle-compass-v2.html" },
  // Answers preserved: route + static page still live for now,
  // but removed from the primary section nav (replaced by
  // Templates). Re-add the nav link when Answers content is
  // ready to surface again.
  { clean: "/compass/answers",    file: "/mantle-compass-answers.html" },
  { clean: "/compass/framework",  file: "/mantle-compass-framework.html" },
  { clean: "/compass/insights",   file: "/mantle-compass-insights.html" },
  { clean: "/compass/manuals",    file: "/mantle-compass-manuals.html" },
  { clean: "/compass/frameworks", file: "/mantle-compass-frameworks.html" },
  // Templates: parallel resource section to Compass. Listing is
  // static; `/templates/[slug]` detail pages are React (see
  // `app/templates/[slug]/page.tsx`).
  { clean: "/templates",          file: "/mantle-compass-templates.html" },
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

      // Manuals moved under /compass/* with a new 7-manual structure.
      // The four old manuals map to the first four new manuals by
      // position (the old chapter slugs don't 1:1 with the new chapter
      // slugs, so chapter URLs redirect to the manual root rather
      // than a specific chapter that may not exist).
      { source: "/manuals/think-like-a-founder",          destination: "/compass/reality", permanent: true },
      { source: "/manuals/think-like-a-founder/:path*",   destination: "/compass/reality", permanent: true },
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
