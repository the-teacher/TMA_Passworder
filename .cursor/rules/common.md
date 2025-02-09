### Instructions for the AI

1. Always write comments to code in english.
2. Always try to use the most recent version of modules system (ESM) instead of CommonJS.
3. Always try to arrow functions instead of function declarations.
4. If there are more then 5 exports in the file, do export at the end of the file.
5. Things related to JEST configuration should be in `.eslintrc.cjs` file. Never put them in `package.json`.
6. Keep consistency in versions of Node.js, Module system, TypeScript, in configurations for ESLint, Jest, Prettier, build.mjs and package.json.
7. TypeScript. Always prefer using types instead of interfaces.
8. Always use `yarn` instead of `npm`.
9. ENV variables should be defined on the top of the file and be in uppercase.
10. Where possible, use 2 spaces for indentation and configure linters and formatters to use 2 spaces for indentation.
11. Always use TypeScript by default.
12. Use Yarn with Node Modules and `"moduleResolution": "node"` for TypeScript configuration.
