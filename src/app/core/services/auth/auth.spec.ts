import { TestBed } from '@angular/core/testing';
import { Auth as FirebaseAuth } from '@angular/fire/auth';
import { Auth } from './auth';
import { Firestore } from '@angular/fire/firestore';

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Auth,
        {
          provide: FirebaseAuth,
          useValue: {
            onAuthStateChanged: jasmine.createSpy(),
            createUserWithEmailAndPassword: jasmine.createSpy(),
            signInWithEmailAndPassword: jasmine.createSpy(),
            signOut: jasmine.createSpy(),
          },
        },
        {
          provide: Firestore,
          useValue: {}
        },
      ],
    });
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
