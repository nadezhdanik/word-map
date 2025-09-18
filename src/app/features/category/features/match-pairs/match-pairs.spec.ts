import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPairs } from './match-pairs';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('MatchPairs', () => {
  let component: MatchPairs;
  let fixture: ComponentFixture<MatchPairs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchPairs],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['level', 'A1'], ['category', 'Food']])),
            snapshot: { paramMap: new Map([['level', 'A1'], ['category', 'Food']]) }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchPairs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
