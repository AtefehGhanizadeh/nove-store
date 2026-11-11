'use client';

import { useLocale } from 'next-intl';
import styled from 'styled-components';
import { MinusIcon, PlusIcon } from '@/assets/Icons';
import { formatNumber } from '@/utils/formatNumber';

interface QuantityStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  increaseLabel: string;
  decreaseLabel: string;
  groupLabel: string;
}

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: ${({ theme }) => theme.radius.button};
  background: var(--color-surface);
`;

const StepButton = styled.button.attrs({ type: 'button' })`
  display: grid;
  place-items: center;
  width: ${({ theme }) => theme.layout.touchTarget};
  height: ${({ theme }) => theme.layout.touchTarget};
  border: 0;
  border-radius: ${({ theme }) => theme.radius.button};
  background: transparent;
  color: var(--color-text);

  &:hover:not(:disabled) {
    background: var(--color-surface-muted);
  }

  &:disabled {
    opacity: 0.35;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Value = styled.output`
  min-width: 2.5ch;
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export default function QuantityStepper({
  value,
  onIncrement,
  onDecrement,
  min = 1,
  increaseLabel,
  decreaseLabel,
  groupLabel,
}: QuantityStepperProps) {
  const locale = useLocale();

  return (
    <Wrapper role="group" aria-label={groupLabel}>
      <StepButton onClick={onDecrement} disabled={value <= min} aria-label={decreaseLabel}>
        <MinusIcon />
      </StepButton>
      <Value aria-live="polite">{formatNumber(value, locale)}</Value>
      <StepButton onClick={onIncrement} aria-label={increaseLabel}>
        <PlusIcon />
      </StepButton>
    </Wrapper>
  );
}
