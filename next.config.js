/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net"],
    unoptimized: true,
  },
  experimental: {
    concurrentFeatures: true,
  },
};

module.exports = nextConfig;
