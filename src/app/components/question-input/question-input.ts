import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-input',
  standalone: true,
  imports: [FormsModule],
  styleUrl: './question-input.scss',
  templateUrl: './question-input.html',
})
export class QuestionInput {
  question: string = '';
  questionSubmitted = output<String>();
  sendQuestion() {
    const trimmedQuestion = this.question.trim();
    if (!trimmedQuestion) {
      return;
    }
    this.questionSubmitted.emit(trimmedQuestion);
    this.question = '';
  }
}
