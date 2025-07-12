import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    sassOptions: {
        additionalData: `$var: red;`,
    },


    productionBrowserSourceMaps: true, // Enable for production debugging
    /* Add other config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: "https",
                hostname: 'images.unsplash.com',
            }
        ],

    }, eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },

};

export default nextConfig;
