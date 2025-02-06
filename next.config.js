const { withExpo } = require('@expo/next-adapter');
const withTM = require('next-transpile-modules')([]);
const withImages = require('next-images');

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.cache = false;
    config.optimization.moduleIds = 'deterministic';
    config.module.rules.push({
      test: /\.(ttf|woff|woff2|eot|otf)$/,
      use: ['file-loader'],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'restapi.motorsgate.sa',
      },
    ],
    disableStaticImages: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
    localeDetection: false,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://restapi.motorsgate.sa/wp-json/:path*', // Proxy to your API
      },
    ];
  },
  ...withExpo(),
  ...withTM(),
  ...withImages(),
};