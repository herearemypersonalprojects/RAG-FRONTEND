import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { retry, throwError, timer } from 'rxjs';

export const retryInterceptor: HttpInterceptorFn = (request, next) => {
  if (request.method !== 'GET' || !request.url.startsWith('/api/')) {
    return next(request);
  }

  return next(request).pipe(
    retry({
      count: 2,

      delay: (error: unknown, retryCount: number) => {
        if (
          error instanceof HttpErrorResponse &&
          (error.status === 0 ||
            error.status === 502 ||
            error.status === 503 ||
            error.status === 504)
        ) {
          return timer(500 * 2 ** (retryCount - 1));
        }

        return throwError(() => error);
      },
    }),
  );
};
