import { useSyncExternalStore } from 'react';
import { useCartStore } from '@/storage/cartStore';

export function useCartHydrated(): boolean {
  return useSyncExternalStore(
    (onChange) => useCartStore.persist.onFinishHydration(onChange),
    () => useCartStore.persist.hasHydrated(),
    () => false,
  );
}
