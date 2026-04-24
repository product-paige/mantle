import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  async rewrites() {
    return [
      { source: "/", destination: "/mantle-homepage.html" },
    ];
  },
};

export default nextConfig;
