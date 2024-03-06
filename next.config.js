const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['esbuild'],
    windowHistorySupport: true,
  },
  images: {
    domains: ['127.0.0.1'],
    loader: "custom",
    loaderFile:"./image-loader.ts"
  },
};

module.exports = withBundleAnalyzer(nextConfig)

