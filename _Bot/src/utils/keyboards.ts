import { InlineKeyboardButton, InlineKeyboardMarkup } from 'telegraf/types';

/**
 * Creates an inline keyboard with a button to open the mini app
 */
export const createWebAppKeyboard = (url: string): InlineKeyboardMarkup => {
  const webAppButton: InlineKeyboardButton = {
    text: 'Open Mini App',
    web_app: { url },
  };

  return {
    inline_keyboard: [[webAppButton]],
  };
};
