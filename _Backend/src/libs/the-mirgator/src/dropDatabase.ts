#!/usr/bin/env node

// Re-export from dropSqliteDatabaseRunner.ts for backward compatibility
export * from './dropSqliteDatabaseRunner';

// Run the script if it's called directly
if (require.main === module) {
  const { run } = require('./dropSqliteDatabaseRunner');
  run();
}
