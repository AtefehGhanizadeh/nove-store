import type { SortOption } from '@/types/enums/SortOption';

export interface ProductQuery {
  q?: string;
  category?: string;
  sort: SortOption;
  page: number;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalItems: number;
}

export type RawSearchParams = Record<string, string | string[] | undefined>;
