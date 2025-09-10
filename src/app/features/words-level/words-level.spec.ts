import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsLevel } from './words-level';

describe('WordsLevel', () => {
  let component: WordsLevel;
  let fixture: ComponentFixture<WordsLevel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordsLevel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordsLevel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
