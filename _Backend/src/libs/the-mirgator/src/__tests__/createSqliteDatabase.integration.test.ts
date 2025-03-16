import fs from 'fs';
import path from 'path';
import os from 'os';
import { createSqliteDatabase, createSqliteDatabaseSync } from '../createSqliteDatabase';

// Рекурсивная функция для удаления директории и всего её содержимого
const removeDirectory = (dirPath: string): void => {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // Рекурсивный вызов для директорий
        removeDirectory(curPath);
      } else {
        // Удаление файла
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
};

// This is an integration test that creates real files
describe('SQLite Database Creation - Integration Test', () => {
  let testDir: string;

  beforeEach(() => {
    // Create a temporary directory for each test
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sqlite-test-'));
  });

  afterEach(() => {
    // Clean up temporary directory after each test
    if (fs.existsSync(testDir)) {
      removeDirectory(testDir);
    }
  });

  describe('createSqliteDatabaseSync', () => {
    it('should create a SQLite database file synchronously', () => {
      // Create a database file
      const dbPath = createSqliteDatabaseSync('test_db', testDir);

      // Check if the file exists
      expect(fs.existsSync(dbPath)).toBe(true);

      // Check if the file has the correct name
      expect(path.basename(dbPath)).toBe('test_db.sqlite');
    });
  });

  describe('createSqliteDatabase', () => {
    it('should create a SQLite database file asynchronously', async () => {
      // Create a database file
      const dbPath = await createSqliteDatabase('async_test_db', testDir);

      // Check if the file exists
      expect(fs.existsSync(dbPath)).toBe(true);

      // Check if the file has the correct name
      expect(path.basename(dbPath)).toBe('async_test_db.sqlite');
    });

    it('should create multiple database files with different names', async () => {
      // Create two database files
      const dbPath1 = await createSqliteDatabase('multi_test1', testDir);
      const dbPath2 = await createSqliteDatabase('multi_test2', testDir);

      // Check if both files exist
      expect(fs.existsSync(dbPath1)).toBe(true);
      expect(fs.existsSync(dbPath2)).toBe(true);

      // Check if the files have the correct names
      expect(path.basename(dbPath1)).toBe('multi_test1.sqlite');
      expect(path.basename(dbPath2)).toBe('multi_test2.sqlite');
    });

    it('should handle path-like database names', async () => {
      // Create a database with a path-like name
      const dbPath = await createSqliteDatabase('path/like/name', testDir);

      // Check if the file exists
      expect(fs.existsSync(dbPath)).toBe(true);

      // Check if the directory structure was created correctly
      const expectedDir = path.join(testDir, 'path', 'like');
      expect(fs.existsSync(expectedDir)).toBe(true);

      // Check if the file has the correct name
      expect(path.basename(dbPath)).toBe('name.sqlite');
    });
  });

  describe('Error Handling', () => {
    it('should throw an error when directory does not exist and cannot be created', async () => {
      // Try to create a database in a non-existent path that cannot be created
      const nonExistentPath = '/non/existent/path';

      // Only run this test if we're not running as root (which could create the directory)
      if (process.getuid && process.getuid() !== 0) {
        await expect(createSqliteDatabase('error_test', nonExistentPath)).rejects.toThrow();
      }
    });

    it('should throw an error when trying to create a database that already exists', async () => {
      // Create a database file
      const dbPath = createSqliteDatabaseSync('duplicate_test', testDir);

      // Verify the file exists before trying to create it again
      expect(fs.existsSync(dbPath)).toBe(true);

      // Try to create the same database again
      await expect(createSqliteDatabase('duplicate_test', testDir)).rejects.toThrow(
        'Database already exists',
      );
    });
  });
});
