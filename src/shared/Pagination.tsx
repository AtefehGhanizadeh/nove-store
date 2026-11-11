'use client';

import type { ComponentProps } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { Link } from '@/utils/i18n/navigation';
import { formatNumber } from '@/utils/formatNumber';
import { getPaginationItems } from '@/utils/pagination';
import { List, PageLink, DisabledItem, Ellipsis, ForwardIcon, BackIcon } from './Pagination.styles';

type Href = ComponentProps<typeof Link>['href'];

interface PaginationProps {
  page: number;
  totalPages: number;
  getHref: (page: number) => Href;
}

export default function Pagination({ page, totalPages, getHref }: PaginationProps) {
  const t = useTranslations('pagination');
  const locale = useLocale();

  if (totalPages <= 1) return null;

  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav aria-label={t('label')}>
      <List>
        <li>
          {hasPrevious ? (
            <PageLink href={getHref(page - 1)} aria-label={t('previous')}>
              <BackIcon />
            </PageLink>
          ) : (
            <DisabledItem aria-hidden="true">
              <BackIcon />
            </DisabledItem>
          )}
        </li>

        {getPaginationItems(page, totalPages).map((item, index) =>
          item === 'ellipsis' ? (
            <li key={`ellipsis-${index}`} aria-hidden="true">
              <Ellipsis>…</Ellipsis>
            </li>
          ) : (
            <li key={item}>
              <PageLink
                href={getHref(item)}
                $current={item === page}
                aria-current={item === page ? 'page' : undefined}
                aria-label={t('page', { page: formatNumber(item, locale) })}
              >
                {formatNumber(item, locale)}
              </PageLink>
            </li>
          ),
        )}

        <li>
          {hasNext ? (
            <PageLink href={getHref(page + 1)} aria-label={t('next')}>
              <ForwardIcon />
            </PageLink>
          ) : (
            <DisabledItem aria-hidden="true">
              <ForwardIcon />
            </DisabledItem>
          )}
        </li>
      </List>
    </nav>
  );
}
