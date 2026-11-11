'use client';

import { MenuIcon } from '@/assets/Icons';
import MobileMenuDrawer from '@/modals/MobileMenuDrawer';
import Container from '@/shared/Container';
import IconButton from '@/shared/IconButton';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import CartLink from './CartLink';
import CategoriesMenu from './CategoriesMenu';
import {
  Actions,
  HeaderBar,
  Inner,
  LanguageArea,
  LogoArea,
  MenuArea,
  Nav,
  NavLink,
  NavList,
  SearchArea,
  SkipLink,
} from './Header.styles';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';
import SearchForm from './SearchForm';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  categories: string[];
}

export default function Header({ categories }: HeaderProps) {
  const t = useTranslations('header');
  const tCommon = useTranslations('common');
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <HeaderBar>
      <SkipLink href="#main-content">{tCommon('skipToContent')}</SkipLink>
      <Container>
        <Inner>
          <MenuArea>
            <IconButton
              onClick={() => setMenuOpen(true)}
              aria-label={t('openMenu')}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
            >
              <MenuIcon />
            </IconButton>
          </MenuArea>

          <LogoArea>
            <Logo />
          </LogoArea>

          <Nav aria-label={t('mainNav')}>
            <NavList>
              <li>
                <NavLink href="/">{t('home')}</NavLink>
              </li>
              <li>
                <NavLink href="/#products">{t('products')}</NavLink>
              </li>
              <li>
                <CategoriesMenu categories={categories} />
              </li>
            </NavList>
          </Nav>

          <SearchArea>
            <SearchForm />
          </SearchArea>

          <Actions>
            <LanguageArea>
              <LanguageSwitcher />
            </LanguageArea>
            <ThemeToggle />
            <CartLink />
          </Actions>
        </Inner>
      </Container>

      <MobileMenuDrawer open={menuOpen} onClose={closeMenu} categories={categories} />
    </HeaderBar>
  );
}
