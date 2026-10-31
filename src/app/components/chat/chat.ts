import { Component } from '@angular/core';

import { QuestionInput } from '../question-input/question-input';
import { AnswerDisplay } from '../answer-display/answer-display';

@Component({
  imports: [QuestionInput, AnswerDisplay],
  standalone: true,
  selector: 'app-chat',
  styleUrl: './chat.scss',
  templateUrl: './chat.html',
})
export class Chat {
  answer: String = '';
  onQuestionSubmitted(question: String) {
    this.answer = 'Mock RAG answer for the question: ' + question;
  }
}
