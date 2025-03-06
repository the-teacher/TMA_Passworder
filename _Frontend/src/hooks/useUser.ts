import { useLaunchParams } from "./useLaunchParams";
import { User } from "@telegram-apps/types";

// Guest user mock data
const GUEST_USER: User = {
  id: 0,
  first_name: "Guest",
  is_premium: false
};

/**
 * Hook that returns the Telegram user object if available,
 * or a guest user if not running in Telegram
 * @returns User object
 */
export const useUser = (): User => {
  const launchParams = useLaunchParams();

  // Return the user from launch params if available, otherwise return guest user
  return launchParams.tgWebAppData?.user || GUEST_USER;
};
