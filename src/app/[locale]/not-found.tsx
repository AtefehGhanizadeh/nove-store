import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import NotFoundView from '@/components/Common/NotFoundView';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return { title: t('notFoundTitle') };
}

export default function NotFound() {
  return <NotFoundView />;
}
