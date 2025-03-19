#!/usr/bin/env node

import path from 'path';
import { createMigrationFile } from '../utils/createMigration';

/**
 * The Migrator - Migration Creator CLI
 *
 * This module provides a command-line interface for creating new migration files.
 *
 * Usage:
 *   node createMigrationRunner.ts <migrationName> [migrationsDir]
 *
 * Examples:
 *   node createMigrationRunner.ts create_users_table
 *   node createMigrationRunner.ts create_tenants_table ./db/migrations/tenant
 *
 * @module the-migrator/createMigrationRunner
 */

// Default migrations directory
const DEFAULT_MIGRATIONS_DIR = path.join(process.cwd(), 'db/migrations/application');

/**
 * Parses command line arguments
 * @returns Object containing parsed arguments
 */
export const parseArgs = (): {
  migrationName: string | undefined;
  migrationsDir: string | undefined;
} => {
  const args = process.argv.slice(2);
  const migrationName = args[0];
  const migrationsDir = args[1];

  return { migrationName, migrationsDir };
};

/**
 * Shows help message
 */
export const showHelp = (): void => {
  console.log(`
The Migrator - Migration Creator

Usage:
  node createMigrationRunner.ts <migrationName> [migrationsDir]

Arguments:
  migrationName  Name of the migration (e.g., 'create_users_table')
  migrationsDir  Directory for migrations (default: ./db/migrations/application)

Examples:
  node createMigrationRunner.ts create_users_table
  node createMigrationRunner.ts add_email_to_users ./db/migrations/tenant
  node createMigrationRunner.ts create_settings_table ./src/database/migrations/custom
  `);
};

/**
 * Main function to run the migration creator
 */
export const run = async (): Promise<void> => {
  const { migrationName, migrationsDir } = parseArgs();

  // Show help if required arguments are missing
  if (!migrationName) {
    showHelp();
    process.exit(1);
    return;
  }

  try {
    // Resolve the full directory path
    const fullDir = migrationsDir || DEFAULT_MIGRATIONS_DIR;

    // Create migration file
    const migrationPath = createMigrationFile(fullDir, migrationName);

    console.log(`Successfully created migration: ${migrationPath}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating migration file:');
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
