/**
 * Default password generation configuration
 */
export const PASSWORD_CONFIG = {
  LENGTH: 10,
  CHARS:
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
};

/**
 * Generates a random password based on the provided configuration
 * @param length - Length of the password to generate
 * @param chars - Character set to use for generation
 * @returns A randomly generated password string
 */
export const generatePassword = (
  length: number = PASSWORD_CONFIG.LENGTH,
  chars: string = PASSWORD_CONFIG.CHARS
): string => {
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};
