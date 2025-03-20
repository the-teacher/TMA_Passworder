import { getFirstQuery, type SQLiteDatabase } from '@libs/sqlite';
import { extractSqlFields, createSetClause } from '@libs/sqlite/sqlHelpers';
import { type User } from './createUser';

/**
 * Updates an existing user in the database
 * @param db Database connection
 * @param id User ID to update
 * @param userData User data to update
 * @returns Updated user ID
 */
export const updateUser = async (
  db: SQLiteDatabase,
  id: number,
  userData: Partial<Omit<User, 'id'>>,
): Promise<number> => {
  // Add updatedAt timestamp if not provided
  const dataToUpdate = {
    ...userData,
    updatedAt: userData.updatedAt || new Date().toISOString(),
  };

  // Extract SQL fields from user data
  const { fieldKeys, fieldValues } = extractSqlFields(dataToUpdate);

  // Create SET clause for UPDATE statement using the helper function
  const setClause = createSetClause(fieldKeys);

  // Build the SQL query
  const sql = `
    UPDATE users
    SET ${setClause}
    WHERE id = ?
    RETURNING id
  `;

  // Add the ID to the values array for the WHERE clause
  const params = [...fieldValues, id];

  // Execute the query and return the updated ID
  const result = await getFirstQuery<{ id: number }>(db, sql, params);

  if (!result) {
    throw new Error(`Failed to update user with ID ${id}`);
  }

  return result.id;
};
