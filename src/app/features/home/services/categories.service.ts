import { Injectable, inject, signal } from '@angular/core';
import { Firestore, FirestoreDataConverter, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Category } from '../interfaces/categories.interface';
import { Word } from '../../../core/models/words.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private firestore: Firestore = inject(Firestore);

  public selectedLevel = signal<string>('A1');
  public categories = signal<Category[]>([]);
  public selectedWords = signal<Word[]>([]);

  private wordConverter: FirestoreDataConverter<Word> = {
    toFirestore(word: Word) {
      return { ...word };
    },
    fromFirestore(snapshot, options): Word {
      const data = snapshot.data(options);
      return {
        wordId: data['wordId'],
        word: data['word'],
        translation: data['translation'],
        level: data['level'],
        category: data['category'],
        partOfSpeech: data['partOfSpeech'],
      };
    },
  };

  public async getCategories(level: string): Promise<void> {
    this.selectedLevel.set(level);

    const wordsCollection = collection(this.firestore, 'words').withConverter(this.wordConverter);
    const q = query(wordsCollection, where('level', '==', level));

    const words = await firstValueFrom(collectionData(q));
    const counts: Record<string, number> = {};

    words.forEach((word: Word) => {
      counts[word.category] = (counts[word.category] || 0) + 1;
    });

    const categories: Category[] = Object.keys(counts).map(name => ({ name, count: counts[name] }));
    this.categories.set(categories);
  }

  public async getWords(level: string, category: string): Promise<void> {
    const wordsCollection = collection(this.firestore, 'words').withConverter(this.wordConverter);
    const q = query(wordsCollection, where('level', '==', level), where('category', '==', category));

    const words = await firstValueFrom(collectionData(q, { idField: 'wordId' }));
    this.selectedWords.set(words as Word[]);
  }

  public async selectCategory(level: string, category: string): Promise<void> {
    await this.getWords(level, category);
  }

}