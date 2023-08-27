/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com','2626731.weebly.com'],
  },
  eslint: {
    ignoreDuringBuilds: true
  },
};

module.exports = nextConfig;