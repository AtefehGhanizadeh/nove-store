import type { ApiErrorCode } from '@/types/enums/ApiErrorCode';

export interface ApiError {
  status?: number;
  code: ApiErrorCode;
  message: string;
}

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiError };
