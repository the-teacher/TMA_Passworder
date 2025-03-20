import { getFirstQuery, type SQLiteDatabase } from '@libs/sqlite';
import { type User } from './createUser';

/**
 * Gets a user by ID
 * @param db Database connection
 * @param id User ID to retrieve
 * @returns The user or null if not found
 */
export const getUser = async (db: SQLiteDatabase, id: number): Promise<User | null> => {
  const result = await getFirstQuery<User>(db, `SELECT * FROM users WHERE id = ?`, [id]);

  return result || null;
};

/**
 * Gets a user by email
 * @param db Database connection
 * @param email Email to search for
 * @returns The user or null if not found
 */
export const getUserByEmail = async (db: SQLiteDatabase, email: string): Promise<User | null> => {
  const result = await getFirstQuery<User>(db, `SELECT * FROM users WHERE email = ?`, [email]);

  return result || null;
};

/**
 * Gets a user by UID
 * @param db Database connection
 * @param uid User UID to search for
 * @returns The user or null if not found
 */
export const getUserByUid = async (db: SQLiteDatabase, uid: string): Promise<User | null> => {
  const result = await getFirstQuery<User>(db, `SELECT * FROM users WHERE uid = ?`, [uid]);

  return result || null;
};
