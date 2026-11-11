'use client';

import { Suspense } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { Link, usePathname } from '@/utils/i18n/navigation';
import { routing } from '@/utils/i18n/routing';

const List = styled.ul`
  display: inline-flex;
  align-items: center;
  /* FA | EN keeps the same visual order in both directions. */
  direction: ltr;
`;

const Item = styled.li`
  display: flex;
  align-items: center;

  & + &::before {
    content: '|';
    color: var(--color-border);
  }
`;

const LocaleLink = styled(Link)<{ $active: boolean }>`
  display: grid;
  place-items: center;
  min-width: 36px;
  min-height: ${({ theme }) => theme.layout.touchTarget};
  color: ${({ $active }) => ($active ? 'var(--color-primary)' : 'var(--color-text-muted)')};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ $active, theme }) => ($active ? theme.fontWeight.extraBold : theme.fontWeight.medium)};

  &:hover {
    color: var(--color-accent);
  }
`;

function LocaleLinks({ query }: { query: Record<string, string> }) {
  const t = useTranslations('header');
  const currentLocale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t('language')}>
      <List>
        {routing.locales.map((locale) => (
          <Item key={locale}>
            <LocaleLink
              href={{ pathname, query }}
              locale={locale}
              lang={locale}
              hrefLang={locale}
              $active={locale === currentLocale}
              aria-current={locale === currentLocale ? 'true' : undefined}
              aria-label={t(`languageNames.${locale}`)}
            >
              {t(`languageShort.${locale}`)}
            </LocaleLink>
          </Item>
        ))}
      </List>
    </nav>
  );
}

function LocaleLinksWithQuery() {
  const searchParams = useSearchParams();
  return <LocaleLinks query={Object.fromEntries(searchParams)} />;
}

export default function LanguageSwitcher() {
  return (
    <Suspense fallback={<LocaleLinks query={{}} />}>
      <LocaleLinksWithQuery />
    </Suspense>
  );
}
