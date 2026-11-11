import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CartItem, CartProduct } from '@/types/cart';
import { StorageKey } from '@/types/enums/StorageKey';

const MIN_QUANTITY = 1;

interface CartState {
  items: CartItem[];
  addItem: (product: CartProduct) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

function updateQuantity(items: CartItem[], id: number, delta: number): CartItem[] {
  return items.map((item) =>
    item.product.id === id
      ? { ...item, quantity: Math.max(MIN_QUANTITY, item.quantity + delta) }
      : item,
  );
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.product.id === product.id);

          if (exists) {
            return { items: updateQuantity(state.items, product.id, 1) };
          }

          const { id, title, price, image, category } = product;

          return {
            items: [
              ...state.items,
              { product: { id, title, price, image, category }, quantity: MIN_QUANTITY },
            ],
          };
        }),

      increment: (id) => set((state) => ({ items: updateQuantity(state.items, id, 1) })),

      decrement: (id) => set((state) => ({ items: updateQuantity(state.items, id, -1) })),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.product.id !== id) })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: StorageKey.Cart,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      skipHydration: true,
    },
  ),
);

export const selectItems = (state: CartState) => state.items;

export const selectTotalCount = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state: CartState) =>
  state.items.reduce((total, item) => total + getLineTotal(item), 0);

export function getLineTotal(item: CartItem): number {
  return item.product.price * item.quantity;
}
