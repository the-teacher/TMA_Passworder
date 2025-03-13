import fs from 'fs';
import path from 'path';
import { createMigrationFile, generateMigrationContent } from '../createMigration';

// Mock fs and path modules
jest.mock('fs');
jest.mock('path');

describe('generateMigrationContent', () => {
  beforeEach(() => {
    // Mock Date properly
    jest.spyOn(global, 'Date').mockImplementation(() => {
      return {
        toISOString: () => '2023-08-15T12:30:45.000Z',
      } as unknown as Date;
    });
  });

  test('generates correct migration content', () => {
    const content = generateMigrationContent('test_migration');

    // Check if content contains migration name
    expect(content).toContain('Migration: test_migration');

    // Check if content contains timestamp
    expect(content).toContain('Created at: 2023-08-15T12:30:45.000Z');

    // Check if content contains up and down functions
    expect(content).toContain('export const up = async () => {');
    expect(content).toContain('export const down = async () => {');
  });
});

describe('createMigrationFile', () => {
  // Save original console.log
  const originalConsoleLog = console.log;

  beforeEach(() => {
    // Mock implementations
    jest.resetAllMocks();

    // Mock path.join to return predictable paths
    (path.join as jest.Mock).mockImplementation((...args) => args.join('/'));

    // Mock process.cwd to return a fixed path
    jest.spyOn(process, 'cwd').mockReturnValue('/project');

    // Mock fs.existsSync to return false (directory doesn't exist)
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    // Mock fs.mkdirSync
    (fs.mkdirSync as jest.Mock).mockImplementation(() => undefined);

    // Mock fs.writeFileSync
    (fs.writeFileSync as jest.Mock).mockImplementation(() => undefined);

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
  });

  test('creates a migration file with default parameters', () => {
    const filePath = createMigrationFile('CreateUsersTable');

    // Check if directory existence was checked
    expect(fs.existsSync).toHaveBeenCalledWith('/project/db/migrations/application');

    // Check if directory was created
    expect(fs.mkdirSync).toHaveBeenCalledWith('/project/db/migrations/application', {
      recursive: true,
    });

    // Check if file was written
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/project/db/migrations/application/20230815123045_create_users_table.ts',
      expect.stringContaining('Migration: create_users_table'),
      'utf8',
    );

    // Check if console.log was called
    expect(console.log).toHaveBeenCalledWith(
      'Migration file created: /project/db/migrations/application/20230815123045_create_users_table.ts',
    );

    // Check return value
    expect(filePath).toBe(
      '/project/db/migrations/application/20230815123045_create_users_table.ts',
    );
  });

  test('creates a migration file with custom directory', () => {
    const filePath = createMigrationFile(
      'AddEmailToUsers',
      'application',
      './src/database/migrations',
    );

    // Check if directory existence was checked
    expect(fs.existsSync).toHaveBeenCalledWith('./src/database/migrations/application');

    // Check if file was written to the custom directory
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      './src/database/migrations/application/20230815123045_add_email_to_users.ts',
      expect.stringContaining('Migration: add_email_to_users'),
      'utf8',
    );

    // Check return value
    expect(filePath).toBe(
      './src/database/migrations/application/20230815123045_add_email_to_users.ts',
    );
  });

  test('creates a migration file with scope', () => {
    const filePath = createMigrationFile('CreateProductsTable', 'tenant');

    // Check if directory existence was checked
    expect(fs.existsSync).toHaveBeenCalledWith('/project/db/migrations/tenant');

    // Check if file was written to the scoped directory
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/project/db/migrations/tenant/20230815123045_create_products_table.ts',
      expect.stringContaining('Migration: create_products_table'),
      'utf8',
    );

    // Check return value
    expect(filePath).toBe('/project/db/migrations/tenant/20230815123045_create_products_table.ts');
  });

  test('handles existing directory', () => {
    // Mock fs.existsSync to return true (directory exists)
    (fs.existsSync as jest.Mock).mockReturnValue(true);

    createMigrationFile('UpdateUserSchema');

    // Check if directory was not created
    expect(fs.mkdirSync).not.toHaveBeenCalled();

    // Check if file was written
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/project/db/migrations/application/20230815123045_update_user_schema.ts',
      expect.stringContaining('Migration: update_user_schema'),
      'utf8',
    );
  });

  test('converts camelCase to snake_case correctly', () => {
    createMigrationFile('addUserEmailAndPhoneNumber');

    // Check if file was written with correct snake_case name
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/project/db/migrations/application/20230815123045_add_user_email_and_phone_number.ts',
      expect.stringContaining('Migration: add_user_email_and_phone_number'),
      'utf8',
    );
  });
});
