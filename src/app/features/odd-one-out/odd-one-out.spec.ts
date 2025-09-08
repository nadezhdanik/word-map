import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OddOneOut } from './odd-one-out';

describe('OddOneOut', () => {
  let component: OddOneOut;
  let fixture: ComponentFixture<OddOneOut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OddOneOut]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OddOneOut);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
