import axios from 'axios';
import type { ApiError, ApiResult } from '@/types/apiError';
import { ApiErrorCode } from '@/types/enums/ApiErrorCode';

export function handleApiError(error: unknown): ApiError {
  if (!axios.isAxiosError(error)) {
    return {
      code: ApiErrorCode.Unknown,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }

  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return {
      code: ApiErrorCode.Timeout,
      message: error.message,
    };
  }

  if (!error.response) {
    return {
      code: ApiErrorCode.Network,
      message: error.message,
    };
  }

  const { status } = error.response;

  return {
    status,
    code:
      status === 404
        ? ApiErrorCode.NotFound
        : status >= 500
          ? ApiErrorCode.Server
          : ApiErrorCode.Unknown,
    message: error.message,
  };
}

export function isApiError(value: unknown): value is ApiError {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return (
    'code' in value &&
    'message' in value &&
    typeof value.message === 'string' &&
    Object.values(ApiErrorCode).includes(value.code as ApiErrorCode)
  );
}

export async function toApiResult<T>(request: Promise<T>): Promise<ApiResult<T>> {
  try {
    return { ok: true, data: await request };
  } catch (error) {
    return {
      ok: false,
      error: isApiError(error) ? error : handleApiError(error),
    };
  }
}
