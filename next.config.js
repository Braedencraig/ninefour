/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["images.ctfassets.net"],
    },
    experimental: {
        concurrentFeatures: true,
    },
};

module.exports = nextConfig;