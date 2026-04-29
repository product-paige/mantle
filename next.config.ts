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
  { clean: "/use-cases",          file: "/mantle-use-case-directory.html" },
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
        // Use-case static-HTML pages.
        { source: "/use-cases/customers",            destination: "/use-cases/customers/index.html" },
        { source: "/use-cases/customers/lifecycle",  destination: "/use-cases/customers/lifecycle/index.html" },
        { source: "/use-cases/customers/profiles",   destination: "/use-cases/customers/profiles/index.html" },
        { source: "/use-cases/customers/data",       destination: "/use-cases/customers/data/index.html" },
        { source: "/use-cases/customers/segments",   destination: "/use-cases/customers/segments/index.html" },
        // Manual intro — static HTML for now.
        { source: "/manuals/:manual", destination: "/manuals/:manual/index.html" },
        // Legacy static-HTML sections. Remove an entry once the section
        // has been migrated to MDX under /content/manuals/...
        { source: "/manuals/get-to-real-demand/start-with-the-problem",   destination: "/manuals/get-to-real-demand/start-with-the-problem/index.html" },
        { source: "/manuals/get-to-real-demand/validate-your-app-idea",   destination: "/manuals/get-to-real-demand/validate-your-app-idea/index.html" },
        { source: "/manuals/get-to-real-demand/capture-early-users",      destination: "/manuals/get-to-real-demand/capture-early-users/index.html" },
        { source: "/manuals/get-to-real-demand/define-your-positioning",  destination: "/manuals/get-to-real-demand/define-your-positioning/index.html" },
      ],
      fallback: [],
    };
  },
  async redirects() {
    return CLEAN_URL_PAGES.map(({ clean, file }) => ({
      source: file,
      destination: clean,
      permanent: true,
    }));
  },
};

export default nextConfig;
