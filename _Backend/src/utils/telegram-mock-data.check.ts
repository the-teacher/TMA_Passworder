// yarn tsx ./src/utils/telegram-mock-data.check.ts
import { generateMockTelegramData } from './telegram-mock-data'
import { validateTelegramWebAppData } from './telegram-validator'

// Example usage of the mock generator

const mockData = generateMockTelegramData(
  {
    id: 123456789,
    first_name: 'John',
    last_name: 'Doe',
    username: 'johndoe',
    language_code: 'en',
  },
  {
    queryId: 'AAH288MaAAAAAPbzwxq6byxf',
  },
)

console.log('Generated Bot Token:', mockData.botToken)
console.log('Generated Init Data:', mockData.initData)

// Validate the generated data
const validationResult = validateTelegramWebAppData(mockData.initData, mockData.botToken)
console.log('Validation Result:', validationResult.valid)
console.log('Validation Data:', validationResult.data)
