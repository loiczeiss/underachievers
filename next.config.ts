import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

    productionBrowserSourceMaps: true, // Enable for production debugging
    /* Add other config options here */
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
      ],
    },
  
};

export default nextConfig;
