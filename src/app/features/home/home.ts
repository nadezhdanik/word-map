import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CategoryService } from './services/categories.service';
import { UserService } from '../../core/services/user/user';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  imports: [RouterModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  public categoryService = inject(CategoryService);
  public levels: string[] = ['A1', 'A2', 'B1', 'B2'];
  public selectedLevel = signal<string>('A1');
  public categories = this.categoryService.categories;
  public isLoading = signal(true);

  public categoryProgress = signal<
    Record<string, { totalCount: number; learnedCount: number; percent: number }>
  >({});

  public levelProgress = signal<
    Record<string, { totalCount: number; learnedCount: number; percent: number }>
  >({});

  public readonly categoriesWithProgress = computed(() => {
    const cats = this.categories();
    const progress = this.categoryProgress();
    return cats.map((cat) => ({
      ...cat,
      ...(progress[cat.name] ?? { totalCount: 0, learnedCount: 0, percent: 0 }),
    }));
  });

  private router = inject(Router);
  private userService = inject(UserService);
  private auth = inject(Auth);

  public ngOnInit(): void {
    this.loadCategories(this.selectedLevel());
  }

  public async loadCategories(level: string): Promise<void> {
    this.isLoading.set(true);
    this.selectedLevel.set(level);
    await this.categoryService.getCategories(level);

    const uid = this.auth.currentUser?.uid;

    if (!uid) {
      this.isLoading.set(false);
      return;
    }

    const cats = this.categoryService.categories();
    const progressMap: Record<
      string,
      { totalCount: number; learnedCount: number; percent: number }
    > = {};

    await Promise.all(
      cats.map(async (cat) => {
        progressMap[cat.name] = await this.userService.getCategoryProgress(uid, level, cat.name);
      }),
    );

    this.categoryProgress.set(progressMap);

    const levelStats = await this.userService.getLevelProgress(
      uid,
      level,
      cats.map((c) => c.name),
    );

    this.levelProgress.update((prev) => ({
      ...prev,
      [level]: levelStats,
    }));
    this.isLoading.set(false);
  }

  public async goToCategory(level: string, category: string): Promise<void> {
    await this.categoryService.selectCategory(level, category);
    this.router.navigate(['/category', level, category]);
  }
}
