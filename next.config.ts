import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Avoid noisy ESLint CLI option warnings during production builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
