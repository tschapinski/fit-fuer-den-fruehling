import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.all-in-wiesloch.de',
      },
    ],
  },
};

export default nextConfig;
