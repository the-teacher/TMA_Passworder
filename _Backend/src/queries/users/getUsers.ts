import { getAllQuery, getFirstQuery, type SQLiteDatabase } from '@libs/sqlite';
import { type User } from './createUser';

/**
 * Options for filtering and paginating users
 */
export type GetUsersOptions = {
  status?: 'active' | 'inactive' | 'deleted';
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  search?: string; // Search in name or email
};

/**
 * Gets a list of users with optional filtering and pagination
 * @param db Database connection
 * @param options Options for filtering and pagination
 * @returns Array of users matching the criteria
 */
export const getUsers = async (
  db: SQLiteDatabase,
  options: GetUsersOptions = {},
): Promise<User[]> => {
  // Start building the query
  let sql = `SELECT * FROM users`;
  const params: any[] = [];

  // Add WHERE conditions if needed
  const conditions: string[] = [];

  if (options.status) {
    conditions.push(`status = ?`);
    params.push(options.status);
  }

  if (options.search) {
    conditions.push(`(name LIKE ? OR email LIKE ?)`);
    const searchTerm = `%${options.search}%`;
    params.push(searchTerm, searchTerm);
  }

  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(' AND ')}`;
  }

  // Add ORDER BY if specified
  if (options.orderBy) {
    const direction = options.orderDirection || 'ASC';
    sql += ` ORDER BY ${options.orderBy} ${direction}`;
  } else {
    // Default ordering
    sql += ` ORDER BY id ASC`;
  }

  // Add LIMIT and OFFSET if specified
  if (options.limit) {
    sql += ` LIMIT ?`;
    params.push(options.limit);

    if (options.offset) {
      sql += ` OFFSET ?`;
      params.push(options.offset);
    }
  }

  // Execute the query
  return await getAllQuery<User>(db, sql, params);
};

/**
 * Counts the total number of users matching the given criteria
 * @param db Database connection
 * @param options Options for filtering
 * @returns Total count of matching users
 */
export const countUsers = async (
  db: SQLiteDatabase,
  options: Omit<GetUsersOptions, 'limit' | 'offset' | 'orderBy' | 'orderDirection'> = {},
): Promise<number> => {
  // Start building the query
  let sql = `SELECT COUNT(*) as count FROM users`;
  const params: any[] = [];

  // Add WHERE conditions if needed
  const conditions: string[] = [];

  if (options.status) {
    conditions.push(`status = ?`);
    params.push(options.status);
  }

  if (options.search) {
    conditions.push(`(name LIKE ? OR email LIKE ?)`);
    const searchTerm = `%${options.search}%`;
    params.push(searchTerm, searchTerm);
  }

  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(' AND ')}`;
  }

  // Execute the query
  const result = await getFirstQuery<{ count: number }>(db, sql, params);

  return result?.count || 0;
};
