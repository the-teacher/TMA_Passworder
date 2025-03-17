export type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  premium?: boolean;
  language_code?: string;
  allows_write_to_pm?: boolean;
  photo_url?: string;
};
