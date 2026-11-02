import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  RagRequest,
  RagResponse
} from '../models/rag.model';

@Injectable({
  providedIn: 'root',
})

export class RagService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/rag/ask';

  ask(question: string, topK: number = 3): Observable<RagResponse> {
    const cleanedQuestion = question.trim();
    if (!cleanedQuestion) {
      throw new Error('Question cannot be empty');
    }

    const request: RagRequest = {
      question: cleanedQuestion,
      topK: topK
    };

    return this.http.post<RagResponse>(
      this.apiUrl,
      request);
  }

  getServiceVersion(): string {
    return '1.0.0';
  }
}
