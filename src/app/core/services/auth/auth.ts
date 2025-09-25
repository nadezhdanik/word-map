import { inject, Injectable, signal } from '@angular/core';
import { UserService } from '../user/user';
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
  private userService = inject(UserService);

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.isUserLoggedIn.set(!!user);
    });
  }

  public async register(email: string, password: string): Promise<UserCredential> {
    const result = await createUserWithEmailAndPassword(this.auth, email, password);
    await this.userService.ensureUserDoc(result.user);
    return result;
  }

  public async login(email: string, password: string): Promise<UserCredential> {
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    return result;
  }

  public async googleSignIn(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    return result;
  }

  public async logout(): Promise<void> {
    return await signOut(this.auth);
  }
}
