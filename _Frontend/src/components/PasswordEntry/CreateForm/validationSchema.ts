import { z } from "zod";

export const validationSchema = z.object({
  serviceName: z
    .string()
    .min(3, "Service name must be at least 3 characters")
    .max(50, "Service name must not exceed 50 characters"),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must not exceed 30 characters"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must not exceed 50 characters"),

  serviceUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),

  notes: z
    .string()
    .max(500, "Notes must not exceed 500 characters")
    .optional()
    .or(z.literal(""))
});

export type FormData = z.infer<typeof validationSchema>;
