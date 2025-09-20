import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWordsList } from './edit-words-list';

describe('EditWordsList', () => {
  let component: EditWordsList;
  let fixture: ComponentFixture<EditWordsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditWordsList],
    }).compileComponents();

    fixture = TestBed.createComponent(EditWordsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
