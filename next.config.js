/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental features
  typescript: {
    // Enable type checking during build
    ignoreBuildErrors: false,
  },
  eslint: {
    // Enable linting during build
    ignoreDuringBuilds: false,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
