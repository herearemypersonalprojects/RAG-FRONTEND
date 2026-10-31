export interface RagRequest {
  question: string;
}

export interface RagSource {
  documentName: string;
  score: number;
}

export interface RagResponse {
  answer: string;
  sources: RagSource[];
}
