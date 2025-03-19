import { getFirstQuery } from '@libs/sqlite';
import { AuthProvider } from '../../types';

/**
 * Finds an auth provider by provider type and provider ID
 * @param dbPath Path to the database
 * @param provider The provider type (github, telegram, etc.)
 * @param providerId The unique ID from the provider
 * @returns The auth provider or null if not found
 */
export async function findAuthProvider(
  dbPath: string,
  provider: string,
  providerId: string,
): Promise<AuthProvider | null> {
  const result = await getFirstQuery<AuthProvider>(
    dbPath,
    `
      SELECT * FROM auth_providers
      WHERE provider = ? AND providerId = ?
    `,
    [provider, providerId],
  );

  return result || null;
}
