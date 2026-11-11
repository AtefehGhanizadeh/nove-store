'use client';

import { useCallback, useId, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { TrashIcon } from '@/assets/Icons';
import ConfirmClearCartModal from '@/modals/ConfirmClearCartModal';
import { Button } from '@/shared/Button';
import Price from '@/shared/Price';
import { selectTotalCount, selectTotalPrice, useCartStore } from '@/storage/cartStore';
import { formatNumber } from '@/utils/formatNumber';
import { Card, Title, Line, TotalLabel, Note } from './CartSummary.styles';

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
