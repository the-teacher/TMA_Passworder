import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { getDatabase } from '@libs/sqlite/getDatabase';
import { log } from './logger';

/**
 * Extracts and saves the database schema to a file
 * @param dbPath Path to the SQLite database file
 * @returns Path to the created schema file
 */
export const createSqliteDatabaseSchema = async (dbPath: string): Promise<string> => {
  // Get the database directory and name
  const dbDir = path.dirname(dbPath);
  const dbName = path.basename(dbPath, '.sqlite');

  // Create schema file path
  const schemaFilePath = path.join(dbDir, `${dbName}_schema.sql`);

  log(`Extracting schema from database: ${dbPath}`, 'info');

  // Get database connection
  const db = getDatabase(dbPath);

  try {
    // Get complete schema using SQLite's internal mechanism
    const schema = await getCompleteSchema(db);

    // Generate schema content with header
    let schemaContent = `-- Database Schema for ${dbName}\n`;
    schemaContent += `-- Generated at ${new Date().toISOString()}\n\n`;
    schemaContent += schema;

    // Write schema to file
    fs.writeFileSync(schemaFilePath, schemaContent, 'utf8');

    log(`Database schema saved to: ${schemaFilePath}`, 'info');
    return schemaFilePath;
  } catch (error) {
    log(`Error creating database schema: ${error}`, 'error');
    throw error;
  } finally {
    // Close the database connection
    db.close();
  }
};

// Interface for schema query result row
interface SchemaRow {
  sql: string | null;
  name: string;
  type: string;
}

/**
 * Get the complete schema directly from SQLite
 * This returns all CREATE statements for tables, indexes, triggers, and views
 * Excludes internal SQLite tables like sqlite_sequence
 */
const getCompleteSchema = (db: sqlite3.Database): Promise<string> => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT sql, name, type FROM sqlite_master
       WHERE sql IS NOT NULL
       AND sql != ''
       AND name != 'sqlite_sequence'
       ORDER BY type = 'table' DESC`,
      (err, rows: SchemaRow[]) => {
        if (err) {
          reject(err);
          return;
        }

        // Process query results with proper typing
        const schema =
          rows
            .map((row) => row.sql)
            .filter((sql) => sql) // Remove any null/empty values
            .join(';\n\n') + ';';

        resolve(schema);
      },
    );
  });
};
