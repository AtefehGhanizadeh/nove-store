'use client';

import type { ComponentProps } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import styled, { css } from 'styled-components';
import { ChevronIcon } from '@/assets/Icons';
import { Link } from '@/utils/i18n/navigation';
import { formatNumber } from '@/utils/formatNumber';
import { getPaginationItems } from '@/utils/pagination';

type Href = ComponentProps<typeof Link>['href'];

interface PaginationProps {
  page: number;
  totalPages: number;
  getHref: (page: number) => Href;
}

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const itemStyles = css`
  display: grid;
  place-items: center;
  min-width: ${({ theme }) => theme.layout.touchTarget};
  height: ${({ theme }) => theme.layout.touchTarget};
  padding-inline: ${({ theme }) => theme.space.xs};
  border: 1px solid var(--color-border);
  border-radius: ${({ theme }) => theme.radius.button};
  background: var(--color-surface);
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const PageLink = styled(Link)<{ $current?: boolean }>`
  ${itemStyles}
  transition: border-color ${({ theme }) => theme.transition};

  &:hover {
    border-color: var(--color-accent);
  }

  ${({ $current }) =>
    $current &&
    css`
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-bg);
    `}

  svg {
    width: 18px;
    height: 18px;
  }
`;

const DisabledItem = styled.span`
  ${itemStyles}
  opacity: 0.4;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Ellipsis = styled.span`
  padding-inline: ${({ theme }) => theme.space.xxs};
  color: var(--color-text-muted);
`;

const ForwardIcon = styled(ChevronIcon)`
  [dir='rtl'] & {
    transform: scaleX(-1);
  }
`;

const BackIcon = styled(ChevronIcon)`
  transform: scaleX(-1);

  [dir='rtl'] & {
    transform: none;
  }
`;

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
