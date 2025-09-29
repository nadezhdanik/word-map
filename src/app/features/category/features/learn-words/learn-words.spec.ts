import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnWords } from './learn-words';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('LearnWords', () => {
  let component: LearnWords;
  let fixture: ComponentFixture<LearnWords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnWords],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(
              new Map([
                ['level', 'A1'],
                ['category', 'Food'],
              ]),
            ),
            snapshot: {
              paramMap: new Map([
                ['level', 'A1'],
                ['category', 'Food'],
              ]),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LearnWords);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
