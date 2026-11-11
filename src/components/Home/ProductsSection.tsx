'use client';

import { useTranslations } from 'next-intl';
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
import { Toolbar, Heading, Summary, PaginationWrapper } from './ProductsSection.styles';

interface ProductsSectionProps {
  result: PaginatedResult<Product>;
  query: ProductQuery;
}

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
