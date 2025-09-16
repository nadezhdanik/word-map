import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryServiceMock } from '../home/services/categories.service.mock';
//import { CategoryService } from '../home/services/categories.service';
import { Word } from '../home/interfaces/word.interface';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Category implements OnInit {
  public words = signal<Word[]>([]);
  public level = signal<string>('');
  public category = signal<string>('');

  private route = inject(ActivatedRoute);
  private categoryService = inject(CategoryServiceMock);

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const level = params.get('level');
      const category = params.get('category');
  
      if (level && category) {
        this.level.set(level);
        this.category.set(category);
        this.words.set(this.categoryService.getWords(level, category));
      }
    });
  }
}
