import styled, { css } from 'styled-components';

export type ModalVariant = 'dialog' | 'drawer';

export const Backdrop = styled.div<{ $variant: ModalVariant }>`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  display: flex;
  background: var(--color-overlay);

  ${({ $variant }) =>
    $variant === 'dialog'
      ? css`
          align-items: center;
          justify-content: center;
          padding: ${({ theme }) => theme.space.md};
        `
      : css`
          justify-content: flex-start;
        `}
`;

export const Panel = styled.div<{ $variant: ModalVariant }>`
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: ${({ theme }) => theme.shadow.raised};

  &:focus {
    outline: none;
  }

  ${({ $variant, theme }) =>
    $variant === 'dialog'
      ? css`
          width: 100%;
          max-width: 440px;
          border-radius: ${theme.radius.lg};
        `
      : css`
          width: min(320px, 85vw);
          height: 100%;
          overflow-y: auto;
        `}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border-block-end: 1px solid var(--color-border);
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: var(--color-primary);
`;

export const Body = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.space.md};
`;

export const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space.xs};
  padding: ${({ theme }) => `0 ${theme.space.md} ${theme.space.md}`};
`;
