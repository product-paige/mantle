import type { NextConfig } from "next";

// Clean-URL → static HTML map. Single source of truth for rewrites and
// the matching .html → clean-URL redirects below.
const CLEAN_URL_PAGES: Array<{ clean: string; file: string }> = [
  { clean: "/ops",                file: "/mantle-ops.html" },
  { clean: "/compare",            file: "/mantle-compare.html" },
  { clean: "/compass",            file: "/mantle-compass.html" },
  { clean: "/compass/answers",    file: "/mantle-compass-answers.html" },
  { clean: "/compass/framework",  file: "/mantle-compass-framework.html" },
  { clean: "/compass/insights",   file: "/mantle-compass-insights.html" },
  { clean: "/compass/manuals",    file: "/mantle-compass-manuals.html" },
  { clean: "/compass/frameworks", file: "/mantle-compass-frameworks.html" },
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
        // Manual intro and sections 01–07 are MDX, served by the dynamic
        // /manuals/[manual] and /manuals/[manual]/[section] routes.
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
    ];
  },
};

export default nextConfig;
