import { RagSource } from './rag.model';

export type ChatMessageStatus = 'pending' | 'success' | 'error';

export interface ChatMessage {
  id: string;
  question: string;
  topK: number;
  answer: string | null;
  sources: RagSource[];
  status: ChatMessageStatus;
  errorMessage: string | null;
  createdAt: string;
}
