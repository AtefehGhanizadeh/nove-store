import styled from 'styled-components';
import { Link } from '@/utils/i18n/navigation';

export const FooterBar = styled.footer`
  margin-block-start: ${({ theme }) => theme.space.xxl};
  padding-block: ${({ theme }) => `${theme.space.xl} ${theme.space.md}`};
  background: var(--color-footer-bg);
  color: var(--color-footer-text);

  :focus-visible {
    outline-color: #93c5fd;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space.lg};

  ${({ theme }) => theme.media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
`;

export const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.xxs};
`;

export const Tagline = styled.p`
  color: var(--color-footer-muted);
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;

export const ColumnTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxs};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const PlainItem = styled.li`
  color: var(--color-footer-muted);
`;

export const FooterLink = styled(Link)`
  color: var(--color-footer-muted);

  &:hover {
    color: var(--color-footer-text);
  }
`;

export const SocialList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.xs};
`;

export const SocialLink = styled.a`
  display: grid;
  place-items: center;
  width: ${({ theme }) => theme.layout.touchTarget};
  height: ${({ theme }) => theme.layout.touchTarget};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-footer-text);
  transition: background-color ${({ theme }) => theme.transition};

  &:hover {
    background: var(--color-accent);
    color: var(--color-on-accent);
  }
`;

export const Bottom = styled.p`
  margin-block-start: ${({ theme }) => theme.space.xl};
  padding-block-start: ${({ theme }) => theme.space.md};
  border-block-start: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--color-footer-muted);
  font-size: ${({ theme }) => theme.fontSize.xs};
`;
