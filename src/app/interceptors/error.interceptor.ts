import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { catchError, throwError } from 'rxjs';

import { ApiError, ApiErrorCode } from '../models/api-error.model';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.url.startsWith('/api/')) {
    return next(request);
  }

  return next(request).pipe(
    catchError((error: unknown) => {
      if (!(error instanceof HttpErrorResponse)) {
        return throwError(() => error);
      }

      const code = mapStatusToCode(error);
      const message = getSafeMessage(code);

      const requestId = error.headers.get('X-Request-ID');

      const apiError = new ApiError(code, message, error.status, requestId);

      return throwError(() => apiError);
    }),
  );
};

function mapStatusToCode(error: HttpErrorResponse): ApiErrorCode {
  switch (error.status) {
    case 0:
      if (error.error instanceof DOMException && error.error.name === 'TimeoutError') {
        return 'TIMEOUT';
      }
      return 'NETWORK_ERROR';

    case 400:
      return 'BAD_REQUEST';

    case 401:
      return 'UNAUTHORIZED';

    case 403:
      return 'FORBIDDEN';

    case 404:
      return 'NOT_FOUND';

    case 429:
      return 'RATE_LIMITED';

    case 500:
    case 502:
    case 503:
    case 504:
      return 'SERVER_ERROR';

    default:
      return 'UNKNOWN_ERROR';
  }
}

function getSafeMessage(code: ApiErrorCode): string {
  switch (code) {
    case 'NETWORK_ERROR':
      return 'Cannot connect to the backend.';

    case 'TIMEOUT':
      return 'The request timed out.';

    case 'BAD_REQUEST':
      return 'Invalid request.';

    case 'UNAUTHORIZED':
      return 'Authentication is required.';

    case 'FORBIDDEN':
      return 'Access denied.';

    case 'NOT_FOUND':
      return 'The requested resource was not found.';

    case 'RATE_LIMITED':
      return 'Too many requests. Please try again later.';

    case 'SERVER_ERROR':
      return 'The server encountered an error.';

    default:
      return 'An unexpected error occurred.';
  }
}
