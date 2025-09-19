export interface Card {
  content: string;
  pairId: number;
  type: string;
  opened?: boolean;
  matched?: boolean;
}
