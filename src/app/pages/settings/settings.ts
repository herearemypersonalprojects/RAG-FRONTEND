import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class SettingsPage {
  readonly backendName = 'Spring Boot RAG';

  readonly defaultTopK = 3;
}
