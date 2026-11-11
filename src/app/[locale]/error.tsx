'use client';

import { isApiError } from '@/api/handleApiError';
import ApiErrorView from '@/components/Common/ApiErrorView';
import { ApiErrorCode } from '@/types/enums/ApiErrorCode';

interface ErrorPageProps {
  error: unknown;
  retry: () => void;
}

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  const code = isApiError(error) ? error.code : ApiErrorCode.Unknown;
  return <ApiErrorView code={code} onRetry={retry} />;
}
