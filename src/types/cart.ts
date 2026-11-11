import type { Product } from '@/types/product';

export type CartProduct = Pick<Product, 'id' | 'title' | 'price' | 'image' | 'category'>;

export interface CartItem {
  product: CartProduct;
  quantity: number;
}
