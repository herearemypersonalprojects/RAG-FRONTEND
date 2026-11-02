import { TestBed } from '@angular/core/testing';

import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { beforeEach, afterEach, describe, expect, it } from 'vitest';

import { retryInterceptor } from './retry.interceptor';

describe('Retry Interceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([retryInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should NOT retry POST RAG on HTTP 503', () => {
    let errorStatus: number | undefined;

    http
      .post('/api/rag/ask', {
        question: 'Explain RAG architecture',
        topK: 3,
      })
      .subscribe({
        error: (error) => {
          errorStatus = error.status;
        },
      });

    const req = httpMock.expectOne('/api/rag/ask');

    req.flush(
      { message: 'Service Unavailable' },
      {
        status: 503,
        statusText: 'Service Unavailable',
      },
    );

    expect(errorStatus).toBe(503);

    httpMock.expectNone('/api/rag/ask');
  });

  it('should not retry GET on HTTP 400', () => {
    let errorStatus: number | undefined;

    http.get('/api/documents').subscribe({
      error: (error) => {
        errorStatus = error.status;
      },
    });

    const req = httpMock.expectOne('/api/documents');

    req.flush(
      { message: 'Bad Request' },
      {
        status: 400,
        statusText: 'Bad Request',
      },
    );

    expect(errorStatus).toBe(400);

    httpMock.expectNone('/api/documents');
  });
});
