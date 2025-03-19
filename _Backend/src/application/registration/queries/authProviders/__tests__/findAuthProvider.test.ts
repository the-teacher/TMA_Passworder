import { ServiceType } from '@actions/users/types';

import {
  resolveDatabasePath,
  dropSqliteDatabase,
  createSqliteDatabase,
  loadSqliteDatabaseSchema,
} from '@libs/the-mirgator';
import { findAuthProvider } from '../findAuthProvider';
import { createAuthProvider } from '../createAuthProvider';
import { createTestUser } from './utils/createTestUser';
// Ensure logs are suppressed during tests
process.env.MIGRATOR_LOGS = 'buffer';

describe('findAuthProvider', () => {
  let dbPath: string;
  let userId: number;

  beforeEach(async () => {
    // Setup a fresh test database before each test
    dbPath = resolveDatabasePath('application/database') as string;
    await dropSqliteDatabase(dbPath, true);
    await createSqliteDatabase('application/database');
    await loadSqliteDatabaseSchema(
      'application/database',
      'data/sqlite/development/application/database_schema.sql',
    );

    // Create a test user
    userId = await createTestUser(dbPath, {
      id: 1,
      uid: 'user1',
      name: 'Test User 1',
      email: 'user1@example.com',
      status: 'active',
    });
  });

  afterAll(async () => {
    // Clean up after all tests
    await dropSqliteDatabase(dbPath, true);
  });

  it('should return null when auth provider does not exist', async () => {
    // Try to find a non-existent auth provider
    const result = await findAuthProvider('github', 'nonexistent');

    // Verify the result is null
    expect(result).toBeNull();
  });

  it('should find an existing auth provider', async () => {
    // Test data
    const provider = 'github';
    const providerId = 'github123';
    const providerData = JSON.stringify({ accessToken: 'token123' });

    // Create an auth provider using the actual createAuthProvider function
    const createdProvider = await createAuthProvider(provider, providerId, providerData, userId);

    // Find the auth provider
    const result = await findAuthProvider(provider, providerId);

    // Verify the result
    expect(result).not.toBeNull();
    expect(result?.provider).toBe(provider);
    expect(result?.providerId).toBe(providerId);
    expect(result?.providerData).toBe(providerData);
    expect(result?.userId).toBe(userId);
    expect(result?.id).toBeGreaterThan(0);
    expect(result?.createdAt).toBeDefined();
    expect(result?.updatedAt).toBeDefined();

    // Verify it matches the created provider
    expect(result).toEqual(createdProvider);
  });

  it('should find the correct auth provider when multiple exist', async () => {
    // Create multiple auth providers
    const providers = [
      {
        provider: 'github',
        providerId: 'github123',
        providerData: JSON.stringify({ accessToken: 'github_token' }),
      },
      {
        provider: 'telegram',
        providerId: 'telegram456',
        providerData: JSON.stringify({ username: 'telegram_user' }),
      },
      {
        provider: 'gmail',
        providerId: 'gmail789',
        providerData: JSON.stringify({ email: 'gmail_user@example.com' }),
      },
    ];

    // Insert all providers using createAuthProvider
    for (const provider of providers) {
      await createAuthProvider(
        provider.provider as ServiceType,
        provider.providerId,
        provider.providerData,
        userId,
      );
    }

    // Find the telegram provider
    const targetProvider = 'telegram';
    const targetProviderId = 'telegram456';
    const result = await findAuthProvider(targetProvider, targetProviderId);

    // Verify we found the correct provider
    expect(result).not.toBeNull();
    expect(result?.provider).toBe(targetProvider);
    expect(result?.providerId).toBe(targetProviderId);
    expect(result?.providerData).toBe(JSON.stringify({ username: 'telegram_user' }));
    expect(result?.userId).toBe(userId);
  });

  it('should handle case sensitivity in provider IDs', async () => {
    // Create a provider with mixed case ID
    const provider = 'github';
    const providerId = 'GitHubUser123';

    // Create the auth provider
    await createAuthProvider(provider, providerId, undefined, userId);

    // Try to find with exact case
    const result1 = await findAuthProvider(provider, providerId);
    expect(result1).not.toBeNull();
    expect(result1?.providerId).toBe(providerId);

    // Try to find with different case (should not match due to case sensitivity in SQLite)
    const result2 = await findAuthProvider(provider, providerId.toLowerCase());
    expect(result2).toBeNull();
  });
});
