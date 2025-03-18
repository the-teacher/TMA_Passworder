import { Request } from 'express';

import { validateParams } from '../../../utils/validateParams';
import { existsActionParamsSchema } from './existsActionSchema';

export const validateExistsParams = (req: Request) => {
  return validateParams(req, existsActionParamsSchema);
};
