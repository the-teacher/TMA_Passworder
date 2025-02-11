# TypeScript Configuration Overview

This project uses multiple TypeScript configurations for different environments.

## Configuration Files Structure

### tsconfig.base.json
Base configuration with common settings for all environments:
- Target: ES2020
- Module: ESNext
- Common linting rules
- React JSX settings

### tsconfig.json
Root configuration file:
- References to other configs
- Used by IDE to identify project root
- No compiler options

### tsconfig.app.json
Main application source code configuration:
- Extends: tsconfig.base.json
- Environment: Browser
- Target: ES2020
- Module: ESNext
- Types: React, ReactDOM, Jest
- Used for: Development and production builds

### tsconfig.node.json
Node.js environment configuration:
- Extends: tsconfig.base.json
- Environment: Node.js
- Target: ES2022
- Module: ESNext
- Used for: Build tools and configuration files (vite.config.ts)

### tsconfig.test.json
Testing environment configuration:
- Extends: tsconfig.base.json
- Environment: Jest
- Target: ES2019
- Module: CommonJS (required for Jest)
- Types: Jest, Testing Library
- Used for: Unit and integration tests

## Environment Standards

### Browser (App)
- Modern browser features
- ES Modules
- Latest React features
- Strict type checking

### Node.js
- Latest Node.js features
- ES Modules
- Build tools compatibility
- Configuration files

### Testing
- Jest compatibility
- CommonJS modules
- Testing Library support
- Test file patterns: *.test.ts, *.test.tsx

## Module Resolution

- App: ESNext with Node resolution
- Node: ESNext with Node resolution
- Tests: CommonJS with Node resolution

## Type Definitions

- App: React + ReactDOM + Jest
- Node: Node.js types
- Tests: Jest + Testing Library 