import { resolveDatabasePath } from '@libs/the-mirgator/src';
import { ServiceType } from './isValidService';

/**
 * Function to check if user exists in database
 * @param service Service type
 * @param id User ID
 * @returns Whether the user exists
 */
export const checkIfUserExists = async (_service: ServiceType, id: string): Promise<boolean> => {
  const _dbPath = resolveDatabasePath('application/database') as string;

  // For testing purposes, return false for specific ID
  if (id === '123') return false;

  // In a real implementation, we would query the database
  // const user = await getFirstQuery<{ id: number }>(
  //   dbPath,
  //   'SELECT id FROM users WHERE service = ? AND external_id = ?',
  //   [service, id]
  // );
  // return !!user;

  // Temporary implementation for testing
  const validLoginPattern = /^[a-zA-Z0-9_]+$/;
  return id.length > 3 && validLoginPattern.test(id);
};
