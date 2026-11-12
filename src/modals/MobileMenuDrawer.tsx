'use client';

import LanguageSwitcher from '@/components/Layout/LanguageSwitcher';
import Modal from '@/shared/Modal';
import { useCategoryLabel } from '@/utils/i18n/useCategoryLabel';
import { toSearchParams } from '@/utils/productQuery';
import { useTranslations } from 'next-intl';
import { Suspense, use } from 'react';
import { DrawerLink, Row, Section, SectionTitle } from './MobileMenuDrawer.styles';

interface MobileMenuDrawerProps {
  open: boolean;
  onClose: () => void;
  categoriesPromise: Promise<string[]>;
}

interface DrawerCategoriesProps {
  categoriesPromise: Promise<string[]>;
  onNavigate: () => void;
}

function DrawerCategories({ categoriesPromise, onNavigate }: DrawerCategoriesProps) {
  const categories = use(categoriesPromise);
  const t = useTranslations('header');
  const getCategoryLabel = useCategoryLabel();

  if (categories.length === 0) return null;

  return (
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
              onClick={onNavigate}
            >
              {getCategoryLabel(category)}
            </DrawerLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default function MobileMenuDrawer({
  open,
  onClose,
  categoriesPromise,
}: MobileMenuDrawerProps) {
  const t = useTranslations('header');

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

        <Suspense fallback={null}>
          <DrawerCategories categoriesPromise={categoriesPromise} onNavigate={onClose} />
        </Suspense>
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
