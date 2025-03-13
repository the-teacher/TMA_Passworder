import { runMigration, parseArgs, showHelp } from '../migrationRunner';
import fs from 'fs';
import path from 'path';

// Mock dependencies
jest.mock('fs');
jest.mock('path');

describe('migrationRunner', () => {
  // Save original console methods
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  const originalProcessArgv = process.argv;

  beforeEach(() => {
    // Mock console methods
    console.log = jest.fn();
    console.error = jest.fn();

    // Reset process.argv
    process.argv = [...originalProcessArgv];

    // Mock fs.existsSync to return true
    (fs.existsSync as jest.Mock).mockReturnValue(true);

    // Mock path.resolve to return the input
    (path.resolve as jest.Mock).mockImplementation((p) => p);

    // Mock path.basename to return the last part of the path
    (path.basename as jest.Mock).mockImplementation((p) => p.split('/').pop());
  });

  afterEach(() => {
    // Restore original methods
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
    process.argv = originalProcessArgv;

    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('runMigration', () => {
    test('runs up migration successfully', async () => {
      // Mock the migration import
      const mockUp = jest.fn().mockResolvedValue(undefined);
      jest.mock(
        '/path/to/migration.ts',
        () => ({
          up: mockUp,
        }),
        { virtual: true },
      );

      // Run the migration
      await runMigration('up', '/path/to/db.sqlite', '/path/to/migration.ts');

      // Check if the migration was called
      expect(mockUp).toHaveBeenCalledWith('/path/to/db.sqlite');
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('completed successfully'));
    });

    test('runs down migration successfully', async () => {
      // Mock the migration import
      const mockDown = jest.fn().mockResolvedValue(undefined);
      jest.mock(
        '/path/to/migration.ts',
        () => ({
          down: mockDown,
        }),
        { virtual: true },
      );

      // Run the migration
      await runMigration('down', '/path/to/db.sqlite', '/path/to/migration.ts');

      // Check if the migration was called
      expect(mockDown).toHaveBeenCalledWith('/path/to/db.sqlite');
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('completed successfully'));
    });

    test('throws error if database file does not exist', async () => {
      // Mock fs.existsSync to return false for the database file
      (fs.existsSync as jest.Mock).mockImplementation((path) => {
        return !path.includes('db.sqlite');
      });

      // Run the migration and expect it to throw
      await expect(
        runMigration('up', '/path/to/db.sqlite', '/path/to/migration.ts'),
      ).rejects.toThrow('Database file not found');
    });

    test('throws error if migration file does not exist', async () => {
      // Mock fs.existsSync to return false for the migration file
      (fs.existsSync as jest.Mock).mockImplementation((path) => {
        return !path.includes('migration.ts');
      });

      // Run the migration and expect it to throw
      await expect(
        runMigration('up', '/path/to/db.sqlite', '/path/to/migration.ts'),
      ).rejects.toThrow('Migration file not found');
    });

    test('throws error if migration does not have requested method', async () => {
      // Mock the migration import without the up method
      jest.mock('/path/to/migration.ts', () => ({}), { virtual: true });

      // Run the migration and expect it to throw
      await expect(
        runMigration('up', '/path/to/db.sqlite', '/path/to/migration.ts'),
      ).rejects.toThrow('Migration does not have a up method');
    });
  });

  describe('parseArgs', () => {
    test('parses arguments correctly', () => {
      process.argv = ['node', 'script.js', 'down', '/path/to/db.sqlite', '/path/to/migration.ts'];
      const args = parseArgs();

      expect(args.direction).toBe('down');
      expect(args.dbPath).toBe('/path/to/db.sqlite');
      expect(args.migrationPath).toBe('/path/to/migration.ts');
    });

    test('uses default direction when not provided', () => {
      process.argv = ['node', 'script.js'];
      const args = parseArgs();

      expect(args.direction).toBe('up');
      expect(args.dbPath).toBeUndefined();
      expect(args.migrationPath).toBeUndefined();
    });

    test('validates direction parameter', () => {
      process.argv = [
        'node',
        'script.js',
        'invalid',
        '/path/to/db.sqlite',
        '/path/to/migration.ts',
      ];
      const args = parseArgs();

      expect(args.direction).toBe('up');
      expect(args.dbPath).toBeUndefined();
      expect(args.migrationPath).toBeUndefined();
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Invalid direction'));
    });
  });

  describe('showHelp', () => {
    test('displays help message', () => {
      showHelp();
      expect(console.log).toHaveBeenCalled();
      expect((console.log as jest.Mock).mock.calls[0][0]).toContain('Usage:');
    });
  });
});
