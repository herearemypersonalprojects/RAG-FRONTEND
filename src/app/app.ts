import { Component } from '@angular/core';
import { Chat } from './components/chat/chat';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Chat],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title: string = 'RAG Knowledge Assistant';
}
