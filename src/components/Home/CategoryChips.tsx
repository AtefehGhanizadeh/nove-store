'use client';

import { GridIcon } from '@/assets/Icons';
import Chip from '@/shared/Chip';
import Container from '@/shared/Container';
import type { ProductQuery } from '@/types/productQuery';
import { useCategoryLabel } from '@/utils/i18n/useCategoryLabel';
import { toSearchParams } from '@/utils/productQuery';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import CategoryIcon from './CategoryIcon';

interface CategoryChipsProps {
  categories: string[];
  query: ProductQuery;
}

const Nav = styled.nav`
  padding-block: ${({ theme }) => theme.space.lg};
`;

const List = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
  overflow-x: auto;
  padding-block: ${({ theme }) => theme.space.xxs};
  scrollbar-width: thin;

  ${({ theme }) => theme.media.md} {
    flex-wrap: wrap;
    justify-content: center;
    overflow-x: visible;
  }
`;

export default function CategoryChips({ categories, query }: CategoryChipsProps) {
  const t = useTranslations('categories');
  const getCategoryLabel = useCategoryLabel();

  const hrefFor = (category?: string) => ({
    pathname: '/' as const,
    query: toSearchParams({ ...query, category, page: 1 }),
  });

  return (
    <Container>
      <Nav aria-label={t('label')}>
        <List>
          <li>
            <Chip href={hrefFor(undefined)} active={!query.category} icon={<GridIcon />}>
              {t('all')}
            </Chip>
          </li>

          {categories.map((category) => (
            <li key={category}>
              <Chip
                href={hrefFor(category)}
                active={query.category === category}
                icon={<CategoryIcon category={category} />}
              >
                {getCategoryLabel(category)}
              </Chip>
            </li>
          ))}
        </List>
      </Nav>
    </Container>
  );
}
