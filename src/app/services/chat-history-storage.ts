import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatHistoryStorage {
  private readonly key = 'rag-chat-history-v1';

  load(): ChatMessage[] {
    try {
      const json = localStorage.getItem(this.key);

      if (!json) {
        return [];
      }

      const parsed: unknown = JSON.parse(json);

      if (!Array.isArray(parsed)) {
        return [];
      }

      // Minimal validation for this learning example.
      return parsed.filter(
        (item): item is ChatMessage =>
          item !== null &&
          typeof item === 'object' &&
          typeof item.id === 'string' &&
          typeof item.question === 'string' &&
          (item.status === 'success' || item.status === 'error') &&
          (item.answer === null || typeof item.answer === 'string') &&
          Array.isArray(item.sources),
      );
    } catch {
      return [];
    }
  }

  save(messages: ChatMessage[]): void {
    try {
      const completedMessages = messages.filter((m) => m.status !== 'pending');

      localStorage.setItem(this.key, JSON.stringify(completedMessages));
    } catch (error) {
      console.warn('Could not save chat history', error);
    }
  }
}
