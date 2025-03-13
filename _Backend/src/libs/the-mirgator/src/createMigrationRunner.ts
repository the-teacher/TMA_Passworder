#!/usr/bin/env node

// TS Example: yarn tsx src/libs/the-mirgator/src/createMigrationRunner.ts CreatePostsTable application

import { createMigrationFile } from './createMigration';
import path from 'path';

/**
 * The Migrator - Migration Runner
 *
 * This module provides a command-line interface for creating migration files.
 *
 * Usage:
 *   node createMigrationRunner.js <migrationName> [scope] [directory]
 *
 * Examples:
 *   node createMigrationRunner.js CreateUsersTable
 *   node createMigrationRunner.js AddEmailToUsers tenant
 *   node createMigrationRunner.js CreateProductsTable tenant ./src/database/migrations
 *
 * @module the-migrator/createMigrationRunner
 */

// Default values
const DEFAULT_DIRECTORY = path.join(process.cwd(), 'src', 'db', 'migrations');
const DEFAULT_SCOPE = 'application';

/**
 * Parses command line arguments
 * @returns Object containing parsed arguments
 */
const parseArgs = (): {
  migrationName: string | undefined;
  scope: string;
  directory: string;
} => {
  // Get command line arguments (skip first two: node and script path)
  const args = process.argv.slice(2);

  // Parse arguments
  const migrationName = args[0];
  let scope = args[1] || DEFAULT_SCOPE;
  let directory = args[2] || DEFAULT_DIRECTORY;

  // Handle 'undefined' string as undefined value
  if (scope === 'undefined') {
    scope = DEFAULT_SCOPE;
  }

  if (directory === 'undefined') {
    directory = DEFAULT_DIRECTORY;
  }

  return { migrationName, scope, directory };
};

/**
 * Displays help information
 */
const showHelp = (): void => {
  console.log(`
The Migrator - Migration File Creator

Usage:
  node createMigrationRunner.js <migrationName> [scope] [directory]

Arguments:
  migrationName  Name of the migration (required)
  scope          Migration scope (optional, default: "${DEFAULT_SCOPE}")
  directory      Directory to save the migration (optional, default: ${DEFAULT_DIRECTORY})

Examples:
  node createMigrationRunner.js CreateUsersTable
  node createMigrationRunner.js AddEmailToUsers tenant
  node createMigrationRunner.js CreateProductsTable tenant ./src/database/migrations
  `);
};

/**
 * Main function to run the migration creator
 */
const run = (): void => {
  // Parse command line arguments
  const { migrationName, scope, directory } = parseArgs();

  // Show help if no migration name provided
  if (!migrationName) {
    showHelp();
    process.exit(1);
    return; // Add this return to prevent further execution
  }

  try {
    // Create migration file
    const filePath = createMigrationFile(migrationName, scope, directory);
    console.log(`Successfully created migration: ${filePath}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating migration file:');
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
};

// Run the script if it's called directly
if (require.main === module) {
  run();
}

// Export for testing
export { parseArgs, showHelp, run };
