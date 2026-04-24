import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  generateBuildId: async () => "v8-mushaf-only",
};

export default nextConfig;
