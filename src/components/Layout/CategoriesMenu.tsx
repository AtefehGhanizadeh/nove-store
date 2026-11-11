'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDownIcon } from '@/assets/Icons';
import { useCategoryLabel } from '@/utils/i18n/useCategoryLabel';
import { toSearchParams } from '@/utils/productQuery';
import { Wrapper, Trigger, Menu, MenuLink } from './CategoriesMenu.styles';

interface CategoriesMenuProps {
  categories: string[];
}

export default function CategoriesMenu({ categories }: CategoriesMenuProps) {
  const t = useTranslations('header');
  const getCategoryLabel = useCategoryLabel();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !wrapperRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  if (categories.length === 0) return null;

  return (
    <Wrapper ref={wrapperRef}>
      <Trigger
        ref={triggerRef}
        $open={open}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {t('categories')}
        <ChevronDownIcon />
      </Trigger>

      {open && (
        <Menu id={menuId}>
          {categories.map((category) => (
            <li key={category}>
              <MenuLink
                href={{
                  pathname: '/',
                  query: toSearchParams({ category }),
                  hash: 'products',
                }}
                onClick={() => setOpen(false)}
              >
                {getCategoryLabel(category)}
              </MenuLink>
            </li>
          ))}
        </Menu>
      )}
    </Wrapper>
  );
}
