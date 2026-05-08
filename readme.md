# Лелека — Backend

Backend частина застосунку **Лелека**, створена студентами курсу FullStack у школі GoIT для практики Node.js та командної роботи з Git/GitHub, яка забезпечує API для відстеження вагітності, збереження записів користувача, настрою та щоденника.

## Основний функціонал

- Аутентифікація користувачів
- Управління профілем
- Відстеження поточного тижня вагітності
- CRUD (Create/Read/Update/Delete) для нотаток з важливими справами
- Записи про самопочуття та плани
- Збереження та відстеження настрою
- Щоденні поради для мами
- Зміна кольору теми в залежності від статі малюка

## Технології

- Node.js
- Express
- MongoDB
- JWT (аутентифікація)
- dotenv
- CORS

## Запуск проєкту

```bash
# Клонувати репозиторій
git clone https://github.com/Oleksii996/project-DeCodery-Back.git

# Перейти в папку
cd project-DeCodery-Back

# Встановити залежності
npm install

# Запустити сервер
npm run dev
```

## Змінні середовища

Створити файл `.env`:

```env
PORT=4000
MONGO_URI=mongodb_connection_string
JWT_SECRET=your_secret_key
```

## 📡 API (приклади)

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Users

- `GET /users/me`
- `PATCH /users/me`

### Diary

- `GET /diary`
- `POST /diary`
- `PATCH /diary/:id`
- `DELETE /diary/:id`

### Mood

- `POST /mood`
- `GET /mood`

## Структура

```bash
src/
│
├── constants/              # Константи (наприклад, стать дитини, час і т.д.)
│   ├── babyGender.js
│   ├── time.js
│   └── index.js
│
├── controllers/            # Контролери (обробка HTTP-запитів)
│   ├── auth/               # Аутентифікація
│   │   ├── loginUser.js
│   │   ├── logoutUser.js
│   │   ├── refreshSessionController.js
│   │   └── registerUser.js
│   │
│   ├── diaries/            # Щоденник (CRUD)
│   │   └── diariesControllers.js
│   │
│   ├── tasks/              # Завдання
│   │   ├── createTask.js
│   │   ├── getTask.js
│   │   └── updateTaskStatus.js
│   │
│   ├── users/              # Користувач
│   │   ├── getCurrentUser.js
│   │   ├── updateCurrentUser.js
│   │   ├── usersController.js
│   │   └── userThemaController.js
│   │
│   ├── weeks/              # Дані по тижнях вагітності
│   │   ├── getWeekData.js
│   │   ├── getPrivateWeekData.js
│   │   └── weeksController.js
│   │
│   ├── emotionsController.js  # Настрій/емоції
│   └── index.js
│
├── db/                     # Підключення до бази даних
│   └── connectMongoDB.js
│
├── middleware/             # Middleware
│   ├── authenticate.js     # Перевірка JWT
│   ├── authThema.js
│   ├── errorHandler.js
│   ├── notFoundHandler.js
│   ├── upload.js           # Завантаження файлів
│   └── validateImageUpload.js
│
├── models/                 # Mongoose моделі
│   ├── user.js
│   ├── diary.js
│   ├── task.js
│   ├── emotion.js
│   ├── baby_state.js
│   ├── mom_state.js
│   ├── session.js
│   └── user_thema.js
│
├── routes/                 # Роути API
│   ├── authRouter.js
│   ├── diariesRouter.js
│   ├── tasksRouter.js
│   ├── emotionsRouter.js
│   ├── usersRouter.js
│   └── weeksRouter.js
│
├── services/               # Бізнес-логіка
│   ├── auth/
│   │   ├── loginUserService.js
│   │   ├── logoutUserService.js
│   │   ├── refreshService.js
│   │   ├── registerUserService.js
│   │   └── SessionService.js
│   │
│   ├── diaries/
│   ├── tasks/
│   ├── users/
│   └── weeks/
│       ├── getWeeksDashboard.js
│       └── getWeekState.js
│
├── utils/                  # Допоміжні функції
│   ├── getDashboardPregnancy.js
│   ├── getPregnancyProgress.js
│   ├── saveFileToCloudinary.js
│   └── index.js
│
├── validations/            # Валідації
│   ├── authValidation.js
│   ├── diaryValidation.js
│   ├── emotionValidation.js
│   ├── userThemaValidator.js
│   └── index.js
│
└── server.js               # Точка входу (Express сервер)
```

## Frontend

Frontend частина доступна тут:
https://github.com/Oleksii996/project-decodery-front

## Команда

Проєкт розробляли 14 студентів GOIT:

- [Oleksii996](https://github.com/Oleksii996)
- [AndriiZahoruiko2000](https://github.com/AndriiZahoruiko2000)
- [Romario198901](https://github.com/Romario198901)
- [vitaliiaSel0907](https://github.com/vitaliiaSel0907)
- [Sliliia85](https://github.com/Sliliia85)
- [Vlad2346543](https://github.com/Vlad2346543)
- [Anastasiia-git](https://github.com/Anastasiia-git)
- [Ruslan-Dev-JS](https://github.com/Ruslan-Dev-JS)
- [Taras-Lisnyak](https://github.com/Taras-Lisnyak)
- [Altavana](https://github.com/Altavana)
- [Mykola1812-hub](https://github.com/Mykola1812-hub)
- [ArtuR188](https://github.com/ArtuR188)
- [Skyzary](https://github.com/Skyzary)
- [yuliiapazushkina](https://github.com/yuliiapazushkina)

MIT License — вільне використання для навчання та особистих проєктів.

## Створено в рамках курсу FullStack від GoIT © 2025
