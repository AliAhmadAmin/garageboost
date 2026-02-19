import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // Image Optimization
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Limit to trusted image sources
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Compression & Minification
  compress: true,
  poweredByHeader: false,

  // Headers for performance
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
      // Cache static assets for 1 year
      {
        source: "/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects for old URLs (if any)
  async redirects() {
    return [];
  },

  // Rewrites for API routes
  async rewrites() {
    return {
      beforeFiles: [],
    };
  },

  // Experimental optimizations
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
