import { defineRouting } from 'next-intl/routing';
import { Locale } from '@/types/enums/Locale';

export const routing = defineRouting({
  locales: [Locale.Fa, Locale.En],
  defaultLocale: Locale.Fa,
  localePrefix: 'always',
});

const RTL_LOCALES: ReadonlySet<Locale> = new Set([Locale.Fa]);

export function getDirection(locale: Locale): 'rtl' | 'ltr' {
  return RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';
}

/** Open Graph locale codes per app locale. */
export const OPEN_GRAPH_LOCALES: Record<Locale, string> = {
  [Locale.Fa]: 'fa_IR',
  [Locale.En]: 'en_US',
};
