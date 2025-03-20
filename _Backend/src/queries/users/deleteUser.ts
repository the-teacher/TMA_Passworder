import { getFirstQuery, type SQLiteDatabase } from '@libs/sqlite';

/**
 * Deletes a record from the specified table by ID
 * @param db Database connection
 * @param tableName Name of the table to delete from
 * @param id ID of the record to delete
 * @returns True if the record was deleted, false if it didn't exist
 */
export async function deleteRecordById(
  db: SQLiteDatabase,
  tableName: string,
  id: number,
): Promise<boolean> {
  const result = await getFirstQuery<{ id: number }>(
    db,
    `DELETE FROM ${tableName} WHERE id = ? RETURNING id`,
    [id],
  );

  // If we got a result, the record was deleted
  return !!result;
}

/**
 * Deletes a user from the database
 * @param db Database connection
 * @param id User ID to delete
 * @param options Additional options for deletion
 * @returns True if the user was deleted, false if the user didn't exist
 */
export const deleteUser = async (
  db: SQLiteDatabase,
  id: number,
  options?: {
    softDelete?: boolean; // If true, marks the user as deleted instead of removing the record
  },
): Promise<boolean> => {
  // If soft delete is enabled, update the user instead of deleting
  if (options?.softDelete) {
    const result = await getFirstQuery<{ id: number }>(
      db,
      `
        UPDATE users
        SET status = 'deleted', updatedAt = ?
        WHERE id = ?
        RETURNING id
      `,
      [new Date().toISOString(), id],
    );

    return !!result;
  }

  // Otherwise, perform a hard delete
  return deleteRecordById(db, 'users', id);
};
