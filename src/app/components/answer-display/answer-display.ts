import { Component, input } from '@angular/core';

@Component({
  selector: 'app-answer-display',
  standalone: true,
  styleUrl: './answer-display.scss',
  templateUrl: './answer-display.html',
})
export class AnswerDisplay {
  answer = input.required<String>();
}
