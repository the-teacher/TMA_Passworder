import { Request, Response } from 'express';

import { type ServiceType } from './types';
import { withErrorHandling } from './utils';
import { validateParams } from './utils/validateParams';
import { existsActionParamsSchema } from './validations/existsActionSchema';
import { responseExistsSuccess, responseExistsInvalidParams } from './responses';
import { firstInAuthProviders } from './queries/firstInAuthProviders';
// Export the action handler at the top of the file
export const perform = async (req: Request, res: Response) => {
  return withErrorHandling(async () => {
    const validation = validateParams(req, existsActionParamsSchema);

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
