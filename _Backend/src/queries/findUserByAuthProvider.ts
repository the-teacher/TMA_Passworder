import { getFirstQuery, type SQLiteDatabase } from '@libs/sqlite';
import { ServiceType } from '@actions/users/types';

type UserWithProvider = {
  id: number;
  uid: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  provider: string;
  providerId: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * Find a user by their authentication provider and provider ID
 * @param provider Authentication provider (email, telegram, gmail, github)
 * @param providerId Provider-specific user ID
 * @returns User data with provider information or null if not found
 */
export const findUserByAuthProvider = async (
  db: SQLiteDatabase,
  provider: ServiceType,
  providerId: string,
): Promise<UserWithProvider | undefined> => {
  // Query the database to find user with the given provider and providerId
  const user = await getFirstQuery<UserWithProvider>(
    db,
    `
      SELECT
        users.id,
        users.uid,
        users.name,
        users.email,
        users.status,
        users.createdAt,
        users.updatedAt
      FROM
        users
      JOIN
        auth_providers ON users.id = auth_providers.userId
      WHERE
        auth_providers.provider = ? AND auth_providers.providerId = ?
    `,
    [provider, providerId],
  );

  return user;
};
