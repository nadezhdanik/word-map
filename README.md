# 🌍 WordMap — Expand Your English Vocabulary

- 🔗 [Live Demo](https://word-map.netlify.app)
- 🐞 [Report Issue](https://github.com/nadezhdanik/word-map/issues)

## 📖 Overview

**WordMap** is a lightweight, offline-capable app designed to help learners grow their English vocabulary.  
From **A1 beginners** to **B2 upper-intermediate**, WordMap adapts to your level, interests, and pace.  
No ads. No clutter. Just ⚡ speed and focus.

## 🛠️ Tech Stack

| Area                     | Tools                                                |
| ------------------------ | ---------------------------------------------------- |
| **Frontend**             | Angular v20.2.2, TypeScript, HTML, SCSS, Vite, Karma |
| **Backend**              | Firebase (auth, storage, sync)                       |
| **DevOps**               | ESLint                                               |
| **Management**           | GitHub Projects, Discord                             |
| **Features Implemented** | Signals, Lazy loading, Guards, Reactive Forms        |
| **Accessibility**        | Semantic HTML, ARIA labels, keyboard navigation      |

## 🚀 Getting Started

```bash
# Clone repository
git clone https://github.com/nadezhdanik/word-map.git

# Navigate to project folder
cd word-map

# Install dependencies
npm install

# Start development server
npm run start
```

## 📜 Scripts

The following NPM scripts are available for development, formatting, linting, and testing. Use them with:

```
npm run <script-name>
```

| Script  | Description                                               |
| ------- | --------------------------------------------------------- |
| `start` | Run dev server at [localhost:4200](http://localhost:4200) |
| `build` | Build project for production (`dist/`)                    |
| `watch` | Dev build with file watching                              |
| `lint`  | Run ESLint checks                                         |
| `test`  | Run unit tests                                            |

## ⚡ Angular Tips

Generate a new component:

```
ng generate component component-name
```

List all available schematics:

```
ng generate --help
```

## 👥 Team

🙈 [Tatsiana Hatskaya](https://github.com/TatsHats)

🙉 [Nadezhda Memelova](https://github.com/nadezhdanik)

🙊 [Alena Alekseeva](https://github.com/Alena1409)

##  Environment Variables

пример структуры firebaseConfig = {
  - **apiKey**: API ключ вашего Firebase проекта (пример: `<YOUR_API_KEY>`)
- **authDomain**: Домен аутентификации (пример: `<YOUR_AUTH_DOMAIN>`)
- **projectId**: ID проекта Firebase (пример: `<YOUR_PROJECT_ID>`)
- **storageBucket**: Хранилище файлов Firebase (пример: `<YOUR_STORAGE_BUCKET>`)
- **messagingSenderId**: ID отправителя для Firebase Cloud Messaging (пример: `<YOUR_MESSAGING_SENDER_ID>`)
- **appId**: Уникальный идентификатор приложения (пример: `<YOUR_APP_ID>`)
- **measurementId**: ID для Google Analytics (опционально) (пример: `<YOUR_MEASUREMENT_ID>`)

};

## Architecture diagram 
```
App
├─ app.ts / app.html / app.routes.ts / app.scss
├─ Core            // сервисы, модели, паттерны и guards
│  ├─ Firebase
│  │   ├─ firebase.config.ts
│  │   └─ firebase.providers.ts
│  ├─ Guards
│  │   ├─ auth-guard.ts
│  │   └─ no-auth-guard.ts
│  ├─ Models
│  │   ├─ category.interface.ts
│  │   ├─ theme.enum.ts
│  │   ├─ user.interface.ts
│  │   └─ words.interface.ts
│  ├─ Patterns
│  │   ├─ email-pattern.ts
│  │   └─ password-pattern.ts
│  └─ Services
│      ├─ Auth
│      ├─ Theme
│      ├─ User
│      └─ Word
├─ Features         // основные функциональные модули (страницы и их сервисы)
│  ├─ About
│  │   └─ team.data.ts
│  ├─ Category
│  │   └─ Features
│  │       ├─ EditWordsList
│  │       ├─ LearnWords
│  │       ├─ MatchPairs
│  │       └─ TrueFalse
│  ├─ Home
│  │   ├─ Services
│  │   ├─ Interfaces
│  │   └─ Mocks
│  ├─ Login
│  │   └─ Models
│  ├─ NotFound
│  ├─ Profile
│  ├─ Registration
│  │   └─ Models
│  └─ WordsLevel
└─ Shared
   ├─ Footer
   └─ Header
   ```