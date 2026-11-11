'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/storage/cartStore';

export default function CartHydration() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  return null;
}
