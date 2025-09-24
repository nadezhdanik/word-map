import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
  writeBatch,
} from '@angular/fire/firestore';
import { UserDoc } from '../../models/user.interface';
import { User } from '@angular/fire/auth';
import { WordData, WordStatus } from '../../models/words.interface';
import { WordService } from '../word/word.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firestore = inject(Firestore);
  private wordService = inject(WordService);

  public async createUserDoc(uid: string, email: string, name: string): Promise<void> {
    const userRef = doc(this.firestore, `users/${uid}`);

    const userData: UserDoc = {
      uid,
      email,
      name,
      registrDate: serverTimestamp(),
      settings: {
        theme: 'light',
        language: 'ru',
      },
    };

    await setDoc(userRef, userData);
  }

  public async createStatsDoc(
    uid: string,
    level: string,
    category: string,
    totalCount = 0,
  ): Promise<void> {
    const id = `${level}_${category}`;
    const statsRef = doc(this.firestore, `progress/${uid}/stats/${id}`);
    await setDoc(
      statsRef,
      {
        level,
        category,
        totalCount,
        learnedCount: 0,
      },
      { merge: true },
    );
  }

  public async addWordProgress(
    uid: string,
    wordId: string,
    level: string,
    category: string,
  ): Promise<void> {
    const wordRef = doc(this.firestore, `progress/${uid}/words/${wordId}`);
    await setDoc(
      wordRef,
      {
        wordId,
        level,
        category,
        correctCount: 0,
        status: 'new',
        addedAt: serverTimestamp(),
        lastReviewed: null,
        nextReview: null,
      },
      { merge: true },
    );
  }

  public async getWordProgress(uid: string, wordId: string) {
    const wordRef = doc(this.firestore, `progress/${uid}/words/${wordId}`);
    const snapshot = await getDoc(wordRef);
    return snapshot.exists() ? snapshot.data() : null;
  }

  public async updateWordStatus(uid: string, wordId: string, status: WordStatus) {
    const wordRef = doc(this.firestore, `progress/${uid}/words/${wordId}`);
    await setDoc(wordRef, { status }, { merge: true });
  }

  public async updateUserProgress(uid: string, words: WordData[]): Promise<void> {
    const batch = writeBatch(this.firestore);
    const statsMap = new Map<string, { level: string; category: string; totalCount: number }>();

    for (const word of words) {
      const wordRef = doc(this.firestore, `progress/${uid}/words/${word.wordId}`);
      batch.set(
        wordRef,
        {
          wordId: word.wordId,
          level: word.level,
          category: word.category,
          correctCount: 0,
          status: 'new',
          addedAt: serverTimestamp(),
          lastReviewed: null,
          nextReview: null,
        },
        { merge: true },
      );

      const key = `${word.level}_${word.category}`;
      if (!statsMap.has(key)) {
        statsMap.set(key, { level: word.level, category: word.category, totalCount: 1 });
      } else {
        statsMap.get(key)!.totalCount += 1;
      }
    }

    for (const stat of statsMap.values()) {
      const statsRef = doc(this.firestore, `progress/${uid}/stats/${stat.level}_${stat.category}`);
      batch.set(
        statsRef,
        {
          level: stat.level,
          category: stat.category,
          totalCount: stat.totalCount,
          learnedCount: 0,
        },
        { merge: true },
      );
    }

    await batch.commit();
  }

  public async ensureUserDoc(user: User): Promise<void> {
    const userRef = doc(this.firestore, `users/${user.uid}`);
    const snapshot = await getDoc(userRef);
  
    if (!snapshot.exists()) {
      await this.createUserDoc(user.uid, user.email ?? '', user.displayName ?? '');
      const allWords = await this.wordService.getAllWords(); 
      await this.initializeUserProgress(user.uid, allWords);
    }
  }

  public async getCategoryProgress(
    uid: string,
    level: string,
    category: string,
  ): Promise<{ totalCount: number; learnedCount: number; percent: number }> {
    const statsRef = doc(this.firestore, `progress/${uid}/stats/${level}_${category}`);
    const document = await getDoc(statsRef);

    if (!document.exists()) {
      return { totalCount: 0, learnedCount: 0, percent: 0 };
    } else {
      const data = document.data();
      return {
        totalCount: data['totalCount'] || 0,
        learnedCount: data['learnedCount'] || 0,
        percent: data['totalCount']
          ? Math.round((data['learnedCount'] / data['totalCount']) * 100)
          : 0,
      };
    }
  }

  public async getLevelProgress(
    uid: string,
    level: string,
    categories: string[],
  ): Promise<{ totalCount: number; learnedCount: number; percent: number }> {
    let totalCount = 0;
    let learnedCount = 0;
  
    for (const category of categories) {
      const stats = await this.getCategoryProgress(uid, level, category);
      totalCount += stats.totalCount;
      learnedCount += stats.learnedCount;
    }
  
    return {
      totalCount,
      learnedCount,
      percent: totalCount ? Math.round((learnedCount / totalCount) * 100) : 0,
    };
  }

  public async initializeUserProgress(uid: string, allWords: WordData[]): Promise<void> {
    await this.updateUserProgress(uid, allWords);
  }
}
