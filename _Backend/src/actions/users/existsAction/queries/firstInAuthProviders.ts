import { getFirstQuery, type SQLiteDatabase } from '@libs/sqlite';
import { ServiceType } from '../../types';

/**
 * Function to check if user exists in database
 * @param service Authentication provider (telegram, gmail, github)
 * @param id Provider-specific user ID
 * @returns Whether the user exists
 */
export const firstInAuthProviders = async (
  db: SQLiteDatabase,
  service: ServiceType,
  id: string,
): Promise<boolean> => {
  // Query the database to check if a user with the given provider and providerId exists
  const firstRecord = await getFirstQuery<{ id: number }>(
    db,
    `
      SELECT
        id
      FROM
        auth_providers
      WHERE
        provider = ? AND providerId = ?
    `,
    [service, id],
  );

  // If a result was found, the user exists
  return !!firstRecord;
};
