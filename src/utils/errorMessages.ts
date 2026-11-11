import { ApiErrorCode } from '@/types/enums/ApiErrorCode';

/** Dictionary keys (in the `errors` namespace) for each API error code. */
export const ERROR_MESSAGE_KEYS = {
  [ApiErrorCode.Network]: 'network',
  [ApiErrorCode.Timeout]: 'timeout',
  [ApiErrorCode.NotFound]: 'notFound',
  [ApiErrorCode.Server]: 'server',
  [ApiErrorCode.Unknown]: 'unknown',
} as const satisfies Record<ApiErrorCode, string>;
