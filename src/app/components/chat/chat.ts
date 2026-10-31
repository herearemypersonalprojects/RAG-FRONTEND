import { Component, inject } from '@angular/core';

import { RagService } from '../../services/rag';

import { QuestionInput } from '../question-input/question-input';
import { AnswerDisplay } from '../answer-display/answer-display';
import { QuestionDisplay } from '../question-display/question-display';

@Component({
  imports: [QuestionInput, AnswerDisplay, QuestionDisplay],
  standalone: true,
  selector: 'app-chat',
  styleUrl: './chat.scss',
  templateUrl: './chat.html',
})
export class Chat {
  private readonly ragService = inject(RagService);

  answer: String = '';
  lastQuestion: String = '';
  onQuestionSubmitted(question: String) {
    this.lastQuestion = question;
    this.answer = this.ragService.ask(question);
  }

  getServiceVersion() {
    return this.ragService.getServiceVersion();
  }
}
