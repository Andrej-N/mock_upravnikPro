import type { NextConfig } from "next";

const repo = "mock_upravnikPro";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : undefined,
  assetPrefix: isProd ? `/${repo}/` : undefined,
  trailingSlash: true,
};

export default nextConfig;
