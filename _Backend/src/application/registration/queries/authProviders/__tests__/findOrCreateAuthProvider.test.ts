import { dropSqliteDatabase } from '@libs/the-mirgator';
import { ServiceType } from '@actions/users/types';

import { findOrCreateAuthProvider } from '../findOrCreateAuthProvider';
import { findAuthProvider } from '../findAuthProvider';
import { createTestUser } from './utils/createTestUser';
import { setupTestDatabase } from '@utils/tests/dbHelpers';
import { type SQLiteDatabase } from '@libs/sqlite';

// Ensure logs are suppressed during tests
process.env.MIGRATOR_LOGS = 'buffer';

describe('findOrCreateAuthProvider', () => {
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

  it('should create a new auth provider when it does not exist', async () => {
    // Test data
    const provider = 'github' as ServiceType;
    const providerId = 'github123';
    const providerData = JSON.stringify({ accessToken: 'token123' });

    // Find or create the auth provider
    const result = await findOrCreateAuthProvider(db, provider, providerId, userId, providerData);

    // Verify the result
    expect(result).toBeDefined();
    expect(result.provider).toBe(provider);
    expect(result.providerId).toBe(providerId);
    expect(result.providerData).toBe(providerData);
    expect(result.userId).toBe(userId);
    expect(result.id).toBeGreaterThan(0);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();

    // Verify it was actually saved to the database
    const savedProvider = await findAuthProvider(db, provider, providerId);
    expect(savedProvider).toEqual(result);
  });

  it('should return existing auth provider when it already exists', async () => {
    // Test data
    const provider = 'telegram' as ServiceType;
    const providerId = 'telegram456';
    const providerData = JSON.stringify({ username: 'testuser' });

    // First, create the auth provider
    const createdProvider = await findOrCreateAuthProvider(
      db,
      provider,
      providerId,
      userId,
      providerData,
    );

    // Then, try to find or create it again
    const result = await findOrCreateAuthProvider(
      db,
      provider,
      providerId,
      userId,
      'different data',
    );

    // Verify the result is the same as the first one (not a new one with different data)
    expect(result).toEqual(createdProvider);
    expect(result.providerData).toBe(providerData); // Data should not be updated
    expect(result.providerData).not.toBe('different data');
  });

  it('should work with different provider types', async () => {
    // Test with different provider types
    const providers = [
      {
        provider: 'github' as ServiceType,
        providerId: 'github123',
        providerData: JSON.stringify({ accessToken: 'github_token' }),
      },
      {
        provider: 'telegram' as ServiceType,
        providerId: 'telegram456',
        providerData: JSON.stringify({ username: 'telegram_user' }),
      },
      {
        provider: 'gmail' as ServiceType,
        providerId: 'gmail789',
        providerData: JSON.stringify({ email: 'gmail_user@example.com' }),
      },
    ];

    // Find or create each provider
    for (const provider of providers) {
      const result = await findOrCreateAuthProvider(
        db,
        provider.provider,
        provider.providerId,
        userId,
        provider.providerData,
      );

      // Verify the result
      expect(result).toBeDefined();
      expect(result.provider).toBe(provider.provider);
      expect(result.providerId).toBe(provider.providerId);
      expect(result.providerData).toBe(provider.providerData);
      expect(result.userId).toBe(userId);
    }

    // Verify all providers were saved
    for (const provider of providers) {
      const savedProvider = await findAuthProvider(db, provider.provider, provider.providerId);
      expect(savedProvider).not.toBeNull();
      expect(savedProvider?.provider).toBe(provider.provider);
      expect(savedProvider?.providerId).toBe(provider.providerId);
    }
  });

  it('should create a provider without a user ID', async () => {
    // Test data
    const provider = 'gmail';
    const providerId = 'user@example.com';
    const providerData = JSON.stringify({ verified: false });

    // Find or create without a user ID
    const result = await findOrCreateAuthProvider(
      db,
      provider,
      providerId,
      undefined,
      providerData,
    );

    // Verify the result
    expect(result).toBeDefined();
    expect(result.provider).toBe(provider);
    expect(result.providerId).toBe(providerId);
    expect(result.providerData).toBe(providerData);
    expect(result.userId).toBeNull(); // Should be null since we didn't provide a user ID
    expect(result.id).toBeGreaterThan(0);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });

  it('should create a provider without provider data', async () => {
    // Test data
    const provider = 'github' as ServiceType;
    const providerId = 'github999';

    // Find or create without provider data
    const result = await findOrCreateAuthProvider(db, provider, providerId, userId);

    // Verify the result
    expect(result).toBeDefined();
    expect(result.provider).toBe(provider);
    expect(result.providerId).toBe(providerId);
    expect(result.providerData).toBeNull(); // Should be null since we didn't provide provider data
    expect(result.userId).toBe(userId);
    expect(result.id).toBeGreaterThan(0);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });
});
