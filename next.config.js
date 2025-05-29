/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Remove any experimental features that might not work with Node 18
  },
  // Ensure compatibility with Node 18
  typescript: {
    // During builds, ignore TypeScript errors for faster development
    ignoreBuildErrors: true,
  },
  eslint: {
    // During builds, ignore ESLint errors for faster development
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
