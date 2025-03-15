/**
 * Migration: add_test_users
 * Created at: 2025-03-13T13:40:30.756Z
 */

import { runQuery } from '@libs/sqlite';

// Test users data
const testUsers = [
  {
    telegram_uid: '123456789',
    telegram_login: 'user1',
    telegram_first_name: 'John',
    telegram_last_name: 'Doe',
    telegram_premium: 1,
    email: 'john.doe@example.com',
  },
  {
    telegram_uid: '234567890',
    telegram_login: 'user2',
    telegram_first_name: 'Jane',
    telegram_last_name: 'Smith',
    telegram_premium: 0,
    email: 'jane.smith@example.com',
  },
  {
    telegram_uid: '345678901',
    telegram_login: 'user3',
    telegram_first_name: 'Robert',
    telegram_last_name: 'Johnson',
    telegram_premium: 1,
    email: 'robert.johnson@example.com',
  },
  {
    telegram_uid: '456789012',
    telegram_login: 'user4',
    telegram_first_name: 'Emily',
    telegram_last_name: 'Williams',
    telegram_premium: 0,
    email: 'emily.williams@example.com',
  },
  {
    telegram_uid: '567890123',
    telegram_login: 'user5',
    telegram_first_name: 'Michael',
    telegram_last_name: 'Brown',
    telegram_premium: 1,
    email: 'michael.brown@example.com',
  },
  {
    telegram_uid: '678901234',
    telegram_login: 'user6',
    telegram_first_name: 'Sarah',
    telegram_last_name: 'Jones',
    telegram_premium: 0,
    email: 'sarah.jones@example.com',
  },
  {
    telegram_uid: '789012345',
    telegram_login: 'user7',
    telegram_first_name: 'David',
    telegram_last_name: 'Miller',
    telegram_premium: 1,
    email: 'david.miller@example.com',
  },
  {
    telegram_uid: '890123456',
    telegram_login: 'user8',
    telegram_first_name: 'Lisa',
    telegram_last_name: 'Davis',
    telegram_premium: 0,
    email: 'lisa.davis@example.com',
  },
  {
    telegram_uid: '901234567',
    telegram_login: 'user9',
    telegram_first_name: 'Thomas',
    telegram_last_name: 'Wilson',
    telegram_premium: 1,
    email: 'thomas.wilson@example.com',
  },
  {
    telegram_uid: '012345678',
    telegram_login: 'user10',
    telegram_first_name: 'Jennifer',
    telegram_last_name: 'Taylor',
    telegram_premium: 0,
    email: 'jennifer.taylor@example.com',
  },
];

export const up = async (dbPath: string): Promise<void> => {
  console.log('Migration up: Adding test users');

  // Insert each test user
  for (const user of testUsers) {
    await runQuery(
      dbPath,
      `INSERT INTO users (
        telegram_uid,
        telegram_login,
        telegram_first_name,
        telegram_last_name,
        telegram_premium,
        email
      ) VALUES (
        '${user.telegram_uid}',
        '${user.telegram_login}',
        '${user.telegram_first_name}',
        '${user.telegram_last_name}',
        ${user.telegram_premium},
        '${user.email}'
      )`,
    );
  }

  console.log(`Migration up: Added ${testUsers.length} test users`);
};

export const down = async (dbPath: string): Promise<void> => {
  console.log('Migration down: Removing test users');

  // Delete all test users by their telegram_uid values
  const telegram_uids = testUsers.map((user) => `'${user.telegram_uid}'`).join(', ');
  await runQuery(dbPath, `DELETE FROM users WHERE telegram_uid IN (${telegram_uids})`);

  console.log('Migration down: Removed test users');
};
