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
    const registerResult = await createUserWithEmailAndPassword(this.auth, email, password);
    await this.ensureUserDoc(registerResult.user);
    return registerResult;
  }

  public async login(email: string, password: string): Promise<UserCredential> {
    const loginResult = await signInWithEmailAndPassword(this.auth, email, password);
    await this.ensureUserDoc(loginResult.user);
    return loginResult;
  }

  public async googleSignIn(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    const googleSignResult = await signInWithPopup(this.auth, provider);
    await this.ensureUserDoc(googleSignResult.user);
    return googleSignResult;
  }

  public async logout(): Promise<void> {
    return await signOut(this.auth);
  }

  private async ensureUserDoc(user: UserCredential['user']) {
    await this.userService.createUserDoc(
      user.uid,
      user.email ?? '',
      user.displayName ?? ''
    );
  }
}
