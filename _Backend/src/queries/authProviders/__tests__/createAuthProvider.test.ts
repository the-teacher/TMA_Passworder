import { dropSqliteDatabase } from '@libs/the-mirgator';
import { type SQLiteDatabase } from '@libs/sqlite';
import { createAuthProvider } from '../createAuthProvider';
import { findAuthProvider } from '../findAuthProvider';
import { createTestUser } from './utils/createTestUser';
import { setupTestDatabase } from '@utils/tests/dbHelpers';

// Ensure logs are suppressed during tests
process.env.MIGRATOR_LOGS = 'buffer';

describe('createAuthProvider', () => {
  let db: SQLiteDatabase;
  let userId: number;

  beforeEach(async () => {
    // Setup a fresh test database before each test
    db = await setupTestDatabase();

    // Create a test user for all tests since userId is required
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
    await dropSqliteDatabase(db.path, true);
  });

  it('should create a new auth provider with minimal data', async () => {
    // Test data
    const provider = 'github';
    const providerId = 'github123';

    // Create auth provider with just the required fields
    const result = await createAuthProvider(db, provider, providerId, undefined, userId);

    // Verify the result
    expect(result).toBeDefined();
    expect(result.provider).toBe(provider);
    expect(result.providerId).toBe(providerId);
    expect(result.providerData).toBeNull();
    expect(result.userId).toBe(userId);
    expect(result.id).toBeGreaterThan(0);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();

    // Verify it was actually saved to the database
    const savedProvider = await findAuthProvider(db, provider, providerId);
    expect(savedProvider).toEqual(result);
  });

  it('should create a new auth provider with provider data', async () => {
    // Test data
    const provider = 'telegram';
    const providerId = 'telegram456';
    const providerData = JSON.stringify({ username: 'testuser' });

    // Create auth provider with provider data
    const result = await createAuthProvider(db, provider, providerId, providerData, userId);

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

  it('should create a new auth provider with a different user ID', async () => {
    // Create another user with explicit data
    const anotherUserId = await createTestUser(db, {
      id: 2,
      uid: 'user2',
      name: 'Test User 2',
      email: 'user2@example.com',
      status: 'active',
    });

    // Test data
    const provider = 'gmail';
    const providerId = 'gmail789';

    // Create auth provider with a different user ID
    const result = await createAuthProvider(db, provider, providerId, undefined, anotherUserId);

    // Verify the result
    expect(result).toBeDefined();
    expect(result.provider).toBe(provider);
    expect(result.providerId).toBe(providerId);
    expect(result.providerData).toBeNull();
    expect(result.userId).toBe(anotherUserId);
    expect(result.id).toBeGreaterThan(0);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();

    // Verify it was actually saved to the database
    const savedProvider = await findAuthProvider(db, provider, providerId);
    expect(savedProvider).toEqual(result);
  });

  it('should throw an error when provider type is invalid', async () => {
    // Test with invalid provider type
    const invalidProvider = 'invalid' as any;
    const providerId = 'test123';

    // Expect the function to throw an error
    await expect(
      createAuthProvider(db, invalidProvider, providerId, undefined, userId),
    ).rejects.toThrow();
  });
});
