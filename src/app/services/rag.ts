import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RagService {
  private readonly http = inject(HttpClient);

  ask(question: String): String {
    const cleanedQuestion = question.trim();
    if (!cleanedQuestion) {
      throw new Error('Question cannot be empty');
    }
    return 'Mock RAG answer for the question: ' + cleanedQuestion;
  }

  getServiceVersion(): String {
    return '1.0.0';
  }
}
