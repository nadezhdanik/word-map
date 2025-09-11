import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth as FirebaseAuth } from '@angular/fire/auth';

import { Registration } from './registration';

describe('Registration', () => {
  let component: Registration;
  let fixture: ComponentFixture<Registration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registration],
      providers: [
        {
          provide: FirebaseAuth,
          useValue: {
            onAuthStateChanged: jasmine.createSpy()
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Registration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
