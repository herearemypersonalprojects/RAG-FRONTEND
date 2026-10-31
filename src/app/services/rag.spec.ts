import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it} from 'vitest';
import { RagService  } from './rag';

describe('RagService', () => {
  let service: RagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a mock answer for a valid question', () => {
    const question = 'What is the capital of France?';
    const answer = service.ask(question);
    expect(answer).toBe('Mock RAG answer for the question: ' + question);
  });

  it('should throw an error for an empty question', () => {
    const question = '';
    expect(() => service.ask(question)).toThrow('Question cannot be empty');
  });
});
