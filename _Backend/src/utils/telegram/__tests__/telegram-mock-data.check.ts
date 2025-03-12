// yarn tsx ./src/utils/telegram/__tests__/telegram-mock-data.check.ts
import { generateMockTelegramData } from '../telegram-mock-data';
import { validateTelegramWebAppData } from '../telegram-validator';

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
);

console.log('Generated Mock:', mockData);
console.log('TELEGRAM TEST TOKEN:', mockData.botToken);
console.log('TELEGRAM TEST INIT DATA (URL STRING):', mockData.initData);

// Validate the generated data
const validationResult = validateTelegramWebAppData(mockData.initData, mockData.botToken);
console.log('Validation Result:', validationResult.valid);
console.log('Validation Data:', validationResult.data);
