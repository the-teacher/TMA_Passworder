# TypeScript Configuration Overview

This project uses multiple TypeScript configurations for different environments.

## Configuration Files Structure

### tsconfig.json

Root configuration file:

- References to other configs
- Used by IDE to identify project root
- No compiler options

### tsconfig.app.json

Main application source code configuration:

- Environment: Browser
- Organized in logical sections:
  - Basic Options: ES2020, ESNext, React JSX
  - Module Resolution: Path aliases, bundler
  - Type Checking: Strict mode and linting rules
  - Emit: No emit settings
  - Advanced: Skip lib check, isolated modules
  - Types: React, ReactDOM, Jest
- Used for: Development and production builds

### tsconfig.node.json

Node.js environment configuration:

- Environment: Node.js
- Organized in logical sections:
  - Basic Options: ES2022, ESNext, React JSX
  - Module Resolution: Bundler settings
  - Type Checking: Strict mode and linting rules
  - Emit: No emit settings
  - Advanced: Skip lib check, isolated modules
- Used for: Build tools and configuration files (vite.config.ts)

### tsconfig.test.json

Testing environment configuration:

- Environment: Jest
- Organized in logical sections:
  - Basic Options: ESNext, NodeNext, React JSX
  - Module Resolution: NodeNext, path aliases
  - Type Checking: Strict mode and linting rules
  - Emit: No emit settings
  - Advanced: Skip lib check, isolated modules
  - Types: Jest, Testing Library, Node, Vite
- Used for: Unit and integration tests

## Environment Standards

### Browser (App)

- Modern browser features
- ES Modules
- Latest React features
- Strict type checking
- Bundler module resolution

### Node.js

- Latest Node.js features
- ES Modules
- Build tools compatibility
- Configuration files
- Bundler module resolution

### Testing

- Jest compatibility
- Node.js module system
- Testing Library support
- Test file patterns: _.test.ts, _.test.tsx
- NodeNext module resolution

## Module Resolution

- App: ESNext with bundler resolution
- Node: ESNext with bundler resolution
- Tests: NodeNext with NodeNext resolution

## Type Definitions

- App: React + ReactDOM + Jest
- Node: Node.js types
- Tests: Jest + Testing Library + Node + Vite/client

## Aliases

- `@pages`: `src/pages`
- `@components`: `src/components`
- `@test`: `test`
- `@routes`: `src/routes`
- `@ui-kit`: `src/ui-kit`
- `@mocks`: `src/mocks`
- `@i18n`: `src/i18n`
- `@story`: `.storybook`
- `@lib`: `src/lib`

## Configuration Comparison Table

### Basic Options

| Option | App                       | Node      | Test                      |
| ------ | ------------------------- | --------- | ------------------------- |
| target | ES2020                    | ES2022    | ESNext                    |
| module | ESNext                    | ESNext    | NodeNext                  |
| lib    | ES2020, DOM, DOM.Iterable | ES2023    | ES2020, DOM, DOM.Iterable |
| jsx    | react-jsx                 | react-jsx | react-jsx                 |

### Module Resolution

| Option                     | App     | Node    | Test     |
| -------------------------- | ------- | ------- | -------- |
| moduleResolution           | bundler | bundler | NodeNext |
| baseUrl                    | .       | -       | .        |
| paths                      | ✓       | -       | ✓        |
| resolveJsonModule          | ✓       | ✓       | ✓        |
| allowImportingTsExtensions | ✓       | ✓       | ✓        |
| moduleDetection            | force   | force   | -        |
| esModuleInterop            | ✓       | ✓       | ✓        |

### Type Checking

| Option                       | App | Node | Test |
| ---------------------------- | --- | ---- | ---- |
| strict                       | ✓   | ✓    | ✓    |
| noUnusedLocals               | ✓   | ✓    | ✓    |
| noUnusedParameters           | ✓   | ✓    | ✓    |
| noFallthroughCasesInSwitch   | ✓   | ✓    | ✓    |
| noUncheckedSideEffectImports | ✓   | ✓    | ✓    |

### Emit

| Option          | App                                          | Node                                          | Test |
| --------------- | -------------------------------------------- | --------------------------------------------- | ---- |
| noEmit          | ✓                                            | ✓                                             | ✓    |
| tsBuildInfoFile | ./node_modules/.tmp/tsconfig.app.tsbuildinfo | ./node_modules/.tmp/tsconfig.node.tsbuildinfo | -    |

### Advanced

| Option                  | App | Node | Test |
| ----------------------- | --- | ---- | ---- |
| skipLibCheck            | ✓   | ✓    | ✓    |
| isolatedModules         | ✓   | ✓    | ✓    |
| useDefineForClassFields | ✓   | ✓    | ✓    |
| allowJs                 | ✓   | ✓    | ✓    |

### Types

| Option    | App                                | Node | Test                                               |
| --------- | ---------------------------------- | ---- | -------------------------------------------------- |
| types     | react, react-dom, jest             | -    | jest, @testing-library/jest-dom, node, vite/client |
| typeRoots | ./node_modules/@types, ./src/types | -    | ./node_modules/@types, ./src/types                 |

## Jest Configuration

The project uses Jest for testing with TypeScript. The Jest configuration is set up to use the `tsconfig.test.json` file for TypeScript settings.

### Transform Configuration

In `jest.config.ts`, the transform section is configured to use `ts-jest` for TypeScript files:

```ts
// ./test/mocks/importMetaTransformer.ts
export default {
  path: "ts-jest-mock-import-meta",
  options: {
    metaObjectReplacement: {
      env: {
        VITE_DEFAULT_LANGUAGE: "en"
      },
      url: "https://www.url.com"
    }
  }
};
```

```ts
import importMetaTransformer from "./test/mocks/importMetaTransformer";
```

```ts
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
}
```

Key settings:

- `tsconfig: "tsconfig.test.json"` - Points to the test-specific TypeScript configuration
- `useESM: true` - Enables ECMAScript modules support
- `diagnostics.ignoreCodes: [1343]` - Ignores specific TypeScript diagnostic code (1343 relates to import.meta usage)
- `astTransformers.before: [importMetaTransformer]` - Uses a custom transformer to handle import.meta expressions

This configuration ensures that Jest can properly process TypeScript files with the correct module resolution and compilation settings for the testing environment.
