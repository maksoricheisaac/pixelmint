import type { NextConfig } from "next"
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "itvhvwb8tqj0b3dz.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(new PrismaPlugin())
    }
    return config
  },
}

export default nextConfig
