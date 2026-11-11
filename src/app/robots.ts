import type { MetadataRoute } from 'next';
import { toAbsoluteUrl } from '@/utils/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/*/cart',
    },
    sitemap: toAbsoluteUrl('/sitemap.xml'),
  };
}
