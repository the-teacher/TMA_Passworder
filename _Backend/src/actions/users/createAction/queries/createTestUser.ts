import { runSqlQuery, type SQLiteDatabase } from '@libs/sqlite';

export const createTestUser = async (
  db: SQLiteDatabase,
  userId: number,
  service: string,
  providerId: string,
) => {
  // Insert a user
  await runSqlQuery(
    db,
    `INSERT INTO users (id, uid, name, email)
     VALUES (?, ?, ?, ?)`,
    [userId, 'sys123456789', 'Test User', 'test@example.com'],
  );

  // Insert auth provider for the user
  await runSqlQuery(
    db,
    `INSERT INTO auth_providers (userId, provider, providerId)
     VALUES (?, ?, ?)`,
    [userId, service, providerId],
  );
};
