// https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
// https://docs.telegram-mini-apps.com/platform/authorizing-user
//
// Frontend: Add the script to the page
// <script src="https://telegram.org/js/telegram-web-app.js?56"></script>
//
// Submit to server: window.Telegram.WebApp.initData
//
// yarn tsx ./src/utils/telegram-validator.ts
//
import crypto from 'crypto'
import { TELEGRAM_TOKEN, TelegramWebAppInitData } from '../mocks/local/the-teacher-url'

type TelegramUser = {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  allows_write_to_pm?: boolean
  photo_url?: string
}

type TelegramInitData = {
  query_id?: string
  user?: TelegramUser
  auth_date: number
  hash: string
  [key: string]: any
}

/**
 * Validates Telegram Mini App init data
 * @param initDataString - The raw init data string from Telegram
 * @param botToken - Your Telegram bot token
 * @returns Object with validation result and parsed data if valid
 */
export const validateTelegramWebAppData = (
  initDataString: string = TelegramWebAppInitData,
  botToken: string = TELEGRAM_TOKEN,
): { valid: boolean; data?: TelegramInitData } => {
  try {
    // Parse the init data
    const urlParams = new URLSearchParams(initDataString)
    const hash = urlParams.get('hash')

    if (!hash) {
      return { valid: false }
    }

    // Remove the hash from the data before checking the signature
    urlParams.delete('hash')

    // Create a sorted array of key=value strings
    const dataCheckString = Array.from(urlParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n')

    // Create the secret key by using HMAC-SHA256 with the bot token
    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest()

    // Calculate the signature
    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex')

    // Compare the calculated hash with the provided hash
    const isValid = calculatedHash === hash

    // Parse the data if valid
    if (isValid) {
      const data: TelegramInitData = {
        auth_date: parseInt(urlParams.get('auth_date') || '0', 10),
        hash,
      }

      if (urlParams.get('query_id')) {
        data.query_id = urlParams.get('query_id') || undefined
      }

      if (urlParams.get('user')) {
        try {
          data.user = JSON.parse(urlParams.get('user') || '{}')
        } catch (e) {
          console.error('Failed to parse user data:', e)
        }
      }

      // Check if auth_date is not older than 24 hours
      const authDate = data.auth_date * 1000 // Convert to milliseconds
      const now = Date.now()
      const MAX_AGE = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

      if (now - authDate > MAX_AGE) {
        return { valid: false }
      }

      return { valid: true, data }
    }

    return { valid: false }
  } catch (error) {
    console.error('Validation error:', error)
    return { valid: false }
  }
}

// Example usage
const result = validateTelegramWebAppData()
console.log('Validation result:', result.valid)
if (result.valid && result.data) {
  console.log('User:', result.data.user)
  console.log('Auth date:', new Date(result.data.auth_date * 1000).toISOString())
}
