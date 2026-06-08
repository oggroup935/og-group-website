import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder hero/stock imagery (swap for real property photos later).
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
