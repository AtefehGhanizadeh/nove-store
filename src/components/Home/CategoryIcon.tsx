import type { ComponentType, SVGProps } from 'react';
import { BoxIcon, DressIcon, GemIcon, LaptopIcon, ShirtIcon } from '@/assets/Icons';
import { ProductCategory } from '@/types/enums/ProductCategory';
import { isProductCategory } from '@/utils/categories';

const CATEGORY_ICONS = {
  [ProductCategory.Electronics]: LaptopIcon,
  [ProductCategory.Jewelery]: GemIcon,
  [ProductCategory.MensClothing]: ShirtIcon,
  [ProductCategory.WomensClothing]: DressIcon,
} satisfies Record<ProductCategory, ComponentType<SVGProps<SVGSVGElement>>>;

interface CategoryIconProps extends SVGProps<SVGSVGElement> {
  category: string;
}

export default function CategoryIcon({ category, ...props }: CategoryIconProps) {
  const Icon = isProductCategory(category) ? CATEGORY_ICONS[category] : BoxIcon;
  return <Icon {...props} />;
}
