import { ServiceType } from '@actions/users/types';
import { AuthProvider } from '../types';
import { findAuthProvider } from './findAuthProvider';
import { createAuthProvider } from './createAuthProvider';
import { type SQLiteDatabase } from '@libs/sqlite';
/**
 * Finds an existing auth provider or creates a new one if it doesn't exist
 * @param db Database instance
 * @param provider The provider type (github, telegram, etc.)
 * @param providerId The unique ID from the provider
 * @param userId Optional user ID to associate with this provider
 * @param providerData Optional provider-specific data (e.g., tokens)
 * @returns The found or created auth provider
 */
export const findOrCreateAuthProvider = async (
  db: SQLiteDatabase,
  provider: ServiceType,
  providerId: string,
  userId?: number,
  providerData?: string,
): Promise<AuthProvider> => {
  // First, try to find the auth provider
  const existingProvider = await findAuthProvider(db, provider, providerId);

  // If it exists, return it
  if (existingProvider) {
    return existingProvider;
  }

  // Otherwise, create a new one
  return createAuthProvider(db, provider, providerId, providerData, userId);
};
