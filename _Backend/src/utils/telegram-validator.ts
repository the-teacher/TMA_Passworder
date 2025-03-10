/**
 * Function dependency graph:
 *
 * validateTelegramWebAppData
 * ├── createDataCheckString
 * ├── verifyHash
 * ├── parseInitData
 * └── isAuthDateExpired
 *
 */

import crypto from 'crypto'

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
 * Creates a data check string from URL parameters
 */
const createDataCheckString = (urlParams: URLSearchParams): string => {
  return Array.from(urlParams.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n')
}

/**
 * Verifies the hash against the data check string
 */
const verifyHash = (dataCheckString: string, hash: string, botToken: string): boolean => {
  // Create the secret key
  const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest()

  // Calculate the signature
  const calculatedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex')

  return calculatedHash === hash
}

/**
 * Parses the init data from URL parameters
 */
const parseInitData = (urlParams: URLSearchParams, hash: string): TelegramInitData => {
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

  return data
}

/**
 * Checks if the auth date is expired (older than 24 hours)
 */
const isAuthDateExpired = (authDate: number): boolean => {
  const MAX_AGE = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
  const authDateMs = authDate * 1000 // Convert to milliseconds
  const now = Date.now()
  return now - authDateMs > MAX_AGE
}

/**
 * Validates Telegram Mini App init data
 * @param initDataString - The raw init data string from Telegram
 * @param botToken - Your Telegram bot token
 * @returns Object with validation result, parsed data if valid, and error message if invalid
 */
export const validateTelegramWebAppData = (
  initDataString: string,
  botToken: string,
): { valid: boolean; data?: TelegramInitData; message?: string } => {
  try {
    // Parse the init data
    const urlParams = new URLSearchParams(initDataString)
    const hash = urlParams.get('hash')

    // Guard: Check if hash exists
    if (!hash) {
      return { valid: false, message: 'Hash parameter is missing' }
    }

    // Remove the hash from the data before checking the signature
    urlParams.delete('hash')

    // Create data check string (sorted key=value pairs)
    const dataCheckString = createDataCheckString(urlParams)

    // Calculate and verify hash
    const isValid = verifyHash(dataCheckString, hash, botToken)

    // Guard: Check if hash is valid
    if (!isValid) {
      return { valid: false, message: 'Invalid hash, data may have been tampered with' }
    }

    // Parse the data
    const data = parseInitData(urlParams, hash)

    // Guard: Check if auth date is not too old
    if (isAuthDateExpired(data.auth_date)) {
      return { valid: false, message: 'Authentication data has expired (older than 24 hours)' }
    }

    return { valid: true, data }
  } catch (error) {
    console.error('Validation error:', error)
    return {
      valid: false,
      message: `Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}
