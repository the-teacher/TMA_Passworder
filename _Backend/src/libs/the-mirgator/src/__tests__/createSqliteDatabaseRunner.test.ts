import { parseArgs, showHelp, run } from '../createSqliteDatabaseRunner';
import { createSqliteDatabase } from '../createSqliteDatabase';
import { log } from '../utils/logger';

// Mock dependencies
jest.mock('../createSqliteDatabase');
jest.mock('process');
jest.mock('../migrationLogger');

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
    (createSqliteDatabase as jest.Mock).mockImplementation((name, dir) =>
      dir ? `${dir}/${name}.sqlite` : `/mock/path/${name}.sqlite`,
    );

    // Mock log function
    (log as jest.Mock).mockImplementation((message) => {
      // Вызываем console.log или console.error в зависимости от типа сообщения
      if (typeof message === 'string' && message.includes('Error')) {
        console.error(message);
      } else {
        console.log(message);
      }
      return message;
    });
  });

  afterEach(() => {
    // Restore original methods
    process.exit = originalExit;
    console.log = originalConsoleLog;
    console.error = originalConsoleError;

    // Restore original process.argv after each test
    process.argv = originalArgv;

    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('parseArgs', () => {
    it('should parse dbName and directory correctly', () => {
      // Mock command line arguments
      process.argv = [
        'node', // First argument is the node executable
        'createSqliteDatabaseRunner.js', // Second argument is the script name
        'users', // Third argument is the dbName
        './custom/dir', // Fourth argument is the directory
      ];

      const args = parseArgs();

      expect(args.dbName).toBe('users');
      expect(args.directory).toBe('./custom/dir');
    });

    it('should parse dbName correctly and use default directory when not provided', () => {
      // Mock command line arguments with only dbName
      process.argv = ['node', 'createSqliteDatabaseRunner.js', 'users'];

      const args = parseArgs();

      expect(args.dbName).toBe('users');
      // Проверяем только наличие 'sqlite' в пути, так как точный путь может меняться в зависимости от окружения
      expect(args.directory).toContain('sqlite');
    });

    it('should return undefined dbName when not provided', () => {
      // Mock command line arguments with no arguments
      process.argv = ['node', 'createSqliteDatabaseRunner.js'];

      const args = parseArgs();

      expect(args.dbName).toBeUndefined();
      // Проверяем только наличие 'sqlite' в пути, так как точный путь может меняться в зависимости от окружения
      expect(args.directory).toContain('sqlite');
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

      // Мокируем возвращаемое значение createSqliteDatabase
      (createSqliteDatabase as jest.Mock).mockResolvedValue('/mock/path/users.sqlite');

      await run();

      expect(createSqliteDatabase).toHaveBeenCalledWith('users', expect.any(String));
      expect(log).toHaveBeenCalledWith(expect.stringContaining('Successfully created'), 'success');
      expect(process.exit).toHaveBeenCalledWith(0);
    });

    test('creates database file with all parameters', async () => {
      process.argv = ['node', 'script.js', 'products', './custom/dir'];

      // Мокируем возвращаемое значение createSqliteDatabase
      (createSqliteDatabase as jest.Mock).mockResolvedValue('./custom/dir/products.sqlite');

      await run();

      expect(createSqliteDatabase).toHaveBeenCalledWith('products', './custom/dir');
      expect(log).toHaveBeenCalledWith(expect.stringContaining('Successfully created'), 'success');
      expect(process.exit).toHaveBeenCalledWith(0);
    });

    test('handles errors during database creation', async () => {
      process.argv = ['node', 'script.js', 'users'];

      // Mock createSqliteDatabase to throw an error
      (createSqliteDatabase as jest.Mock).mockImplementation(() => {
        throw new Error('Test error');
      });

      await run();

      // Проверяем вызовы log вместо console.error
      expect(log).toHaveBeenCalledWith('Error creating SQLite database:', 'error');
      expect(log).toHaveBeenCalledWith('Test error', 'error');
      expect(process.exit).toHaveBeenCalledWith(0);
    });
  });
});
