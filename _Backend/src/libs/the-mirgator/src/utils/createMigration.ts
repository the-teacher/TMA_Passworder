import fs from 'fs';
import path from 'path';
import { log } from './logger';

/**
 * The Migrator - Migration File Creation Module
 *
 * This module provides functionality for creating database migration files.
 *
 * Functions:
 * - toSnakeCase: Converts a string to snake_case format
 * - generateMigrationContent: Generates the content for a migration file
 * - createMigrationFile: Creates a migration file with proper naming and structure
 *
 * @module the-migrator/createMigration
 */

/**
 * Examples:
 *
 * // Create a migration in a specific directory
 * createMigrationFile('./db/migrations/application', 'CreateUsersTable');
 * // Result: ./db/migrations/application/20230815123045_create_users_table.ts
 *
 * // Create a migration in another directory
 * createMigrationFile('./src/database/migrations/tenant', 'CreateProductsTable');
 * // Result: ./src/database/migrations/tenant/20230815123045_create_products_table.ts
 */

/**
 * Converts a string to snake_case format
 * @param str String to convert
 * @returns String in snake_case format
 */
const toSnakeCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
};

/**
 * Generates migration file content
 * @param snakeCaseName Migration name in snake_case format
 * @returns Content for the migration file
 */
export const generateMigrationContent = (snakeCaseName: string): string => {
  return `import { runQuery } from '@libs/sqlite';

/**
 * Migration: ${snakeCaseName}
 * Created at: ${new Date().toISOString()}
 */

export const up = async (dbPath: string): Promise<void> => {
  // Code for applying migration
  await runQuery(dbPath, \`
    -- Your SQL code here
  \`);
};

export const down = async (dbPath: string): Promise<void> => {
  // Code for rolling back migration
  await runQuery(dbPath, \`
    -- Your rollback SQL code here
  \`);
};
`;
};

/**
 * Creates a migration file
 * @param directory Directory where the migration file should be created
 * @param migrationName Name of the migration
 * @returns Path to the created migration file
 */
export const createMigrationFile = (directory: string, migrationName: string): string => {
  // Convert migration name to snake_case
  const snakeCaseName = toSnakeCase(migrationName);

  // Create timestamp for filename
  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, '')
    .slice(0, 14);

  // Form the filename
  const fileName = `${timestamp}_${snakeCaseName}.ts`;

  // Ensure directory exists
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  // Full path to migration file
  const filePath = path.join(directory, fileName);

  // Generate migration file content
  const migrationTemplate = generateMigrationContent(snakeCaseName);

  // Write template to file
  fs.writeFileSync(filePath, migrationTemplate, 'utf8');

  log(`Migration file created: ${filePath}`, 'info');
  return filePath;
};
