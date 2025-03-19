import { parseArgs, showHelp, run } from '../CLI/createMigrationRunner';
import { createMigrationFile } from '../utils/createMigration';

// Mock dependencies
jest.mock('../utils/createMigration');
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
    (createMigrationFile as jest.Mock).mockImplementation((dir, name) => `${dir}/${name}.ts`);
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
        migrationsDir: undefined,
      });
    });

    test('parses migration name and directory', () => {
      process.argv = ['node', 'script.js', 'CreateUsersTable', './custom/dir'];
      const args = parseArgs();

      expect(args).toEqual({
        migrationName: 'CreateUsersTable',
        migrationsDir: './custom/dir',
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
        expect.stringContaining('db/migrations/application'),
        'CreateUsersTable',
      );
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('Successfully created migration:'),
      );
      expect(process.exit).toHaveBeenCalledWith(0);
    });

    test('creates migration file with custom directory', () => {
      process.argv = ['node', 'script.js', 'CreateUsersTable', './custom/dir'];
      run();

      expect(createMigrationFile).toHaveBeenCalledWith('./custom/dir', 'CreateUsersTable');
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
      expect(console.error).toHaveBeenCalledWith(expect.any(Error));
      expect(process.exit).toHaveBeenCalledWith(1);
    });
  });
});
