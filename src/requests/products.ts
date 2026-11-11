import { cache } from 'react';
import { axiosInstance } from '@/api/axiosInstance';
import type { Product } from '@/types/product';

const ENDPOINTS = {
  products: '/products',
  categories: '/products/categories',
} as const;

export const getProducts = cache(async (): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>(ENDPOINTS.products);
  return data;
});

export const getCategories = cache(async (): Promise<string[]> => {
  const { data } = await axiosInstance.get<string[]>(ENDPOINTS.categories);
  return data;
});
