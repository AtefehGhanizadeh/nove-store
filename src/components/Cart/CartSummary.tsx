'use client';

import { useCallback, useId, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import styled from 'styled-components';
import { TrashIcon } from '@/assets/Icons';
import ConfirmClearCartModal from '@/modals/ConfirmClearCartModal';
import { Button } from '@/shared/Button';
import Price from '@/shared/Price';
import { selectTotalCount, selectTotalPrice, useCartStore } from '@/storage/cartStore';
import { formatNumber } from '@/utils/formatNumber';

const Card = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space.lg};
  border: 1px solid var(--color-border);
  border-radius: ${({ theme }) => theme.radius.card};
  background: var(--color-surface);
  box-shadow: ${({ theme }) => theme.shadow.card};

  ${({ theme }) => theme.media.lg} {
    position: sticky;
    inset-block-start: calc(
      ${({ theme }) => theme.layout.headerHeight} + ${({ theme }) => theme.space.lg}
    );
  }
`;

const Title = styled.h2`
  color: var(--color-primary);
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

const Line = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.sm};
  color: var(--color-text-muted);

  & + & {
    padding-block-start: ${({ theme }) => theme.space.md};
    border-block-start: 1px solid var(--color-border);
  }
`;

const TotalLabel = styled.span`
  color: var(--color-text);
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Note = styled.p`
  color: var(--color-text-muted);
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-align: center;
`;

export default function CartSummary() {
  const t = useTranslations('cart');
  const locale = useLocale();
  const totalCount = useCartStore(selectTotalCount);
  const totalPrice = useCartStore(selectTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const noteId = useId();
  const titleId = useId();

  const closeConfirm = useCallback(() => setConfirmOpen(false), []);

  function handleConfirmClear() {
    clearCart();
    setConfirmOpen(false);
  }

  return (
    <Card aria-labelledby={titleId}>
      <Title id={titleId}>{t('summaryTitle')}</Title>
      <dl>
        <Line>
          <dt>{t('totalItems')}</dt>
          <dd>{formatNumber(totalCount, locale)}</dd>
        </Line>
        <Line>
          <TotalLabel as="dt">{t('totalPrice')}</TotalLabel>
          <dd>
            <Price value={totalPrice} size="lg" />
          </dd>
        </Line>
      </dl>

      <Button $fullWidth disabled aria-describedby={noteId}>
        {t('checkout')}
      </Button>
      <Note id={noteId}>{t('checkoutUnavailable')}</Note>

      <Button $fullWidth $variant="danger" onClick={() => setConfirmOpen(true)}>
        <TrashIcon />
        {t('clearCart')}
      </Button>

      <ConfirmClearCartModal
        open={confirmOpen}
        onClose={closeConfirm}
        onConfirm={handleConfirmClear}
      />
    </Card>
  );
}
