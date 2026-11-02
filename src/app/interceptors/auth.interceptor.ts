import { HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';

import { AuthTokenService } from '../services/auth-token';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.url.startsWith('/api/')) {
    return next(request);
  }

  const authTokenService = inject(AuthTokenService);

  const token = authTokenService.getAccessToken();

  if (!token) {
    return next(request);
  }

  const authenticatedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authenticatedRequest);
};
