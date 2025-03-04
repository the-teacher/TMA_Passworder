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
