import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import * as rootParams from 'next/root-params';
import { routing } from '@/utils/i18n/routing';

export default getRequestConfig(async ({ locale: explicitLocale }) => {
  const requested = explicitLocale ?? (await rootParams.locale());

  if (!hasLocale(routing.locales, requested)) {
    notFound();
  }

  return {
    locale: requested,
    messages: (await import(`./dictionary/${requested}.json`)).default,
  };
});
