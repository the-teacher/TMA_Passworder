import { Request, Response } from 'express';

import { type ServiceType } from '../types';
import { withErrorHandling } from '../utils';

import { firstInAuthProviders } from './queries';
import { validateExistsParams } from './validations';
import { responseExistsSuccess, responseExistsInvalidParams } from './responses';

export const perform = async (req: Request, res: Response) => {
  return withErrorHandling(async () => {
    const validation = validateExistsParams(req);

    if (!validation.success) {
      return responseExistsInvalidParams(res, validation.error);
    }

    const id = req.params.id;
    const service = req.params.service as ServiceType;

    // Check if user exists in database
    const userExists = await firstInAuthProviders(service, id);

    responseExistsSuccess(res, { exists: userExists, service, id });
  })(req, res);
};
