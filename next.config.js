/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
  experimental: {
    swcPlugins: [
      [
        'next-superjson-plugin',
        {
          excluded: [],
        },
      ],
    ],
  }
}

module.exports = nextConfig
