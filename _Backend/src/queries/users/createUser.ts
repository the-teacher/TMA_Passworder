import { getFirstQuery, type SQLiteDatabase } from '@libs/sqlite';
import { extractSqlFields } from '@libs/sqlite/sqlHelpers';

export type User = {
  id?: number;
  uid?: string;
  name: string;
  email: string;
  status?: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
};

export const createUser = async (db: SQLiteDatabase, user: User): Promise<number> => {
  // Extract SQL fields from user object
  const { fieldNames, fieldValues, fieldPlaceholders } = extractSqlFields(user);

  // Build the SQL query
  const sql = `
    INSERT INTO users (${fieldNames})
    VALUES (${fieldPlaceholders})
    RETURNING id
  `;

  // Execute the query and return the inserted ID
  const result = await getFirstQuery<{ id: number }>(db, sql, fieldValues);

  if (!result) {
    throw new Error('Failed to create user');
  }

  return result?.id;
};
