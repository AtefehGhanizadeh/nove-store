'use client';

import styled from 'styled-components';
import { AlertIcon } from '@/assets/Icons';
import { Button } from '@/shared/Button';

interface ErrorStateProps {
  title: string;
  message: string;
  retryLabel: string;
  onRetry: () => void;
  isRetrying?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => `${theme.space.xxl} ${theme.space.md}`};
  border: 1px solid var(--color-border);
  border-radius: ${({ theme }) => theme.radius.card};
  background: var(--color-surface);
  text-align: center;

  > svg {
    width: 40px;
    height: 40px;
    color: var(--color-danger);
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: var(--color-primary);
`;

const Message = styled.p`
  max-width: 440px;
  color: var(--color-text-muted);
`;

export default function ErrorState({
  title,
  message,
  retryLabel,
  onRetry,
  isRetrying = false,
}: ErrorStateProps) {
  return (
    <Wrapper role="alert">
      <AlertIcon />
      <Title>{title}</Title>
      <Message>{message}</Message>
      <Button onClick={onRetry} disabled={isRetrying} $variant="secondary">
        {retryLabel}
      </Button>
    </Wrapper>
  );
}
