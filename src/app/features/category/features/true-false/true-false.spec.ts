import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueFalse } from './true-false';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('TrueFalse', () => {
  let component: TrueFalse;
  let fixture: ComponentFixture<TrueFalse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrueFalse],
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

    fixture = TestBed.createComponent(TrueFalse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
