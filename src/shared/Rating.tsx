'use client';

import { useLocale } from 'next-intl';
import styled from 'styled-components';
import { StarIcon } from '@/assets/Icons';
import { formatNumber } from '@/utils/formatNumber';

interface RatingProps {
  rate: number;
  count: number;
  /** Full sentence for screen readers, e.g. "Rated 4.5 out of 5 from 120 reviews". */
  label: string;
}

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xxs};
  color: var(--color-text-muted);
  font-size: ${({ theme }) => theme.fontSize.xs};

  svg {
    color: var(--color-star);
  }
`;

const Rate = styled.span`
  color: var(--color-text);
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export default function Rating({ rate, count, label }: RatingProps) {
  const locale = useLocale();

  return (
    <Wrapper role="img" aria-label={label}>
      <StarIcon />
      <Rate>{formatNumber(rate, locale, { minimumFractionDigits: 1 })}</Rate>
      <span>({formatNumber(count, locale)})</span>
    </Wrapper>
  );
}
