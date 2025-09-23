import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Card } from './models/card.interface';
import { TYPE } from './models/card-type.enum';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { CategoryServiceMock } from '../../../home/services/categories.service.mock';
import { ActivatedRoute, Router } from '@angular/router';
import { Word } from '../../../home/interfaces/word.interface';
import { COUNT_MODE } from './models/count-mods.enum';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-match-pairs',
  imports: [FormsModule, MatButtonToggleModule, MatIcon, MatTooltipModule],
  templateUrl: './match-pairs.html',
  styleUrl: './match-pairs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchPairs implements OnInit {
  public cards: Card[] = [];
  public easyMode = false;
  public gameWon = false;
  public words: Word[] = [];
  public countMode: COUNT_MODE.ALL | COUNT_MODE.HALF = COUNT_MODE.ALL;
  public level = '';
  public category = '';

  private firstCard: Card | null = null;
  private secondCard: Card | null = null;
  private isLocked = false;
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private categoryService = inject(CategoryServiceMock);
  private router = inject(Router);

  public ngOnInit(): void {
    const level = this.route.snapshot.paramMap.get('level');
    const category = this.route.snapshot.paramMap.get('category');

    if (level && category) {
      this.level = level;
      this.category = category;
      this.words = this.categoryService.getWords(level, category);
      this.createCards();
    }
  }

  public createCards(): void {
    let selectedWords = [...this.words];

    if (this.countMode === COUNT_MODE.HALF) {
      const half = Math.floor(selectedWords.length / 2);
      selectedWords = [...selectedWords].sort(() => Math.random() - 0.5).slice(0, half);
    }

    this.cards = [];

    selectedWords.forEach((element, index) => {
      this.cards.push({
        content: element.word,
        pairId: index,
        type: TYPE.EN,
        opened: false,
        matched: false,
      });
    });

    selectedWords.forEach((element, index) => {
      this.cards.push({
        content: element.translation,
        pairId: index,
        type: TYPE.RUS,
        opened: false,
        matched: false,
      });
    });

    this.shuffleCards();
  }

  public shuffleCards(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  public changeMode(): void {
    this.easyMode = !this.easyMode;
  }

  public onCardClick(card: Card): void {
    if (this.gameWon || this.isLocked || card.opened || card.matched) {
      return;
    }

    card.opened = true;

    if (this.firstCard === null) {
      this.firstCard = card;
    } else {
      this.secondCard = card;
      this.isLocked = true;

      if (this.firstCard.pairId === this.secondCard.pairId) {
        this.firstCard.matched = true;
        this.secondCard.matched = true;
        this.checkIfGameIsWon();
        this.resetCards();
      } else {
        this.firstCard.error = true;
        this.secondCard.error = true;
        setTimeout(() => {
          if (this.firstCard && this.secondCard) {
            this.firstCard.error = false;
            this.secondCard.error = false;
            this.firstCard.opened = false;
            this.secondCard.opened = false;
            this.resetCards();
            this.cdr.markForCheck();
          }
        }, 700);
      }
    }
    this.cdr.markForCheck();
  }

  public resetCards(): void {
    this.firstCard = null;
    this.secondCard = null;
    this.isLocked = false;
  }

  public toBack(): void {
    this.router.navigate(['/category', this.level, this.category]);
  }

  public restartGame(): void {
    this.gameWon = false;
    this.isLocked = false;
    this.firstCard = null;
    this.secondCard = null;
    this.cards = [];

    this.createCards();
    this.cdr.markForCheck();
  }

  private checkIfGameIsWon(): void {
    if (this.cards.every((a) => a.matched === true)) {
      this.gameWon = true;
    }
  }
}
