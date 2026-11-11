import styled from 'styled-components';
import { Link } from '@/utils/i18n/navigation';

export const HeaderBar = styled.header`
  position: sticky;
  inset-block-start: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  background: var(--color-surface);
  border-block-end: 1px solid var(--color-border);
`;

export const SkipLink = styled.a`
  position: absolute;
  inset-inline-start: ${({ theme }) => theme.space.md};
  inset-block-start: -100px;
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.md}`};
  border-radius: ${({ theme }) => theme.radius.button};
  background: var(--color-primary);
  color: var(--color-bg);

  &:focus {
    inset-block-start: ${({ theme }) => theme.space.xs};
  }
`;

export const Inner = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas:
    'menu logo actions'
    'search search search';
  align-items: center;
  column-gap: ${({ theme }) => theme.space.xs};
  row-gap: ${({ theme }) => theme.space.xs};
  padding-block: ${({ theme }) => theme.space.xs};

  ${({ theme }) => theme.media.md} {
    grid-template-columns: auto auto minmax(0, 1fr) auto;
    grid-template-areas: 'menu logo search actions';
    column-gap: ${({ theme }) => theme.space.md};
    min-height: ${({ theme }) => theme.layout.headerHeight};
  }

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: auto auto minmax(0, 1fr) auto;
    grid-template-areas: 'logo nav search actions';
    column-gap: ${({ theme }) => theme.space.lg};
  }
`;

export const MenuArea = styled.div`
  grid-area: menu;

  ${({ theme }) => theme.media.lg} {
    display: none;
  }
`;

export const LogoArea = styled.div`
  grid-area: logo;
  min-width: 0;
`;

export const Nav = styled.nav`
  grid-area: nav;
  display: none;

  ${({ theme }) => theme.media.lg} {
    display: block;
  }
`;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

export const NavLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: ${({ theme }) => theme.layout.touchTarget};
  padding-inline: ${({ theme }) => theme.space.xs};
  color: var(--color-primary);
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  &:hover {
    color: var(--color-accent);
  }
`;

export const SearchArea = styled.div`
  grid-area: search;
  min-width: 0;

  ${({ theme }) => theme.media.lg} {
    max-width: 420px;
    justify-self: center;
    width: 100%;
  }
`;

export const Actions = styled.div`
  grid-area: actions;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xxs};
`;

export const LanguageArea = styled.div`
  display: none;

  ${({ theme }) => theme.media.md} {
    display: block;
    padding-inline-end: ${({ theme }) => theme.space.xs};
    border-inline-end: 1px solid var(--color-border);
  }
`;
