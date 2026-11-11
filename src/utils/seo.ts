import type { Metadata } from 'next';
import type { Locale } from '@/types/enums/Locale';
import { getPathname } from '@/utils/i18n/navigation';
import { OPEN_GRAPH_LOCALES, routing } from '@/utils/i18n/routing';

type AppPath = '/' | '/cart';

/** Localized path for every locale, e.g. { fa: '/fa/cart', en: '/en/cart' }. */
export function getLanguageAlternates(path: AppPath): Record<string, string> {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, getPathname({ locale, href: path })]),
  );
}

export function toAbsoluteUrl(pathname: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return new URL(pathname, siteUrl).toString();
}

interface PageMetadataInput {
  locale: Locale;
  path: AppPath;
  title: string;
  description: string;
  siteName: string;
  /** Home uses its title as-is instead of the "%s | NOVA" template. */
  absoluteTitle?: boolean;
}

/** Title, description, canonical, hreflang alternates and Open Graph for one localized page. */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  siteName,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const canonical = getPathname({ locale, href: path });

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: {
        ...getLanguageAlternates(path),
        'x-default': getPathname({ locale: routing.defaultLocale, href: path }),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      locale: OPEN_GRAPH_LOCALES[locale],
      alternateLocale: routing.locales
        .filter((other) => other !== locale)
        .map((other) => OPEN_GRAPH_LOCALES[other]),
      type: 'website',
    },
  };
}
