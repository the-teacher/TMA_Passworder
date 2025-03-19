import { resolveDatabasePath } from '@libs/the-mirgator';
import { getDatabase } from './getDatabase';

export const getAppDatabase = (dbPath: string = 'application/database') => {
  return getDatabase(resolveDatabasePath(dbPath) as string);
};
