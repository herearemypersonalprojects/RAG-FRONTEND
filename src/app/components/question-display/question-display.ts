import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-question-display',
  styleUrl: './question-display.scss',
  templateUrl: './question-display.html',
})
export class QuestionDisplay {
  lastQuestion = input.required<String>();
}
