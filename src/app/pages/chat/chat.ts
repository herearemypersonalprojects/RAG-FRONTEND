import { Component } from '@angular/core';

import { Chat } from '../../components/chat/chat';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [Chat],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class ChatPage {}
