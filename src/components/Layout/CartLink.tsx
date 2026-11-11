'use client';

import { useLocale, useTranslations } from 'next-intl';
import styled from 'styled-components';
import { CartIcon } from '@/assets/Icons';
import { selectTotalCount, useCartStore } from '@/storage/cartStore';
import { useCartHydrated } from '@/storage/useCartHydrated';
import { formatNumber } from '@/utils/formatNumber';
import { Link } from '@/utils/i18n/navigation';

const StyledLink = styled(Link)`
  position: relative;
  display: grid;
  place-items: center;
  width: ${({ theme }) => theme.layout.touchTarget};
  height: ${({ theme }) => theme.layout.touchTarget};
  border-radius: ${({ theme }) => theme.radius.pill};
  color: var(--color-primary);
  transition: background-color ${({ theme }) => theme.transition};

  &:hover {
    background: var(--color-surface-muted);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const Badge = styled.span`
  position: absolute;
  inset-block-start: 2px;
  inset-inline-end: 0;
  min-width: 20px;
  height: 20px;
  padding-inline: 5px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: var(--color-accent);
  color: var(--color-on-accent);
  font-size: 0.7rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 20px;
  text-align: center;
`;

export default function CartLink() {
  const t = useTranslations('header');
  const locale = useLocale();
  const count = useCartStore(selectTotalCount);
  const hydrated = useCartHydrated();

  // Until the persisted cart is loaded, show no number so server and client HTML match.
  const showBadge = hydrated && count > 0;

  return (
    <StyledLink href="/cart" aria-label={hydrated ? t('cartWithCount', { count }) : t('cart')}>
      <CartIcon />
      {showBadge && <Badge aria-hidden="true">{formatNumber(count, locale)}</Badge>}
    </StyledLink>
  );
}
