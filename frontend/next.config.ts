import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig & { turbopack?: { root?: string } } = {
  reactStrictMode: true,
  // Ensure Turbopack uses the frontend directory as the workspace root when there are multiple lockfiles
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
