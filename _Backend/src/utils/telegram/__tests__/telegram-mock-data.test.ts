import {
  generateMockBotToken,
  generateMockTelegramData,
  TELEGRAM_TEST_BOT_TOKEN,
} from '../telegram-mock-data'
import { validateTelegramWebAppData } from '../telegram-validator'

// Mock crypto for consistent testing
jest.mock('crypto', () => {
  const originalModule = jest.requireActual('crypto')

  // Use the actual crypto implementation for HMAC operations
  // This ensures our validation will work correctly
  return {
    ...originalModule,
    // Add any specific mocks if needed
  }
})

describe('Telegram Mock Data', () => {
  describe('generateMockBotToken', () => {
    it('should generate a token in the correct format', () => {
      const token = generateMockBotToken()

      // Token should be in format: 123456789:ABCDefGhIJKlmNoPQRsTUVwxyZ
      expect(token).toMatch(/^\d+:[A-Za-z]+$/)

      // Split the token into parts
      const [botId, tokenPart] = token.split(':')

      // Check bot ID is a number
      expect(Number.isNaN(Number(botId))).toBe(false)

      // Check token part length (should be 35 characters)
      expect(tokenPart.length).toBe(35)

      // Check token part only contains letters
      expect(tokenPart).toMatch(/^[A-Za-z]+$/)
    })

    it('should generate unique tokens on each call', () => {
      const token1 = generateMockBotToken()
      const token2 = generateMockBotToken()
      const token3 = generateMockBotToken()

      expect(token1).not.toEqual(token2)
      expect(token1).not.toEqual(token3)
      expect(token2).not.toEqual(token3)
    })
  })

  describe('generateMockTelegramData', () => {
    it('should generate valid Telegram data that passes validation', () => {
      const mockData = generateMockTelegramData()

      // Validate the generated data
      const validationResult = validateTelegramWebAppData(mockData.initData, mockData.botToken)

      expect(validationResult.valid).toBe(true)
      expect(validationResult.data).toBeDefined()
    })

    it('should use the default bot token when not specified', () => {
      const mockData = generateMockTelegramData()

      expect(mockData.botToken).toBe(TELEGRAM_TEST_BOT_TOKEN)
    })

    it('should use a custom bot token when provided', () => {
      const customToken = 'custom:TestToken123456789'
      const mockData = generateMockTelegramData({}, { botToken: customToken })

      expect(mockData.botToken).toBe(customToken)
    })

    it('should include user data in the generated data', () => {
      const userData = {
        id: 12345,
        first_name: 'Test User',
        last_name: 'Lastname',
        username: 'testuser',
        language_code: 'en',
      }

      const mockData = generateMockTelegramData(userData)
      const validationResult = validateTelegramWebAppData(mockData.initData, mockData.botToken)

      expect(validationResult.valid).toBe(true)
      expect(validationResult.data?.user).toEqual(userData)
    })

    it('should include query_id when provided', () => {
      const queryId = 'test_query_id_123'
      const mockData = generateMockTelegramData({}, { queryId })

      const validationResult = validateTelegramWebAppData(mockData.initData, mockData.botToken)

      expect(validationResult.valid).toBe(true)
      expect(validationResult.data?.query_id).toBe(queryId)
    })

    it('should use custom auth_date when provided', () => {
      const customAuthDate = Math.floor(Date.now() / 1000) - 3600 // 1 hour ago
      const mockData = generateMockTelegramData({}, { customAuthDate })

      const validationResult = validateTelegramWebAppData(mockData.initData, mockData.botToken)

      expect(validationResult.valid).toBe(true)
      expect(validationResult.data?.auth_date).toBe(customAuthDate)
    })

    it('should include additional parameters when provided', () => {
      const additionalParams = {
        start_param: 'test_start',
        custom_param: 'custom_value',
      }

      const mockData = generateMockTelegramData({}, { additionalParams })

      // Check if the URL params contain our additional parameters
      const urlParams = new URLSearchParams(mockData.initData)

      Object.entries(additionalParams).forEach(([key, value]) => {
        expect(urlParams.get(key)).toBe(value)
      })
    })

    it('should generate different data on each call', () => {
      const mockData1 = generateMockTelegramData()
      const mockData2 = generateMockTelegramData()

      expect(mockData1.initData).not.toBe(mockData2.initData)
    })

    it('should demonstrate the complete mock data generation and validation process', () => {
      // 1. Define test data
      console.log('Step 1: Define test data')
      const testBotToken = '123456789:ABCDefGhIJKlmNoPQRsTUVwxyZ'
      const testAuthDate = Math.floor(new Date('2023-10-15T12:00:00Z').getTime() / 1000)
      const testUser = {
        id: 987654321,
        first_name: 'John',
        last_name: 'Viktor',
        username: 'john_viktor',
        language_code: 'en',
      }
      const testQueryId = 'AAH288MaAAAAAPbzwxq6byxf'

      console.log('Test Bot Token:', testBotToken)
      console.log(
        'Test Auth Date:',
        testAuthDate,
        '(',
        new Date(testAuthDate * 1000).toISOString(),
        ')',
      )
      console.log('Test User:', testUser)
      console.log('Test Query ID:', testQueryId)

      // 2. Generate mock data
      console.log('\nStep 2: Generate mock data')
      const mockData = generateMockTelegramData(testUser, {
        botToken: testBotToken,
        customAuthDate: testAuthDate,
        queryId: testQueryId,
        additionalParams: {
          start_param: 'welcome',
        },
      })

      console.log('Generated Init Data:', mockData.initData)

      // 3. Parse the generated data to show its structure
      console.log('\nStep 3: Parse the generated data')
      const urlParams = new URLSearchParams(mockData.initData)
      const parsedData = {
        user: JSON.parse(urlParams.get('user') || '{}'),
        auth_date: urlParams.get('auth_date'),
        query_id: urlParams.get('query_id'),
        start_param: urlParams.get('start_param'),
        hash: urlParams.get('hash'),
      }

      console.log('Parsed Data:', parsedData)

      // 4. Validate the data
      console.log('\nStep 4: Validate the data')
      const validationResult = validateTelegramWebAppData(
        mockData.initData,
        testBotToken,
        // Set a very large maxAge to allow old dates for testing
        10 * 365 * 24 * 60 * 60 * 1000, // ~10 years
      )

      console.log('Validation Result:', validationResult)

      // 5. Assertions to verify everything works correctly
      console.log('\nStep 5: Verify with assertions')

      // Verify the mock data was generated correctly
      expect(mockData.botToken).toBe(testBotToken)
      expect(urlParams.get('auth_date')).toBe(testAuthDate.toString())
      expect(JSON.parse(urlParams.get('user') || '{}')).toEqual(testUser)
      expect(urlParams.get('query_id')).toBe(testQueryId)
      expect(urlParams.get('start_param')).toBe('welcome')
      expect(urlParams.get('hash')).toBeTruthy()

      // Verify the validation works correctly
      expect(validationResult.valid).toBe(true)
      expect(validationResult.data).toBeDefined()
      expect(validationResult.data?.user).toEqual(testUser)
      expect(validationResult.data?.auth_date).toBe(testAuthDate)
      expect(validationResult.data?.query_id).toBe(testQueryId)

      // Verify the hash is valid
      const hashFromMock = urlParams.get('hash')
      expect(hashFromMock).toBe(validationResult.data?.hash)
    })
  })
})
