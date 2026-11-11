import styled from 'styled-components';
import { Link } from '@/utils/i18n/navigation';

export const Section = styled.div`
  /* The settings section sits outside <nav>, so siblings alone cannot be used here. */
  &:not(:first-child) {
    margin-block-start: ${({ theme }) => theme.space.lg};
    padding-block-start: ${({ theme }) => theme.space.md};
    border-block-start: 1px solid var(--color-border);
  }
`;

export const SectionTitle = styled.h3`
  margin-block-end: ${({ theme }) => theme.space.xs};
  color: var(--color-text-muted);
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const DrawerLink = styled(Link)`
  display: flex;
  align-items: center;
  min-height: ${({ theme }) => theme.layout.touchTarget};
  padding-inline: ${({ theme }) => theme.space.xs};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  &:hover {
    background: var(--color-surface-muted);
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.sm};
  min-height: ${({ theme }) => theme.layout.touchTarget};
  padding-inline: ${({ theme }) => theme.space.xs};

  ${SectionTitle} {
    margin: 0;
    color: var(--color-text);
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;
