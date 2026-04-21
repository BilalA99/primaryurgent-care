import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      // Canonical host normalization: www → non-www (308 permanent)
      // These ensure http://www, https://www, and http:// all resolve in one hop to https://primaryuc.com
      // Note: Vercel/hosting layer handles the actual www→non-www redirect at edge level.
      // The redirects below handle any internal Next.js routing of www variants.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.primaryuc.com' }],
        destination: 'https://primaryuc.com/:path*',
        permanent: true, // 308
      },
      {
        source: '/paincare',
        destination: '/car-accident-injury-clinic',
        permanent: true, // 301 redirect
      },
      {
        source: '/paincare/:slug',
        destination: '/urgent-injury-care/:slug',
        permanent: true,
      },
      {
        source: '/urgentinjurycare',
        destination: '/urgent-injury-care',
        permanent: true,
      },
      {
        source: '/urgentinjurycare/:slug',
        destination: '/urgent-injury-care/:slug',
        permanent: true,
      },
      {
        source: '/emergencyroom',
        destination: '/emergency-room',
        permanent: true,
      },
      {
        source: '/emergencyroom/:slug',
        destination: '/emergency-room/:slug',
        permanent: true,
      },
      // Lantana location redirects - maintain branding but ensure proper routing
      {
        source: '/locations/lantana',
        destination: '/locations/lantana-primary-urgent-care-center',
        permanent: true,
      },
      {
        source: '/car-accident/lantana-fl',
        destination: '/car-accident/lantana',
        permanent: true,
      },
      {
        source: '/locations/lantana-fl',
        destination: '/locations/lantana-primary-urgent-care-center',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'mynaui.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
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
