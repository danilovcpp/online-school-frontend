import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable standalone output for Docker optimization
  output: 'standalone',
  // Configure images for external avatars
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/avatars/**',
      },
      {
        protocol: 'http',
        hostname: 's3api.runex.space',
        pathname: '/school-avatars/avatars/**',
      },
    ],
  },
};

export default nextConfig;
