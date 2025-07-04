import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
      }
    ],
  },
};

export default nextConfig;
