import { Request, Response } from 'express';

// Actions level
import { withErrorHandling } from '@actions/utils';
import { withDatabase } from '@libs/sqlite';

// Users level
import { type ServiceType } from '../types';

// Action level
import { firstInAuthProviders } from '@queries/authProviders/firstInAuthProviders';

// application/registration/queries/authProviders/firstInAuthProviders
import { validateExistsParams } from './validations';
import { responseExistsSuccess, responseExistsInvalidParams } from './responses';

export const perform = async (req: Request, res: Response) => {
  return withErrorHandling(async () => {
    // validate params
    const validation = validateExistsParams(req);

    // response with error if params are invalid
    if (!validation.success) {
      return responseExistsInvalidParams(res, validation.error);
    }

    // get params from request
    const id = req.params.id;
    const service = req.params.service as ServiceType;

    // Check if user exists in database
    const firstRecord = await withDatabase('application/database', async (db) => {
      return await firstInAuthProviders(db, service, id);
    });

    const exists = !!firstRecord;

    // response with exists status
    responseExistsSuccess(res, { service, id, exists });
  })(req, res);
};
