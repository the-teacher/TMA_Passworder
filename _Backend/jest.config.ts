export default {
  preset: 'ts-jest',
  testEnvironment: 'node', // Use 'node' for backend tests, not 'jsdom'
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
        useESM: false, // Since you're using CommonJS
        diagnostics: {
          ignoreCodes: [1343],
        },
      },
    ],
  },
  moduleNameMapper: {
    '@test/(.*)': '<rootDir>/test/$1',
    '@routes/(.*)': '<rootDir>/src/routes/$1',
    '@mocks/(.*)': '<rootDir>/src/mocks/$1',
    '@i18n/(.*)': '<rootDir>/src/i18n/$1',
    '@libs/(.*)': '<rootDir>/src/libs/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@middlewares/(.*)': '<rootDir>/src/middlewares/$1',
    '@actions/(.*)': '<rootDir>/src/actions/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!.examples/**/*'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest/setupTests.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/.examples/'],
};
