import CartView from '@/components/Cart/CartView';
import { buildPageMetadata } from '@/utils/seo';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations('metadata');

  return {
    ...buildPageMetadata({
      locale,
      path: '/cart',
      title: t('cartTitle'),
      description: t('cartDescription'),
      siteName: t('siteName'),
    }),
    robots: { index: false, follow: true },
  };
}

export default function CartPage() {
  return <CartView />;
}
