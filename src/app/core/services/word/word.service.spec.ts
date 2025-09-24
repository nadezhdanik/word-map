import { TestBed } from '@angular/core/testing';

import { WordService } from './word.service';
import { Firestore } from 'firebase/firestore';

describe('Word', () => {
  let service: WordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordService, { provide: Firestore, useValue: {} }],
    });
    service = TestBed.inject(WordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
