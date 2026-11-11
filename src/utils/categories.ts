import { ProductCategory } from '@/types/enums/ProductCategory';

const CATEGORY_MESSAGE_KEYS = {
  [ProductCategory.Electronics]: 'electronics',
  [ProductCategory.Jewelery]: 'jewelery',
  [ProductCategory.MensClothing]: 'mensClothing',
  [ProductCategory.WomensClothing]: 'womensClothing',
} as const satisfies Record<ProductCategory, string>;

export type CategoryMessageKey = (typeof CATEGORY_MESSAGE_KEYS)[ProductCategory];

export function isProductCategory(value: string): value is ProductCategory {
  return Object.values(ProductCategory).some((category) => category === value);
}

export function getCategoryMessageKey(category: string): CategoryMessageKey | undefined {
  return isProductCategory(category) ? CATEGORY_MESSAGE_KEYS[category] : undefined;
}
