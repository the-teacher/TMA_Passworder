import { getFirstQuery, type SQLiteDatabase } from '@libs/sqlite';
import { ServiceType } from '../../actions/users/types';

/**
 * Function to check if user exists in database
 * @param db Database instance
 * @param service Authentication provider (telegram, gmail, github)
 * @param id Provider-specific user ID
 * @returns Whether the user exists
 */
export const firstInAuthProviders = async (
  db: SQLiteDatabase,
  service: ServiceType,
  id: string,
): Promise<{ id: number; userId: number; provider: string; providerId: string } | undefined> => {
  // Query the database to check if a user with the given provider and providerId exists
  const firstRecord = await getFirstQuery<{
    id: number;
    userId: number;
    provider: string;
    providerId: string;
  }>(
    db,
    `
      SELECT
        id,
        userId,
        provider,
        providerId
      FROM
        auth_providers
      WHERE
        provider = ? AND providerId = ?
    `,
    [service, id],
  );

  // If a result was found, the user exists
  return firstRecord;
};
