import { parseArgs, showHelp, run } from '../createMigrationRunner';
import { createMigrationFile } from '../createMigration';

// Mock dependencies
jest.mock('../createMigration');
jest.mock('process');

describe('createMigrationRunner', () => {
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

    // Mock createMigrationFile
    (createMigrationFile as jest.Mock).mockImplementation((name, scope, dir) =>
      dir ? `${dir}/${scope}/${name}.ts` : `/mock/path/${scope}/${name}.ts`,
    );
  });

  afterEach(() => {
    // Restore original values
    process.argv = originalArgv;
    process.exit = originalExit;
    console.log = originalConsoleLog;
    console.error = originalConsoleError;

    jest.resetAllMocks();
  });

  describe('parseArgs', () => {
    test('parses migration name only', () => {
      process.argv = ['node', 'script.js', 'CreateUsersTable'];
      const args = parseArgs();

      expect(args).toEqual({
        migrationName: 'CreateUsersTable',
        scope: 'application',
        directory: expect.any(String),
      });
    });

    test('parses migration name and scope', () => {
      process.argv = ['node', 'script.js', 'CreateUsersTable', 'tenant'];
      const args = parseArgs();

      expect(args).toEqual({
        migrationName: 'CreateUsersTable',
        scope: 'tenant',
        directory: expect.any(String),
      });
    });

    test('parses migration name, scope, and directory', () => {
      process.argv = ['node', 'script.js', 'CreateUsersTable', 'tenant', './custom/dir'];
      const args = parseArgs();

      expect(args).toEqual({
        migrationName: 'CreateUsersTable',
        scope: 'tenant',
        directory: './custom/dir',
      });
    });

    test('handles "undefined" string as default value', () => {
      process.argv = ['node', 'script.js', 'CreateUsersTable', 'undefined', 'tenant'];
      const args = parseArgs();

      expect(args).toEqual({
        migrationName: 'CreateUsersTable',
        scope: 'application',
        directory: 'tenant',
      });
    });
  });

  describe('showHelp', () => {
    test('displays help information', () => {
      showHelp();

      expect(console.log).toHaveBeenCalled();
      const helpText = (console.log as jest.Mock).mock.calls[0][0];

      expect(helpText).toContain('Usage:');
      expect(helpText).toContain('Arguments:');
      expect(helpText).toContain('Examples:');
    });
  });

  describe('run', () => {
    test('shows help and exits if no migration name provided', () => {
      process.argv = ['node', 'script.js'];
      run();

      expect(console.log).toHaveBeenCalled();
      expect(process.exit).toHaveBeenCalledWith(1);
      expect(createMigrationFile).not.toHaveBeenCalled();
    });

    test('creates migration file with name only', () => {
      process.argv = ['node', 'script.js', 'CreateUsersTable'];
      run();

      expect(createMigrationFile).toHaveBeenCalledWith(
        'CreateUsersTable',
        'application',
        expect.any(String),
      );
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('Successfully created migration:'),
      );
      expect(process.exit).toHaveBeenCalledWith(0);
    });

    test('creates migration file with all parameters', () => {
      process.argv = ['node', 'script.js', 'CreateUsersTable', 'tenant', './custom/dir'];
      run();

      expect(createMigrationFile).toHaveBeenCalledWith(
        'CreateUsersTable',
        'tenant',
        './custom/dir',
      );
      expect(process.exit).toHaveBeenCalledWith(0);
    });

    test('handles errors during migration creation', () => {
      process.argv = ['node', 'script.js', 'CreateUsersTable'];

      // Mock createMigrationFile to throw an error
      (createMigrationFile as jest.Mock).mockImplementation(() => {
        throw new Error('Test error');
      });

      run();

      expect(console.error).toHaveBeenCalledWith('Error creating migration file:');
      expect(console.error).toHaveBeenCalledWith('Test error');
      expect(process.exit).toHaveBeenCalledWith(1);
    });
  });
});
