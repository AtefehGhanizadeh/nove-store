import { SortOption } from '@/types/enums/SortOption';
import type { Product } from '@/types/product';
import type { PaginatedResult, ProductQuery, RawSearchParams } from '@/types/productQuery';

export const PRODUCTS_PER_PAGE = 6;

export const QUERY_PARAMS = {
  search: 'q',
  category: 'category',
  sort: 'sort',
  page: 'page',
} as const;

export function parseProductQuery(params: RawSearchParams): ProductQuery {
  const getValue = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  const search = getValue(params.q)?.trim().slice(0, 100);
  const sort = getValue(params.sort);
  const page = Number(getValue(params.page));

  return {
    q: search || undefined,
    category: getValue(params.category) || undefined,
    sort: Object.values(SortOption).includes(sort as SortOption)
      ? (sort as SortOption)
      : SortOption.Default,
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

export function queryProducts(products: Product[], query: ProductQuery): PaginatedResult<Product> {
  const filtered = products.filter((product) => {
    const matchesSearch =
      !query.q ||
      product.title.toLowerCase().includes(query.q.toLowerCase()) ||
      product.description.toLowerCase().includes(query.q.toLowerCase());

    const matchesCategory = !query.category || product.category === query.category;

    return matchesSearch && matchesCategory;
  });

  const sorted = [...filtered];

  switch (query.sort) {
    case SortOption.PriceAsc:
      sorted.sort((a, b) => a.price - b.price);
      break;
    case SortOption.PriceDesc:
      sorted.sort((a, b) => b.price - a.price);
      break;
    case SortOption.TitleAsc:
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case SortOption.TitleDesc:
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }

  const totalItems = sorted.length;
  const totalPages = Math.ceil(totalItems / PRODUCTS_PER_PAGE);
  const page = Math.min(Math.max(1, query.page), Math.max(1, totalPages));
  const startIndex = (page - 1) * PRODUCTS_PER_PAGE;

  return {
    items: sorted.slice(startIndex, startIndex + PRODUCTS_PER_PAGE),
    page,
    totalPages,
    totalItems,
  };
}

export function toSearchParams(query: Partial<ProductQuery>): Record<string, string> {
  const params: Record<string, string> = {};

  if (query.q) params.q = query.q;
  if (query.category) params.category = query.category;
  if (query.sort && query.sort !== SortOption.Default) {
    params.sort = query.sort;
  }
  if (query.page && query.page > 1) params.page = String(query.page);

  return params;
}

export function buildProductListHref(query: Partial<ProductQuery>, hash?: string): string {
  const search = new URLSearchParams(toSearchParams(query)).toString();

  return `/${search ? `?${search}` : ''}${hash ? `#${hash}` : ''}`;
}
