/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    appDir: true,
    fontLoaders: [
      {
        loader: '@next/font/google',
        options: { subsets: ['latin'] }
      },
    ],
  },
  headers: () => (
    [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  )

}

module.exports = nextConfig
