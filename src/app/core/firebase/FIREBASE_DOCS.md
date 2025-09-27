# Firebase Documentation

Using Firebase (Auth, Firestore) in the project:
- collection structure,
- document format,
- brief description of data services.

---

## Auth: **Firebase Authentication** to manage users:

- register(email, password) — user registration + document creation in users/{uid}
- login(email, password) — login via email/password
- googleSignIn() — login via Google
- logout() — logout
- verifyEmail() — send a confirmation email
- resetPassword(email) — reset password
- ensureUserDoc(user) — Checks for the presence of a profile, creates it if necessary, and initializes the progress (the entire progress database is created). This is used to prevent progress from being overwritten.

---

## Firestore: collection structure

### 1. User profile `users/{uid}`
```json
{
  "uid": "string",          // Unique identifier from Firebase Auth
  "email": "string",        // User's email
  "name": "string",         // Display name
  "createdAt": "Timestamp", // Profile creation date (serverTimestamp)
  "settings": {
  "theme": "light",         // 'light' | 'dark' | 'system'
  "language": "ru"          // interface language: 'en' | 'ru'
}
```

### 2. Dictionary documents `words/{wordId}`:
```json
{
  "wordId": "string",         // Unique word ID
  "category": "string",       // Category name (e.g. 'Animals')
  "level": "string",          // Level name (e.g. 'A1', 'B2')
  "partOfSpeech": "string",   // Grammar type: noun, verb, adjective, etc.
  "translation": "string",    // Translation into target language
  "word": "string"            // Original word
}
```

### 3. Progress documents for each word (each user has their own database) `progress/{uid}/words/{wordId}`:
```json
{
  "wordId": "string",             // Reference to words/{wordId}
  "level": "string",              // Level this word belongs to
  "category": "string",           // Category this word belongs to
  "correctCount": number,         // Number of correct answers (used for spaced repetition)
  "status": "new|learning|learned", // Current learning status
  "addedAt": "Timestamp",         // When user first saw this word
  "lastReviewed": "Timestamp|null", // Last time user practiced this word
  "nextReview": "Timestamp|null"  // Suggested next review time (spaced repetition scheduling)
}
```

### 3. Progress documents for each category of a certain level `progress/{uid}/stats/{level_category}`:
```json
{
  "level": "string",        // Level name (e.g. 'A2')
  "category": "string",     // Category name (e.g. 'Food')
  "totalCount": number,     // Total number of words in this category
  "learnedCount": number    // How many words user marked as 'learned'
}
```

## Firestore: methods for working with vocabulary and progress

### Creating documents
- createUserDoc(uid, email, name) — creates a document in users/{uid} Firebase
- createStatsDoc(uid, level, category) — creates a progress/{uid} statistics document in Firebase
- addWordProgress(uid, wordId, level, category) — creates progress by word in progress/{uid}/words/{wordId}
- initializeUserProgress(uid, allWords) — creates progress for all words (for correct progress display when registering a new user)

### Reading documents
- getWordProgress(uid, wordId) — get word progress
- getCategoryProgress(uid, level, category) — get category statistics
- getLevelProgress(uid, level, categories) — get level statistics
- getAllWords() — get all words from the words collection

### Updating documents
- updateWordStatus(uid, wordId, status) — update word status
- updateUserProgress(uid, words) — bulk adding/updating word statistics
