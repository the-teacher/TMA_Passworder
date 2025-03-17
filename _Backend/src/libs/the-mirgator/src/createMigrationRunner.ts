#!/usr/bin/env node

import { createMigrationFile } from './createMigration';

/**
 * The Migrator - Migration Creator CLI
 *
 * This module provides a command-line interface for creating new migration files.
 *
 * Usage:
 *   node createMigrationRunner.ts <dbName> <migrationName>
 *
 * Examples:
 *   node createMigrationRunner.ts application/database create_users_table
 *   node createMigrationRunner.ts tenant create_tenants_table
 *
 * @module the-migrator/createMigrationRunner
 */

/**
 * Parses command line arguments
 * @returns Object containing parsed arguments
 */
export const parseArgs = (): {
  dbName: string | undefined;
  migrationName: string | undefined;
  migrationsDir: string | undefined;
} => {
  const args = process.argv.slice(2);
  const dbName = args[0];
  const migrationName = args[1];
  const migrationsDir = args[2];

  return { dbName, migrationName, migrationsDir };
};

/**
 * Shows help message
 */
export const showHelp = (): void => {
  console.log(`
The Migrator - Migration Creator

Usage:
  node createMigrationRunner.ts <dbName> <migrationName> [migrationsDir]

Arguments:
  dbName         Name of the database or path-like name (e.g., 'application' or 'tenant/users')
  migrationName  Name of the migration (e.g., 'create_users_table')
  migrationsDir  Optional custom directory for migrations (default: ./db/migrations/{dbName})

Examples:
  node createMigrationRunner.ts application create_users_table
  node createMigrationRunner.ts application/database create_tenants_table
  node createMigrationRunner.ts tenant create_settings_table ./src/db/migrations/tenant
  `);
};

/**
 * Main function to run the migration creator
 */
export const run = async (): Promise<void> => {
  const { dbName, migrationName, migrationsDir } = parseArgs();

  // Show help if required arguments are missing
  if (!dbName || !migrationName) {
    showHelp();
    process.exit(1);
    return;
  }

  try {
    // Create migration file
    await createMigrationFile(dbName, migrationName, migrationsDir);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Run the script if it's called directly
if (require.main === module) {
  run();
}

// Export for testing and programmatic use
export {
  parseArgs as parseMigrationCreatorArgs,
  showHelp as showMigrationCreatorHelp,
  run as runMigrationCreator,
};
