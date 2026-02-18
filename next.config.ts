import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kfz-werkstatt-rhein-neckar-kreis.de',
      },
    ],
  },
};

export default nextConfig;
