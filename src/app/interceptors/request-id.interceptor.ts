import { HttpInterceptorFn } from '@angular/common/http';

export const requestIdInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.url.startsWith('/api/')) {
    return next(request);
  }

  const requestId = crypto.randomUUID();

  const modifiedRequest = request.clone({
    setHeaders: {
      'X-Request-ID': requestId,
    },
  });

  return next(modifiedRequest);
};
