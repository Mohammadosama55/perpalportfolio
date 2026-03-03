import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'standalone',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

export default nextConfig;
