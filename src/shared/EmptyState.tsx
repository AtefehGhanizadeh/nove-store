'use client';

import type { ReactNode } from 'react';
import styled from 'styled-components';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  headingLevel?: 'h1' | 'h2' | 'h3';
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => `${theme.space.xxl} ${theme.space.md}`};
  border: 1px dashed var(--color-border);
  border-radius: ${({ theme }) => theme.radius.card};
  background: var(--color-surface);
  text-align: center;
`;

const IconCircle = styled.span`
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  margin-block-end: ${({ theme }) => theme.space.xs};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: var(--color-accent-soft);
  color: var(--color-accent);

  svg {
    width: 30px;
    height: 30px;
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: var(--color-primary);
`;

const Description = styled.p`
  max-width: 420px;
  color: var(--color-text-muted);
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const Actions = styled.div`
  margin-block-start: ${({ theme }) => theme.space.sm};
`;

export default function EmptyState({
  icon,
  title,
  description,
  action,
  headingLevel = 'h2',
}: EmptyStateProps) {
  return (
    <Wrapper>
      <IconCircle>{icon}</IconCircle>
      <Title as={headingLevel}>{title}</Title>
      {description && <Description>{description}</Description>}
      {action && <Actions>{action}</Actions>}
    </Wrapper>
  );
}
