import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  counter = signal(0);

  title: string = 'RAG Knowledge Assistant';
  version: number = 1;
  backendConnected: boolean = false;
  developerName: string = 'Java Fullstack Developer';
  question: string = '';
  answer: string = '';

  sendQuestion() {
    const trimmedQuestion = this.question.trim();
    if (!trimmedQuestion) {
      this.answer = 'Please enter a question before sending.';
      return;
    }
    this.answer = 'Mock RAG answer for the question: ' + this.question;
  }
}
