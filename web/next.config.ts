/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // Force Webpack, disables Turbopack
  },
};

module.exports = nextConfig;
