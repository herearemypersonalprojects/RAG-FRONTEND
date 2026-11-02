export interface RagRequest {
  question: string;
  topK: number
}

export interface RagSource {
  id: string;
  chunkId: string;
  source: string;
  chunkIndex: number;
  startOffset: number;
  endOffset: number;
  score: number;
  content: string;
}

export interface RagResponse {
  question: string;
  answer: string;
  sources: RagSource[];
}
