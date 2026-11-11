'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import Container from '@/shared/Container';
import Skeleton from '@/shared/Skeleton';
import { PRODUCTS_PER_PAGE } from '@/utils/productQuery';
import { Body, Card, Footer } from './ProductCard.styles';
import { GridList } from './ProductGrid';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  padding-block: ${({ theme }) => theme.space.md};
`;

const SKELETON_CARDS = Array.from({ length: PRODUCTS_PER_PAGE }, (_, index) => index);

export default function HomeSkeleton() {
  const t = useTranslations('common');

  return (
    <Container>
      <Wrapper aria-busy="true">
        <span className="visually-hidden" role="status">
          {t('loading')}
        </span>
        <Skeleton $height="260px" $radius="20px" />
        <Skeleton $width="180px" $height="32px" />
        <GridList>
          {SKELETON_CARDS.map((index) => (
            <li key={index}>
              <Card aria-hidden="true">
                <Skeleton $height="220px" $radius="0" />
                <Body>
                  <Skeleton $width="35%" $height="20px" />
                  <Skeleton $height="18px" />
                  <Skeleton $width="60%" $height="18px" />
                  <Footer>
                    <Skeleton $width="40%" $height="24px" />
                    <Skeleton $height="44px" />
                  </Footer>
                </Body>
              </Card>
            </li>
          ))}
        </GridList>
      </Wrapper>
    </Container>
  );
}
