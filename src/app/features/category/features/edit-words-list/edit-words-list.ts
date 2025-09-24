import { ChangeDetectionStrategy, Component, OnInit, effect, inject, signal } from '@angular/core';
import { Word, WordStatus } from '../../../../core/models/words.interface';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../core/services/user/user';
import { Auth } from '@angular/fire/auth';
import { CategoryService } from '../../../home/services/categories.service';
import { firstValueFrom } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-edit-words-list',
  imports: [MatSlideToggleModule],
  templateUrl: './edit-words-list.html',
  styleUrl: './edit-words-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditWordsList {
  public category = signal<string>('');
  public level = signal<string>('');
  public words = signal<Word[]>([]);

  private route = inject(ActivatedRoute);
  private categoryService = inject(CategoryService);
  public wordsWithStatus = signal<(Word & { status: WordStatus })[]>([]);

  private userService = inject(UserService);
  private auth = inject(Auth);
  
  ngOnInit(): void {
    const level = this.route.snapshot.paramMap.get('level');
    const category = this.route.snapshot.paramMap.get('category');

    if (!level || !category) return;

    this.level.set(level);
    this.category.set(category);
    this.category.set(category);

    //this.loadWords(level, category);
  }

  // private async loadWords(level: string, category: string): Promise<void> {
  //   const words = await firstValueFrom(this.categoryService.getWords(level, category));
  //   const uid = this.auth.currentUser?.uid;

  //   const wordsWithStatus: (Word & { status: WordStatus })[] = await Promise.all(
  //     words.map(async word => {
  //       const status: WordStatus = uid
  //         ? (await this.userService.getWordProgress(uid, word.wordId))?.['status'] ?? 'new'
  //         : 'new';
  //       return { ...word, status };
  //     })
  //   );

  //   this.wordsWithStatus.set(this.sortWords(wordsWithStatus));
  // }

  public async toggleLearned(word: Word & { status: WordStatus }): Promise<void> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) return;

    const newStatus: WordStatus = word.status === 'learned' ? 'new' : 'learned';

    await this.userService.updateWordStatus(uid, word.wordId, newStatus);

    this.wordsWithStatus.update(words =>
      words
        .map(w => (w.wordId === word.wordId ? { ...w, status: newStatus } : w))
        .sort((a, b) => (a.status === 'learned' && b.status !== 'learned' ? 1 : -1))
    );
  }
}