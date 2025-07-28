/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // DISABLE Turbopack and fallback to Webpack
  },
};

module.exports = nextConfig;
