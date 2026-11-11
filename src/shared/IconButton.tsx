'use client';

import type { ButtonHTMLAttributes, Ref } from 'react';
import styled from 'styled-components';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon-only buttons need an accessible name. */
  'aria-label': string;
  ref?: Ref<HTMLButtonElement>;
}

const StyledIconButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ theme }) => theme.layout.touchTarget};
  height: ${({ theme }) => theme.layout.touchTarget};
  padding: 0;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: transparent;
  color: var(--color-text);
  transition: background-color ${({ theme }) => theme.transition};

  &:hover:not(:disabled) {
    background: var(--color-surface-muted);
  }

  &:disabled {
    opacity: 0.4;
  }
`;

export default function IconButton({ type = 'button', ...props }: IconButtonProps) {
  return <StyledIconButton type={type} {...props} />;
}
