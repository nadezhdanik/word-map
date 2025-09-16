import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryServiceMock } from '../home/services/categories.service.mock';
import { Word } from '../home/interfaces/word.interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Category {
  public words = signal<Word[]>([]);
  public level = signal<string>('');
  public category = signal<string>('');

  private route = inject(ActivatedRoute);
  private categoryService = inject(CategoryServiceMock);
  private paramMapSignal = toSignal(this.route.paramMap, {
    initialValue: null,
  });

  constructor() {
    effect(() => {

      console.log('effect triggered', this.paramMapSignal());

      const params = this.paramMapSignal();
      const level = params?.get('level');
      const category = params?.get('category');

      if (level && category) {
        this.level.set(level);
        this.category.set(category);
        this.words.set(this.categoryService.getWords(level, category));
      }
    });
  }
}
