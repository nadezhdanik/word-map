import wordsData from '../mocks/A1_English_Vocabulary_500.json';
import { Injectable, Signal, signal } from '@angular/core';
import { Category } from '../interfaces/categories.interface';
import { Word } from '../interfaces/word.interface';

@Injectable({
    providedIn: 'root'
  })
  export class CategoryServiceMock {
    public selectedWords = signal<Word[]>([]);
    private categories = signal<Category[]>([]);

  constructor() {
    this.setLevel('A1');
  }

  public getCategories(level: string): Signal<Category[]> {
    this.setLevel(level);
    return this.categories.asReadonly();
  }

  public getWords(level: string, category: string): Word[] {
    const words = wordsData as Word[];
    return words.filter(word => word.level === level && word.category === category);
  }
  
  public selectCategory(level: string, category: string): void {
    const words = this.getWords(level, category);
    this.selectedWords.set(words);
  }

  private setLevel(level: string): void {
    const counts = new Map<string, number>();
    const words = wordsData as Word[];

    words.filter(word => word.level === level)
    .forEach(word => {
      const prev = counts.get(word.category) || 0;
      counts.set(word.category, prev + 1);
    });

    const result: Category[] = Array.from(counts, ([name, count]) => ({ name, count }));
    this.categories.set(result);
  }
}
