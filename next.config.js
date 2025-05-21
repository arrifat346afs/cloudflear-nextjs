/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
  env: {
    POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN || '',
    POLAR_ORGANIZATION_ID: process.env.POLAR_ORGANIZATION_ID || '',
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL || '',
  },
  // Add specific configuration for static exports
  images: {
    unoptimized: true,
  },
  // Handle API routes
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

module.exports = nextConfig