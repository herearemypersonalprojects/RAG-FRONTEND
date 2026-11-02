export type ApiErrorCode =
  | 'NETWORK_ERROR'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'RATE_LIMITED'
  | 'SERVER_ERROR'
  | 'TIMEOUT'
  | 'UNKNOWN_ERROR';

export class ApiError extends Error {
  constructor(
    public readonly code: ApiErrorCode,
    message: string,
    public readonly httpStatus: number,
    public readonly requestId: string | null = null,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
