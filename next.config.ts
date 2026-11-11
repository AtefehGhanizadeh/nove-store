import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'fakestoreapi.com', pathname: '/img/**' }],
  },
};

export default withNextIntl(nextConfig);
