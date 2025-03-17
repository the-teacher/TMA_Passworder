import { Request, Response } from 'express';

import { ALLOWED_SERVICES } from './consts';
import { type ServiceType } from './types';
import { checkIfUserExists, isValidService, withErrorHandling } from './utils';

// Export the action handler at the top of the file
export const perform = async (req: Request, res: Response) => {
  return withErrorHandling(async () => {
    const { service, id } = req.params;

    // Validate that service has an allowed value
    if (!isValidService(service)) {
      return invalidServiceResponse(res, service);
    }

    // Now service is typed as ServiceType
    const validatedService: ServiceType = service as ServiceType;

    // Check if user exists in database
    const userExists = await checkIfUserExists(validatedService, id);

    res.status(200).json({
      status: 'success',
      exists: userExists,
      data: { service: validatedService, id },
    });
  })(req, res);
};

const invalidServiceResponse = (res: Response, service: string) => {
  return res.status(400).json({
    status: 'error',
    message: 'Invalid service type',
    error: `Service must be one of: ${ALLOWED_SERVICES.join(', ')}. Received: ${service}`,
  });
};
