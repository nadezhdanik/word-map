import { FieldValue, Timestamp } from 'firebase/firestore';

export type WordStatus = 'new' | 'learning' | 'learned';

export interface WordProgress {
  wordId: string;
  level: string;
  category: string;
  correctCount: number;
  status: WordStatus;
  addedAt: Timestamp | FieldValue;
  lastReviewed: Timestamp | FieldValue | null;
  nextReview: Timestamp | FieldValue | null;
}

export interface WordData {
  wordId: string;
  level: string;
  category: string;
}