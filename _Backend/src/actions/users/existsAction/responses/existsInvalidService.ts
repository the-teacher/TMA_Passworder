import { Response } from 'express';
import { ALLOWED_SERVICES } from '../../consts';

export const responseExistsInvalidService = (res: Response, service: string) => {
  return res.status(400).json({
    status: 'error',
    message: 'Invalid service type',
    error: `Service must be one of: ${ALLOWED_SERVICES.join(', ')}. Received: ${service}`,
  });
};
