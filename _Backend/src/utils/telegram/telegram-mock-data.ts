/**
 * Function dependency graph:
 *
 * generateMockTelegramData
 * ├── createDataCheckString
 * ├── generateMockBotToken
 * └── generateMockTelegramData
 */

import crypto from 'crypto'
import { createDataCheckString } from './telegram-validator'

export const TELEGRAM_TEST_BOT_TOKEN = '123456789:ABCDefGhIJKlmNoPQRsTUVwxyZ'
export const TELEGRAM_TEST_MAX_AGE = 10 * 365 * 24 * 60 * 60 * 1000 // 10 years in milliseconds

type TelegramUser = {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
}

/**
 * Generates a random bot token for testing
 */
export const generateMockBotToken = (): string => {
  // Format: 123456789:ABCDefGhIJKlmNoPQRsTUVwxyZ
  const botId = Math.floor(Math.random() * 1000000000)
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let token = ''

  for (let i = 0; i < 35; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return `${botId}:${token}`
}

/**
 * Generates mock Telegram data for testing
 * @param userData - User data to include in the mock
 * @param options - Additional options for the mock data
 * @returns Object with generated token and init data string
 */
export const generateMockTelegramData = (
  userData: Partial<TelegramUser> = {},
  options: {
    queryId?: string
    customAuthDate?: number
    additionalParams?: Record<string, string>
    botToken?: string
  } = {},
): { botToken: string; initData: string } => {
  // Generate or use provided bot token
  const botToken = options.botToken || TELEGRAM_TEST_BOT_TOKEN

  // Create default user data
  const defaultUser: TelegramUser = {
    id: Math.floor(Math.random() * 1000000000),
    first_name: 'Test',
    ...userData,
  }

  // Create URL parameters
  const urlParams = new URLSearchParams()

  // Add user data
  urlParams.append('user', JSON.stringify(defaultUser))

  // Add auth date (current time or custom)
  const authDate = options.customAuthDate || Math.floor(Date.now() / 1000)
  urlParams.append('auth_date', authDate.toString())

  // Add query ID if provided
  if (options.queryId) {
    urlParams.append('query_id', options.queryId)
  }

  // Add any additional parameters
  if (options.additionalParams) {
    Object.entries(options.additionalParams).forEach(([key, value]) => {
      urlParams.append(key, value)
    })
  }

  // Create data check string
  const dataCheckString = createDataCheckString(urlParams)

  // Create the secret key
  const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest()

  // Calculate the hash
  const hash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex')

  // Add the hash to the parameters
  urlParams.append('hash', hash)

  // Return the generated data
  return {
    botToken,
    initData: urlParams.toString(),
  }
}
