'use client';

import { useTranslations } from 'next-intl';
import Select from '@/shared/Select';
import type { SelectOption } from '@/shared/Select';
import { SortOption } from '@/types/enums/SortOption';
import type { ProductQuery } from '@/types/productQuery';
import { useRouter } from '@/utils/i18n/navigation';
import { buildProductListHref } from '@/utils/productQuery';

const SORT_MESSAGE_KEYS = {
  [SortOption.Default]: 'default',
  [SortOption.PriceAsc]: 'priceAsc',
  [SortOption.PriceDesc]: 'priceDesc',
  [SortOption.TitleAsc]: 'titleAsc',
  [SortOption.TitleDesc]: 'titleDesc',
} as const satisfies Record<SortOption, string>;

interface SortSelectProps {
  query: ProductQuery;
}

export default function SortSelect({ query }: SortSelectProps) {
  const t = useTranslations('sort');
  const router = useRouter();

  const options: SelectOption<SortOption>[] = Object.values(SortOption).map((value) => ({
    value,
    label: t(SORT_MESSAGE_KEYS[value]),
  }));

  function handleChange(sort: SortOption) {
    router.push(buildProductListHref({ ...query, sort, page: 1 }), { scroll: false });
  }

  return (
    <Select
      id="product-sort"
      label={t('label')}
      value={query.sort}
      options={options}
      onChange={handleChange}
    />
  );
}
