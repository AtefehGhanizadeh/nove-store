'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { CartIcon } from '@/assets/Icons';
import { LinkButton } from '@/shared/Button';
import Container from '@/shared/Container';
import EmptyState from '@/shared/EmptyState';
import Skeleton from '@/shared/Skeleton';
import { selectItems, useCartStore } from '@/storage/cartStore';
import { useCartHydrated } from '@/storage/useCartHydrated';
import CartItemRow from './CartItemRow';
import CartSummary from './CartSummary';

const Page = styled.div`
  padding-block: ${({ theme }) => theme.space.lg};
`;

const Heading = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  margin-block-end: ${({ theme }) => theme.space.lg};
  color: var(--color-primary);
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};

  svg {
    width: 28px;
    height: 28px;
  }
`;

const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: minmax(0, 1fr) 340px;
    align-items: start;
  }
`;

const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;

const LoadingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;

function CartSkeleton() {
  const t = useTranslations('common');

  return (
    <LoadingList aria-busy="true">
      <span className="visually-hidden" role="status">
        {t('loading')}
      </span>
      <Skeleton $height="112px" $radius="12px" />
      <Skeleton $height="112px" $radius="12px" />
    </LoadingList>
  );
}

export default function CartView() {
  const t = useTranslations('cart');
  const tCommon = useTranslations('common');
  const items = useCartStore(selectItems);
  // The server cannot see localStorage, so the cart renders only after rehydration.
  const hydrated = useCartHydrated();

  function renderContent() {
    if (!hydrated) return <CartSkeleton />;

    if (items.length === 0) {
      return (
        <EmptyState
          icon={<CartIcon />}
          title={t('emptyTitle')}
          description={t('emptyDescription')}
          action={<LinkButton href="/">{tCommon('backToStore')}</LinkButton>}
        />
      );
    }

    return (
      <Layout>
        <ItemList aria-label={t('itemsLabel')}>
          {items.map((item) => (
            <li key={item.product.id}>
              <CartItemRow item={item} />
            </li>
          ))}
        </ItemList>
        <CartSummary />
      </Layout>
    );
  }

  return (
    <Container>
      <Page>
        <Heading>
          <CartIcon />
          {t('title')}
        </Heading>
        {renderContent()}
      </Page>
    </Container>
  );
}
