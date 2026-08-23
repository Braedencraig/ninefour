/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net"],
    unoptimized: true,
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1600],
    imageSizes: [64, 96, 120],
  },
  experimental: {
    concurrentFeatures: true,
  },
};

module.exports = nextConfig;
