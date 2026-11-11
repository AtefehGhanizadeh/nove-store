'use client';

import { useLocale } from 'next-intl';
import styled from 'styled-components';
import { formatPrice } from '@/utils/formatPrice';

type PriceSize = 'sm' | 'md' | 'lg';

interface PriceProps {
  value: number;
  size?: PriceSize;
}

const StyledPrice = styled.span<{ $size: PriceSize }>`
  color: var(--color-primary);
  font-size: ${({ theme, $size }) => theme.fontSize[$size]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  white-space: nowrap;
  /* Keeps the currency symbol and digits in order inside RTL text. */
  unicode-bidi: isolate;
`;

export default function Price({ value, size = 'md' }: PriceProps) {
  const locale = useLocale();
  return <StyledPrice $size={size}>{formatPrice(value, locale)}</StyledPrice>;
}
