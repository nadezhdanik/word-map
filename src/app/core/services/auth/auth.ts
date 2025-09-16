import { inject, Injectable, signal } from '@angular/core';
import {
  Auth as FirebaseAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  public isUserLoggedIn = signal<boolean>(false);

  private auth = inject(FirebaseAuth);

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.isUserLoggedIn.set(!!user);
    });
  }

  public async register(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  public async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  public async googleSignIn(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  public async logout(): Promise<void> {
    return await signOut(this.auth);
  }
}
