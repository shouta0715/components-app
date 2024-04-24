const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['esbuild'],
  },
  images: {
    remotePatterns: [{
      protocol: "http",
      hostname: "127.0.0.1",
      port: "9000",
      pathname: "/ui-trade-preview/*",
    }],
  },
};

module.exports = withBundleAnalyzer(nextConfig)

