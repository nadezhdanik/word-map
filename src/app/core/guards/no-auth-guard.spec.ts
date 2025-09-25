import { TestBed } from '@angular/core/testing';
import { CanActivateFn, provideRouter } from '@angular/router';
import { noAuthGuard } from './no-auth-guard';
import { Auth as FirebaseAuth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

describe('noAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => noAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
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
          useValue: {},
        },
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
