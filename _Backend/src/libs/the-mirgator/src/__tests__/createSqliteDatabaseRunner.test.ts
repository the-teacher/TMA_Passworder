import { parseArgs, showHelp, run } from '../createSqliteDatabaseRunner';
import { createSqliteDatabase } from '../createSqliteDatabase';

// Mock dependencies
jest.mock('../createSqliteDatabase');
jest.mock('process');

describe('createSqliteDatabaseRunner', () => {
  // Save original process.argv and console methods
  const originalArgv = process.argv;
  const originalExit = process.exit;
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;

  beforeEach(() => {
    // Mock process.exit
    process.exit = jest.fn() as any;

    // Mock console methods
    console.log = jest.fn();
    console.error = jest.fn();

    // Reset process.argv
    process.argv = [...originalArgv];

    // Mock createSqliteDatabase
    (createSqliteDatabase as jest.Mock).mockImplementation((name, scope, dir) =>
      dir ? `${dir}/${scope}/${name}.sqlite` : `/mock/path/${scope}/${name}.sqlite`,
    );
  });

  afterEach(() => {
    // Restore original methods
    process.exit = originalExit;
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  describe('parseArgs', () => {
    test('parses arguments correctly with all parameters', () => {
      process.argv = ['node', 'script.js', 'users', 'tenant', './custom/dir'];
      const args = parseArgs();

      expect(args.dbName).toBe('users');
      expect(args.scope).toBe('tenant');
      expect(args.directory).toBe('./custom/dir');
    });

    test('uses default scope when not provided', () => {
      process.argv = ['node', 'script.js', 'users'];
      const args = parseArgs();

      expect(args.dbName).toBe('users');
      expect(args.scope).toBe('application');
      expect(args.directory).toContain('db/sqlite');
    });

    test('returns undefined dbName when no arguments provided', () => {
      process.argv = ['node', 'script.js'];
      const args = parseArgs();

      expect(args.dbName).toBeUndefined();
      expect(args.scope).toBe('application');
      expect(args.directory).toContain('db/sqlite');
    });
  });

  describe('showHelp', () => {
    test('displays help message', () => {
      showHelp();
      expect(console.log).toHaveBeenCalled();
      expect((console.log as jest.Mock).mock.calls[0][0]).toContain('Usage:');
    });
  });

  describe('run', () => {
    test('shows help and exits if no database name provided', async () => {
      process.argv = ['node', 'script.js'];
      await run();

      expect(console.log).toHaveBeenCalled();
      expect(process.exit).toHaveBeenCalledWith(1);
      expect(createSqliteDatabase).not.toHaveBeenCalled();
    });

    test('creates database file with name only', async () => {
      process.argv = ['node', 'script.js', 'users'];
      await run();

      expect(createSqliteDatabase).toHaveBeenCalledWith('users', 'application', expect.any(String));
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Successfully created'));
      expect(process.exit).toHaveBeenCalledWith(0);
    });

    test('creates database file with all parameters', async () => {
      process.argv = ['node', 'script.js', 'products', 'tenant', './custom/dir'];
      await run();

      expect(createSqliteDatabase).toHaveBeenCalledWith('products', 'tenant', './custom/dir');
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Successfully created'));
      expect(process.exit).toHaveBeenCalledWith(0);
    });

    test('handles errors during database creation', async () => {
      process.argv = ['node', 'script.js', 'users'];

      // Mock createSqliteDatabase to throw an error
      (createSqliteDatabase as jest.Mock).mockImplementation(() => {
        throw new Error('Test error');
      });

      await run();

      expect(console.error).toHaveBeenCalledWith('Error creating SQLite database:');
      expect(console.error).toHaveBeenCalledWith('Test error');
      expect(process.exit).toHaveBeenCalledWith(1);
    });
  });
});
