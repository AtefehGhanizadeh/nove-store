import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CartView from '@/components/Cart/CartView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    title: t('cartTitle'),
    description: t('cartDescription'),
    robots: { index: false, follow: true },
  };
}

export default function CartPage() {
  return <CartView />;
}
