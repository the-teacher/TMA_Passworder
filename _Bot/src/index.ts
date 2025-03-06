// DOCS:
// https://core.telegram.org/bots/api#available-methods

import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { loggerMiddleware } from './middlewares/logger.js';
import { createWebAppKeyboard } from './utils/keyboards.js';

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

// Log when bot starts
console.log('Bot is initializing...');

// Use logger middleware
bot.use(loggerMiddleware);

// Set the web app button in the menu
bot.telegram.setChatMenuButton({
  menuButton: {
    type: 'web_app',
    text: 'Open Mini App',
    web_app: {
      url: process.env.MINI_APP_URL!,
    },
  },
});

// Simple start command with inline keyboard
bot.start((ctx) => {
  console.log('Start command received');

  // Create the keyboard with the web app button
  const keyboard = createWebAppKeyboard(process.env.MINI_APP_URL!);

  ctx.reply('Welcome! Click the button below to open the mini app.', {
    reply_markup: keyboard,
  });
});

// Log when web app button is clicked
bot.on('web_app_data', (ctx) => {
  console.log('Web app data received:', ctx.webAppData);
});

// Launch the bot
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => {
  console.log('SIGINT received, shutting down...');
  bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  bot.stop('SIGTERM');
});

console.log('Bot is running...');
