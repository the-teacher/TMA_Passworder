import { getFirstQuery, type SQLiteDatabase } from '@libs/sqlite';
import { AuthProvider } from '../types';
/**
 * Finds an auth provider by provider type and provider ID
 * @param dbPath Path to the database
 * @param provider The provider type (github, telegram, etc.)
 * @param providerId The unique ID from the provider
 * @returns The auth provider or null if not found
 */
export async function findAuthProvider(
  db: SQLiteDatabase,
  provider: string,
  providerId: string,
): Promise<AuthProvider | null> {
  const result = await getFirstQuery<AuthProvider>(
    db,
    `
      SELECT * FROM auth_providers
      WHERE provider = ? AND providerId = ?
    `,
    [provider, providerId],
  );

  return result || null;
}
