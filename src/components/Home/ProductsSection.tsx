'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { BoxIcon } from '@/assets/Icons';
import { LinkButton } from '@/shared/Button';
import Container from '@/shared/Container';
import EmptyState from '@/shared/EmptyState';
import Pagination from '@/shared/Pagination';
import type { Product } from '@/types/product';
import type { PaginatedResult, ProductQuery } from '@/types/productQuery';
import { toSearchParams } from '@/utils/productQuery';
import ProductGrid from './ProductGrid';
import SortSelect from './SortSelect';

interface ProductsSectionProps {
  result: PaginatedResult<Product>;
  query: ProductQuery;
}

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
  margin-block-end: ${({ theme }) => theme.space.lg};
`;

const Heading = styled.h2`
  display: inline-block;
  padding-block-end: ${({ theme }) => theme.space.xs};
  border-block-end: 3px solid var(--color-accent);
  color: var(--color-primary);
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};
`;

const Summary = styled.p`
  display: flex;
  flex-wrap: wrap;
  column-gap: ${({ theme }) => theme.space.sm};
  margin-block-start: ${({ theme }) => theme.space.xs};
  color: var(--color-text-muted);
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const PaginationWrapper = styled.div`
  margin-block-start: ${({ theme }) => theme.space.xl};
`;

export default function ProductsSection({ result, query }: ProductsSectionProps) {
  const t = useTranslations('products');
  const tCommon = useTranslations('common');

  const getPageHref = (page: number) => ({
    pathname: '/' as const,
    query: toSearchParams({ ...query, page }),
    hash: 'products',
  });

  return (
    <section id="products" aria-labelledby="products-title">
      <Container>
        <Toolbar>
          <div>
            <Heading id="products-title">{t('title')}</Heading>
            <Summary aria-live="polite">
              {query.q && <span>{t('searchResultFor', { query: query.q })}</span>}
              <span>{t('resultCount', { count: result.totalItems })}</span>
            </Summary>
          </div>
          <SortSelect query={query} />
        </Toolbar>

        {result.totalItems === 0 ? (
          <EmptyState
            icon={<BoxIcon />}
            title={t('emptyTitle')}
            description={t('emptyDescription')}
            headingLevel="h3"
            action={
              <LinkButton href={{ pathname: '/' as const, hash: 'products' }} $variant="secondary">
                {tCommon('clearFilters')}
              </LinkButton>
            }
          />
        ) : (
          <>
            <ProductGrid products={result.items} />
            <PaginationWrapper>
              <Pagination page={result.page} totalPages={result.totalPages} getHref={getPageHref} />
            </PaginationWrapper>
          </>
        )}
      </Container>
    </section>
  );
}
