import { TestBed } from '@angular/core/testing';

import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { beforeEach, afterEach, describe, expect, it } from 'vitest';

import { requestIdInterceptor } from './request-id.interceptor';

import { authInterceptor } from './auth.interceptor';

import { AuthTokenService } from '../services/auth-token';

describe('Request ID and Authentication Interceptors', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authTokenService: AuthTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([requestIdInterceptor, authInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);

    httpMock = TestBed.inject(HttpTestingController);

    authTokenService = TestBed.inject(AuthTokenService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add a request ID to API requests', () => {
    http.get('/api/documents').subscribe();

    const req = httpMock.expectOne('/api/documents');

    const requestId = req.request.headers.get('X-Request-ID');

    expect(requestId).toBeTruthy();

    req.flush([]);
  });

  it('should attach the access token', () => {
    authTokenService.setAccessTokenFromLogin('test-access-token');

    http.get('/api/documents').subscribe();

    const req = httpMock.expectOne('/api/documents');

    expect(req.request.headers.get('Authorization')).toBe('Bearer test-access-token');

    req.flush([]);
  });

  it('should not send tokens to external URLs', () => {
    authTokenService.setAccessTokenFromLogin('test-access-token');

    http.get('https://example.org/public').subscribe();

    const req = httpMock.expectOne('https://example.org/public');

    expect(req.request.headers.has('Authorization')).toBe(false);

    req.flush({});
  });
});
