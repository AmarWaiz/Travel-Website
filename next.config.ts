import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/trips",
        destination: "/tours",
        permanent: true,
      },
      {
        source: "/trips/:slug",
        destination: "/tours/:slug",
        permanent: true,
      },
      {
        source: "/journal",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/journal/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },
  images: {
    // Responsive srcsets are built directly against images.unsplash.com
    // by src/lib/image-loader.ts (no optimizer upstream fetch).
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
