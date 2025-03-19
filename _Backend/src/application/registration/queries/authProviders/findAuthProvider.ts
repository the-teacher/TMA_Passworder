import { resolveDatabasePath } from '@libs/the-mirgator';
import { getFirstQuery } from '@libs/sqlite';
import { ServiceType } from '@actions/users/types';
import { AuthProvider } from '../../types';

/**
 * Find an existing auth provider by provider type and provider ID
 * @param provider Authentication provider type (email, telegram, gmail, github)
 * @param providerId Provider-specific user ID
 * @returns The auth provider record or null if not found
 */
export const findAuthProvider = async (
  provider: ServiceType,
  providerId: string,
): Promise<AuthProvider | null> => {
  const dbPath = resolveDatabasePath('application/database') as string;

  const existingProvider = await getFirstQuery<AuthProvider>(
    dbPath,
    `
      SELECT
        auth_providers.id,
        auth_providers.userId,
        auth_providers.provider,
        auth_providers.providerId,
        auth_providers.providerData,
        auth_providers.createdAt,
        auth_providers.updatedAt
      FROM
        auth_providers
      WHERE
        auth_providers.provider = ? AND auth_providers.providerId = ?
    `,
    [provider, providerId],
  );

  return existingProvider || null;
};
