'use client';

import { useTransition } from 'react';
import ApiErrorView from '@/components/Common/ApiErrorView';
import type { ApiErrorCode } from '@/types/enums/ApiErrorCode';
import { useRouter } from '@/utils/i18n/navigation';

export default function ProductsError({ code }: { code: ApiErrorCode }) {
  const router = useRouter();
  const [isRetrying, startTransition] = useTransition();

  return (
    <ApiErrorView
      code={code}
      onRetry={() => startTransition(() => router.refresh())}
      isRetrying={isRetrying}
    />
  );
}
