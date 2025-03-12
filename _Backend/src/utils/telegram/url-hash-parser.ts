// yarn tsx ./src/utils/telegram/url-hash-parser.ts

// Error and log messages
const ERROR_PARSE_USER = 'Failed to parse user data:';
const ERROR_PARSE_THEME = 'Failed to parse theme params:';
const ERROR_PARSE_URL = 'Error parsing URL hash:';

// Output section headers
const HEADER_TELEGRAM_DATA = '=== Telegram WebApp Data ===';
const HEADER_USER_INFO = '\n=== User Info ===';
const HEADER_AUTHENTICATION = '\n=== Authentication ===';
const HEADER_WEBAPP_INFO = '\n=== WebApp Info ===';
const HEADER_THEME_PARAMS = '\n=== Theme Parameters ===';

// Output labels
const LABEL_QUERY_ID = 'Query ID:';
const LABEL_USER_ID = 'ID:';
const LABEL_USER_NAME = 'Name:';
const LABEL_USERNAME = 'Username:';
const LABEL_LANGUAGE = 'Language:';
const LABEL_PHOTO_URL = 'Photo URL:';
const LABEL_AUTH_DATE = 'Auth Date:';
const LABEL_SIGNATURE = 'Signature:';
const LABEL_VERSION = 'Version:';
const LABEL_PLATFORM = 'Platform:';
const LABEL_NA = 'N/A';

type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  allows_write_to_pm?: boolean;
  photo_url?: string;
};

export type TelegramWebAppData = {
  query_id?: string;
  user?: TelegramUser;
  auth_date?: number;
  hash?: string;
  signature?: string;
  tgWebAppVersion?: string;
  tgWebAppPlatform?: string;
  tgWebAppThemeParams?: Record<string, string>;
};

/**
 * Parse Telegram WebApp URL hash and extract data
 * @param url - The full Telegram WebApp URL to parse
 * @returns Parsed Telegram WebApp data
 */
export const parseUrlHash = (url: string): TelegramWebAppData => {
  try {
    // Extract part of URL after #
    const hashPart = url.split('#')[1] || '';

    // Parse parameters
    const params = new URLSearchParams(hashPart);

    // Get tgWebAppData and decode it
    const tgWebAppData = params.get('tgWebAppData') || '';
    const webAppParams = new URLSearchParams(tgWebAppData);

    // Extract and parse user data
    let user: TelegramUser | undefined;
    const userStr = webAppParams.get('user');
    if (userStr) {
      try {
        user = JSON.parse(decodeURIComponent(userStr));
      } catch (e) {
        console.error(ERROR_PARSE_USER, e);
      }
    }

    // Collect all data
    const result: TelegramWebAppData = {
      query_id: webAppParams.get('query_id') || undefined,
      user,
      auth_date: webAppParams.get('auth_date')
        ? parseInt(webAppParams.get('auth_date')!)
        : undefined,
      hash: webAppParams.get('hash') || undefined,
      signature: webAppParams.get('signature') || undefined,
      tgWebAppVersion: params.get('tgWebAppVersion') || undefined,
      tgWebAppPlatform: params.get('tgWebAppPlatform') || undefined,
    };

    // Parse theme parameters if they exist
    const themeParamsStr = params.get('tgWebAppThemeParams');
    if (themeParamsStr) {
      try {
        result.tgWebAppThemeParams = JSON.parse(decodeURIComponent(themeParamsStr));
      } catch (e) {
        console.error(ERROR_PARSE_THEME, e);
      }
    }

    return result;
  } catch (error) {
    console.error(ERROR_PARSE_URL, error);
    return {};
  }
};

/**
 * Pretty print Telegram WebApp data
 * @param parsedData - The parsed Telegram WebApp data
 */
export const printTelegramWebAppData = (parsedData: TelegramWebAppData): void => {
  console.log(HEADER_TELEGRAM_DATA);
  console.log(LABEL_QUERY_ID, parsedData.query_id);
  console.log(HEADER_USER_INFO);
  if (parsedData.user) {
    console.log(LABEL_USER_ID, parsedData.user.id);
    console.log(
      LABEL_USER_NAME,
      `${parsedData.user.first_name} ${parsedData.user.last_name || ''}`,
    );
    console.log(LABEL_USERNAME, parsedData.user.username);
    console.log(LABEL_LANGUAGE, parsedData.user.language_code);
    console.log(LABEL_PHOTO_URL, parsedData.user.photo_url);
  }
  console.log(HEADER_AUTHENTICATION);
  console.log(
    LABEL_AUTH_DATE,
    parsedData.auth_date ? new Date(parsedData.auth_date * 1000).toLocaleString() : LABEL_NA,
  );
  console.log(LABEL_SIGNATURE, parsedData.signature);

  console.log(HEADER_WEBAPP_INFO);
  console.log(LABEL_VERSION, parsedData.tgWebAppVersion);
  console.log(LABEL_PLATFORM, parsedData.tgWebAppPlatform);

  console.log(HEADER_THEME_PARAMS);
  if (parsedData.tgWebAppThemeParams) {
    Object.entries(parsedData.tgWebAppThemeParams).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  }
};

// Example usage (commented out)
// const parsedData = parseUrlHash(TELEGRAM_WEB_APP_DATA_URL)
// printTelegramWebAppData(parsedData)
