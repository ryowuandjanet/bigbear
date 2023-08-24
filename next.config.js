/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'example.com'],
  },
  // eslint: {
 //   ignoreDuringBuilds: true,
  // },
};

module.exports = nextConfig;
