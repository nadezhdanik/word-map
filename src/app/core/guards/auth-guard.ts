import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { authState, Auth as FirebaseAuth } from '@angular/fire/auth';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(FirebaseAuth);

  return authState(auth).pipe(
    take(1),
    map((user) => (user ? true : router.parseUrl('/home'))),
  );
};
