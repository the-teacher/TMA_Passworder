import { z } from 'zod';
import { ALLOWED_SERVICES } from '../../consts';

// Schema for validating request parameters
export const existsActionParamsSchema = z
  .object({
    service: z.enum(ALLOWED_SERVICES as unknown as [string, ...string[]]),
    id: z
      .string()
      .nonempty('User ID is required')
      .min(6, 'User ID must be at least 6 characters long'),
  })
  .strict('Additional parameters are not allowed');

// Type for validated parameters
export type ExistsActionParams = z.infer<typeof existsActionParamsSchema>;
