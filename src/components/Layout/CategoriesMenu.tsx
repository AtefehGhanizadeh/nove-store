'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { ChevronDownIcon } from '@/assets/Icons';
import { useCategoryLabel } from '@/utils/i18n/useCategoryLabel';
import { Link } from '@/utils/i18n/navigation';
import { toSearchParams } from '@/utils/productQuery';

interface CategoriesMenuProps {
  categories: string[];
}

const Wrapper = styled.div`
  position: relative;
`;

const Trigger = styled.button.attrs({ type: 'button' })<{ $open: boolean }>`
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

const Menu = styled.ul`
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

const MenuLink = styled(Link)`
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
