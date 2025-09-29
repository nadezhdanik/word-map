import { TestBed } from '@angular/core/testing';
import { Home } from './home';
import { CategoryService } from './services/categories.service';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { UserService } from '../../core/services/user/user';

describe('Home', () => {
  let home: Home;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        CategoryService,
        { provide: Firestore, useValue: {} },
        { provide: Auth, useValue: {} },
        {
          provide: UserService,
          useValue: {
            getCategoryProgress: async (): Promise<{
              totalCount: number;
              learnedCount: number;
              percent: number;
            }> => ({
              totalCount: 0,
              learnedCount: 0,
              percent: 0,
            }),
            getLevelProgress: async (): Promise<{
              totalCount: number;
              learnedCount: number;
              percent: number;
            }> => ({
              totalCount: 0,
              learnedCount: 0,
              percent: 0,
            }),
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(Home);
    home = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(home).toBeTruthy();
  });

  it('should have correct levels', (): void => {
    expect(home.levels).toEqual(['A1', 'A2', 'B1', 'B2']);
  });

  it('should have default selected level as "A1"', (): void => {
    expect(home.selectedLevel()).toBe('A1');
  });
});
