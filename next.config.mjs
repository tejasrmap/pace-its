/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pace.ac.in',
      },
      {
        protocol: 'http',
        hostname: 'pace.ac.in',
      }
    ],
  },
  // Strict type checking and linting enabled for production builds
};

export default nextConfig;
