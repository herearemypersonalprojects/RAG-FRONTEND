import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient,withInterceptors } from '@angular/common/http';
import { retryInterceptor } from './interceptors/retry.interceptor';
import { requestIdInterceptor } from './interceptors/request-id.interceptor';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        requestIdInterceptor,
        retryInterceptor,
        authInterceptor,
        errorInterceptor
      ])
    )
  ]
};

