import { getFirstQuery, type SQLiteDatabase } from '@libs/sqlite';

/**
 * Helper function to create a test user in the database
 * @param dbPath Path to the database
 * @param userData User data to insert
 * @returns The created user ID
 */
export const createTestUser = async (
  db: SQLiteDatabase,
  userData: {
    id: number;
    uid: string;
    name: string;
    email: string;
    status: 'active' | 'inactive';
  },
): Promise<number> => {
  const now = new Date().toISOString();

  await getFirstQuery(
    db,
    `
      INSERT INTO users (
        id, uid, name, email, status, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [userData.id, userData.uid, userData.name, userData.email, userData.status, now, now],
  );
  return userData.id;
};
