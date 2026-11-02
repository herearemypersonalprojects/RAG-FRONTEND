import { TestBed } from '@angular/core/testing';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { provideHttpClient } from '@angular/common/http';

import { beforeEach, afterEach, describe, expect, it } from 'vitest';

import { ChatStore } from './chat';

describe('ChatStore', () => {
  let store: ChatStore;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    store = TestBed.inject(ChatStore);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should start with empty history', () => {
    expect(store.messageCount()).toBe(0);
    expect(store.loading()).toBe(false);
  });

  it('should add pending message and handle success', () => {
    store.sendQuestion({
      question: 'What is RAG?',
      topK: 3,
    });

    expect(store.messageCount()).toBe(1);
    expect(store.loading()).toBe(true);
    expect(store.messages()[0].status).toBe('pending');

    const request = httpMock.expectOne('/api/rag/ask');

    expect(request.request.method).toBe('POST');

    request.flush({
      question: 'What is RAG?',
      answer: 'RAG combines retrieval and generation.',
      sources: [],
    });

    expect(store.loading()).toBe(false);
    expect(store.messages()[0].status).toBe('success');

    expect(store.messages()[0].answer).toBe('RAG combines retrieval and generation.');

    expect(store.successfulCount()).toBe(1);
  });

  it('should handle backend errors', () => {
    store.sendQuestion({
      question: 'Explain vector search',
      topK: 2,
    });

    const request = httpMock.expectOne('/api/rag/ask');

    request.flush(
      { message: 'Internal Server Error' },
      {
        status: 500,
        statusText: 'Internal Server Error',
      },
    );

    expect(store.loading()).toBe(false);
    expect(store.messages()[0].status).toBe('error');
    expect(store.errorMessage()).toContain('500');
  });

  it('should clear history and cancel a pending request', () => {
    store.sendQuestion({
      question: 'Explain OpenSearch',
      topK: 2,
    });

    const request = httpMock.expectOne('/api/rag/ask');

    store.clearHistory();

    expect(request.cancelled).toBe(true);
    expect(store.messageCount()).toBe(0);
    expect(store.loading()).toBe(false);
  });
});
