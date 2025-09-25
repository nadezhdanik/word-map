# Firebase Documentation

Использование **Firebase** (Auth, Firestore) в проекте:
- структура коллекций,
- формат документов,
- краткое описание сервисов для работы с данными.

---

## Auth: **Firebase Authentication** для управления пользователями:

- register(email, password) — регистрация пользователя + создание документа в users/{uid}
- login(email, password) — вход по email/паролю
- googleSignIn() — вход через Google
- logout() — выход
- verifyEmail() — отправка письма подтверждения
- resetPassword(email) — сброс пароля
ensureUserDoc(user) — проверка существования профиля, при необходимости создаёт + инициализирует прогресс. Используется чтобы не перезаписывался прогресс

---

## Firestore: структура коллекций

### 1. Профиль пользователя `users/{uid}`
```json
{
  "uid": "string",          // идентификатор из Firebase Auth
  "email": "string",        // почта пользователя
  "name": "string",         // отображаемое имя
  "createdAt": "Timestamp", // дата создания профиля
  "settings": {
    "theme": "light",       // 'light' | 'dark' | 'system'
    "language": "ru"        // язык интерфейса: 'en' | 'ru'
  }
}
```

### 2. Документы словаря `progress/{uid}/words/{wordId}`:
```json
{
  wordId: string,
  level: string,
  category: string,
  correctCount: number,  // сколько раз угадал(а) верно – до 5
  status: 'new'|'learning'|'learned',	- export type WordStatus = 'new' | 'learning' | 'learned';
  addedAt: Timestamp,
  lastReviewed: Timestamp | null,
  nextReview: Timestamp | null
}
```

### 3. Документы прогресса для каждого слова (для каждого пользователя своя база) `progress/{uid}/stats/{level_cat}`:
```json
{
  level: string,
  category: string,
  totalCount: number,   //общее количество слов
  learnedCount: number  //сколько выучено
}
```

### 4. Документ прогресса по категориям и уровням `users/{uid}`:
```json
{
  uid: string,           // уникальный идентификатор из Firebase Auth
  email: string,         // почта пользователя (можно использовать для связи, логина)
  name: string,          // имя, которое показываем в профиле (пустое, если не указано)
  createdAt: Timestamp,  // дата создания профиля (serverTimestamp, чтобы сервер выст. точное вр.)
  settings: {            // блок с настройками пользователя (чтоб хранить в одном месте)
    theme: string,       // тема интерфейса: 'light' | 'dark' | 'system'
    language: string     // язык интерфейса: 'en' | 'ru' | и т.п.
  }
}
```

---

## Firestore: методы для работы со словарем и прогрессом

### Создание документов
- createUserDoc(uid, email, name) — создаёт документ в users/{uid} Firebase
- createStatsDoc(uid, level, category) — создаёт документ progress/{uid} статистики в Firebase
- addWordProgress(uid, wordId, level, category) — создаёт прогресс по слову в progress/{uid}/words/{wordId}
- initializeUserProgress(uid, allWords) — создаёт прогресс по всем словам (при регистрации нового пользователя для корректного отображения прогресса)

### Чтение документов
- getWordProgress(uid, wordId) — получить прогресс по слову
- getCategoryProgress(uid, level, category) — получить статистику по категории
- getLevelProgress(uid, level, categories) — получить статистику по уровню
- getAllWords() — получить все слова из коллекции words

### Обновление документов
- updateWordStatus(uid, wordId, status) — обновить статус слова
- updateUserProgress(uid, words) — массовое добавление/обновление статистики слов
