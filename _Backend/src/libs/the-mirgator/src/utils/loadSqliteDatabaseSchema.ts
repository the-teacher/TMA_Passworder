import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { getDatabase } from '@libs/sqlite/getDatabase';
import { log } from './logger';
import { resolveDatabasePath } from './databasePaths';
import { withTransaction, runCommand } from '@libs/sqlite/transactions';

/**
 * The Migrator - SQLite Database Schema Loader
 *
 * This module provides functionality for loading a schema into a SQLite database.
 *
 * @module the-migrator/utils/loadSqliteDatabaseSchema
 */

/**
 * Loads a schema file into a SQLite database
 * @param dbNameOrPath Name or path of the database
 * @param schemaPath Path to the schema file (optional, will be inferred if not provided)
 * @returns Promise that resolves when schema is loaded
 */
export const loadSqliteDatabaseSchema = async (
  dbNameOrPath: string,
  schemaPath?: string,
): Promise<void> => {
  // Resolve the database path
  const dbPath = resolveDatabasePath(dbNameOrPath) as string;

  // If schema path is not provided, infer it from the database path
  if (!schemaPath) {
    const dbDir = path.dirname(dbPath);
    const dbName = path.basename(dbPath, '.sqlite');
    schemaPath = path.join(dbDir, `${dbName}_schema.sql`);
  }

  // Check if schema file exists
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema file not found: ${schemaPath}`);
  }

  // Check if database file exists
  if (!fs.existsSync(dbPath)) {
    throw new Error(`Database file not found: ${dbPath}`);
  }

  log(`Loading schema from ${schemaPath} into ${dbPath}`, 'info');

  // Read schema file
  const schemaContent = fs.readFileSync(schemaPath, 'utf8');

  // Split schema into individual statements
  // This handles multi-line statements and ignores comments
  const statements = parseSchemaStatements(schemaContent);

  if (statements.length === 0) {
    log('No SQL statements found in schema file', 'warning');
    return;
  }

  log(`Found ${statements.length} SQL statements to execute`, 'info');

  // Get database connection
  const db = getDatabase(dbPath);

  try {
    // Execute all statements within a transaction
    await withTransaction(db, async () => {
      for (const statement of statements) {
        await runCommand(db, statement);
      }
    });

    log(`Schema loaded successfully into ${dbPath}`, 'success');
  } catch (error) {
    log(`Error loading schema: ${error}`, 'error');
    throw error;
  } finally {
    // Close database connection
    db.close();
  }
};

/**
 * Parse SQL schema content into individual statements
 * @param schemaContent SQL schema content
 * @returns Array of SQL statements
 */
const parseSchemaStatements = (schemaContent: string): string[] => {
  // Remove comments
  const contentWithoutComments = schemaContent.replace(/--.*$/gm, '');

  // Split by semicolons, but keep statements that span multiple lines together
  const statements = contentWithoutComments
    .split(';')
    .map((stmt) => stmt.trim())
    .filter((stmt) => stmt.length > 0);

  return statements;
};
