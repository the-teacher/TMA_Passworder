import { resolveDatabasePath } from '@libs/the-mirgator';
import { getFirstQuery } from '@libs/sqlite';
import { ServiceType } from '../types';

/**
 * Function to check if user exists in database
 * @param service Authentication provider (telegram, gmail, github)
 * @param id Provider-specific user ID
 * @returns Whether the user exists
 */
export const firstInAuthProviders = async (service: ServiceType, id: string): Promise<boolean> => {
  const dbPath = resolveDatabasePath('application/database') as string;

  // Query the database to check if a user with the given provider and provider_id exists
  const firstRecord = await getFirstQuery<{ id: number }>(
    dbPath,
    `
      SELECT
        id
      FROM
        auth_providers
      WHERE
        provider = ? AND provider_id = ?
    `,
    [service, id],
  );

  // If a result was found, the user exists
  return !!firstRecord;
};
