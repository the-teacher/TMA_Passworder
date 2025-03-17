import fs from 'fs';
import path from 'path';
import { log } from './utils/logger';

/**
 * The Migrator - Migration File Creation Module
 *
 * This module provides functionality for creating database migration files.
 *
 * Functions:
 * - toSnakeCase: Converts a string to snake_case format
 * - generateMigrationContent: Generates the content for a migration file
 * - createMigration: Creates a migration file with proper naming and structure
 *
 * @module the-migrator/createMigration
 */

/**
 * Examples:
 *
 * // Create a basic migration
 * createMigrationFile('CreateUsersTable');
 * // Result: ./db/migrations/application/20230815123045_create_users_table.ts
 *
 * // Create a migration with a custom scope
 * createMigrationFile('CreateProductsTable', 'tenant');
 * // Result: ./db/migrations/tenant/20230815123045_create_products_table.ts
 *
 * // Create a migration with a scope and custom directory
 * createMigrationFile('AddEmailToUsers', 'users', './src/database/migrations');
 * // Result: ./src/database/migrations/users/20230815123045_add_email_to_users.ts
 */

const DEFAULT_MIGRATIONS_DIR = 'src/db/migrations';

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
 * @param migrationsDir Directory to save the migration
 * @param migrationName Name of the migration
 * @returns Path to the created migration file
 */
export const createMigration = async (
  migrationsDir: string,
  migrationName: string,
): Promise<string> => {
  // Convert migration name to snake_case
  const snakeCaseName = toSnakeCase(migrationName);

  // Create timestamp for filename
  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, '')
    .slice(0, 14);

  // Form the filename
  const fileName = `${timestamp}_${snakeCaseName}.ts`;

  // Full path to migration file
  const filePath = path.join(migrationsDir, fileName);

  // Generate migration file content
  const migrationTemplate = generateMigrationContent(snakeCaseName);

  // Write template to file
  fs.writeFileSync(filePath, migrationTemplate, 'utf8');

  log(`Migration file created: ${filePath}`, 'info');
  return filePath;
};

/**
 * Creates a migration file with database path handling
 * @param dbName Database name or path
 * @param migrationName Name of the migration
 * @param migrationsDir Optional custom migrations directory
 * @returns Path to the created migration file
 */
export const createMigrationFile = async (
  dbName: string,
  migrationName: string,
  migrationsDir?: string,
): Promise<string> => {
  // Resolve migrations directory
  const resolvedMigrationsDir = resolveMigrationsDir(dbName, migrationsDir);

  // Ensure migrations directory exists
  ensureMigrationsDir(resolvedMigrationsDir);

  // Create migration file
  const migrationPath = await createMigration(resolvedMigrationsDir, migrationName);

  log(`Migration created: ${migrationPath}`, 'success');
  return migrationPath;
};

/**
 * Resolves migrations directory based on database name
 * @param dbName Database name or path
 * @param migrationsDir Optional migrations directory
 * @returns Resolved migrations directory path
 */
const resolveMigrationsDir = (dbName: string, migrationsDir?: string): string => {
  if (migrationsDir) {
    return path.resolve(migrationsDir);
  }

  // Extract database name parts from path-like name
  const dbNameParts = dbName.split(/[\/\\]/);

  // Default migrations directory is ./db/migrations/{dbName}
  return path.resolve(DEFAULT_MIGRATIONS_DIR, ...dbNameParts);
};

/**
 * Ensures migrations directory exists
 * @param migrationsDir Migrations directory path
 */
const ensureMigrationsDir = (migrationsDir: string): void => {
  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
    log(`Created migrations directory: ${migrationsDir}`, 'info');
  }
};
