import {
  Component,
  output,
  input }
  from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-question-input',
  standalone: true,
  imports: [FormsModule],
  styleUrl: './question-input.scss',
  templateUrl: './question-input.html',
})
export class QuestionInput {
  readonly loading = input(false);
  question: string = '';
  questionSubmitted = output<string>();
  sendQuestion() {
    const trimmedQuestion = this.question.trim();
    if (!trimmedQuestion) {
      return;
    }
    this.questionSubmitted.emit(trimmedQuestion);
    this.question = '';
  }
}
