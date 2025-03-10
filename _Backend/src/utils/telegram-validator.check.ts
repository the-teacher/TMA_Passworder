// yarn tsx ./src/utils/telegram-validator.check.ts

import { TELEGRAM_TOKEN, TelegramWebAppInitData } from '../mocks/local/the-teacher-url'
import { validateTelegramWebAppData } from './telegram-validator'

const result = validateTelegramWebAppData(TelegramWebAppInitData, TELEGRAM_TOKEN)

console.log('Validation result:', result.valid)

if (result.valid && result.data) {
  console.log('User:', result.data.user)
  console.log('Auth date:', new Date(result.data.auth_date * 1000).toISOString())
}

if (!result.valid) {
  console.log('Error:', result.message)
}
