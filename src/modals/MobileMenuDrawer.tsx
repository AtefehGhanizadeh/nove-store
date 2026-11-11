'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import LanguageSwitcher from '@/components/Layout/LanguageSwitcher';
import ThemeToggle from '@/components/Layout/ThemeToggle';
import Modal from '@/shared/Modal';
import { useCategoryLabel } from '@/utils/i18n/useCategoryLabel';
import { Link } from '@/utils/i18n/navigation';
import { toSearchParams } from '@/utils/productQuery';

interface MobileMenuDrawerProps {
  open: boolean;
  onClose: () => void;
  categories: string[];
}

const Section = styled.div`
  & + & {
    margin-block-start: ${({ theme }) => theme.space.lg};
    padding-block-start: ${({ theme }) => theme.space.md};
    border-block-start: 1px solid var(--color-border);
  }
`;

const SectionTitle = styled.h3`
  margin-block-end: ${({ theme }) => theme.space.xs};
  color: var(--color-text-muted);
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const DrawerLink = styled(Link)`
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

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.sm};
`;

export default function MobileMenuDrawer({ open, onClose, categories }: MobileMenuDrawerProps) {
  const t = useTranslations('header');
  const getCategoryLabel = useCategoryLabel();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('menuTitle')}
      closeLabel={t('closeMenu')}
      variant="drawer"
    >
      <nav aria-label={t('mainNav')}>
        <Section>
          <ul>
            <li>
              <DrawerLink href="/" onClick={onClose}>
                {t('home')}
              </DrawerLink>
            </li>
            <li>
              <DrawerLink href={{ pathname: '/', hash: 'products' }} onClick={onClose}>
                {t('products')}
              </DrawerLink>
            </li>
          </ul>
        </Section>

        {categories.length > 0 && (
          <Section>
            <SectionTitle>{t('categories')}</SectionTitle>
            <ul>
              {categories.map((category) => (
                <li key={category}>
                  <DrawerLink
                    href={{
                      pathname: '/',
                      query: toSearchParams({ category }),
                      hash: 'products',
                    }}
                    onClick={onClose}
                  >
                    {getCategoryLabel(category)}
                  </DrawerLink>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </nav>

      <Section>
        <Row>
          <SectionTitle as="span">{t('language')}</SectionTitle>
          <LanguageSwitcher />
        </Row>
        <Row>
          <SectionTitle as="span">{t('theme')}</SectionTitle>
          <ThemeToggle />
        </Row>
      </Section>
    </Modal>
  );
}
