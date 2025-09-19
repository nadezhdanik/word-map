import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc, serverTimestamp } from '@angular/fire/firestore';
import { UserDoc } from '../../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore = inject(Firestore);

  public async createUserDoc(uid: string, email: string, name: string): Promise<void> {
    const userRef = doc(this.firestore, `users/${uid}`);

    const userData: UserDoc = {
      uid,
      email,
      name,
      registrDate: serverTimestamp(),
      settings: {
        theme: 'light',
        language: 'ru',
      },
    };

    await setDoc(userRef, userData);
  }
}
