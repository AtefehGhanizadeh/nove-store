import styled from 'styled-components';
import { Link } from '@/utils/i18n/navigation';

export const Wrapper = styled.div`
  position: relative;
`;

export const Trigger = styled.button.attrs({ type: 'button' })<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xxs};
  min-height: ${({ theme }) => theme.layout.touchTarget};
  padding-inline: ${({ theme }) => theme.space.xs};
  border: 0;
  background: transparent;
  color: var(--color-primary);
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  &:hover {
    color: var(--color-accent);
  }

  svg {
    width: 16px;
    height: 16px;
    transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
    transition: transform ${({ theme }) => theme.transition};
  }
`;

export const Menu = styled.ul`
  position: absolute;
  inset-block-start: calc(100% + 4px);
  inset-inline-start: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  min-width: 200px;
  padding: ${({ theme }) => theme.space.xs};
  border: 1px solid var(--color-border);
  border-radius: ${({ theme }) => theme.radius.card};
  background: var(--color-surface);
  box-shadow: ${({ theme }) => theme.shadow.raised};
`;

export const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  min-height: ${({ theme }) => theme.layout.touchTarget};
  padding-inline: ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.fontSize.sm};

  &:hover {
    background: var(--color-surface-muted);
  }
`;
