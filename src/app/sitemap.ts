import type { MetadataRoute } from 'next';
import { getPathname } from '@/utils/i18n/navigation';
import { routing } from '@/utils/i18n/routing';
import { getLanguageAlternates, toAbsoluteUrl } from '@/utils/seo';

const INDEXABLE_PATHS = ['/'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_PATHS.flatMap((path) => {
    const languages = Object.fromEntries(
      Object.entries(getLanguageAlternates(path)).map(([locale, href]) => [
        locale,
        toAbsoluteUrl(href),
      ]),
    );

    return routing.locales.map((locale) => ({
      url: toAbsoluteUrl(getPathname({ locale, href: path })),
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
      alternates: { languages },
    }));
  });
}
