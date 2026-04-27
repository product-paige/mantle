import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/mantle-homepage.html" },
      ],
      afterFiles: [
        { source: "/manuals/:manual", destination: "/manuals/:manual/index.html" },
        { source: "/manuals/:manual/:section", destination: "/manuals/:manual/:section/index.html" },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
