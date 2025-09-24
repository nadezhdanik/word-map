import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CategoryService } from './services/categories.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  public categoryService = inject(CategoryService);
  private router = inject(Router);

  public levels: string[] = ['A1', 'A2', 'B1', 'B2'];
  public selectedLevel = signal<string>('A1');
  public categories = this.categoryService.categories;

  constructor() {
    this.loadCategories(this.selectedLevel());
  }

  public async loadCategories(level: string): Promise<void> {
    this.selectedLevel.set(level);
    await this.categoryService.getCategories(level);
  }

  public async goToCategory(level: string, category: string): Promise<void> {
    await this.categoryService.selectCategory(level, category);
    this.router.navigate(['/category', level, category]);
  }
}
