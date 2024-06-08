/** @type {import('next').NextConfig} */
import nextTranslate from 'next-translate';

const nextConfig = nextTranslate({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        port: '',
        pathname: '/img/w/**',
      },
    ],
  },
  i18n: {
    locales: ['en', 'sw'],
    defaultLocale: 'en',
  },
});

export default nextConfig;
