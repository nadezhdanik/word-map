import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Word } from '../../models/words.interface';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  constructor(private firestore: Firestore) {}

  public async getAllWords(): Promise<Word[]> {
    const wordsRef = collection(this.firestore, 'words');
    const snapshot = await getDocs(wordsRef);

    return snapshot.docs.map(doc => {
      const data = doc.data();

      const word: Word = {
        wordId: doc.id,
        category: data['category'],
        level: data['level'],
        partOfSpeech: data['partOfSpeech'],
        translation: data['translation'],
        word: data['word'],
      };

      return word;
    });
  }
}
