/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1600],
    imageSizes: [64, 96, 120],
    qualities: [50, 60, 70, 75],
  },
};

module.exports = nextConfig;
