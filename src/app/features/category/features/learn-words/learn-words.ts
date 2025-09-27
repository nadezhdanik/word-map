import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryServiceMock } from '../../../home/services/categories.service.mock';
import { Card } from './models/card.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-learn-words',
  imports: [MatIconModule, MatCardModule],
  templateUrl: './learn-words.html',
  styleUrl: './learn-words.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnWords implements OnInit {
  public level = '';
  public category = '';
  public currentCard = signal<Card>({ word: '', translation: '', showTranslation: false });
  public isFinished = signal(false);
  public isVisible = signal(true);

  private cards: Card[] = [];
  private currentIndex = signal(0);

  private categoryService = inject(CategoryServiceMock);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public ngOnInit(): void {
    this.getCardData();
    this.updateCurrentCard();
  }

  public goBack(): void {
    this.router.navigate(['/category', this.level, this.category]);
  }

  public toggleTranslation(): void {
    const card = this.currentCard();
    if (!card.showTranslation) {
      this.currentCard.set({ ...card, showTranslation: true });
    }
  }

  public knewCard(): void {
    this.cards.splice(this.currentIndex(), 1);
    if (this.currentIndex() >= this.cards.length) this.currentIndex.set(0);
    this.fadeAndNext();
  }

  public didntKnowCard(): void {
    this.currentIndex.set(this.currentIndex() + 1);
    if (this.currentIndex() >= this.cards.length) this.currentIndex.set(0);
    this.fadeAndNext();
  }

  public resetCards(): void {
    this.currentIndex.set(0);
    this.isFinished.set(false);
    this.getCardData();
    this.updateCurrentCard();
  }

  private fadeAndNext(): void {
    this.isVisible.set(false);
    this.updateCurrentCard();

    setTimeout(() => {
      this.isVisible.set(true);
    }, 300);
  }

  private getCardData(): void {
    const level = this.route.snapshot.paramMap.get('level');
    const category = this.route.snapshot.paramMap.get('category');

    if (level && category) {
      this.level = level;
      this.category = category;

      const words = this.categoryService.getWords(level, category);
      this.cards = words.map((w) => ({
        word: w.word,
        translation: w.translation,
        showTranslation: false,
      }));
    }
  }

  private updateCurrentCard(): void {
    const index = this.currentIndex();
    if (this.cards.length > 0 && index < this.cards.length) {
      this.currentCard.set(this.cards[index]);
    } else {
      this.isFinished.set(true);
      this.currentCard.set({ word: '', translation: '', showTranslation: false });
    }
  }
}
