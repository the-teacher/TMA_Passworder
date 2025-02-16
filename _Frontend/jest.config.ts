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
    "^@ui-kit/(.*)$": "<rootDir>/src/ui-kit/$1"
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json"
      }
    ]
  },
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ]
};
