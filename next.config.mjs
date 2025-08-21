/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { 
    serverActions: { allowedOrigins: ['*'] },
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: false },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
};

export default nextConfig;

