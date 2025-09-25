import { FieldValue, Timestamp } from 'firebase/firestore';

export interface UserDoc {
  uid: string;
  email: string;
  name: string;
  registrDate: Timestamp | FieldValue;
  settings: {
    theme: 'light' | 'dark';
    language: 'ru' | 'en';
  };
}
