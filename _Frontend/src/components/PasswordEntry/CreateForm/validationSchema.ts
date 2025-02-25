import { z } from "zod";

const VALIDATION = {
  SERVICE_NAME: {
    MIN: 3,
    MAX: 10
  },
  USERNAME: {
    MIN: 3,
    MAX: 30
  },
  PASSWORD: {
    MIN: 8,
    MAX: 50
  },
  NOTES: {
    MAX: 500
  }
} as const;

export const validationSchema = z.object({
  serviceName: z
    .string()
    .min(
      VALIDATION.SERVICE_NAME.MIN,
      `Service name must be at least ${VALIDATION.SERVICE_NAME.MIN} characters`
    )
    .max(
      VALIDATION.SERVICE_NAME.MAX,
      `Service name must not exceed ${VALIDATION.SERVICE_NAME.MAX} characters`
    ),

  username: z
    .string()
    .min(
      VALIDATION.USERNAME.MIN,
      `Username must be at least ${VALIDATION.USERNAME.MIN} characters`
    )
    .max(
      VALIDATION.USERNAME.MAX,
      `Username must not exceed ${VALIDATION.USERNAME.MAX} characters`
    ),

  password: z
    .string()
    .min(
      VALIDATION.PASSWORD.MIN,
      `Password must be at least ${VALIDATION.PASSWORD.MIN} characters`
    )
    .max(
      VALIDATION.PASSWORD.MAX,
      `Password must not exceed ${VALIDATION.PASSWORD.MAX} characters`
    ),

  serviceUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),

  notes: z
    .string()
    .max(
      VALIDATION.NOTES.MAX,
      `Notes must not exceed ${VALIDATION.NOTES.MAX} characters`
    )
    .optional()
    .or(z.literal(""))
});

export type FormData = z.infer<typeof validationSchema>;
