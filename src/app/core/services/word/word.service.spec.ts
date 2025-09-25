import { TestBed } from '@angular/core/testing';
import { WordService } from './word.service';
import { CategoryService } from '../../../features/home/services/categories.service';
import { Firestore } from '@angular/fire/firestore';

describe('Tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordService, CategoryService, { provide: Firestore, useValue: {} }],
    });
  });

  it('should create WordService', () => {
    const service = TestBed.inject(WordService);
    expect(service).toBeTruthy();
  });

  it('should create CategoryService', () => {
    const service = TestBed.inject(CategoryService);
    expect(service).toBeTruthy();
  });
});
