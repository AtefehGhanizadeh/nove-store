'use client';

import type { ReactNode } from 'react';
import { Wrapper, IconCircle, Title, Description, Actions } from './EmptyState.styles';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  headingLevel?: 'h1' | 'h2' | 'h3';
}

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
