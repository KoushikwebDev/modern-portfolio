/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during build
  },
  images: {
    domains: ["images.unsplash.com"], // ✅ Add Unsplash to allowed domains
  },
};

module.exports = nextConfig;
