import { Component, DestroyRef, inject, signal } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

import { RagService } from '../../services/rag';

import { RagRequest, RagResponse } from '../../models/rag.model';

import { QuestionInput } from '../question-input/question-input';
import { AnswerDisplay } from '../answer-display/answer-display';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [QuestionInput, AnswerDisplay],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {
  private readonly ragService = inject(RagService);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly response = signal<RagResponse | null>(null);

  onQuestionSubmitted(request: RagRequest): void {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);
    this.response.set(null);

    this.ragService
      .ask(request.question, request.topK)
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (result: RagResponse) => {
          this.response.set(result);
        },

        error: (error: unknown) => {
          console.error('RAG API error:', error);

          if (error instanceof HttpErrorResponse) {
            if (error.status === 0) {
              this.errorMessage.set('Cannot connect to Spring Boot backend.');
            } else {
              this.errorMessage.set(`Backend error: HTTP ${error.status}`);
            }
          } else {
            this.errorMessage.set('Unexpected error while processing question.');
          }
        },
      });
  }
}
