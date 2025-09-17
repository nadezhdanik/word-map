import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Card } from './models/card.interface';
import { TYPE } from './models/card-type.enum';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-match-pairs',
  imports: [ FormsModule, MatButtonToggleModule],
  templateUrl: './match-pairs.html',
  styleUrl: './match-pairs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchPairs implements OnInit {
  public cards: Card[] = [];
  public easyMode = false;

  public WORDS = [
    { category: "Question words", level: "A1", partOfSpeech: "phrase", translation: "какого рода", word: "what kind" },
    { category: "Common verbs", level: "A1", partOfSpeech: "verb", translation: "делать", word: "to do" },
    { category: "Common verbs", level: "A1", partOfSpeech: "verb", translation: "идти", word: "to go" },
    { category: "Colors", level: "A1", partOfSpeech: "adjective", translation: "красный", word: "red" },
    { category: "Animals", level: "A1", partOfSpeech: "noun", translation: "кошка", word: "cat" },
    { category: "Food", level: "A1", partOfSpeech: "noun", translation: "яблоко", word: "apple" },
    { category: "Time", level: "A1", partOfSpeech: "noun", translation: "сегодня", word: "today" },
    { category: "Family", level: "A1", partOfSpeech: "noun", translation: "мать", word: "mother" },
    { category: "Numbers", level: "A1", partOfSpeech: "number", translation: "один", word: "one" },
    { category: "Common verbs", level: "A1", partOfSpeech: "verb", translation: "быть", word: "to be" }
  ];

  public ngOnInit(): void {
    this.createCards();
  }

  public createCards (): void {
    this.WORDS.forEach((element, index) => {
      this.cards.push({
        content: element.word,
        pairId: index,
        type: TYPE.EN,
        opened: this.easyMode,
        matched: false,
      })
    });

    this.WORDS.forEach((element, index) => {
      this.cards.push({
        content: element.translation,
        pairId: index,
        type: TYPE.RUS,
        opened: this.easyMode,
        matched: false,
      })
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
    this.easyMode = !this.easyMode
  }

    public onCardClick(card: Card): void {
    if (this.easyMode || card.opened || card.matched) {
      return;
    }

    card.opened = true;
    // здесь добавишь логику проверки пары (например, сравнивать с предыдущей выбранной картой)
  }

}
