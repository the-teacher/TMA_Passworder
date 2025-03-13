import fs from 'fs';
import path from 'path';
import { createSqliteDatabase, createSqliteDatabaseSync } from '../createSqliteDatabase';

// This is an integration test that creates real files
describe('SQLite Database Creation - Integration Test', () => {
  // Define test directory
  const testDir = path.join(__dirname, 'temp');

  // Clean up before and after tests
  beforeAll(() => {
    // Create test directory if it doesn't exist
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    // Clean up test directory after tests
    if (fs.existsSync(testDir)) {
      // Remove all subdirectories recursively
      const removeDir = (dirPath: string) => {
        if (fs.existsSync(dirPath)) {
          fs.readdirSync(dirPath).forEach((file) => {
            const curPath = path.join(dirPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
              // Recursive call
              removeDir(curPath);
            } else {
              // Delete file
              fs.unlinkSync(curPath);
            }
          });
          fs.rmdirSync(dirPath);
        }
      };

      // Remove the test directory and all its contents
      removeDir(testDir);
    }
  });

  describe('createSqliteDatabaseSync', () => {
    test('creates a real SQLite database file', () => {
      // Create a database in the test directory
      const dbPath = createSqliteDatabaseSync('test_db', 'application', testDir);

      // Check if the file exists
      expect(fs.existsSync(dbPath)).toBe(true);

      // For the sync version, we just check if the file exists
      // since it's just an empty file
      expect(fs.statSync(dbPath).isFile()).toBe(true);

      // Clean up the file
      // fs.unlinkSync(dbPath);
    });
  });

  describe('createSqliteDatabase', () => {
    test('creates a real SQLite database file asynchronously', async () => {
      // Create a database in the test directory
      const dbPath = await createSqliteDatabase('async_test_db', 'tenant', testDir);

      // Check if the file exists
      expect(fs.existsSync(dbPath)).toBe(true);

      // For the async version, we just check if the file exists
      expect(fs.statSync(dbPath).isFile()).toBe(true);

      // Clean up the file
      // fs.unlinkSync(dbPath);
    });

    test('creates databases with different scopes in separate directories', async () => {
      // Create two databases with different scopes
      const dbPath1 = await createSqliteDatabase('multi_scope_test1', 'scope1', testDir);
      const dbPath2 = await createSqliteDatabase('multi_scope_test2', 'scope2', testDir);

      // Check if both files exist
      expect(fs.existsSync(dbPath1)).toBe(true);
      expect(fs.existsSync(dbPath2)).toBe(true);

      // Check if they're in different directories
      const dir1 = path.dirname(dbPath1);
      const dir2 = path.dirname(dbPath2);
      expect(dir1).not.toBe(dir2);

      // Clean up
      // fs.unlinkSync(dbPath1);
      // fs.unlinkSync(dbPath2);
    });

    test('handles errors gracefully with non-existent parent directory', async () => {
      // Create a path to a directory that doesn't exist and can't be created
      // Use a very deep path that's unlikely to exist
      const nonExistentPath = path.join(testDir, 'level1', 'level2', 'level3');

      // Mock fs.mkdirSync to throw an error
      const originalMkdirSync = fs.mkdirSync;
      fs.mkdirSync = jest.fn().mockImplementation((_dirPath, _options) => {
        throw new Error('Mock directory creation error');
      });

      try {
        await expect(
          createSqliteDatabase('error_test', 'application', nonExistentPath),
        ).rejects.toThrow();
      } finally {
        // Restore the original function
        fs.mkdirSync = originalMkdirSync;
      }
    });

    test('throws error if database already exists', async () => {
      // Create a database first
      const dbPath = createSqliteDatabaseSync('duplicate_test', 'application', testDir);

      // Try to create it again
      await expect(createSqliteDatabase('duplicate_test', 'application', testDir)).rejects.toThrow(
        'Database already exists',
      );

      // Clean up
      fs.unlinkSync(dbPath);
    });
  });
});
