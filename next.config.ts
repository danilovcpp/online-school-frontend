import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/trainers/abacus",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
