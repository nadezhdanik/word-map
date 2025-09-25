import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { Word, WordStatus } from '../../../../core/models/words.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../core/services/user/user';
import { Auth } from '@angular/fire/auth';
import { CategoryService } from '../../../home/services/categories.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Firestore, doc, increment, serverTimestamp, writeBatch } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-words-list',
  imports: [MatSlideToggleModule],
  templateUrl: './edit-words-list.html',
  styleUrl: './edit-words-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditWordsList implements OnInit {
  public category = signal<string>('');
  public level = signal<string>('');
  public words = signal<Word[]>([]);

  public route = inject(ActivatedRoute);
  public router = inject(Router);
  public wordsWithStatus = signal<(Word & { status: WordStatus })[]>([]);

  private categoryService = inject(CategoryService);
  private userService = inject(UserService);
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  public ngOnInit(): void {
    const level = this.route.snapshot.paramMap.get('level');
    const category = this.route.snapshot.paramMap.get('category');

    if (!level || !category) return;

    this.level.set(level);
    this.category.set(category);

    this.loadWords(level, category);
  }

  public toggleLearned(word: Word & { status: WordStatus }): void {
    this.wordsWithStatus.update((words) =>
      this.sortWords(
        words.map((w) =>
          w.wordId === word.wordId
            ? { ...w, status: w.status === 'learned' ? 'new' : 'learned' }
            : w,
        ),
      ),
    );
  }

  public async saveLearnedWords(): Promise<void> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) return;

    const batch = writeBatch(this.firestore);
    const words = this.wordsWithStatus();
    const CountStatsMap = new Map<string, number>();

    for (const word of words) {
      if (word.status === 'learned') {
        const wordRef = doc(this.firestore, `progress/${uid}/words/${word.wordId}`);
        batch.set(wordRef, { status: 'learned', lastReviewed: serverTimestamp() }, { merge: true });

        const key = `${word.level}_${word.category}`;
        CountStatsMap.set(key, (CountStatsMap.get(key) ?? 0) + 1);
      }
    }

    for (const [key, count] of CountStatsMap.entries()) {
      const [level, category] = key.split('_');
      const statsRef = doc(this.firestore, `progress/${uid}/stats/${level}_${category}`);
      batch.set(
        statsRef,
        {
          learnedCount: increment(count),
        },
        { merge: true },
      );
    }

    await batch.commit();
    this.wordsWithStatus.update((ws) => this.sortWords(ws));
  }

  private sortWords(words: (Word & { status: WordStatus })[]): (Word & { status: WordStatus })[] {
    return [...words].sort((a) => (a.status === 'learned' ? 1 : -1));
  }

  private async loadWords(level: string, category: string): Promise<void> {
    const words = await this.categoryService.getWords(level, category);
    const uid = this.auth.currentUser?.uid;

    if (!uid) {
      this.wordsWithStatus.set(words.map((w) => ({ ...w, status: 'new' as WordStatus })));
      return;
    }

    const wordsWithStatus: (Word & { status: WordStatus })[] = await Promise.all(
      words.map(async (word) => {
        const progress = await this.userService.getWordProgress(uid, word.wordId);
        const status: WordStatus = progress?.['status'] ?? 'new';
        return { ...word, status };
      }),
    );

    this.wordsWithStatus.set(wordsWithStatus);
  }
}
