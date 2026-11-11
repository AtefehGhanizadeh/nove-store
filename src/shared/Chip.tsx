'use client';

import type { ComponentProps, ReactNode } from 'react';
import styled from 'styled-components';
import { Link } from '@/utils/i18n/navigation';

interface ChipProps {
  href: ComponentProps<typeof Link>['href'];
  active?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

const ChipLink = styled(Link)<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  min-height: ${({ theme }) => theme.layout.touchTarget};
  padding-inline: ${({ theme }) => theme.space.md};
  border: 1px solid ${({ $active }) => ($active ? 'var(--color-accent)' : 'var(--color-border)')};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ $active }) => ($active ? 'var(--color-accent-soft)' : 'var(--color-surface)')};
  color: var(--color-text);
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  white-space: nowrap;
  transition: border-color ${({ theme }) => theme.transition};

  &:hover {
    border-color: var(--color-accent);
  }

  svg {
    color: ${({ $active }) => ($active ? 'var(--color-accent)' : 'var(--color-primary)')};
  }
`;

export default function Chip({ href, active = false, icon, children }: ChipProps) {
  return (
    <ChipLink
      href={href}
      $active={active}
      aria-current={active ? 'true' : undefined}
      scroll={false}
    >
      {icon}
      {children}
    </ChipLink>
  );
}
