# Telegram Mini App. Start Kit

Этот проект представляет собой рабочую заготовку для создания Telegram Mini App.&#x20;

## Структура проекта

- **Bot** – телеграм-бот
- **Backend** – бэкенд для TMA и бота
- **Frontend** – React-приложение для TMA

## Функциональность

- Авторизация через Telegram
- Интерактивный UI с React
- Взаимодействие с внешним API
- Сохранение состояния пользователя

## Технологии

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js 22 (Express/NestJS), PostgreSQL
- **API**: Telegram Web Apps API, RESTful API
- **Сборка и деплой**: Docker, Docker Compose, Makefile
- **Тестирование**: Jest

## Установка и запуск

### Требования

- Node.js 22
- Yarn
- Docker/Docker Compose
- Telegram Bot API токен

### Установка зависимостей

```sh
yarn install
```

### Запуск в режиме разработки

```sh
yarn start
```

### Сборка проекта

```sh
yarn build
```

## Настройка окружения

Создайте файл `.env` и укажите в нём:

```sh
BOT_TOKEN=your_telegram_bot_token
APP_URL=https://your-app-url.com
DATABASE_URL=postgres://user:password@localhost:5432/dbname
```

## Деплой

### Docker

```sh
docker compose up --build -d
```

## Лицензия

Этот проект распространяется под лицензией MIT. Подробности в файле `LICENSE`.

## Автор

[github.com/the-teacher](https://github.com/the-teacher)

## Контакты

Если у вас есть вопросы, свяжитесь со мной через Telegram: @iam_the_teacher
