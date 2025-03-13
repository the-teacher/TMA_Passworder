import fs from 'fs';
import path from 'path';

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
  return `/**
 * Migration: ${snakeCaseName}
 * Created at: ${new Date().toISOString()}
 */

export const up = async () => {
  // Code for applying migration
};

export const down = async () => {
  // Code for rolling back migration
};
`;
};

/**
 * Creates a migration file
 * @param migrationName Name of the migration
 * @param scope Migration scope (default: "application")
 * @param directory Directory to save the migration (optional)
 * @returns Path to the created migration file
 */
export const createMigrationFile = (
  migrationName: string,
  scope: string = 'application',
  directory?: string,
): string => {
  // Convert migration name to snake_case
  const snakeCaseName = toSnakeCase(migrationName);

  // Create timestamp for filename
  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, '')
    .slice(0, 14);

  // Form the filename
  const fileName = `${timestamp}_${snakeCaseName}.ts`;

  // Determine directory for migrations
  const projectDir = process.cwd();

  // If directory is provided, use it with the scope as a subdirectory
  // Otherwise, use the default path with scope
  const migrationsDir = directory
    ? path.join(directory, scope)
    : path.join(projectDir, 'db', 'migrations', scope);

  // Check if directory exists and create it if necessary
  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
  }

  // Full path to migration file
  const filePath = path.join(migrationsDir, fileName);

  // Generate migration file content
  const migrationTemplate = generateMigrationContent(snakeCaseName);

  // Write template to file
  fs.writeFileSync(filePath, migrationTemplate, 'utf8');

  console.log(`Migration file created: ${filePath}`);
  return filePath;
};
