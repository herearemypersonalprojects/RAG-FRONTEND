import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title: string = 'RAG Knowledge Assistant';
  version: number = 1;
  backendConnected: boolean = false;
}
