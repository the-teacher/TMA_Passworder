// const hash = window.location.hash.slice(1);
// console.log(hash); // tgWebAppData=...&tgWebAppVersion=6.2&...
// https://docs.telegram-mini-apps.com/platform/launch-parameters

import { retrieveLaunchParams } from "@telegram-apps/bridge";
import { LaunchParams } from "@telegram-apps/types";

// Session storage key for Telegram launch parameters
const LAUNCH_PARAMS_STORAGE_KEY = "tapps/launchParams";

// Mock data for when app is running outside of Telegram
const GUEST_LAUNCH_PARAMS: LaunchParams = {
  tgWebAppPlatform: "web",
  tgWebAppVersion: "6.2",
  tgWebAppThemeParams: {},
  tgWebAppData: {
    hash: "",
    auth_date: new Date(),
    signature: "",
    user: {
      id: 0,
      first_name: "Guest",
      is_premium: false
    }
  }
};

/**
 * Custom hook that returns Telegram launch parameters if available,
 * or returns mocked Guest user data if not running in Telegram
 */
export const useLaunchParams = (): LaunchParams => {
  // Check if we're running in Telegram by looking for hash in URL or session storage
  const hasHash = !!window.location.hash.slice(1);
  const hasSessionStorage = !!sessionStorage.getItem(LAUNCH_PARAMS_STORAGE_KEY);
  const isTelegramEnvironment = hasHash || hasSessionStorage;

  if (isTelegramEnvironment) {
    // We're in Telegram, return real launch params
    return retrieveLaunchParams();
  }

  // We're outside Telegram, return mocked Guest user
  return GUEST_LAUNCH_PARAMS;
};
