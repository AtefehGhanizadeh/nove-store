'use client';

import styled, { css } from 'styled-components';
import { Link } from '@/utils/i18n/navigation';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonStyleProps {
  $variant?: ButtonVariant;
  $fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background: var(--color-accent);
    color: var(--color-on-accent);

    &:hover:not(:disabled) {
      background: var(--color-accent-hover);
    }
  `,
  secondary: css`
    background: var(--color-surface);
    color: var(--color-text);
    border-color: var(--color-border);

    &:hover:not(:disabled) {
      border-color: var(--color-text-muted);
    }
  `,
  ghost: css`
    background: transparent;
    color: var(--color-text);

    &:hover:not(:disabled) {
      background: var(--color-surface-muted);
    }
  `,
  danger: css`
    background: transparent;
    color: var(--color-danger);
    border-color: var(--color-border);

    &:hover:not(:disabled) {
      border-color: var(--color-danger);
    }
  `,
};

const buttonStyles = css<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xs};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  min-height: ${({ theme }) => theme.layout.touchTarget};
  padding-inline: ${({ theme }) => theme.space.lg};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.button};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 1.2;
  text-align: center;
  transition:
    background-color ${({ theme }) => theme.transition},
    border-color ${({ theme }) => theme.transition},
    color ${({ theme }) => theme.transition};

  ${({ $variant = 'primary' }) => variantStyles[$variant]}

  &:disabled {
    opacity: 0.55;
  }
`;

export const Button = styled.button.attrs(({ type = 'button' }) => ({ type }))<ButtonStyleProps>`
  ${buttonStyles}
`;

export const LinkButton = styled(Link)<ButtonStyleProps>`
  ${buttonStyles}
`;

export const AnchorButton = styled.a<ButtonStyleProps>`
  ${buttonStyles}
`;
