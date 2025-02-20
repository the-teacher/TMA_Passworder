import importMetaTransformer from "./test/mocks/importMetaTransformer";

export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/test/setupFiles.ts"],
  setupFilesAfterEnv: ["<rootDir>/test/setupFilesAfterEnv.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@test/(.*)$": "<rootDir>/test/$1",
    "^@routes/(.*)$": "<rootDir>/src/routes/$1",
    "^@ui-kit/(.*)$": "<rootDir>/src/ui-kit/$1",
    "^@mocks/(.*)$": "<rootDir>/src/mocks/$1",
    "^@story/(.*)$": "<rootDir>.storybook/$1",
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@i18n/(.*)$": "<rootDir>/src/i18n/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  transform: {
    "^.+\\.(t|j)sx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
        useESM: true,
        diagnostics: {
          ignoreCodes: [1343]
        },
        astTransformers: {
          before: [importMetaTransformer]
        }
      }
    ]
  },
  extensionsToTreatAsEsm: [".ts", ".tsx", ".mts", ".cts"],
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.stories.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/main.tsx",
    "!src/vite-env.d.ts"
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
