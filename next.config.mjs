/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'capable-husky-926.convex.cloud'
      }
    ]
  }
};

export default nextConfig;
