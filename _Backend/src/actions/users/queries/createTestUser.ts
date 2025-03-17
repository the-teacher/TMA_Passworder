import { runQuery } from '@libs/sqlite';

export const createTestUser = async (
  dbPath: string,
  userId: number,
  service: string,
  providerId: string,
) => {
  // Insert a user
  await runQuery(
    dbPath,
    `INSERT INTO users (id, system_id, name, email)
     VALUES (?, ?, ?, ?)`,
    [userId, 'sys123456789', 'Test User', 'test@example.com'],
  );

  // Insert auth provider for the user
  await runQuery(
    dbPath,
    `INSERT INTO auth_providers (user_id, provider, provider_id)
     VALUES (?, ?, ?)`,
    [userId, service, providerId],
  );
};
