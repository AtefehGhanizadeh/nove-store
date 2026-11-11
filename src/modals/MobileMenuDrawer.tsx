'use client';

import LanguageSwitcher from '@/components/Layout/LanguageSwitcher';
import Modal from '@/shared/Modal';
import { useCategoryLabel } from '@/utils/i18n/useCategoryLabel';
import { toSearchParams } from '@/utils/productQuery';
import { useTranslations } from 'next-intl';
import { DrawerLink, Row, Section, SectionTitle } from './MobileMenuDrawer.styles';

interface MobileMenuDrawerProps {
  open: boolean;
  onClose: () => void;
  categories: string[];
}

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
      </Section>
    </Modal>
  );
}
