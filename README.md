# Telegram Mini App. Start Kit

This project is a working template for creating a Telegram Mini App.

## Project Structure

- **Bot** – Telegram bot
- **Backend** – Backend for TMA and the bot
- **Frontend** – React application for TMA

## Features

- Authorization via Telegram
- Interactive UI with React
- Integration with external APIs
- User state persistence

## Technologies

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js 22 (Express), PostgreSQL
- **API**: Telegram Web Apps API, RESTful API
- **Build & Deployment**: Docker, Docker Compose, Makefile
- **Testing**: Jest

## Installation & Running

### Requirements

- Node.js 22
- Yarn
- Docker/Docker Compose
- Telegram Bot API token

### Installing dependencies

```sh
yarn install
```

### Running in development mode

```sh
yarn start
```

### Building the project

```sh
yarn build
```

## Environment Configuration

Create a `.env` file and specify:

```sh
BOT_TOKEN=your_telegram_bot_token
APP_URL=https://your-app-url.com
DATABASE_URL=postgres://user:password@localhost:5432/dbname
```

## License

This project is distributed under the **Prosperity Public License**.

**Free for non-commercial use.** Commercial use requires purchasing a license.

More details: [https://prosperitylicense.com](https://prosperitylicense.com)

## Author

[github.com/the-teacher](https://github.com/the-teacher)

## Contact

If you have any questions, feel free to contact me via Telegram: [@iam_the_teacher](https://t.me/iam_the_teacher)
