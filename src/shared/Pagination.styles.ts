import styled, { css } from 'styled-components';
import { ChevronIcon } from '@/assets/Icons';
import { Link } from '@/utils/i18n/navigation';

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const itemStyles = css`
  display: grid;
  place-items: center;
  min-width: ${({ theme }) => theme.layout.touchTarget};
  height: ${({ theme }) => theme.layout.touchTarget};
  padding-inline: ${({ theme }) => theme.space.xs};
  border: 1px solid var(--color-border);
  border-radius: ${({ theme }) => theme.radius.button};
  background: var(--color-surface);
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const PageLink = styled(Link)<{ $current?: boolean }>`
  ${itemStyles}
  transition: border-color ${({ theme }) => theme.transition};

  &:hover {
    border-color: var(--color-accent);
  }

  ${({ $current }) =>
    $current &&
    css`
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-bg);
    `}

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const DisabledItem = styled.span`
  ${itemStyles}
  opacity: 0.4;

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const Ellipsis = styled.span`
  padding-inline: ${({ theme }) => theme.space.xxs};
  color: var(--color-text-muted);
`;

export const ForwardIcon = styled(ChevronIcon)`
  [dir='rtl'] & {
    transform: scaleX(-1);
  }
`;

export const BackIcon = styled(ChevronIcon)`
  transform: scaleX(-1);

  [dir='rtl'] & {
    transform: none;
  }
`;
