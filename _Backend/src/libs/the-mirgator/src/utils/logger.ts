/**
 * The Migrator - Shared Logger
 *
 * This module provides a consistent logging interface for all migrator components.
 *
 * @module the-migrator/utils/logger
 */

/**
 * Log message types
 */
export type LogType = 'info' | 'error' | 'success' | 'warning';

/**
 * Log modes
 * - normal: Logs are displayed immediately via console
 * - off: No logs are displayed or stored
 * - buffer: Logs are stored in memory and can be retrieved later
 */
export type LogMode = 'normal' | 'off' | 'buffer';

// Store for buffered logs
const logBuffer: string[] = [];

/**
 * Get current log mode from environment variable
 */
const getLogMode = (): LogMode => {
  return (process.env.MIGRATOR_LOGS || 'normal') as LogMode;
};

/**
 * Get symbol for log type
 */
const getLogSymbol = (type: LogType): string => {
  switch (type) {
    case 'error':
      return '❌';
    case 'success':
      return '✅';
    case 'warning':
      return '🟡';
    default:
      return '🔵';
  }
};

/**
 * Output log message to console based on type
 */
const outputToConsole = (message: string, type: LogType): void => {
  switch (type) {
    case 'error':
      console.error(message);
      break;
    case 'warning':
      console.warn(message);
      break;
    default:
      console.log(message);
  }
};

/**
 * Enhanced logging function
 * @param message Message to log
 * @param type Type of message ('info', 'error', 'success', 'warning')
 */
export const log = (message: string, type: LogType = 'info'): void => {
  const mode = getLogMode();

  // If log mode is off, don't do anything
  if (mode === 'off') {
    return;
  }

  const prefix = '[Migrator]';
  const formattedMessage = `${prefix} ${getLogSymbol(type)} ${message}`;

  // Handle different log modes
  if (mode === 'buffer') {
    // Store log in buffer
    logBuffer.push(formattedMessage);
  } else {
    // Normal mode - output to console
    outputToConsole(formattedMessage, type);
  }
};

/**
 * Get all buffered logs
 * @returns Array of log messages
 */
export const getBufferedLogs = (): string[] => {
  return [...logBuffer];
};

/**
 * Clear the log buffer
 */
export const clearLogBuffer = (): void => {
  logBuffer.length = 0;
};

/**
 * Flush buffered logs to console
 * @param clear Whether to clear the buffer after flushing
 */
export const flushLogBuffer = (clear: boolean = true): void => {
  if (logBuffer.length === 0) {
    console.log('[Migrator] No logs in buffer');
    return;
  }

  console.log(`[Migrator] Flushing ${logBuffer.length} buffered logs:`);
  console.log('-------------------------------------------');

  logBuffer.forEach((message) => {
    console.log(message);
  });

  console.log('-------------------------------------------');

  if (clear) {
    clearLogBuffer();
  }
};

/**
 * Set log mode programmatically
 * @param mode New log mode
 */
export const setLogMode = (mode: LogMode): void => {
  process.env.MIGRATOR_LOGS = mode;
};
