import { dropSqliteDatabase } from '@libs/the-mirgator';

import { ServiceType } from '@actions/users/types';

import { findAuthProvider } from '../findAuthProvider';
import { createAuthProvider } from '../createAuthProvider';
import { createTestUser } from './utils/createTestUser';
import { setupTestDatabase } from '@utils/tests/dbHelpers';
import { type SQLiteDatabase } from '@libs/sqlite';
// Ensure logs are suppressed during tests
process.env.MIGRATOR_LOGS = 'buffer';

describe('findAuthProvider', () => {
  let db: SQLiteDatabase;
  let userId: number;

  beforeEach(async () => {
    // Setup a fresh test database before each test
    db = await setupTestDatabase();

    // Create a test user
    userId = await createTestUser(db, {
      id: 1,
      uid: 'user1',
      name: 'Test User 1',
      email: 'user1@example.com',
      status: 'active',
    });
  });

  afterAll(async () => {
    // Clean up after all tests
    if (db.path) {
      await dropSqliteDatabase(db.path, true);
    }
  });

  it('should return null when auth provider does not exist', async () => {
    // Try to find a non-existent auth provider
    const result = await findAuthProvider(db, 'github', 'nonexistent');

    // Verify the result is null
    expect(result).toBeNull();
  });

  it('should find an existing auth provider', async () => {
    // Test data
    const provider = 'github';
    const providerId = 'github123';
    const providerData = JSON.stringify({ accessToken: 'token123' });

    // Create an auth provider using the actual createAuthProvider function
    const createdProvider = await createAuthProvider(
      db,
      provider,
      providerId,
      providerData,
      userId,
    );

    // Find the auth provider
    const result = await findAuthProvider(db, provider, providerId);

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
        db,
        provider.provider as ServiceType,
        provider.providerId,
        provider.providerData,
        userId,
      );
    }

    // Find the telegram provider
    const targetProvider = 'telegram';
    const targetProviderId = 'telegram456';
    const result = await findAuthProvider(db, targetProvider, targetProviderId);

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
    await createAuthProvider(db, provider, providerId, undefined, userId);

    // Try to find with exact case
    const result1 = await findAuthProvider(db, provider, providerId);
    expect(result1).not.toBeNull();
    expect(result1?.providerId).toBe(providerId);

    // Try to find with different case (should not match due to case sensitivity in SQLite)
    const result2 = await findAuthProvider(db, provider, providerId.toLowerCase());
    expect(result2).toBeNull();
  });
});
