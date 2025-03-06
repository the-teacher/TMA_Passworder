// Example Type: LaunchParams
// BASED ON: https://github.com/Telegram-Mini-Apps/telegram-apps/tree/master/packages/types/src
export type LaunchParams = {
  tgWebAppBotInline?: boolean;
  tgWebAppData?: {
    initData: string;
    hash: string;
    auth_date: number;
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
      is_premium?: boolean;
      photo_url?: string;
    };
    chat?: {
      id: number;
      type: "private" | "group" | "supergroup" | "channel";
      title?: string;
      username?: string;
      photo_url?: string;
    };
    start_param?: string;
    message_id?: number;
    session_id?: string;
  };
  tgWebAppDefaultColors?: {
    bg_color: string;
    text_color: string;
    hint_color: string;
    link_color: string;
    button_color: string;
    button_text_color: string;
    secondary_bg_color: string;
  };
  tgWebAppFullscreen?: boolean;
  tgWebAppPlatform:
    | "android"
    | "ios"
    | "macos"
    | "tdesktop"
    | "web"
    | "weba"
    | string;
  tgWebAppShowSettings?: boolean;
  tgWebAppStartParam?: string;
  tgWebAppThemeParams: {
    bg_color: string;
    text_color: string;
    hint_color: string;
    link_color: string;
    button_color: string;
    button_text_color: string;
    secondary_bg_color: string;
  };
  tgWebAppVersion: string;
};
