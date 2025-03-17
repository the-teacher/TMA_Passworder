/**
 * SQLite Logger Module
 *
 * This module provides logging functionality for SQLite operations.
 * It supports different log levels and can be configured to output logs
 * to different destinations.
 */

// Log levels
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'success';

// Log entry structure
export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
}

// Buffer for storing logs in memory (useful for tests)
let logBuffer: LogEntry[] = [];

/**
 * Logs a message with the specified level
 * @param message Message to log
 * @param level Log level
 * @param data Optional data to include in the log
 */
export const log = (message: string, level: LogLevel = 'info', data?: any): void => {
  const timestamp = new Date().toISOString();
  const entry: LogEntry = { timestamp, level, message, data };

  // Store in buffer if SQLITE_LOGS is set to 'buffer'
  if (process.env.SQLITE_LOGS === 'buffer') {
    logBuffer.push(entry);
    return;
  }

  // Skip logging if SQLITE_LOGS is set to 'silent'
  if (process.env.SQLITE_LOGS === 'silent') {
    return;
  }

  // Format the log message
  let formattedMessage = `[SQLite] [${timestamp}] [${level.toUpperCase()}] ${message}`;

  // Add data if provided
  if (data) {
    formattedMessage += `\n${JSON.stringify(data, null, 2)}`;
  }

  // Output to console based on log level
  switch (level) {
    case 'debug':
      console.debug(formattedMessage);
      break;
    case 'info':
      console.info(formattedMessage);
      break;
    case 'warn':
      console.warn(formattedMessage);
      break;
    case 'error':
      console.error(formattedMessage);
      break;
    case 'success':
      console.log(formattedMessage); // No console.success, use log instead
      break;
    default:
      console.log(formattedMessage);
  }
};

/**
 * Convenience method for debug logs
 * @param message Message to log
 * @param data Optional data to include
 */
export const debug = (message: string, data?: any): void => log(message, 'debug', data);

/**
 * Convenience method for info logs
 * @param message Message to log
 * @param data Optional data to include
 */
export const info = (message: string, data?: any): void => log(message, 'info', data);

/**
 * Convenience method for warning logs
 * @param message Message to log
 * @param data Optional data to include
 */
export const warn = (message: string, data?: any): void => log(message, 'warn', data);

/**
 * Convenience method for error logs
 * @param message Message to log
 * @param data Optional data to include
 */
export const error = (message: string, data?: any): void => log(message, 'error', data);

/**
 * Convenience method for success logs
 * @param message Message to log
 * @param data Optional data to include
 */
export const success = (message: string, data?: any): void => log(message, 'success', data);

/**
 * Gets all buffered logs
 * @returns Array of log entries
 */
export const getBufferedLogs = (): LogEntry[] => [...logBuffer];

/**
 * Clears the log buffer
 */
export const clearBufferedLogs = (): void => {
  logBuffer = [];
};
