import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  experimental: {
    optimizePackageImports: ['@reduxjs/toolkit', 'react-redux'],
  },
  // Specify the source directory
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  
  // Static export configuration for Netlify
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
