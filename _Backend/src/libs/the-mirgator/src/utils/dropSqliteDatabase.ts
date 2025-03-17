import fs from 'fs';
import path from 'path';

import { log } from './logger';
import { resolveDatabasePath, removeDirectory } from './databasePaths';

// Configuration constants
const COUNTDOWN_SECONDS = 10;

/**
 * Deletes a SQLite database file or directory after confirmation
 * @param dbPath Path to the database file or directory to delete
 * @param force Whether to skip confirmation countdown (default: false)
 */
export const dropSqliteDatabase = async (dbPath: string, force: boolean = false): Promise<void> => {
  // Resolve the database path
  const resolvedPath = resolveDatabasePath(dbPath) as string;

  // Validate path exists
  if (!fs.existsSync(resolvedPath)) {
    // Try to get the directory part of the path
    const dbDir = path.dirname(resolvedPath);
    // const dbFileName = path.basename(resolvedPath);

    if (fs.existsSync(dbDir)) {
      log(`Database file not found: ${resolvedPath}`, 'warning');

      // Check if there are any other files in the directory
      const files = fs.readdirSync(dbDir);
      if (files.length === 0) {
        // If directory is empty, ask if user wants to remove it
        log(`Directory is empty: ${dbDir}`, 'warning');
        if (!force) {
          log('Do you want to remove the empty directory? (y/n)', 'warning');
          const answer = await new Promise<string>((resolve) => {
            process.stdin.once('data', (data) => {
              resolve(data.toString().trim().toLowerCase());
            });
          });

          if (answer === 'y' || answer === 'yes') {
            fs.rmdirSync(dbDir);
            log(`Empty directory removed: ${dbDir}`, 'success');
          } else {
            log('Directory removal cancelled', 'info');
          }
        } else {
          // If force flag is set, remove the directory without asking
          fs.rmdirSync(dbDir);
          log(`Empty directory removed: ${dbDir}`, 'success');
        }
      } else {
        // If directory is not empty, just inform the user
        log(`Directory is not empty, contains ${files.length} files. No action taken.`, 'info');
      }

      // Exit early since there's no database file to delete
      return;
    } else {
      log(`Database path not found: ${resolvedPath}`, 'warning');
      log('No action taken.', 'info');
      return;
    }
  }

  const isDirectory = fs.lstatSync(resolvedPath).isDirectory();
  const targetType = isDirectory ? 'directory' : 'file';

  // Show warning
  log(`WARNING: You are about to delete the following database ${targetType}:`, 'warning');
  log(`Path: ${resolvedPath}`, 'warning');

  if (isDirectory) {
    log('This will delete ALL database files in this directory!', 'warning');
  }

  // Skip confirmation if force flag is set
  if (force) {
    log('Force flag detected. Skipping confirmation.', 'warning');
  } else {
    log('To cancel, press Ctrl+C now.', 'warning');
    log(`Deletion will proceed in ${COUNTDOWN_SECONDS} seconds...`, 'warning');

    // Wait for countdown seconds with countdown
    for (let i = COUNTDOWN_SECONDS; i > 0; i--) {
      process.stdout.write(`\r${i} seconds remaining...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    process.stdout.write('\n');
  }

  // Perform deletion
  try {
    if (isDirectory) {
      removeDirectory(resolvedPath);
      log(`Database directory deleted: ${resolvedPath}`, 'success');
    } else {
      fs.unlinkSync(resolvedPath);

      // Also delete schema file if it exists
      const schemaPath = resolvedPath.replace('.sqlite', '_schema.sql');
      if (fs.existsSync(schemaPath)) {
        fs.unlinkSync(schemaPath);
        log(`Schema file deleted: ${schemaPath}`, 'success');
      }

      log(`Database file deleted: ${resolvedPath}`, 'success');
    }
  } catch (error) {
    log(
      `Error deleting database: ${error instanceof Error ? error.message : String(error)}`,
      'error',
    );
    throw error;
  }
};
