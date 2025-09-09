import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnWords } from './learn-words';

describe('LearnWords', () => {
  let component: LearnWords;
  let fixture: ComponentFixture<LearnWords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnWords]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnWords);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
