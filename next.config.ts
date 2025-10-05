import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'https://randomuser.me/**',
      },
      {
        protocol: 'https',
        hostname: 'mynaui.com/**',
      },
      {
        protocol: 'https',
        hostname: 'hznieioyzvcrfqcvyikc.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'primaryuc.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.primaryuc.com',
      },
      {
        protocol: 'https',
        hostname: '*.b-cdn.net',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;
