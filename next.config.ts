import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  swcMinify: true,
  experimental: {
    // Remove reactCompiler as it's no longer supported
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  pageExtensions: ["ts", "tsx", "mdx"],
  // Optimize for Cloudflare Workers
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        dns: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  images: {
    unoptimized: true,
    // Add domains if you're using external image sources
    domains: [],
  },
  env: {
    POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN || '',
    POLAR_ORGANIZATION_ID: process.env.POLAR_ORGANIZATION_ID || '',
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL || '',
  },
  // Add rewrites for API routes if needed
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: '/api/:path*',
        },
      ],
    }
  },
}

export default nextConfig