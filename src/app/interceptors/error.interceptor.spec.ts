import { TestBed } from '@angular/core/testing';

import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { beforeEach, afterEach, describe, expect, it } from 'vitest';

import { errorInterceptor } from './error.interceptor';
import { ApiError } from '../models/api-error.model';

describe('Error Interceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should convert HTTP 500 into ApiError', () => {
    let actualError: unknown;

    http.get('/api/documents').subscribe({
      error: (error) => {
        actualError = error;
      },
    });

    const req = httpMock.expectOne('/api/documents');

    req.flush(
      { message: 'Internal server details' },
      {
        status: 500,
        statusText: 'Internal Server Error',
      },
    );

    expect(actualError).toBeInstanceOf(ApiError);

    const apiError = actualError as ApiError;

    expect(apiError.code).toBe('SERVER_ERROR');
    expect(apiError.httpStatus).toBe(500);

    expect(apiError.message).toBe('The server encountered an error.');
  });
});
