import { ALLOWED_SERVICES } from '../consts';
import { type ServiceType } from '../types';

/**
 * Function to validate service type
 * @param service Service to validate
 * @returns Whether the service is valid
 */
export const isValidService = (service: string): service is ServiceType => {
  return ALLOWED_SERVICES.includes(service as ServiceType);
};
