import fs from 'fs';
import path from 'path';
import { createMigrationFile, generateMigrationContent } from '../utils/createMigration';

describe('generateMigrationContent', () => {
  beforeEach(() => {
    // Mock Date properly
    jest.spyOn(global, 'Date').mockImplementation(() => {
      return {
        toISOString: () => '2023-08-15T12:30:45.000Z',
      } as unknown as Date;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('generates correct migration content', () => {
    const content = generateMigrationContent('test_migration');

    // Check if content contains migration name
    expect(content).toContain('Migration: test_migration');

    // Check if content contains timestamp
    expect(content).toContain('Created at: 2023-08-15T12:30:45.000Z');

    // Check if content contains up and down functions
    expect(content).toContain('export const up = async');
    expect(content).toContain('export const down = async');
  });
});

describe('createMigrationFile', () => {
  // Save original console.log
  const originalConsoleLog = console.log;
  let testDir: string;

  beforeEach(() => {
    // Create a temporary directory in the test directory
    const testDirName = `temp/test-tmp-${Date.now()}`;
    testDir = path.join(__dirname, testDirName);

    // Create the test directory if it doesn't exist
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    // Mock console.log
    console.log = jest.fn();

    // Mock Date properly
    jest.spyOn(global, 'Date').mockImplementation(() => {
      return {
        toISOString: () => '2023-08-15T12:30:45.000Z',
      } as unknown as Date;
    });
  });

  afterEach(() => {
    // Restore console.log
    console.log = originalConsoleLog;

    // Clean up the temporary directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }

    jest.restoreAllMocks();
  });

  test('creates a migration file with default parameters', () => {
    const scope = 'application';
    const migrationName = 'CreateUsersTable';
    const migrationsDir = path.join(testDir, 'db/migrations');
    const fullDir = path.join(migrationsDir, scope);

    const filePath = createMigrationFile(fullDir, migrationName);

    // Check if directory was created
    expect(fs.existsSync(fullDir)).toBe(true);

    // Check if file was created
    const expectedFilePath = path.join(fullDir, '20230815123045_create_users_table.ts');
    expect(fs.existsSync(expectedFilePath)).toBe(true);

    // Check file content
    const fileContent = fs.readFileSync(expectedFilePath, 'utf8');
    expect(fileContent).toContain('Migration: create_users_table');
    expect(fileContent).toContain('Created at: 2023-08-15T12:30:45.000Z');

    // Check return value
    expect(filePath).toBe(expectedFilePath);
  });

  test('creates a migration file with custom directory', () => {
    const scope = 'application';
    const migrationName = 'AddEmailToUsers';
    const migrationsDir = path.join(testDir, 'src/database/migrations');
    const fullDir = path.join(migrationsDir, scope);

    const filePath = createMigrationFile(fullDir, migrationName);

    // Check if directory was created
    expect(fs.existsSync(fullDir)).toBe(true);

    // Check if file was created
    const expectedFilePath = path.join(fullDir, '20230815123045_add_email_to_users.ts');
    expect(fs.existsSync(expectedFilePath)).toBe(true);

    // Check file content
    const fileContent = fs.readFileSync(expectedFilePath, 'utf8');
    expect(fileContent).toContain('Migration: add_email_to_users');

    // Check return value
    expect(filePath).toBe(expectedFilePath);
  });

  test('creates a migration file with scope', () => {
    const scope = 'tenant';
    const migrationName = 'CreateProductsTable';
    const migrationsDir = path.join(testDir, 'db/migrations');
    const fullDir = path.join(migrationsDir, scope);

    const filePath = createMigrationFile(fullDir, migrationName);

    // Check if directory was created
    expect(fs.existsSync(fullDir)).toBe(true);

    // Check if file was created
    const expectedFilePath = path.join(fullDir, '20230815123045_create_products_table.ts');
    expect(fs.existsSync(expectedFilePath)).toBe(true);

    // Check file content
    const fileContent = fs.readFileSync(expectedFilePath, 'utf8');
    expect(fileContent).toContain('Migration: create_products_table');

    // Check return value
    expect(filePath).toBe(expectedFilePath);
  });

  test('handles existing directory', () => {
    const scope = 'application';
    const migrationName = 'UpdateUserSchema';
    const migrationsDir = path.join(testDir, 'db/migrations');
    const fullDir = path.join(migrationsDir, scope);

    // Create the directory first
    fs.mkdirSync(fullDir, { recursive: true });

    const filePath = createMigrationFile(fullDir, migrationName);

    // Check if file was created
    const expectedFilePath = path.join(fullDir, '20230815123045_update_user_schema.ts');
    expect(fs.existsSync(expectedFilePath)).toBe(true);

    // Check return value
    expect(filePath).toBe(expectedFilePath);
  });

  test('converts camelCase to snake_case correctly', () => {
    const scope = 'application';
    const migrationName = 'addUserEmailAndPhoneNumber';
    const migrationsDir = path.join(testDir, 'db/migrations');
    const fullDir = path.join(migrationsDir, scope);

    const filePath = createMigrationFile(fullDir, migrationName);

    // Check if file was created with correct snake_case name
    const expectedFilePath = path.join(
      fullDir,
      '20230815123045_add_user_email_and_phone_number.ts',
    );
    expect(fs.existsSync(expectedFilePath)).toBe(true);

    // Check file content
    const fileContent = fs.readFileSync(expectedFilePath, 'utf8');
    expect(fileContent).toContain('Migration: add_user_email_and_phone_number');

    // Check return value
    expect(filePath).toBe(expectedFilePath);
  });
});
