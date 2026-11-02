import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';

import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { beforeEach, afterEach, describe, expect, it } from 'vitest';

import { RagService } from './rag';
import { RagResponse } from '../models/rag.model';

describe('RagService', () => {
  let service: RagService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(RagService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send a POST request to RAG API', () => {
    const mockResponse: RagResponse = {
      question: 'What is RAG?',
      answer: 'RAG combines retrieval and generation.',
      sources: [],
    };

    let actualResponse: RagResponse | undefined;

    service.ask('What is RAG?', 3).subscribe((response) => {
      actualResponse = response;
    });

    const req = httpMock.expectOne('/api/rag/ask');

    expect(req.request.method).toBe('POST');

    expect(req.request.body).toEqual({
      question: 'What is RAG?',
      topK: 3,
    });

    req.flush(mockResponse);

    expect(actualResponse).toEqual(mockResponse);
  });

  it('should reject an empty question', () => {
    expect(() => service.ask('   ')).toThrowError('Question cannot be empty');
  });

  it('should propagate an HTTP 500 error', () => {
    let receivedStatus: number | undefined;

    service.ask('What is RAG?').subscribe({
      next: () => {
        throw new Error('Unexpected success');
      },
      error: (err) => {
        receivedStatus = err.status;
      },
    });

    const req = httpMock.expectOne('/api/rag/ask');

    req.flush(
      { message: 'Internal Server Error' },
      {
        status: 500,
        statusText: 'Internal Server Error',
      },
    );

    expect(receivedStatus).toBe(500);
  });
});
