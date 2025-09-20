import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { Auth as FirebaseAuth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        {
          provide: FirebaseAuth,
          useValue: {
            onAuthStateChanged: jasmine.createSpy(),
          },
        },
        {
          provide: Firestore,
          useValue: {}
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
