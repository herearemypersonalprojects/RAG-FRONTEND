import { Injectable, computed, inject, signal } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';

import { Subscription, finalize } from 'rxjs';

import { RagService } from '../services/rag';
import { RagRequest } from '../models/rag.model';
import { ChatMessage } from '../models/chat-message.model';

import { effect } from '@angular/core';

import { ChatHistoryStorage } from '../services/chat-history-storage';

  @Injectable({
    providedIn: 'root',
  })
  export class ChatStore {
    constructor() {
      effect(() => {
        const messages = this._messages();

        this.storage.save(messages);
      });
    }

  private readonly ragService = inject(RagService);
  private readonly storage = inject(ChatHistoryStorage);

  // 1. Private writable state
  private readonly _messages = signal<ChatMessage[]>(this.storage.load());
  private readonly _loading = signal(false);
  private readonly _errorMessage = signal<string | null>(null);

  private activeRequest?: Subscription;
  private requestGeneration = 0;

  // 2. Public readonly state
  readonly messages = this._messages.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly errorMessage = this._errorMessage.asReadonly();

  // 3. Derived state
  readonly messageCount = computed(() => this._messages().length);

  readonly successfulCount = computed(
    () => this._messages().filter((message) => message.status === 'success').length,
  );

  readonly lastMessage = computed(() => this._messages().at(-1) ?? null);

  // 4. Actions
  sendQuestion(request: RagRequest): void {
    if (this._loading()) {
      return;
    }

    const question = request.question.trim();

    if (!question || !Number.isInteger(request.topK) || request.topK < 1 || request.topK > 3) {
      this._errorMessage.set('Invalid RAG request.');
      return;
    }

    const messageId = crypto.randomUUID();
    const generation = ++this.requestGeneration;

    const newMessage: ChatMessage = {
      id: messageId,
      question,
      topK: request.topK,
      answer: null,
      sources: [],
      status: 'pending',
      errorMessage: null,
      createdAt: new Date().toISOString(),
    };

    this._messages.update((messages) => [...messages, newMessage]);

    this._loading.set(true);
    this._errorMessage.set(null);

    this.activeRequest = this.ragService
      .ask(question, request.topK)
      .pipe(
        finalize(() => {
          if (generation === this.requestGeneration) {
            this._loading.set(false);
            this.activeRequest = undefined;
          }
        }),
      )
      .subscribe({
        next: (response) => {
          if (generation !== this.requestGeneration) {
            return;
          }

          this.updateMessage(messageId, {
            answer: response.answer,
            sources: response.sources ?? [],
            status: 'success',
            errorMessage: null,
          });
        },

        error: (error: unknown) => {
          if (generation !== this.requestGeneration) {
            return;
          }

          const message = this.getErrorMessage(error);

          this._errorMessage.set(message);

          this.updateMessage(messageId, {
            status: 'error',
            errorMessage: message,
          });
        },
      });
  }

  clearHistory(): void {
    // Invalidate callbacks from the previous request.
    this.requestGeneration++;

    this.activeRequest?.unsubscribe();
    this.activeRequest = undefined;

    this._messages.set([]);
    this._loading.set(false);
    this._errorMessage.set(null);
  }

  private updateMessage(id: string, changes: Partial<ChatMessage>): void {
    this._messages.update((messages) =>
      messages.map((message) => (message.id === id ? { ...message, ...changes } : message)),
    );
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        return 'Cannot connect to Spring Boot backend.';
      }

      return `Backend error: HTTP ${error.status}`;
    }

    return 'Unexpected error while processing the question.';
  }
}
