import { Response } from 'express';
import { ServiceType } from '../../types';

export const responseExistsSuccess = (
  res: Response,
  data: { exists: boolean; service: ServiceType; id: string },
) => {
  return res.status(200).json({
    status: 'success',
    ...data,
  });
};
