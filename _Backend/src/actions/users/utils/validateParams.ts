import { Request } from 'express';
import { z } from 'zod';

/**
 * Validates request parameters against a Zod schema
 * @param req Express request
 * @param schema Zod schema for validation
 * @returns Validation result (success or error)
 */
export const validateParams = <T extends z.ZodType>(
  req: Request,
  schema: T,
): { success: true; data: z.infer<T> } | { success: false; error: z.ZodError } => {
  try {
    const data = schema.parse(req.params);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error };
    }
    throw error;
  }
};
