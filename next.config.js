/** @type {import('next').NextConfig} */
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',

  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true
  }
})

module.exports = withPWA({
  // next.js config
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
        },
      ],
    },
})
// module.exports = nextConfig
