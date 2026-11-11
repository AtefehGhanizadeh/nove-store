import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { OPEN_GRAPH_LOCALES, getDirection, routing } from '@/utils/i18n/routing';
import StyledComponentsRegistry from '@/utils/StyledComponentsRegistry';
import { THEME_INIT_SCRIPT } from '@/utils/themeInitScript';
import { ThemeProvider } from '@/context/ThemeContext';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations('metadata');

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
    title: { default: t('homeTitle'), template: `%s | ${t('siteName')}` },
    description: t('homeDescription'),
    applicationName: t('siteName'),
    openGraph: {
      siteName: t('siteName'),
      locale: OPEN_GRAPH_LOCALES[locale],
      type: 'website',
    },
  };
}

export default async function LocaleLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getDirection(locale)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
