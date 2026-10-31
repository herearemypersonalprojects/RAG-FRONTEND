import { Component } from '@angular/core';

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
  answer: String = '';
  lastQuestion: String = '';
  onQuestionSubmitted(question: String) {
    this.lastQuestion = question;
    this.answer = 'Mock RAG answer for the question: ' + question;
  }
}
