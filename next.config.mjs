/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['lucide-react'],
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
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  // Strict type checking and linting enabled for production builds
};

export default nextConfig;
