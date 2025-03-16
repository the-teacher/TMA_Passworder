/**
 * The Migrator - Shared Logger
 *
 * This module provides a consistent logging interface for all migrator components.
 *
 * @module the-migrator/migrationLogger
 */

/**
 * Log message types
 */
export type LogType = 'info' | 'error' | 'success' | 'warning';

/**
 * Enhanced logging function
 * @param message Message to log
 * @param type Type of message ('info', 'error', 'success', 'warning')
 * @param debug Whether to only log when DEBUG_SCHEMA environment variable is set
 */
export const log = (message: string, type: LogType = 'info', debug: boolean = false): void => {
  // Skip logging if debug is true and DEBUG_SCHEMA is not set
  if (debug && !process.env.DEBUG_SCHEMA) {
    return;
  }

  const prefix = '[Migrator]';

  switch (type) {
    case 'error':
      console.error(`${prefix} ❌ ${message}`);
      break;
    case 'success':
      console.log(`${prefix} ✅ ${message}`);
      break;
    case 'warning':
      console.warn(`${prefix} 🟡 ${message}`);
      break;
    default:
      console.log(`${prefix} 🔵 ${message}`);
  }
};
