import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { getCategoryMessageKey } from '@/utils/categories';

/** Translates an API category slug; unknown categories fall back to the raw value. */
export function useCategoryLabel(): (category: string) => string {
  const t = useTranslations('categories');

  return useCallback(
    (category: string) => {
      const key = getCategoryMessageKey(category);
      return key ? t(key) : category;
    },
    [t],
  );
}
