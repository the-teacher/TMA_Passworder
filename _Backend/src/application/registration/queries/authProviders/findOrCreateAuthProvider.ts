import { ServiceType } from '@actions/users/types';
import { AuthProvider } from '../../types';
import { findAuthProvider } from './findAuthProvider';
import { createAuthProvider } from './createAuthProvider';

/**
 * Find an existing auth provider or create a new one if it doesn't exist
 * @param provider Authentication provider type (email, telegram, gmail, github)
 * @param providerId Provider-specific user ID
 * @param userId Optional User ID to associate with the auth provider
 * @param providerData Optional metadata for the provider (e.g., OAuth tokens)
 * @returns The auth provider record
 */
export const findOrCreateAuthProvider = async (
  provider: ServiceType,
  providerId: string,
  userId?: number,
  providerData?: string,
): Promise<AuthProvider> => {
  // First, try to find an existing auth provider
  const existingProvider = await findAuthProvider(provider, providerId);

  // If the provider exists, return it
  if (existingProvider) {
    return existingProvider;
  }

  // Otherwise, create a new auth provider
  return createAuthProvider(provider, providerId, providerData, userId);
};
