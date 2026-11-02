import { Component, inject } from '@angular/core';

import { ChatStore } from '../../stores/chat';
import { RagRequest } from '../../models/rag.model';

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
  readonly chatStore = inject(ChatStore);

  onQuestionSubmitted(request: RagRequest): void {
    this.chatStore.sendQuestion(request);
  }

  clearHistory(): void {
    this.chatStore.clearHistory();
  }
}
