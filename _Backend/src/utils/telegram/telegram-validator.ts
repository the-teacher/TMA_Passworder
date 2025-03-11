/**
 * Function dependency graph:
 *
 * validateTelegramWebAppData
 * ├── createDataCheckString
 * ├── verifyHash
 * ├── parseInitData
 * └── isAuthDateExpired
 */

import crypto from 'crypto'

// Constants
const DEFAULT_MAX_AGE = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

// Error messages
const ERROR_HASH_MISSING = 'Hash parameter is missing'
const ERROR_INVALID_HASH = 'Invalid hash, data may have been tampered with'
const ERROR_AUTH_EXPIRED = 'Authentication data has expired'
const ERROR_PARSE_USER = 'Failed to parse user data:'
const ERROR_VALIDATION = 'Validation error:'

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
export const createDataCheckString = (urlParams: URLSearchParams): string => {
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
      console.error(ERROR_PARSE_USER, e)
    }
  }

  return data
}

/**
 * Checks if the auth date is expired
 * @param authDate - Authentication timestamp in seconds
 * @param maxAge - Maximum age in milliseconds (default: 24 hours)
 */
const isAuthDateExpired = (authDate: number, maxAge: number = DEFAULT_MAX_AGE): boolean => {
  const authDateMs = authDate * 1000 // Convert to milliseconds
  const now = Date.now()
  return now - authDateMs > maxAge
}

/**
 * Validates Telegram Mini App init data
 * @param initDataString - The raw init data string from Telegram
 * @param botToken - Your Telegram bot token
 * @param maxAge - Maximum age of auth data in milliseconds (default: 24 hours)
 * @returns Object with validation result, parsed data if valid, and error message if invalid
 */
export const validateTelegramWebAppData = (
  initDataString: string,
  botToken: string,
  maxAge: number = DEFAULT_MAX_AGE,
): { valid: boolean; data?: TelegramInitData; message?: string } => {
  try {
    // Parse the init data
    const urlParams = new URLSearchParams(initDataString)
    const hash = urlParams.get('hash')

    // Guard: Check if hash exists
    if (!hash) {
      return { valid: false, message: ERROR_HASH_MISSING }
    }

    // Remove the hash from the data before checking the signature
    urlParams.delete('hash')

    // Create data check string (sorted key=value pairs)
    const dataCheckString = createDataCheckString(urlParams)

    // Calculate and verify hash
    const isValid = verifyHash(dataCheckString, hash, botToken)

    // Guard: Check if hash is valid
    if (!isValid) {
      return { valid: false, message: ERROR_INVALID_HASH }
    }

    // Parse the data
    const data = parseInitData(urlParams, hash)

    // Guard: Check if auth date is not too old
    if (isAuthDateExpired(data.auth_date, maxAge)) {
      return { valid: false, message: ERROR_AUTH_EXPIRED }
    }

    return { valid: true, data }
  } catch (error) {
    console.error(ERROR_VALIDATION, error)
    return {
      valid: false,
      message: `${ERROR_VALIDATION} ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }
}
