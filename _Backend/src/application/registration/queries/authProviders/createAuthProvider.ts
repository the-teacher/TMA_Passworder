import { ServiceType } from '@actions/users/types';
import { getFirstQuery } from '@libs/sqlite';
import { AuthProvider } from '../../types';

/**
 * Creates a new auth provider in the database
 * @param dbPath Path to the database
 * @param provider The provider type (github, telegram, etc.)
 * @param providerId The unique ID from the provider
 * @param providerData Optional provider-specific data (e.g., tokens)
 * @param userId Optional user ID to associate with this provider
 * @returns The created auth provider
 */
export async function createAuthProvider(
  dbPath: string,
  provider: ServiceType,
  providerId: string,
  providerData?: string | null,
  userId?: number,
): Promise<AuthProvider> {
  // Validate provider type
  const validProviders: ServiceType[] = ['github', 'telegram', 'gmail'];
  if (!validProviders.includes(provider)) {
    throw new Error(`Invalid provider type: ${provider}`);
  }

  const now = new Date().toISOString();

  const result = await getFirstQuery<AuthProvider>(
    dbPath,
    `
      INSERT INTO auth_providers (
        userId, provider, providerId, providerData, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?)
      RETURNING *
    `,
    [userId || null, provider, providerId, providerData || null, now, now],
  );

  if (!result) {
    throw new Error('Failed to create auth provider');
  }

  return result;
}
