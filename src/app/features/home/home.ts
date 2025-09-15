//import { CategoryService } from './services/categories.service';
import { ChangeDetectionStrategy, Component, Signal, inject, signal } from '@angular/core';
import { CategoryServiceMock } from './services/categories.service.mock';
import { Category } from './interfaces/categories.interface';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  //private categoryService = inject(CategoryService);
  private categoryService = inject(CategoryServiceMock);
  private router = inject(Router);

  public levels: string[] = ['A1', 'A2', 'B1', 'B2'];
  public selectedLevel = signal<string>('A1');
  public categories: Signal<Category[]> = this.categoryService.getCategories(this.selectedLevel());
  
  public loadCategories (level: string): void {
    this.selectedLevel.set(level);
    this.categories = this.categoryService.getCategories(level);
  }

  goToCategory(level: string, category: string) {
    this.categoryService.selectCategory(level, category);
    this.router.navigate(['/category', level, category]);
  }
}
