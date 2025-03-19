import { resolveDatabasePath } from '@libs/the-mirgator';
import { runQuery } from '@libs/sqlite';
import { ServiceType } from '@actions/users/types';
import { AuthProvider } from '../../types';
import { findAuthProvider } from './findAuthProvider';

/**
 * Create a new auth provider record
 * @param provider Authentication provider type (email, telegram, gmail, github)
 * @param providerId Provider-specific user ID
 * @param providerData Optional metadata for the provider (e.g., OAuth tokens)
 * @param userId Optional User ID to associate with the auth provider
 * @returns The newly created auth provider record
 */
export const createAuthProvider = async (
  provider: ServiceType,
  providerId: string,
  providerData?: string,
  userId?: number,
): Promise<AuthProvider> => {
  const dbPath = resolveDatabasePath('application/database') as string;
  const now = new Date().toISOString();

  // Insert the new auth provider
  await runQuery(
    dbPath,
    `
      INSERT INTO auth_providers (
        userId,
        provider,
        providerId,
        providerData,
        createdAt,
        updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?)
    `,
    [userId || null, provider, providerId, providerData || null, now, now],
  );

  // Reuse findAuthProvider to get the newly created record
  const newProvider = await findAuthProvider(provider, providerId);

  if (!newProvider) {
    throw new Error('Failed to create auth provider');
  }

  return newProvider;
};
