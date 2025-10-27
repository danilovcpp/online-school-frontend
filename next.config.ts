import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable standalone output for Docker optimization
  output: 'standalone',

  async redirects() {
    return [
      {
        source: '/',
        destination: '/trainers/abacus',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
