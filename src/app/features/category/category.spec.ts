import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { Category } from './category';
import { CategoryServiceMock } from '../home/services/categories.service.mock';

describe('Category', () => {
  let component: Category;
  let fixture: ComponentFixture<Category>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Category],
      providers: [
        CategoryServiceMock,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ level: 'A1', category: 'Food' })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Category);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set level and category from queryParams', () => {
    expect(component.level()).toBe('A1');
    expect(component.category()).toBe('Food');
  });

  it('should populate words based on selected category', () => {
    expect(component.words().length).toBeGreaterThan(0);
  });
});
