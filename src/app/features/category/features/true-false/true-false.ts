import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Word } from '../../../home/interfaces/word.interface';
import { CategoryServiceMock } from '../../../home/services/categories.service.mock';
import { ActivatedRoute } from '@angular/router';
import { Card } from './models/card.model';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-true-false',
  imports: [MatCardModule, MatIcon],
  templateUrl: './true-false.html',
  styleUrl: './true-false.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrueFalse implements OnInit {
  public firstCard: Card = { word: '', translation: '' };
  public secondCard: Card = { word: '', translation: '' };
  public displayedTranslation = signal('');
  public choiceMade = signal(false);
  public result = signal('');

  private words: Word[] = [];

  private categoryServiceMock = inject(CategoryServiceMock);
  private route = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.resetGame();
  }

  public makeChoice(userThinksTrue: boolean): void {
    const actualIsTrue = this.firstCard.translation === this.displayedTranslation();

    if (userThinksTrue === actualIsTrue) {
      this.result.set('Correct!');
    } else {
      this.result.set('Wrong!');
    }

    this.choiceMade.set(true);
  }

  public resetGame(): void {
    this.choiceMade.set(false);
    this.result.set('');

    const level = this.route.snapshot.paramMap.get('level');
    const category = this.route.snapshot.paramMap.get('category');

    if (level && category) {
      this.words = this.categoryServiceMock.getWords(level, category);
    }

    this.getRandomWord(this.firstCard);
    this.getRandomWord(this.secondCard);

    const isCorrectTranslation = Math.random() < 0.5;
    this.displayedTranslation.set(
      isCorrectTranslation ? this.firstCard.translation : this.secondCard.translation,
    );
  }

  private getRandomWord(card: Card): void {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    card.word = this.words[randomIndex].word;
    card.translation = this.words[randomIndex].translation;
  }
}
