// Core functionality
export { createMigration } from './createMigration';
export { createMigrationRunner } from './createMigrationRunner';

// Utilities
export { log, setLogMode, getBufferedLogs, clearLogBuffer, flushLogBuffer } from './utils/logger';
export { resolveDatabasePath, getDatabaseRootDir } from './utils/databasePaths';
export { createSqliteDatabaseSchema } from './utils/createSqliteDatabaseSchema';
export { loadSqliteDatabaseSchema } from './utils/loadSqliteDatabaseSchema';
export { dropSqliteDatabase } from './utils/dropSqliteDatabase';
export { runSqliteMigration } from './utils/runSqliteMigration';

// Migration tracking
export {
  getMigrationTimestamp,
  ensureMigrationsTable,
  isMigrationApplied,
  recordMigration,
  removeMigrationRecord,
  getAppliedMigrations,
} from './migrationTracker';

// Types
export type { LogType, LogMode } from './utils/logger';
export type { MigrationModule } from './utils/runSqliteMigration';
